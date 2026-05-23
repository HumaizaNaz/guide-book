# AI Tools & Integration Guide
*Cursor, Claude Code, Copilot, Claude API — 2026*

---

## AI AND DEVELOPMENT IN 2026

In 2026, **78% of professional developers** use AI coding tools daily. These tools are no longer optional — they have become the standard workflow.

```
Without AI tools:       With AI tools:
8 hrs to write code     Same work in 3–4 hrs
Boilerplate manually    Auto-generate
Search Stack Overflow   Ask AI directly
Debug visually          AI finds patterns
```

**AI tools don't steal your job — they make you 2–3x faster.**

---

## PART 1 — AI CODING TOOLS COMPARISON (2026)

### Three Main Tools

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

**What it is:** An AI-first fork of VS Code — same interface, all AI built-in.

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
1. Download from cursor.com
2. You can import VS Code settings/extensions
3. Choose Claude or GPT-4o as your model

### GitHub Copilot — Most Accessible

**What it is:** A VS Code extension that works in every IDE.

```
Features:
✓ Code completion (inline suggestions)
✓ Chat (Ctrl+Shift+I)
✓ Auto-generate tests
✓ Works in ALL IDEs
✓ GitHub integration
✓ Workspace understanding

Best for: Teams, budget-conscious devs, multi-IDE setups
Price: $10/month ($19/mo for pro+ features)
```

### Claude Code — Most Powerful Agent

**What it is:** An AI agent that runs in your terminal — understands your entire codebase.

```
Features:
✓ Full codebase context (200K tokens)
✓ Multi-file edits simultaneously
✓ Performs git operations on its own
✓ Writes tests
✓ Finds and fixes bugs
✓ Generates documentation
✓ Works with any editor

Best for: Complex tasks, refactoring, architecture
Price: Usage-based or Max plan
```

**Install:**
```bash
npm install -g @anthropic-ai/claude-code
claude
```

### Winning Strategy (Most Pro Devs)

```
Daily coding:        Cursor or Copilot
Complex tasks:       Claude Code
AI features in app:  Claude API or OpenAI API
```

---

## PART 2 — CURSOR TIPS

### Keyboard Shortcuts

```
Ctrl+K         → Inline edit (explain/change selected code)
Ctrl+L         → Open chat (ask about the codebase)
Ctrl+Shift+K   → Delete line
Tab            → Accept suggestion
Esc            → Reject suggestion
Ctrl+Enter     → Accept without moving (multi-line)
```

### Composer (Multi-file changes)

```
Ctrl+I → Open Composer

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

### Providing Context

```
Reference files with the @ symbol:
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
# Start
claude

# Specific task
claude "Fix the TypeScript errors in src/app/page.tsx"

# With a file
claude "Review this code for security issues" --file src/api/route.ts
```

### Powerful Use Cases

```bash
# Implement a full feature
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

# Write tests
claude "Write comprehensive tests for src/lib/payment.ts
        using Vitest. Cover success cases, edge cases,
        and error handling"
```

---

## PART 4 — CLAUDE API (Adding AI Features to Your App)

Want to add AI features to your app? Use the Claude API.

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
  model: 'claude-sonnet-4-6',           // Choose your model
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

  // Return a ReadableStream
  return new Response(stream.toReadableStream(), {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}
```

### System Prompt (Define AI Behavior)

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
// Maintain chat history
const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []

async function chat(userInput: string) {
  // Add user message
  messages.push({ role: 'user', content: userInput })

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: messages  // Send the full history
  })

  const assistantMessage = response.content[0].text

  // Add assistant response to history
  messages.push({ role: 'assistant', content: assistantMessage })

  return assistantMessage
}
```

### Tool Use (Let AI Call Functions)

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

// Check if AI called a tool
if (response.stop_reason === 'tool_use') {
  const toolUse = response.content.find(c => c.type === 'tool_use')
  // toolUse.name === 'get_weather'
  // toolUse.input === { city: 'Karachi' }
  
  // Actually fetch the weather
  const weather = await fetchWeather(toolUse.input.city)
  
  // Send result back to AI
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

### Prompt Caching (Save Costs)

```typescript
// Cache a long system prompt — saves tokens
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: [
    {
      type: 'text',
      text: longSystemPrompt,   // 2000+ tokens
      cache_control: { type: 'ephemeral' }  // Cache it!
    }
  ],
  messages: [{ role: 'user', content: userMessage }]
})
// First call: full cost
// Subsequent calls: 90% discount on system prompt tokens
```

---

## PART 5 — CHOOSING A MODEL

```
Claude Sonnet 4.6  → Best balance (speed + quality) — DEFAULT choice
Claude Opus 4.7    → Hardest tasks, most capable, expensive
Claude Haiku 4.5   → Fastest, cheapest — for simple tasks
```

### Cost Estimate

```
Sonnet 4.6:  Input $3/million tokens, Output $15/million tokens
Haiku 4.5:   Input $0.25/million tokens, Output $1.25/million
Opus 4.7:    Input $15/million tokens, Output $75/million

1 million tokens ≈ 750,000 words ≈ 1500 pages

Typical chat message: 200–500 tokens
Typical response: 100–500 tokens
1000 conversations: ~$0.50–$5 (Sonnet)
```

---

## PART 6 — AI FEATURE IDEAS FOR YOUR APP

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
✓ Install Cursor (cursor.com)
✓ Or GitHub Copilot ($10/mo) in VS Code
✓ Memorize keyboard shortcuts (Ctrl+K, Ctrl+L)

Claude Code:
✓ npm install -g @anthropic-ai/claude-code
✓ Run the claude command
✓ Authenticate with your Anthropic account

Claude API (if you want AI in your app):
✓ Create account at platform.anthropic.com
✓ Get API key → put it in .env
✓ Install @anthropic-ai/sdk
✓ Do a simple test first
✓ Add streaming for better UX
✓ Add rate limiting (per user)
✓ Never put the API key in the frontend!

Cost Management:
✓ Check usage dashboard regularly
✓ Set budget alerts
✓ Use Haiku for simple tasks
✓ Enable prompt caching for long prompts
```

---

*Next: Read `13_TESTING_GUIDE.md` — Vitest + Playwright testing*
