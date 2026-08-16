# Thesis for Professionals — Full Version (Additional Concepts)
*Agent Foundations And Prompting — What is NEW vs Plain English*

---

## ABOUT THIS GUIDE

This guide covers **only the new content** from the Full Version of the Thesis — concepts not covered in the Plain English version. Read the Plain English notes first, then use this for deeper detail.

**Source:** https://agentfactory.panaversity.org/docs/thesis

---

## NEW 1: Agents as Economic Actors — Full Technical Detail

### The Inflection Point

This represents the shift from **agent-as-tool** to **agent-as-buyer**.

**What AI agents can do right now (2026):**
An agent assigned a high-level goal (e.g., "reduce customer churn by 15%") will autonomously:
- Purchase compute for model training
- Negotiate API contracts for data enrichment
- Provision cloud services for deployment

All within human-set budget and permission envelopes.

### The Trust Layer (The Real Challenge)

Capability is not the problem — agents can already do this. The challenge is **trust**:

| Trust Component | What It Means |
|----------------|---------------|
| **Mandate enforcement** | Ensuring agents respect established rules and stay within limits |
| **Audit trails** | Complete records of every decision and transaction |
| **Liability** | Legal responsibility when outcomes fail |

### The Economic Shift

```
Before: Company → Humans buy resources → AI uses them

Now: Company → AI dynamically sources its own resources
              → Compute, data, specialist services
              → Optimizes simultaneously for: cost + speed + quality

Result: Company becomes a self-provisioning system
```

### Builder Implications

> "Design your agents and infrastructure for economic participation from day one."

- Agents need **budgets** — not just permissions
- Agents need **outcome contracts** — not just API keys
- Organizations mastering this capture the next value wave

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Mandate enforcement** | Ensuring agents follow established rules and limits |
| **Self-provisioning** | A system that finds and acquires its own resources |
| **Outcome contract** | Payment for results delivered — not for access |
| **Provision** | To set up and allocate resources |

---

## NEW 2: The Four Engines — Full Comparison Table

> "These are not competing products — they are different architectural theories about where the agent ends and infrastructure begins."

| Dimension | OpenAI Agents SDK | Claude Managed Agents | Dapr Agents | Cursor SDK |
|-----------|------------------|----------------------|-------------|------------|
| **Type** | Model-native harness | Fully managed runtime | Durable distributed agents | Harness-first cloud agent platform |
| **Compute plane** | BYO sandbox (7 partner integrations) | Anthropic-hosted | Your Kubernetes cluster | Cursor Cloud VMs (or local) |
| **Vendor lock-in** | HIGH (tuned to OpenAI models) | TOTAL (harness + runtime + model) | NONE (Apache 2.0, CNCF) | HIGH at harness; model-agnostic underneath |
| **Languages** | Python; TypeScript in progress | Any (HTTP/SDK) | Python; others coming | TypeScript (`npm install @cursor/sdk`) |
| **Durability model** | Snapshot + rehydrate | Server-side session persistence | Dapr Workflow checkpointing | Cloud VM persistence per task |
| **Multi-agent** | Handoffs + subagents | Research preview | Deterministic workflows + pub/sub | Parallel cloud agents, subagents, artifact handoff |

**Key insight:** A serious Agent Factory deploys **all four** — different engines for different workers, as Invariant 4 requires.

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Harness** | Control plane — manages agent loop, model calls, tool routing |
| **BYO** | Bring Your Own — use your own infrastructure |
| **Kubernetes (K8s)** | Container orchestration system for running distributed workloads |
| **Checkpointing** | Saving each step so execution can resume after a crash |
| **Vendor lock-in** | Dependence on one vendor that makes switching costly |
| **CNCF** | Cloud Native Computing Foundation — open-source standards body |

---

## NEW 3: Engine Selection Framework

Two axes drive selection: **failure tolerance** and **infrastructure ownership**.

| Job Profile | Engine | Rationale |
|------------|--------|-----------|
| **Can't fail** (mission-critical) | Dapr Agents (wrapping an SDK) | Durable execution, auto-recovery, full observability |
| **Shouldn't fail** (don't want to operate) | Claude Managed Agents | Hosted and operated by Anthropic |
| **Shouldn't fail** (want portability) | OpenAI Agents SDK | Production-grade, self-hosted, vendor-flexible |
| **Nice if it works** (routine tasks) | OpenClaw-native | Lightweight, fast deployment |
| **Coding fleet** (parallel agents) | Cursor SDK | Purpose-built for parallel coding agents, proven at scale |
| **Already have one** | Any Paperclip-compatible runtime | Integrate existing infrastructure |

### How to Decide — Two Questions

**Question 1: Failure Tolerance**
```
"If this fails — how bad is it?"
→ Very bad (money, legal, patient data) → Dapr or Claude Managed
→ Bad but recoverable                  → OpenAI Agents SDK
→ Minor inconvenience                  → OpenClaw-native
```

**Question 2: Infrastructure Ownership**
```
"Do you want to operate the infrastructure yourself?"
→ No  → Claude Managed Agents (provider runs it)
→ Yes → Dapr Agents or OpenAI SDK (self-hosted)
→ Coding work → Cursor SDK
```

---

## NEW 4: Harness vs Compute — The Two Planes

Every engine splits into two planes. This is a critical architectural concept:

```
HARNESS (Control Plane)          COMPUTE (Execution Plane)
━━━━━━━━━━━━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━━━━━━━━━━━━
Agent loop                        Sandbox where code runs
Model calls                       Model-generated code executes here
Tool routing                      UNTRUSTED code runs here
Approvals                         Isolated from credentials
Tracing & recovery
CREDENTIALS LIVE HERE (safe)
```

**Why this matters:**
- Credentials stay in the harness (safe)
- Untrusted model-generated code runs in the compute sandbox (isolated)
- You can **swap the compute plane** without rewriting the agent
- Some engines fuse both (Claude Managed Agents)
- Others separate them (OpenAI SDK integrates with E2B, Cloudflare, Daytona, Modal, Runloop, Vercel, Blaxel)

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Control plane** | The part that decides what to do — manages logic |
| **Execution plane** | The part that actually runs the code |
| **Sandbox** | An isolated, safe environment for running untrusted code |
| **Credential** | Authentication information — API keys, tokens, passwords |

---

## NEW 5: Trigger and Sandbox Orthogonality

This concept is unique to the Full Version:

```
TRIGGERS (when to start work):
  → Inngest (workforce events — schedules, webhooks, API calls)
  → Claude Code Routines (coding-agent events)

ENGINES (where work runs):
  → Dapr, Claude Managed, OpenAI SDK, Cursor SDK

KEY: These two are INDEPENDENT (orthogonal)
```

**What this means in practice:**
```
Change your engine → triggers do NOT need to be rewired
Change your trigger → agents do NOT need to be rewritten

Example:
Inngest (webhook trigger) → Dapr engine      ✓
Inngest (schedule trigger) → Claude Managed  ✓
Same trigger, different engine — works perfectly
```

**Both systems coexist:**
- Inngest fronts the **workforce** (general workers)
- Claude Code Routines fronts the **coding agents** (specialist coding work)

#### Vocabulary
| Word | Meaning |
|------|---------|
| **Orthogonal** | Independent — changing one does not affect the other |
| **Coexist** | Both work alongside each other without conflict |

---

## NEW 6: Durability — How Each Engine Handles It

Each engine has its own approach to durability (surviving crashes):

| Engine | Durability Method |
|--------|------------------|
| **Dapr Agents** | Dapr Workflow checkpointing — saves state at every step |
| **Claude Managed Agents** | Server-side session persistence — Anthropic manages it |
| **OpenAI Agents SDK** | Stateful workflows — built-in state management |
| **Cursor SDK** | Cloud VM persistence per task — each task has its own VM |

**The key rule:** All engines are increasingly absorbing durability natively. The choice of engine determines HOW durability is achieved — not WHETHER it is available.

---

## MASTER COMPARISON — Full Version Additions

### What Plain English Had → What Full Version Adds

| Topic | Plain English | Full Version Adds |
|-------|--------------|-------------------|
| Engines | Named 5 engines briefly | Full comparison table + selection framework |
| Economic actors | AI pays for things | Trust layer detail, builder implications, self-provisioning |
| Durability | 74% → 99.7% math | Per-engine durability methods |
| Harness | Not mentioned | Full harness vs compute split explained |
| Triggers | Inngest mentioned | Orthogonality with engines explained |
| Invariants | What they are | Why they must exist + failure if absent |

---

## QUICK REVISION CARDS — New Content Only

```
Card A: Economic Actor Trust Layer
3 components: Mandate enforcement + Audit trails + Liability
Agents need BUDGETS (not just permissions)
Agents need OUTCOME CONTRACTS (not just API keys)

Card B: Engine Selection — 2 Questions
1. "How bad if this fails?" → Critical = Dapr/Claude Managed
2. "Do you want to operate it?" → No = Claude Managed | Yes = Dapr/OpenAI

Card C: Engine Comparison (Lock-in)
OpenAI SDK = HIGH lock-in (OpenAI-tuned)
Claude Managed = TOTAL lock-in (everything Anthropic)
Dapr = NONE (Apache 2.0, open source)
Cursor SDK = HIGH at harness (but model-agnostic underneath)

Card D: Harness vs Compute
Harness = control plane (credentials live here, SAFE)
Compute = execution plane (untrusted code runs here, SANDBOXED)
Can swap compute plane without rewriting agent

Card E: Trigger Orthogonality
Triggers (Inngest/Routines) and Engines are INDEPENDENT
Change one → does not affect the other
Inngest = workforce | Routines = coding agents

Card F: "Not competing products"
4 engines = 4 architectural theories
A real Agent Factory uses ALL FOUR for different workers
```

---

*Full Version — New Content Only — Complete*
*Next: Getting Started Overview (Section II)*
