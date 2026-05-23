# Payments Guide

*Accepting payments with Stripe — checkout, webhooks, subscriptions*

---

## Why Stripe?

Stripe is the industry-standard payment processor for developers:
- Best API documentation (industry-wide)
- Test mode — develop without spending real money
- Built-in fraud protection (Radar)
- 135+ currencies supported
- PCI DSS compliance handled automatically

**Never build payment processing yourself.** Card data handling has strict legal requirements (PCI DSS). Stripe handles all of that.

---

## Stripe Account Setup

1. Sign up at [stripe.com](https://stripe.com)
2. Complete business/identity verification (required for live payments)
3. Go to **Developers → API Keys** and copy your keys

```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...           # Server-only — never expose
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Safe for browser
STRIPE_WEBHOOK_SECRET=whsec_...         # Get after creating webhook endpoint
NEXT_PUBLIC_URL=http://localhost:3000   # Your app's base URL
```

**Test mode vs Live mode:** Toggle in the top-left of the Dashboard. Always use test mode during development.

---

## Install

```bash
npm install stripe @stripe/stripe-js
```

Create a server-side Stripe instance in `lib/stripe.ts`:

```typescript
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
})
```

---

## Products and Prices

In the Stripe Dashboard → **Product Catalog → Add product:**

1. Set product name, description, optional image
2. Add a price:
   - **One-time:** single charge
   - **Recurring:** monthly/yearly subscription
3. Copy the **Price ID** (starts with `price_...`)

You can also create via API:

```typescript
// One-time product:
const product = await stripe.products.create({ name: "Pro Plan" })
const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 2900,  // $29.00 — Stripe uses cents
  currency: "usd",
})

// Recurring subscription:
const monthlyPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 2900,
  currency: "usd",
  recurring: { interval: "month" },
})
```

---

## Checkout Session (One-Time Payment)

Stripe-hosted checkout page — Stripe handles the payment UI, you redirect users to it.

### Server Action

```typescript
// app/actions/checkout.ts
"use server"

import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"  // or NextAuth's auth()

export async function createCheckoutSession(priceId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("You must be signed in to purchase")

  const session = await stripe.checkout.sessions.create({
    mode: "payment",  // "subscription" for recurring
    line_items: [
      { price: priceId, quantity: 1 }
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: {
      userId,  // crucial — needed in webhook to link payment to user
    },
  })

  redirect(session.url!)
}
```

### Buy Button Component

```tsx
// components/BuyButton.tsx
"use client"
import { createCheckoutSession } from "@/app/actions/checkout"

interface BuyButtonProps {
  priceId: string
  label?: string
}

export function BuyButton({ priceId, label = "Buy Now" }: BuyButtonProps) {
  return (
    <form action={createCheckoutSession.bind(null, priceId)}>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        {label}
      </button>
    </form>
  )
}
```

Usage in a pricing page:

```tsx
<BuyButton priceId="price_1234..." label="Get Pro — $29" />
```

---

## Subscriptions

For monthly/yearly plans, change `mode` to `"subscription"`:

```typescript
// app/actions/checkout.ts
export async function createSubscription(priceId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Not authenticated")

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: { userId },
    subscription_data: {
      metadata: { userId },  // also set on subscription for webhook access
      trial_period_days: 14, // optional free trial
    },
  })

  redirect(session.url!)
}
```

---

## Webhooks (Critical)

Webhooks are how Stripe tells your server when events happen: payment succeeded, subscription cancelled, invoice failed, etc.

**Never trust only the success URL redirect.** A user can close the tab before it loads. Always update your database in the webhook handler.

### Step 1: Create the Webhook Endpoint

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()  // raw body needed for signature verification
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle events
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.CheckoutSession
        await handleCheckoutCompleted(session)
        break
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription)
        break
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancelled(subscription)
        break
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err)
    return NextResponse.json({ error: "Handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.CheckoutSession) {
  const userId = session.metadata?.userId
  if (!userId) return

  await db.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId: session.customer as string,
      plan: "pro",
    },
  })
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  const isActive = subscription.status === "active" || subscription.status === "trialing"

  await db.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscription.id,
      plan: isActive ? "pro" : "free",
      subscriptionStatus: subscription.status,
    },
  })
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  await db.user.update({
    where: { id: userId },
    data: { plan: "free", subscriptionStatus: "cancelled" },
  })
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Payment failed for customer:", invoice.customer)
  // Optionally: send email, update status to "past_due"
}
```

### Step 2: Test Locally with Stripe CLI

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login

# Forward events to your local server:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI prints a webhook secret (`whsec_...`) — add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### Step 3: Trigger Test Events

```bash
# In another terminal — simulate events:
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
stripe trigger customer.subscription.deleted
stripe trigger invoice.payment_failed
```

---

## Subscription Lifecycle

```
checkout.session.completed
          ↓
customer.subscription.created (status: trialing or active)
          ↓
invoice.payment_succeeded (monthly/yearly renewals)
          ↓
invoice.payment_failed → customer.subscription.updated (status: past_due)
          ↓
customer.subscription.deleted (status: cancelled)
```

Key events to handle:

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Grant access, save customer ID |
| `invoice.payment_succeeded` | Confirm access continues |
| `invoice.payment_failed` | Log it, optionally notify user |
| `customer.subscription.updated` | Handle plan change or past_due |
| `customer.subscription.deleted` | Revoke access, set plan to "free" |

---

## Customer Portal (Self-Service Subscription Management)

Let users update payment method, cancel, or switch plans — Stripe hosts the UI:

```typescript
// app/actions/portal.ts
"use server"

import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export async function openCustomerPortal() {
  const { userId } = await auth()
  if (!userId) throw new Error("Not authenticated")

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  })

  if (!user?.stripeCustomerId) {
    throw new Error("No billing account found")
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  })

  redirect(session.url)
}
```

Enable the customer portal at **Stripe Dashboard → Settings → Billing → Customer portal**.

Manage Subscription button:

```tsx
"use client"
import { openCustomerPortal } from "@/app/actions/portal"

export function ManageBillingButton() {
  return (
    <form action={openCustomerPortal}>
      <button type="submit" className="btn-secondary">
        Manage Subscription
      </button>
    </form>
  )
}
```

---

## Test Card Numbers

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 9995` | Payment declined (insufficient funds) |
| `4000 0025 0000 3155` | Requires 3D Secure authentication |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 3220` | 3D Secure — authentication fails |

Use any future expiry date (e.g. `12/34`) and any 3-digit CVC (e.g. `123`).

For postal code: `12345` works for US cards.

---

## Check Access in Your App

After the webhook updates your DB, check access in server components or API routes:

```typescript
// lib/subscription.ts
import { auth } from "@clerk/nextjs/server"

export async function getUserPlan(): Promise<"free" | "pro"> {
  const { userId } = await auth()
  if (!userId) return "free"

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  return (user?.plan as "free" | "pro") ?? "free"
}
```

Gate features:

```tsx
// In a server component:
const plan = await getUserPlan()

if (plan !== "pro") {
  return (
    <div className="p-6 border rounded-lg text-center">
      <h2>Pro Feature</h2>
      <p>Upgrade to access this feature.</p>
      <BuyButton priceId={process.env.STRIPE_PRO_PRICE_ID!} label="Upgrade to Pro" />
    </div>
  )
}

return <ProFeature />
```

---

## Going Live Checklist

- [ ] Complete Stripe identity/business verification in dashboard
- [ ] Switch `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to **live** keys
- [ ] Create a production webhook in **Stripe Dashboard → Developers → Webhooks** pointing to `https://yoursite.com/api/webhooks/stripe`
- [ ] Set the new live webhook secret as `STRIPE_WEBHOOK_SECRET` in production env
- [ ] Test with a real card (then refund yourself)
- [ ] Set up payment failure email alerts in Stripe dashboard

---

## Common Mistakes

### 1. Not verifying webhook signatures

Anyone can POST to `/api/webhooks/stripe`. Always verify:

```typescript
// ❌ Trusting the payload without verification
const event = await request.json() as Stripe.Event

// ✅ Verify — throws if signature is wrong
const event = stripe.webhooks.constructEvent(body, signature, secret)
```

### 2. Updating DB on success redirect instead of webhook

```typescript
// ❌ User can close tab before reaching /success
// app/success/page.tsx
await db.user.update({ data: { plan: "pro" } })

// ✅ Always update in webhook
// app/api/webhooks/stripe/route.ts
case "checkout.session.completed":
  await db.user.update({ data: { plan: "pro" } })
```

### 3. Not handling duplicate webhook events

Stripe may deliver the same event more than once. Use idempotency:

```typescript
// Save processed event IDs to prevent double-processing
const existing = await db.stripeEvent.findUnique({ where: { id: event.id } })
if (existing) return NextResponse.json({ received: true })

await db.stripeEvent.create({ data: { id: event.id, type: event.type } })
// Now process the event
```

### 4. Wrong amount units

Stripe uses the smallest currency unit (cents for USD):

```typescript
// ❌ Wrong — this charges $0.29
unit_amount: 29

// ✅ Correct — this charges $29.00
unit_amount: 2900

// ✅ Helper to avoid confusion
const toCents = (dollars: number) => Math.round(dollars * 100)
unit_amount: toCents(29)  // 2900
```

### 5. Storing raw card data

Never store card numbers, CVCs, or expiry dates — this violates PCI DSS. Stripe handles all card data. You only store `stripeCustomerId` and `stripeSubscriptionId`.
