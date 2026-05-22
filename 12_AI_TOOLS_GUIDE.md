# AI Tools & Integration Guide
*Cursor, Claude Code, Copilot, Claude API — 2026*

---

## 2026 MEIN AI AUR DEVELOPMENT

2026 mein **78% professional developers** AI coding tools use karte hain daily. Yeh tools optional nahi raha — yeh standard workflow ban gaya hai.

```
Without AI tools:       With AI tools:
Code likhne mein 8 hrs  Same kaam 3-4 hrs
Boilerplate manually    Auto-generate
Stack Overflow dhundho  AI se directly poocho
Debug akhon se karo     AI pattern dhundhta hai
```

**AI tools tumhara kaam chheenta nahi — tumhe 2-3x faster banata hai.**

---

## PART 1 — AI CODING TOOLS COMPARISON (2026)

### Teen Main Tools

```
┌─────────────────────────────────────────────────────┐
│  CURSOR          │  GITHUB COPILOT  │  CLAUDE CODE  │
├─────────────────────────────────────────────────────┤
│  $20/month       │  $10/month       │  $20+/month   │
│  AI-native IDE   │  VS Code plugin  │  Terminal CLI  │
│  VS Code fork    │  All IDEs        │  Any editor    │
│  Best daily use  │  Best budget     │  Best complex  │
│  1M+ users       │  Most popular    │  Most powerful │
└─────────────────────────────────────────────────────┘
```

### Cursor — AI-Native IDE

**Kya hai:** VS Code ka AI-first fork — same interface, sab AI built-in.

```
Features:
✓ Tab completion (smarter than Copilot)
✓ Chat with your codebase (Ctrl+L)
✓ Apply code changes directly
✓ Multi-file edits (Composer)
✓ Terminal AI assistance
✓ Image to code

Best for: Daily coding, full-stack development
Price: $20/month (unlimited AI)
```

**Setup:**
1. cursor.com se download karo
2. VS Code ki settings/extensions import kar sakte ho
3. Claude ya GPT-4o model choose karo

### GitHub Copilot — Most Accessible

**Kya hai:** VS Code extension jo har IDE mein kaam karta hai.

```
Features:
✓ Code completion (inline suggestions)
✓ Chat (Ctrl+Shift+I)
✓ Tests auto-generate
✓ Works in ALL IDEs
✓ GitHub integration
✓ Workspace understanding

Best for: Teams, budget-conscious devs, multi-IDE
Price: $10/month ($19/mo for pro+ features)
```

### Claude Code — Most Powerful Agent

**Kya hai:** Terminal mein chalne wala AI agent — poori codebase samajhta hai.

```
Features:
✓ Full codebase context (200K tokens)
✓ Multi-file edits simultaneously
✓ Git operations khud karta hai
✓ Tests likhta hai
✓ Bugs dhundha aur fix karta hai
✓ Documentation generate karta hai
✓ Works with any editor

Best for: Complex tasks, refactoring, architecture
Price: Usage-based ya Max plan
```

**Install karo:**
```bash
npm install -g @anthropic-ai/claude-code
claude
```

### Winning Strategy (Most Pro Devs)

```
Daily coding:        Cursor ya Copilot
Complex tasks:       Claude Code
AI features in app:  Claude API ya OpenAI API
```

---

## PART 2 — CURSOR TIPS

### Keyboard Shortcuts

```
Ctrl+K         → Inline edit (selected code explain/change karo)
Ctrl+L         → Chat open (codebase ke baare mein poocho)
Ctrl+Shift+K   → Delete line
Tab            → Accept suggestion
Esc            → Reject suggestion
Ctrl+Enter     → Accept without moving (multi-line)
```

### Composer (Multi-file changes)

```
Ctrl+I → Composer open karo

Examples:
"Add a dark mode toggle to the navbar"
"Create a user profile page with edit functionality"
"Refactor this component to use TypeScript"
"Add input validation to all forms"
```

### Effective Prompting in Cursor

```
BAD:  "fix this"
GOOD: "This function throws a TypeError when email is null. 
       Add null check and return early with an error message."

BAD:  "make it better"
GOOD: "Refactor this to use async/await instead of .then() chains,
       and add proper error handling with try/catch"

BAD:  "add feature"
GOOD: "Add a search functionality to the user list that:
       - Filters by name and email
       - Debounces input by 300ms
       - Shows 'No results' if empty"
```

### Context Provide Karo

```
@ symbol se files reference karo:
@src/lib/auth.ts      ← Specific file
@types                ← Types folder
@package.json         ← Dependencies

Example:
"Looking at @src/lib/auth.ts, add a function to 
validate JWT tokens using the secret from env"
```

---

## PART 3 — CLAUDE CODE TIPS

### Basic Usage

```bash
# Start karo
claude

# Specific task
claude "Fix the TypeScript errors in src/app/page.tsx"

# File ke saath
claude "Review this code for security issues" --file src/api/route.ts
```

### Powerful Use Cases

```bash
# Poori feature implement karo
claude "Add user authentication with email/password using Clerk. 
        Follow Next.js App Router patterns. Add:
        - Login page at /login
        - Signup page at /signup  
        - Protected routes middleware
        - User profile in header"

# Bug fix
claude "Users report login fails silently. No error shown.
        Debug the auth flow in src/app/login/page.tsx
        and src/app/api/auth/route.ts"

# Refactor
claude "The file src/lib/utils.ts is 800 lines.
        Split it into logical modules under src/lib/
        keeping the same exports"

# Tests likhwao
claude "Write comprehensive tests for src/lib/payment.ts
        using Vitest. Cover success cases, edge cases,
        and error handling"
```

---

## PART 4 — CLAUDE API (App mein AI Feature Add Karna)

AI features apni app mein add karna chahte ho? Claude API use karo.

### Setup

```bash
npm install @anthropic-ai/sdk
```

**.env:**
```env
ANTHROPIC_API_KEY=sk-ant-...
```

### Basic Usage

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

// Simple message
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',           // Model choose karo
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in simple terms'
    }
  ]
})

console.log(response.content[0].text)
```

### Streaming (Real-time Response)

```typescript
// Next.js API Route
// app/api/chat/route.ts

import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  const { message } = await request.json()

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: message }]
  })

  // ReadableStream return karo
  return new Response(stream.toReadableStream(), {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}
```

### System Prompt (AI ka behavior define karo)

```typescript
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 2048,
  system: `You are a helpful customer support agent for Novaj AI.
           You help users with technical questions.
           Always be polite and professional.
           If you don't know something, say so honestly.
           Keep responses concise unless detail is needed.`,
  messages: [
    { role: 'user', content: userMessage }
  ]
})
```

### Multi-turn Conversation (Chat History)

```typescript
// Chat history maintain karo
const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []

async function chat(userInput: string) {
  // User message add karo
  messages.push({ role: 'user', content: userInput })

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: messages  // Poori history bhejo
  })

  const assistantMessage = response.content[0].text

  // Assistant response history mein daal do
  messages.push({ role: 'assistant', content: assistantMessage })

  return assistantMessage
}
```

### Tool Use (AI ko Functions Call Karne Do)

```typescript
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  tools: [
    {
      name: 'get_weather',
      description: 'Get current weather for a city',
      input_schema: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: 'City name'
          }
        },
        required: ['city']
      }
    }
  ],
  messages: [
    { role: 'user', content: 'What is the weather in Karachi?' }
  ]
})

// Check karo AI ne tool call kiya?
if (response.stop_reason === 'tool_use') {
  const toolUse = response.content.find(c => c.type === 'tool_use')
  // toolUse.name === 'get_weather'
  // toolUse.input === { city: 'Karachi' }
  
  // Actually weather fetch karo
  const weather = await fetchWeather(toolUse.input.city)
  
  // Result AI ko wapas bhejo
  const finalResponse = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: 'What is the weather in Karachi?' },
      { role: 'assistant', content: response.content },
      { role: 'user', content: [{
        type: 'tool_result',
        tool_use_id: toolUse.id,
        content: JSON.stringify(weather)
      }]}
    ]
  })
}
```

### Vision (Image Analysis)

```typescript
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'url',
            url: 'https://example.com/screenshot.png'
          }
        },
        {
          type: 'text',
          text: 'Describe what you see in this screenshot'
        }
      ]
    }
  ]
})
```

### Prompt Caching (Cost Save Karo)

```typescript
// Long system prompt cache karo — tokens save hote hain
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: [
    {
      type: 'text',
      text: longSystemPrompt,   // 2000+ tokens
      cache_control: { type: 'ephemeral' }  // Cache karo!
    }
  ],
  messages: [{ role: 'user', content: userMessage }]
})
// Pehli call: full cost
// Subsequent calls: 90% discount on system prompt tokens
```

---

## PART 5 — MODELS CHOOSE KARNA

```
Claude Sonnet 4.6  → Best balance (speed + quality) — DEFAULT choice
Claude Opus 4.7    → Hardest tasks, most capable, expensive
Claude Haiku 4.5   → Fastest, cheapest — simple tasks ke liye
```

### Cost Estimate

```
Sonnet 4.6:  Input $3/million tokens, Output $15/million tokens
Haiku 4.5:   Input $0.25/million tokens, Output $1.25/million
Opus 4.7:    Input $15/million tokens, Output $75/million

1 million tokens ≈ 750,000 words ≈ 1500 pages

Typical chat message: 200-500 tokens
Typical response: 100-500 tokens
1000 conversations: ~$0.50-$5 (Sonnet)
```

---

## PART 6 — AI FEATURES IDEAS FOR YOUR APP

### Common AI Features (Easy to Implement)

```typescript
// 1. Content Generation
"Write a blog post about {topic}"
"Generate 5 product descriptions for {product}"
"Create social media captions for {content}"

// 2. Text Analysis
"Summarize this document in 3 bullet points"
"Extract key information from this email"
"Analyze sentiment of this review"

// 3. Code Assistance  
"Review this code for bugs"
"Generate unit tests for this function"
"Explain what this code does"

// 4. Customer Support Bot
"You are a support agent for {company}..."

// 5. Data Extraction
"Extract name, email, phone from this text"
"Parse this invoice and return JSON"
```

---

## PART 7 — AI TOOL SETUP CHECKLIST

```
IDE Setup:
✓ Cursor install karo (cursor.com)
✓ Ya GitHub Copilot ($10/mo) VS Code mein
✓ Keyboard shortcuts yaad karo (Ctrl+K, Ctrl+L)

Claude Code:
✓ npm install -g @anthropic-ai/claude-code
✓ claude command run karo
✓ Anthropic account se authenticate karo

Claude API (agar app mein AI chahiye):
✓ platform.anthropic.com pe account banao
✓ API key lo → .env mein daal do
✓ @anthropic-ai/sdk install karo
✓ Pehle simple test karo
✓ Streaming add karo UX ke liye
✓ Rate limiting lagao (per user)
✓ API key kabhi frontend mein nahi!

Cost Management:
✓ Usage dashboard regularly dekho
✓ Budget alerts set karo
✓ Haiku use karo simple tasks pe
✓ Prompt caching enable karo long prompts pe
```

---

*Next: `13_TESTING_GUIDE.md` padho — Vitest + Playwright testing*
