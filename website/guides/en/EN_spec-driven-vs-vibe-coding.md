# Spec-Driven Development vs Vibe Coding
*When to freely "vibe," when to write a structured spec*

---

## What Both Mean

```
Vibe Coding             — prompt the AI, accept whatever code comes out,
                          iterate until it works. Fast, but the
                          source of truth is "generated code."

Spec-Driven Development — write a versioned spec first (what to build,
                          how), then the AI implements it.
                          The source of truth is the "spec," not the code.
```

**This guide is a direct extension of `23_AGENTIC_CODING_CLAUDE_CODE.md`** — that one taught "plan first," this one teaches you to decide **when to keep the plan small and when to write a full spec.**

---

## PART 1 — DECISION MATRIX (When to Use Which)

```
Factor                  │ Vibe Coding          │ Spec-Driven Development
─────────────────────────┼──────────────────────┼──────────────────────────
Codebase maturity       │ New/throwaway/       │ Existing production
                        │ experimental          │ system
Security criticality    │ Low (internal tools) │ High (user data, finance)
Stakeholder coordination│ Self-directed         │ Multiple teams, external
                        │                       │ dependencies
Failure mode            │ Silent drift,         │ Over-specification,
                        │ hallucinated APIs     │ slow start
Reviewability           │ Diff the code         │ Diff the spec
                        │ (human didn't write)  │ (human wrote it)
```

<figure class="my-8">
<svg viewBox="0 0 640 300" class="w-full h-auto max-w-2xl mx-auto block text-gray-700 dark:text-gray-300" role="img" aria-label="Decision diagram: starting a feature branches three ways based on stakes — a throwaway prototype goes to vibe coding, a mixed project goes to a middle ground, and a production or high-stakes system goes to spec-driven development">
<defs>
<marker id="arrow-decision" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
</marker>
</defs>
<rect x="240" y="20" width="160" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
<text x="320" y="50" text-anchor="middle" font-size="14" fill="currentColor">Starting a feature</text>
<line x1="280" y1="70" x2="150" y2="205" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-decision)" />
<text x="150" y="140" text-anchor="middle" font-size="12" fill="currentColor">throwaway / prototype</text>
<line x1="320" y1="70" x2="320" y2="205" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-decision)" />
<text x="360" y="140" text-anchor="middle" font-size="12" fill="currentColor">mixed / some critical parts</text>
<line x1="360" y1="70" x2="500" y2="205" stroke="currentColor" stroke-width="2" marker-end="url(#arrow-decision)" />
<text x="530" y="140" text-anchor="middle" font-size="12" fill="currentColor">production / high-stakes</text>
<rect x="30" y="210" width="180" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
<text x="120" y="245" text-anchor="middle" font-size="14" fill="currentColor">Vibe Coding</text>
<rect x="230" y="210" width="180" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="2" />
<text x="320" y="235" text-anchor="middle" font-size="14" fill="currentColor">Middle Ground</text>
<text x="320" y="255" text-anchor="middle" font-size="11" fill="currentColor">(spec critical paths only)</text>
<rect x="430" y="210" width="180" height="60" rx="8" fill="#0284c7" stroke="#0284c7" stroke-width="2" />
<text x="520" y="245" text-anchor="middle" font-size="14" fill="#ffffff">Spec-Driven Dev</text>
</svg>
<figcaption class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Choosing between vibe coding and spec-driven development based on stakes and codebase maturity.</figcaption>
</figure>

---

## PART 2 — VIBE CODING (When It's Right)

```
✓ One-off scripts, prototypes, demos
✓ Throwaway experiments — testing "will this idea work?"
✓ Internal tools where security criticality is low
```

**Risk:** silent drift (the agent gradually strays from the plan), hallucinated APIs (that don't actually exist), context loss in long sessions.

---

## PART 3 — SPEC-DRIVEN DEVELOPMENT (Best Practices)

### 1. One Feature = One Spec Directory
```
specs/004-magic-link/
  ├── spec.md      (what to build)
  ├── plan.md      (how to build it)
  └── tasks.md      (small steps)
```

### 2. Constitution First
Before writing your first spec, commit `AGENTS.md` (or `.specify/memory/constitution.md`) — this defines project-wide rules that every spec will follow.

### 3. Use EARS Format for Acceptance Criteria
Every requirement should be clearly testable — not "system should be fast," but "system responds within 200ms for 95% of requests."

### 4. Review at Phase Boundaries
Never go straight from spec to code — review between every phase (spec → plan → tasks → code).

### 5. Keep Specs Short
1-3 pages max. If a spec is growing too big, split it into multiple specs.

### 6. Spec the Negative Space Too
The "out of scope" section is just as important as "in scope" — this keeps the agent from scope creep.

### 7. Cite the Spec in Commits/PRs
```
feat(auth): magic link, refs specs/004-magic-link/spec.md
```

### 8. Run a Clarify Pass
Let the agent surface ambiguity before guessing — use a `/clarify`-style command if your tool supports it.

### 9. Use Checklists
Build pre-flight checks (security, accessibility, observability) tailored to each spec.

### 10. Treat Specs as Durable Docs
They outlive the code — future developers (and agents) will read them as the canonical reference, before the code.

---

## PART 4 — MIDDLE GROUND (When You Need Both)

Avoid both pure vibe coding and heavy spec-driven development for a middle-ground approach:

```
✓ Follow separation of concerns even in small projects
✓ Keep a modular structure (even if the spec isn't formal)
✓ Always spec critical paths (auth, payments, data),
  vibe the rest (like UI polish)
```

---

## PART 5 — CHECKLIST

```
✓ New throwaway prototype? → Vibe coding is fine
✓ Production system, user data, or team coordination?
  → Use spec-driven development
✓ Write a short (1-3 page) spec for every critical feature
✓ Write "out of scope" explicitly, not just "in scope"
✓ Reference the spec in your commits
```

---

## Further Reading / Sources

- [Vibe Coding vs Spec-Driven Development (2026) — Augment Code](https://www.augmentcode.com/guides/vibe-coding-vs-spec-driven-development)
- [Spec-Driven Development (SDD): The Definitive 2026 Guide — TheBCMS](https://www.thebcms.com/blog/spec-driven-development/)
- [From Vibe Coding to Spec-Driven Development — Towards Data Science](https://towardsdatascience.com/from-vibe-coding-to-spec-driven-development/)

---

*This completes the 10-guide AI & Agents series — from freelancing/pricing to building, selling, and professional AI-assisted development.*
