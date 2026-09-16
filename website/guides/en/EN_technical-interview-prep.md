# Technical Interview Prep (Coding + System Design)
*A 4-week structured plan — judgment, not memorization*

---

## Why Interviews Are Harder in 2026

Coding interviews have evolved because of AI tools — companies no longer just test "can you write code," they test **reasoning and judgment**, since everyone can get AI to write code now. So grinding LeetCode alone isn't enough — you need to be able to **narrate** your thinking.

---

## PART 1 — THE CODING ROUND

### What's Actually Being Tested

```
✓ Breaking a problem into patterns (not memorized solutions)
✓ Explaining your thinking out loud while you work
✓ Identifying edge cases yourself
✓ Discussing trade-offs (time vs space complexity)
```

### Practice Approach

```
1. Start with patterns, not random problems
   (sliding window, two pointers, BFS/DFS, DP — 15-20 patterns
   cover 90% of interview questions)
2. Time yourself — 30-45 min per problem
3. Practice "comfortable narrating" — write your solution
   out loud, not silently
4. Do mock interviews (to simulate real pressure)
```

---

## PART 2 — THE SYSTEM DESIGN ROUND

### What This Interview Is

A 45-60 minute conversation where you design a large-scale system's architecture — from scratch. At big companies, **a weak system design performance can override a strong coding result.**

### The Framework (When You Don't Know Where to Start)

```
1. Requirements + Scale        — how many users, how much data, what
                                  functional/non-functional needs
2. API Shape                   — what the high-level endpoints will be
3. Data Model                  — what to store, how it's structured
4. Architecture                — components: load balancer, cache,
                                  database, queue — and why each is needed
5. Bottlenecks + Failure Modes — what can fail, how to handle it
6. Observability               — how you'll know the system is healthy
```

**Important:** a good answer isn't dropping names like "Redis, Kafka, Cassandra." A good answer shows **what matters, what can fail, and which trade-off you're making.**

---

## PART 3 — 4-WEEK PREPARATION PLAN

```
Week 1: Foundations
  - Revise core coding patterns (15-20 patterns)
  - System design basics: CAP theorem, consistency models
  - "Designing Data-Intensive Applications" (Kleppmann) — best reference

Week 2: Building Blocks
  - Understand every system design component: what, why, tradeoffs
  - Load balancers, caching strategies, database sharding,
    message queues — deep dive

Week 3: Timed Practice
  - Coding: 2-3 problems daily, timed
  - System design: 45-min timed mock problems, focus on structure
    (not perfection)

Week 4: Mock Interviews + Refinement
  - Get someone to mock-interview you with real-time challenges
  - Identify weak areas and focus on them
  - Polish your "narration" — explaining clearly matters
    as much as the right answer
```

---

## PART 4 — AI-ERA INTERVIEW CHANGES (2026)

```
✓ Many companies now run "AI-assisted" rounds too — checking
  whether you use AI tools effectively, not blindly copying
✓ Behavioral signals matter more now (communication,
  reasoning transparency)
✓ Take-home assignments are shrinking (too easily solved by
  AI) — live rounds are increasing
```

---

## PART 5 — CHECKLIST

```
✓ You can confidently recognize 15-20 coding patterns
✓ You can write your solution out loud, not silently
✓ You remember the system design framework (requirements →
  architecture → failure modes → observability)
✓ You've done at least 3-5 mock interviews
✓ Every portfolio project has a ready "why/how/challenge"
```

---

## Further Reading / Sources

- [How I Would Prepare for a System Design Interview in 2026 — InterviewNoodle (Medium)](https://interviewnoodle.com/how-i-would-prepare-for-a-system-design-interview-in-2026-5941a974499d)
- [Coding Interviews in 2026 Are Harder Than Ever — Medium](https://brianjenney.medium.com/coding-interviews-in-2026-are-harder-than-ever-and-youre-less-prepared-than-you-think-5b63cd877fba)
- [System Design Interview Prep & Questions (2026 Guide) — Exponent](https://www.tryexponent.com/blog/system-design-interview-guide)

---

*Next: read `27_MCP_MODEL_CONTEXT_PROTOCOL.md` — connecting AI tools to data and tools*
