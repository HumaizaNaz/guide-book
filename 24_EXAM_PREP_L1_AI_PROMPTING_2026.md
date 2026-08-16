# AI Prompting in 2026
*Agent Foundations And Prompting — Notes*

---

## ABOUT THIS GUIDE

This guide covers **AI Prompting in 2026** — a 45-minute crash course across 13 concepts.

**Source:** https://agentfactory.panaversity.org/docs/ai-prompting-2026

**The Unifying Pattern:**
> Nearly every technique reduces to one of two moves: **getting the right context in, or keeping the wrong context out.** The model sees only what's in its context window. Your job is controlling what goes in.

---

## CHUNK 1 — Novice vs Power User, Pretrained Knowledge, 3 Retrieval Modes (Concepts 1–3)

---

### Concept 1: Novice vs Power User

The gap between a casual AI user and an effective one is not cleverness — it is **briefing quality**.

| User Type | Behavior | Result |
|-----------|----------|--------|
| **Novice** | Asks vague questions ("which car should I buy?") | Generic, useless answers |
| **Power User** | Briefs AI like a smart new colleague: files + context + constraints + clear ask | Specific, actionable answers |

**Key Constraint:** The model sees only what is in the current context window — nothing from previous chats, nothing outside the prompt.

**Power User Example:** Instead of "write a self-review," upload your project tracker, recent docs, and voice notes — then ask for a structured draft grounded in those artifacts.

**Core Insight:**
> "The gap between a novice prompt and a power-user prompt is not cleverness; it is a handful of habits anyone can learn in an afternoon."

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Novice** | A beginner / someone new to something |
| **Briefing** | Giving context and instructions to someone |
| **Constraints** | Limits or boundaries set in advance |
| **Context window** | Everything the AI can see for this one response |
| **Artifacts** | Real files and documents you provide |

---

### Concept 2: Pretrained Knowledge

AI learned by reading massive amounts of internet text — not through experience.

**The Core Rule:** Frequency in training data roughly equals reliability of answers.

| Trust Level | When | Example |
|-------------|------|---------|
| **High trust** | Common, heavily-discussed topics | Why cats stare at walls |
| **Low trust** | Obscure, regional, contested topics | Regional folk game rules |
| **No trust** | Private data, post-cutoff events, unpublished info | Your company's internal data |

**Critical Warning:** Confidence ≠ Correctness. The model can sound completely sure while being completely wrong about sparse-data topics.

**Real Example:** AI described rules for a grandmother's regional folk game with total confidence — the rules were almost entirely wrong. It had blended similar games from training data.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Pretrained** | Learned from data before deployment |
| **Knowledge cutoff** | The date after which AI has no information |
| **Sparse data** | A topic with very little information available |
| **Contested** | Something people disagree about |
| **Reliability** | How much you can trust an answer |

---

### Concept 3: The 3 Retrieval Modes

Modern AI chooses HOW to answer based on the question type. Understanding the three modes lets you steer toward the right one.

| Mode | Speed | Source | Best For | Weakness |
|------|-------|--------|----------|----------|
| **Mode 1: Pretrained** | Seconds | Training data only | Definitions, common facts, timeless info | Stale on current events |
| **Mode 2: Web Search** | ~30 seconds | Recent web pages (handful) | Current events, recent launches | May cite popular sources, not most accurate |
| **Mode 3: Deep Research** | Minutes | Dozens of live pages, structured synthesis | Complex multi-source reports | Slow; overkill for simple questions |

**How to Steer Each Mode:**
- **Pretrained:** "What is X," "Summarize Y"
- **Web Search:** "What's the latest on…," "This week," specific city names
- **Deep Research:** "Thoroughly research…," "Produce a report with citations"

**Critical Fix for Web Search:** Always specify trusted source types:
- Bad: "Are vaccines safe?"
- Good: "Use WHO, FDA, EMA, and peer-reviewed studies only — no forums."

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Retrieval** | Finding and bringing back information |
| **Synthesis** | Combining multiple sources into one answer |
| **Steer** | To guide toward a specific direction |
| **Citation** | A reference to the source of information |
| **Peer-reviewed** | Checked by other experts before publishing |

---

## CHUNK 2 — Context Is the Whole Game, Reasoning / Think Hard (Concepts 4–5)

---

### Concept 4: Context Is the Whole Game

The model knows ONLY what appears in its context window for that response. The context window IS its complete world.

**What the Model Sees (The Full Stack):**
1. Uploaded files (PDFs, images, voice memos)
2. Chat history (every prior turn)
3. Your current prompt
4. Tool descriptions (web search, code execution)
5. Invisible system prompt from the tool

**Capacity:** ~750,000 words (4–5 Harry Potter books or several days of continuous speech)

**Pre-Prompt Checklist (Before Every Important Prompt):**
- Is there a document the answer should reference? **Attach it.**
- Are there constraints the AI cannot infer? **State them.**
- Is there prior context or background? **Summarize it.**
- Is there an output format you want? **Name it.**
- Is there a specific audience? **Name them.**

**Context Rot Warning:** Long conversations degrade. The AI compacts (summarizes) old turns to make room, losing specifics.
→ When topics change, **start a new chat** — the reset is faster than the rescue.

**Projects Feature:** Most tools support persistent workspaces where files and instructions carry forward across every chat in that project. Use for recurring work (tax filing, writing voice, school).

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Context window** | Everything AI can see in one response |
| **Compacts** | Summarizes/compresses old chat to make room |
| **Persistent** | Stays in place; does not disappear |
| **Workspace** | A dedicated working environment |
| **System prompt** | Hidden instructions given to the AI by the tool |

---

### Concept 5: Reasoning, or "Think Hard"

Modern models have built-in extended thinking modes that explore multiple approaches before answering.

**How to Invoke Reasoning:**
- Say: "Think hard" or "think carefully before answering"
- Use the thinking-mode toggle in the interface
- Some tools auto-detect hard questions and engage automatically

**What Actually Happens:** The model internally explores multiple approaches, checks its own work, backtracks, and only returns the final answer after seconds or even minutes of internal reasoning.

**Performance Data (2025 METR Study):**
- Mid-2024: Models could handle tasks taking humans ~7 minutes
- Early 2025: Reliably handling tasks taking humans ~1 hour
- Doubling in capability roughly every 7 months

**When TO Use Thinking Mode:**
- Hard trade-offs and multi-input decisions
- Complex analysis with real stakes
- When structured output matters (list trade-offs, give recommendation, state conditions)

**When NOT to Use:**
- Quick summaries or simple definitions
- Casual brainstorming
- Familiar, easy territory
(It is slower and uses more budget)

**Power Pattern:**
> Provide full context → invoke thinking explicitly → request structured output ("give me three trade-offs, which option, and under what conditions does your recommendation flip")

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Extended thinking** | AI's built-in mode to reason deeply before answering |
| **Invoke** | To activate or call upon something |
| **Backtrack** | To go back and reconsider a previous step |
| **Frontier models** | The most advanced AI models currently available |
| **Structured output** | A response organized in a specific format (list, table, sections) |

---

## CHUNK 3 — Sycophancy, Brainstorm-Iterate Loop (Concepts 6–7)

---

### Concept 6: Sycophancy and How to Neutralize It

**Definition:** Models are biased toward agreeing with users because agreement earned more thumbs-up during training.

**Evidence:** A November 2025 Washington Post analysis found models opened with affirmation ~10× more often than disagreement.

**The Problem:** Ask "Don't you think remote work is better?" → It agrees. Ask "Is office work more productive?" → It agrees with that too.

**Four Ways to Neutralize Sycophancy:**

**1. Fix the Prompt Framing:**
- Bad: "Find evidence that this strategy will work" (conclusion fixed)
- Good: "Evaluate this strategy. List strongest arguments for AND against."

**2. Use the Rubric Pattern:**
Replace vague evaluation ("is this good?") with specific scored criteria (1–10). Vague = praise. Scored rubric = finds what's missing.

**3. Force a Number:**
Require a score on a fixed scale (1–5 or 1–10) with one-sentence justification.
→ "Pretty good" becomes "7/10: loses points on structure because section 3 repeats section 2."

**4. The Objective Rubric Example:**
A founder asked "critique my mobile tie-dye business idea" → got praise.
Then asked to score 5 dimensions (real problem, market size, competitive advantage, unit economics, top failure reasons) → got **8/100** with concrete reasons to rethink entirely.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Sycophancy** | Always agreeing / telling you what you want to hear |
| **Affirmation** | A positive, agreeable response |
| **Rubric** | A scoring guide with specific named criteria |
| **Neutralize** | To cancel out or remove the effect of something |
| **Confirmation bias** | Tendency to look for info that confirms what you already believe |

---

### Concept 7: The Brainstorm-Iterate Loop

**Definition:** The highest-leverage habit in AI prompting. Structure decisions and options BEFORE drafting final work.

**The Core Recipe:**
1. Load all relevant context upfront (constraints, files, audience)
2. Ask for **3–5 options** — not one. Force alternatives.
3. Give explicit feedback on each (reject why, accept why)
4. Ask for **3–5 new options** informed by feedback
5. Iterate until you have 1–2 you genuinely like
6. **Only then** ask AI to flesh out the chosen option in detail

**Why This Works:** AI's first instinct is average (the internet is full of common ideas). Forcing alternatives pushes past the default.

**For Writing — Outline Before Drafting:**
1. Ask for 3 outline options (not full drafts)
2. Pick one, ask AI to critique and grade it (1–10)
3. Revise outline based on what scored below 9
4. Ask AI to expand each heading to 3–5 bullets
5. Critique and grade the bullets
6. Only then ask for the full draft
7. Grade the draft, ask for changes that raise the score most (ranked by impact)
8. Repeat until score plateaus around 9.5

**Key Insight:** Almost all writing leverage lives in the **outline**. One word changed in the outline reshapes the whole article. One word changed in a final draft changes one word.

**Time Trade:** 10–12 minutes of structural work before drafting → strong 600-word piece in ~45 minutes. Faster than "write me a draft."

**Universal Application:** Works for: planning trips, naming products, writing emails, choosing contractors, picking learning paths, designing briefs.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Leverage** | Maximum impact from minimum effort |
| **Iterate** | To repeat with improvements each time |
| **Alternatives** | Different options to choose from |
| **Plateau** | To stop improving / level off |
| **Structural work** | Working on the structure/outline before the content |

---

## CHUNK 4 — Multimodal, Building Small Apps (Concepts 8–9)

---

### Concept 8: Multimodal — Images, Audio, and What's Next

Modern AI processes images and audio in both directions — reading what you upload AND generating new content.

#### Image Input — What AI Sees Well vs Poorly

| Sees Well | Sees Poorly |
|-----------|-------------|
| Overall scene and composition | Fine details and small text |
| Large distinct objects | Counting many small cluttered items |
| Whiteboard diagrams | Small print at edges |
| Handwritten and cursive text (verify for high stakes) | |

**Practical Uses:** Receipts, bill-splitting, transcribing handwritten notes, summarizing whiteboard photos.
**Quality Tip:** Always double-check totals and labels on graphs.

#### Image Output — Common Failure Modes
- Garbled text on signs (misspelled words)
- Inconsistent characters across frames
- Hand/finger errors (six fingers, fused hands)
- Wrong aspect ratio

**Power Pattern — Designer-Quality Diagrams:**
1. Ask Claude to visualize as SVG (Claude excels at deciding what belongs)
2. Convert SVG to PNG (render at 2× resolution)
3. Paste PNG into ChatGPT/Gemini, ask to redraw with polish (preserve labels/arrows)
4. Iterate 3–4 rounds → studio-quality output
5. Time: 10–15 minutes (vs 1 hour+ in Figma)

#### Audio Input
- Best for: Transcription, long-form dictation, meeting summaries, action items by owner
- Speaker ID: Works for 2 speakers; weak on 4+
- Caution: Tone, sarcasm, emotion still unreliable in 2026
- Cost: Second-cheapest tier after text (pennies per minute)
- Benefit: Voice in/out turns commutes into thinking time

**The Emerging Pattern:** Modality boundaries dissolve. Drop mixed bundles (image + voice memo + PDF + screenshot) as one prompt — treat combinations as native.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Multimodal** | Using multiple types of input/output (text, image, audio, video) |
| **Diffusion model** | AI that generates images by removing noise step by step |
| **SVG** | Scalable Vector Graphics — a code-based image format |
| **Modality** | A type of input or output (text, image, audio, video) |
| **Transcription** | Converting speech to written text |

---

### Concept 9: Building Small Apps With One Prompt

Modern AI can build small games, websites, and tools from a single prompt — no coding required.

**Where It Runs:**
- Directly in chat, in a side panel
- Called: **Artifacts** (Claude), **Canvas** (ChatGPT, Gemini)
- Persistent objects you can iterate, publish, embed, or download as code

**What Works Today:**
- Pomodoro timers, bill splitters, outfit pickers, simple games, click-and-play interactives

**What Doesn't Work Yet:**
- Multiplayer over the internet (networking too complex)
- Live AI feedback in different languages

**The 3-Slot Recipe:**
1. **Goal:** What should this thing do?
2. **Input:** What does the user provide?
3. **Output:** What does the user see?

**Iteration:** Changes like "make the button bigger" or "add dark mode" edit the artifact in place — much faster than regenerating.

**Real Example:** A father (not a software engineer) built a yellow cat-themed typing game for his 7-year-old in three sentences. The skill is writing a brief and iterating, not coding.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Artifact** | A persistent app/document created inside the AI chat |
| **Canvas** | ChatGPT/Gemini's name for the same feature |
| **Pomodoro** | A time-management technique: 25 min work, 5 min break |
| **Iterate in place** | Edit the existing thing rather than rebuilding from scratch |
| **Brief** | A short, clear description of what you want built |

---

## CHUNK 5 — Data Analysis, AI Desktop Apps (Concepts 10–11)

---

### Concept 10: Data Analysis (The Model Writes and Runs Code)

When you ask calculation or graphing questions, the model writes code, runs it, and returns results — no coding knowledge required.

**CRITICAL — Silent Failure Mode:**
The model doesn't always actually run code. It sometimes **guesses** — producing confident-sounding paragraphs with no real computation behind them.

**Three Habits to Prevent This:**
1. Say: "Write and run code to answer this. **Show me the code.**"
2. Check: The code should be visibly present in the response
3. Demand a verifiable specific first: "Tell me exact row count, column names, and date range before analyzing"

**Best Use Cases:**
- Household spending (which categories grew, forgotten subscriptions)
- Personal tracking (running, sleep, weight, screen time)
- Small business records (sales, inventory, customer data)
- Any spreadsheet someone handed you

**What to Double-Check:**
- Final totals (code is precise; wrong column sums exist)
- Graph labels (numbers usually right; captions sometimes wrong)
- Column interpretation (if AI misunderstands a column, whole analysis fails)

**Reliability:** Like work from a sharp junior analyst — useful, fast, almost always right, occasionally wrong.

**Smart First Move:** Don't ask the analysis question yet. Ask: "What charts would best show what's happening?" → Pick the chart you want → Then ask for it. This catches misinterpreted columns early.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Silent failure** | When something fails without showing an obvious error |
| **Computation** | Mathematical calculation done by code |
| **Column** | A vertical set of data in a spreadsheet |
| **Junior analyst** | A new/junior data analyst — useful but needs checking |
| **Verify** | To confirm that a result is correct |

---

### Concept 11: AI Desktop Apps and Permissions

A new category of apps (like Cowork, OpenWork) runs on your computer, finds files with permission, and acts on them.

**What These Can Do:**
- Reorganize messy folders (propose structure, execute after approval)
- Pull together related files for a project
- Summarize across folders (what did I work on last quarter)

**The Safe Workflow (ALWAYS follow this order):**
1. Tell it the task
2. Ask for a **plan, not action** (list of file operations proposed)
3. Review and edit the plan
4. **Only then** approve execution

**Critical Warnings:**
- Deleted files often do **NOT** go to recycle bin — they're gone
- Edited files do **NOT** keep edit history unless version control is on

**The Permission Ladder (Build Trust Gradually):**
| Stage | Permission Level |
|-------|----------------|
| First | Read-only, single small folder |
| After 2–3 successes | Read + write inside one specific folder |
| After a clean week | Read across project tree, write in scoped subfolder |
| Trusted | Tool-specific permissions |

**Never Approve:** "Do whatever you need" or full disk access early.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Permission** | Access rights — what the app is allowed to do |
| **Recycle bin** | The trash/bin where deleted files normally go |
| **Version control** | System that tracks changes and saves history |
| **Scoped** | Limited to a specific defined area |
| **Approval** | Giving permission to proceed |

---

## CHUNK 6 — Cost & Which Model, Models Checking Models (Concepts 12–13)

---

### Concept 12: Cost, Speed, and Which Model to Use When

**The Cost Stack (Cheapest to Most Expensive):**
| Type | Speed | Cost | Notes |
|------|-------|------|-------|
| Text | Seconds | Fractions of a cent | Iterate 50 times in an afternoon |
| Speech | Seconds | Few cents per minute | |
| Images | Tens of seconds | Several cents per generation | No early-stop — full cost always |
| Deep Research | Minutes | Several cents to ~25 cents | Synthesizes dozens of sources |
| Video | Minutes | Many cents to dollars | Iteration is painful |

**Key Implication:** Invest more effort in your prompt before generating images or video — you can't cheaply iterate like text.

**Model Strengths (Mid-2026):**
| Model | Best At |
|-------|---------|
| **Claude** | Reasoning, long docs, SVG/diagrams, code, writing voice, structured analysis |
| **ChatGPT** | Photo-realistic images, voice mode, conversational range |
| **Gemini** | Fast web search, source synthesis, deep research with charts, Google Workspace |
| **Meta AI (Muse Spark)** | Ubiquity (WhatsApp/Instagram), free, top-5 text reasoning, dashboards |
| **DeepSeek** | Open-source, 1M-token context, strong STEM/coding, cheaper |

**Two Habits That Compound:**
1. Keep **two tabs open** — paste same prompt in both when uncertain
2. Keep a **prompt scratchpad** — save prompts that produced unusually good results; reuse and adapt

**The Leaderboard:** Arena (arena.ai/leaderboard) ranks models via blind head-to-head votes. Check monthly — leaders rotate fast.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Token** | A unit of text the AI processes (roughly 0.75 words) |
| **Open-source** | Code/weights are publicly available for anyone to use |
| **Leaderboard** | A ranked list of models based on performance |
| **Iteration cost** | How much it costs to try something multiple times |
| **Ubiquity** | Being everywhere / available on many platforms |

---

### Concept 13: Models Checking Models

When there's no answer key and no expert nearby, use models to grade each other's work.

**Why This Works:** Different models trained on different data with different reward signals. One model's blind spot, another often catches.

**Three Nested Versions (Pick the Lightest That Fits):**

| Level | When to Use | How |
|-------|-------------|-----|
| **1. Quick sanity check** | Casual work | One pass with rubric critique, stop |
| **2. Single-model self-critique loop** | Drafts, emails | Score → implement → repeat → plateau at 9 |
| **3. Multi-model loop** | High-stakes work | Self-critique + 2–3 different models cross-checking |

**The Single-Model Self-Critique Loop:**
1. Ask model to score its output 1–10 against named criteria
2. Ask it to implement its own suggestions
3. Repeat until grade plateaus around 9
→ Works for weekly updates, tricky emails, one-page memos

**The Full Multi-Model Recipe (High-Stakes):**
1. Start with strongest model, generate draft (thinking mode on)
2. Ask it to grade itself (1–10) with one-sentence justification per criterion
3. Ask it to implement suggestions; repeat until plateau (~9)
4. Take to a **second model** (different family = different blind spots)
5. Same rubric on second model
6. Bring second model's critique back to first — let first adjudicate
7. For very high stakes: repeat with third model from third family
8. Stop when score crosses target across two independent models

**Autonomous Iteration Variant:**
> "Iterate against your own rubric until you reach 9.5 across all criteria, then show me the final version."
→ Model grades, revises, regrades automatically (5–6 rounds in one response). Dramatically faster.

**Why Rubrics Work:** Without one, "is this good?" = praise (sycophancy). With named criteria scored 1–10, the model must identify what's missing — that specificity is actionable.

**The Score:** A progress signal, NOT a truth signal. Three models can still be wrong about the same thing if they share training data. For legal, medical, or financial content — always get a human expert.

**Privacy Caution:** Cross-model checking = pasting into multiple tools. Check data policies. Never feed confidential work (NDAs, financial analysis, strategy memos) through tools with unclear policies.

**When to Skip:** Quick emails, lookups, casual brainstorming — single model is fine. Use the loop when being wrong is expensive.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Rubric** | A scoring guide with specific named criteria |
| **Adjudicate** | To make a final decision / judge between options |
| **Autonomous iteration** | Self-running loop where AI improves its own output |
| **Blind spot** | Something a model misses or gets wrong consistently |
| **High-stakes** | When being wrong has serious consequences |

---

## MASTER REVISION — ALL 13 CONCEPTS AT A GLANCE

```
1. Novice vs Power User    → Briefing quality, not cleverness. AI sees only context window.
2. Pretrained Knowledge    → Frequency = reliability. Confidence ≠ correctness.
3. Three Retrieval Modes   → Pretrained (seconds) | Web Search (30s) | Deep Research (minutes)
4. Context Is Everything   → Pre-prompt checklist. Context rot → start new chat.
5. Reasoning / Think Hard  → "Think hard" invokes extended thinking. Use for hard decisions.
6. Sycophancy              → AI agrees by default. Fix with rubrics, forced scores, neutral framing.
7. Brainstorm-Iterate Loop → 3-5 options first. Iterate. Only then draft. Outline before writing.
8. Multimodal              → Images in/out, audio in/out. Chain Claude (SVG) + ChatGPT (render).
9. Building Small Apps     → 3-slot recipe: Goal + Input + Output. Artifacts/Canvas.
10. Data Analysis          → Model writes + runs code. Silent failure — demand to see code.
11. Desktop Apps           → Plan before action. Permission ladder. Never full disk access.
12. Cost & Which Model     → Text cheapest. Claude = reasoning. Gemini = search. Two-tab habit.
13. Models Checking Models → Rubric loop. 3 levels: sanity / self-critique / multi-model.
```

**The One Unifying Principle:**
> Get the right context IN. Keep the wrong context OUT.

---

## QUICK REVISION CARDS

**Q: What separates a novice from a power user?**
A: Briefing quality — files, context, constraints, clear ask. Not cleverness.

**Q: What does "confidence ≠ correctness" mean?**
A: AI can sound 100% sure while being completely wrong about sparse-data topics.

**Q: What are the 3 retrieval modes?**
A: Pretrained (seconds, training data) | Web Search (~30s, recent pages) | Deep Research (minutes, dozens of sources)

**Q: What is context rot?**
A: In long chats, AI compacts old turns and loses specifics. Fix: start a new chat when topics change.

**Q: How do you invoke reasoning mode?**
A: Say "think hard" or "think carefully before answering"

**Q: What is sycophancy?**
A: AI's bias toward agreeing with users because agreement earned thumbs-up during training.

**Q: How do you neutralize sycophancy?**
A: Use rubrics with scored criteria (1–10). "Evaluate for and against" not "find evidence for."

**Q: What is the Brainstorm-Iterate Loop?**
A: Ask for 3-5 options → give feedback → iterate → only then draft final version.

**Q: What is a silent failure in data analysis?**
A: AI guesses instead of running code — gives confident-sounding answer with no real computation.

**Q: What is the Permission Ladder for desktop apps?**
A: Read-only first → read+write in one folder → broader access over time. Never full disk access early.

**Q: Which model is best for reasoning and long documents?**
A: Claude

**Q: Which model is best for fast web search and deep research?**
A: Gemini

**Q: What are the 3 levels of Models Checking Models?**
A: 1) Quick sanity check | 2) Single-model self-critique loop | 3) Full multi-model loop

**Q: What is the score in Models Checking Models — truth or progress?**
A: Progress signal only. Not a truth signal — models can share the same blind spots.

**Q: What is the unifying pattern across all 13 concepts?**
A: Get the right context IN, keep the wrong context OUT.

---

*Section III: AI Prompting in 2026 — COMPLETE ✓*
