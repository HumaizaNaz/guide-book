# Building Your First AI Agent
*ReAct loop, tool use, aur ek working agent 2026 stack ke saath*

---

## AI Agent Kya Hota Hai

AI agent = ek LLM jo sirf text generate nahi karta, balke **decide** karta hai kya karna hai, **tools use** karta hai (search, calculator, database, API), aur **loop** mein chalte hue apna kaam complete karta hai — bina har step pe insaan se poochhe.

Chatbot vs Agent ka farq:

```
Chatbot:  User poochta hai → LLM jawab deta hai → khatam

Agent:    User poochta hai → LLM sochta hai kya karna hai
          → tool call karta hai (e.g. web search)
          → result dekhta hai → phir sochta hai
          → agar zaroorat ho to aur tool call karta hai
          → tab final answer deta hai
```

---

## PART 1 — 4 CORE PILLARS (Har Agent Mein Yeh Hote Hain)

```
1. Reasoning   — model kya karna hai yeh decide karta hai
2. Tools       — search, code execution, APIs, database access
3. Memory      — pichhli conversation/steps yaad rakhna
4. Planning    — multi-step tasks ko chhote steps mein todna
```

---

## PART 2 — THE REACT LOOP (Agents Kaise Sochte Hain)

ReAct = **Reason + Act**. Yeh sabse common agent pattern hai:

```
1. Reason:   "Mujhe iske liye latest weather data chahiye"
2. Act:      weather_api tool call karo
3. Observe:  API se result mile
4. Reason:   "Ab mujhe yeh data user ko readable format mein dena hai"
5. Act:      final answer generate karo
```

Yeh loop tab tak chalta hai jab tak agent decide nahi karta ke task complete ho gaya.

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

## PART 3 — APNA PEHLA AGENT BANANA (Python + Claude API)

### Setup

```bash
pip install anthropic
```

```bash
# console.anthropic.com se free API key lo
export ANTHROPIC_API_KEY="your-key-here"
```

### Step 1: Tool Define Karo (JSON Schema)

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
        # yahan real weather API call hoga
        return f"{tool_input['city']}: 28°C, Sunny"
    return "Unknown tool"
```

### Step 3: The Agentic Loop

```python
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Karachi mein mausam kaisa hai?"}]

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

Yeh loop hi har agent framework (LangGraph, OpenAI Agents SDK, Claude Agent SDK) ke core mein hota hai — sirf abstraction layer alag hota hai.

---

## PART 4 — NO-CODE OPTION (Agar Coding Nahi Aati)

Agar abhi coding se start nahi karna, to tools jaise **Vellum**, **n8n**, ya **OpenClaw** use kar sakte ho:

```
1. Apna goal describe karo plain English mein
2. Tools connect karo (Gmail, Slack, Notion, CRM) — visually
3. Test karo example prompts ke saath
4. Personalize karo (tone, name, behavior)
```

Yeh route din ka kaam minutes mein kar deta hai — lekin custom/complex logic ke liye code likhna better control deta hai.

---

## PART 5 — REAL-WORLD PATTERNS (Jab Basic Agent Kaafi Nahi)

```
Multi-agent     — ek agent doosre agent ko delegate karta hai
                  (e.g., research agent + writer agent)
Memory          — vector database (Pinecone) se past context yaad rakhna
Guardrails      — agent ko limit karna (kya nahi kar sakta)
Human handoff   — jab agent confident na ho, insaan ko escalate karna
```

---

## PART 6 — 5 COMMON MISTAKES (Beginners Ke)

```
✗ Har cheez ke liye ek hi giant prompt likhna
✗ Tool descriptions vague rakhna (agent confuse hota hai)
✗ Error handling skip karna (tool fail ho to agent crash)
✗ Memory/context limit ignore karna (lambi conversation break hoti hai)
✗ Testing/evals ke bina production mein deploy karna
```

---

## Further Reading / Sources

- [A Complete Beginners Guide to Building AI Agents (2026) — Vellum](https://www.vellum.ai/blog/beginners-guide-to-building-ai-agents)
- [The 2026 Guide to AI Agents — IBM](https://www.ibm.com/think/ai-agents)
- [r/AI_Agents — What tools to use to build AI agents in 2026 (Reddit)](https://www.reddit.com/r/AI_Agents/comments/1rdf5v7/my_guide_on_what_tools_to_use_to_build_ai_agents/)

---

*Next: `23_AGENTIC_CODING_CLAUDE_CODE.md` padho — Claude Code ke saath professional agentic coding workflow*
