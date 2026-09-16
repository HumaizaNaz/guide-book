# Building Your First AI Agent
*The ReAct loop, tool use, and a working agent with the 2026 stack*

---

## What Is an AI Agent

An AI agent = an LLM that doesn't just generate text, but **decides** what to do, **uses tools** (search, calculator, database, API), and completes its task in a **loop** — without asking a human at every step.

Chatbot vs Agent:

```
Chatbot:  User asks → LLM answers → done

Agent:    User asks → LLM thinks about what to do
          → calls a tool (e.g. web search)
          → sees the result → thinks again
          → calls another tool if needed
          → then gives the final answer
```

---

## PART 1 — 4 CORE PILLARS (Every Agent Has These)

```
1. Reasoning   — the model decides what to do
2. Tools       — search, code execution, APIs, database access
3. Memory      — remembering previous conversation/steps
4. Planning    — breaking multi-step tasks into smaller steps
```

---

## PART 2 — THE REACT LOOP (How Agents Think)

ReAct = **Reason + Act**. This is the most common agent pattern:

```
1. Reason:   "I need the latest weather data for this"
2. Act:      call the weather_api tool
3. Observe:  get the result from the API
4. Reason:   "Now I need to turn this into a readable answer"
5. Act:      generate the final answer
```

This loop continues until the agent decides the task is complete.

<figure class="my-8">
<svg viewBox="0 0 640 330" class="w-full h-auto max-w-xl mx-auto block text-gray-700 dark:text-gray-300" role="img" aria-label="The ReAct loop: Reason leads to Act, Act leads to Observe, Observe leads back to Reason, and Reason exits to Final Answer once the task is complete">
<defs>
<marker id="arrow-react" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
</marker>
</defs>
<line x1="260" y1="90" x2="440" y2="245" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-react)" />
<text x="380" y="160" text-anchor="middle" font-size="13" fill="currentColor">decides: use tool</text>
<line x1="380" y1="280" x2="270" y2="280" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-react)" />
<text x="325" y="265" text-anchor="middle" font-size="13" fill="currentColor">tool result</text>
<line x1="180" y1="250" x2="230" y2="95" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-react)" />
<text x="175" y="170" text-anchor="middle" font-size="13" fill="currentColor">re-reason</text>
<line x1="340" y1="60" x2="430" y2="60" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-react)" />
<text x="385" y="45" text-anchor="middle" font-size="12" fill="currentColor">task complete</text>
<rect x="180" y="30" width="160" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
<text x="260" y="65" text-anchor="middle" font-size="15" fill="currentColor">1. Reason</text>
<rect x="380" y="250" width="160" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
<text x="460" y="285" text-anchor="middle" font-size="15" fill="currentColor">2. Act (tool call)</text>
<rect x="100" y="250" width="160" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
<text x="180" y="285" text-anchor="middle" font-size="15" fill="currentColor">3. Observe</text>
<rect x="440" y="30" width="160" height="60" rx="8" fill="#0284c7" stroke="#0284c7" stroke-width="2" />
<text x="520" y="65" text-anchor="middle" font-size="15" fill="#ffffff">Final Answer</text>
</svg>
<figcaption class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">The ReAct loop: the agent reasons, acts, observes the result, and repeats until it exits to a final answer.</figcaption>
</figure>

---

## PART 3 — BUILDING YOUR FIRST AGENT (Python + Claude API)

### Setup

```bash
pip install anthropic
```

```bash
# Get a free API key from console.anthropic.com
export ANTHROPIC_API_KEY="your-key-here"
```

### Step 1: Define a Tool (JSON Schema)

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name"}
            },
            "required": ["city"]
        }
    }
]
```

### Step 2: Tool Execution Function

```python
def execute_tool(name, tool_input):
    if name == "get_weather":
        # a real weather API call would go here
        return f"{tool_input['city']}: 28°C, Sunny"
    return "Unknown tool"
```

### Step 3: The Agentic Loop

```python
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "What's the weather like in Karachi?"}]

while True:
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1024,
        tools=tools,
        messages=messages
    )

    if response.stop_reason != "tool_use":
        print(response.content[0].text)
        break

    messages.append({"role": "assistant", "content": response.content})

    tool_results = []
    for block in response.content:
        if block.type == "tool_use":
            result = execute_tool(block.name, block.input)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": result
            })

    messages.append({"role": "user", "content": tool_results})
```

This loop is at the core of every agent framework (LangGraph, OpenAI Agents SDK, Claude Agent SDK) — only the abstraction layer differs.

---

## PART 4 — THE NO-CODE OPTION (If You Don't Code)

If you don't want to start with code, tools like **Vellum**, **n8n**, or **OpenClaw** work too:

```
1. Describe your goal in plain English
2. Connect tools (Gmail, Slack, Notion, CRM) — visually
3. Test with example prompts
4. Personalize (tone, name, behavior)
```

This route turns a day's work into minutes — but writing code gives better control for custom/complex logic.

---

## PART 5 — REAL-WORLD PATTERNS (When a Basic Agent Isn't Enough)

```
Multi-agent     — one agent delegates to another
                  (e.g., research agent + writer agent)
Memory          — remembering past context via a vector database (Pinecone)
Guardrails      — limiting what the agent can't do
Human handoff   — escalating to a human when the agent isn't confident
```

---

## PART 6 — 5 COMMON MISTAKES (Beginners Make)

```
✗ Writing one giant prompt for everything
✗ Keeping tool descriptions vague (confuses the agent)
✗ Skipping error handling (agent crashes if a tool fails)
✗ Ignoring memory/context limits (long conversations break)
✗ Deploying to production without testing/evals
```

---

## Further Reading / Sources

- [A Complete Beginners Guide to Building AI Agents (2026) — Vellum](https://www.vellum.ai/blog/beginners-guide-to-building-ai-agents)
- [The 2026 Guide to AI Agents — IBM](https://www.ibm.com/think/ai-agents)
- [r/AI_Agents — What tools to use to build AI agents in 2026 (Reddit)](https://www.reddit.com/r/AI_Agents/comments/1rdf5v7/my_guide_on_what_tools_to_use_to_build_ai_agents/)

---

*Next: read `23_AGENTIC_CODING_CLAUDE_CODE.md` — a professional agentic coding workflow with Claude Code*
