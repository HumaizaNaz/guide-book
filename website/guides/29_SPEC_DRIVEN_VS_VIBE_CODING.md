# Spec-Driven Development vs Vibe Coding
*Kab freely "vibe" karo, kab structured spec likho*

---

## Dono Kya Hain

```
Vibe Coding             — AI ko prompt do, jo code aaye use accept karo,
                          iterate karo jab tak kaam kare. Fast, lekin
                          source of truth "generated code" hota hai.

Spec-Driven Development — Pehle ek versioned spec likho (kya banana hai,
                          kaise), phir AI usse implement karta hai.
                          Source of truth "spec" hota hai, code nahi.
```

**Yeh guide `23_AGENTIC_CODING_CLAUDE_CODE.md` ka direct extension hai** — wahan "plan pehle" sikhaya tha, yahan yeh decide karna sikhaya ja raha hai **kab plan chhota rakhna hai aur kab poori spec likhni hai.**

---

## PART 1 — DECISION MATRIX (Kab Konsa Use Karo)

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

## PART 2 — VIBE CODING (Kab Sahi Hai)

```
✓ One-off scripts, prototypes, demos
✓ Throwaway experiments — "yeh idea kaam karega?" test karna
✓ Internal tools jahan security-criticality kam hai
```

**Risk:** silent drift (agent gradually plan se bhatak jata hai), hallucinated APIs (jo exist hi nahi karte), context loss lambi sessions mein.

---

## PART 3 — SPEC-DRIVEN DEVELOPMENT (Best Practices)

### 1. Ek Feature = Ek Spec Directory
```
specs/004-magic-link/
  ├── spec.md      (kya banana hai)
  ├── plan.md      (kaise banana hai)
  └── tasks.md      (chhote steps)
```

### 2. Constitution First
Pehli spec likhne se pehle, `AGENTS.md` (ya `.specify/memory/constitution.md`) commit karo — yeh project-wide rules define karta hai jo har spec follow karegi.

### 3. Acceptance Criteria Ke Liye EARS Format Use Karo
Har requirement clearly testable ho — "system should be fast" nahi, balke "system responds within 200ms for 95% of requests".

### 4. Phase Boundaries Pe Review Karo
Spec se seedha code pe kabhi mat jao — review karo har phase (spec → plan → tasks → code) ke beech.

### 5. Specs Chhoti Rakho
1-3 pages max. Agar spec badi ho rahi hai, todo aur multiple specs banao.

### 6. Negative Space Bhi Spec Karo
"Out of scope" section utna hi important hai jitna "in scope" — isse agent scope creep nahi karta.

### 7. Commits/PRs Mein Spec Cite Karo
```
feat(auth): magic link, refs specs/004-magic-link/spec.md
```

### 8. Clarify Pass Chalao
Agent ko ambiguity guess karne se pehle surface karne do — `/clarify` jaisa command use karo agar tool support karta ho.

### 9. Checklists Use Karo
Pre-flight checks banao (security, accessibility, observability) har spec ke liye tailored.

### 10. Specs Ko Durable Docs Ki Tarah Treat Karo
Yeh code se zyada lambi zindagi jeete hain — future developers (aur agents) inhe canonical reference ki tarah padhenge, code se pehle.

---

## PART 4 — MIDDLE GROUND (Jab Dono Ki Zaroorat Ho)

Pure vibe coding aur heavy spec-driven — dono se bacho middle-ground approach ke liye:

```
✓ Separation of concerns follow karo chhote projects mein bhi
✓ Modular structure rakho (chahe spec formal na ho)
✓ Critical paths (auth, payments, data) ko hamesha spec karo,
  baaki UI polish jaisi cheezein vibe kar sakte ho
```

---

## PART 5 — CHECKLIST

```
✓ Naya throwaway prototype hai? → Vibe coding theek hai
✓ Production system, user data, ya team coordination hai?
  → Spec-driven development use karo
✓ Har critical feature ke liye chhoti (1-3 page) spec likho
✓ "Out of scope" explicitly likho, sirf "in scope" nahi
✓ Commits mein spec ko reference karo
```

---

## Further Reading / Sources

- [Vibe Coding vs Spec-Driven Development (2026) — Augment Code](https://www.augmentcode.com/guides/vibe-coding-vs-spec-driven-development)
- [Spec-Driven Development (SDD): The Definitive 2026 Guide — TheBCMS](https://www.thebcms.com/blog/spec-driven-development/)
- [From Vibe Coding to Spec-Driven Development — Towards Data Science](https://towardsdatascience.com/from-vibe-coding-to-spec-driven-development/)

---

*Yeh AI & Agents series ki 10 guides complete karti hai — freelancing/pricing se lekar building, selling, aur professional AI-assisted development tak.*
