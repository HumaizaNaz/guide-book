# Agentic Coding with Claude Code
*Plan mode, CLAUDE.md, and permissions — a professional 2026 workflow*

---

## What Is Agentic Coding

Agentic coding = letting an AI agent (Claude Code, Cursor, etc.) understand the whole codebase and complete multi-step tasks on its own — not just autocomplete, but **planning, reading files, and making changes.**

This section is a natural extension of the DevGuides site's `12_AI_TOOLS_GUIDE.md` — that guide compared tools, this one teaches the **professional workflow**.

---

## PART 1 — THE CORE LOOP (4 Steps)

```
1. Explore (Plan Mode)   — read-only exploration, no changes
2. Plan                  — build a reviewed plan before implementation
3. Implement             — against the plan, one piece at a time
4. Commit                — in clean, revertible steps
```

### 1. Explore in Plan Mode First

Plan mode keeps the agent **read-only** — it maps the codebase without touching anything.

```bash
claude --permission-mode plan
```

Or cycle with `Shift+Tab` inside a session, or use the `/plan` command. For complex architectural questions, let the agent think it through before proposing anything — this saves backtracking later.

### 2. Turn Exploration Into a Reviewed Plan

Don't let a single line of code get written before the plan is reviewed. A good pattern: have Claude write open questions into a `planning.md` file, answer them, and iterate until the plan is right. **A good plan means the implementation lands in one pass.**

### 3. Implement Against the Plan, Piece by Piece

Once the plan is approved, cycle to accept-edits mode with `Shift+Tab` so the agent works without a prompt at every step. To keep the agent from drifting — ask for one function at a time, or have it stub functions first and fill them in, rather than requesting the whole change at once.

### 4. Commit in Clean, Revertible Steps

Stage and commit with git at every logical checkpoint — better than letting the agent auto-commit everything. Some changes you'll need to revert, and clean commits make that a one-line operation instead of an archaeology project. Scan the diff for security issues before every commit.

---

## PART 2 — WRITE PROMPTS THE AGENT CAN FINISH

A vague prompt has its place too — asking "what would you improve in this file" is fine when you want the agent's opinion, as long as you keep the scope tight so it doesn't wander through hundreds of files.

---

## PART 3 — USING CLAUDE.md CORRECTLY

```
✓ Project commands     — exact test, build, lint commands (e.g. npm test)
✓ Architecture rules   — constraints the agent must respect,
                          directories it shouldn't touch
✓ Team conventions     — rules a linter doesn't enforce but
                          reviewers expect

✗ Personality notes and generic directives (linter already covers these)
```

**Critical finding:** 60 lines is optimal, **200 lines is the ceiling**. Start the file late — once you know what Claude actually gets wrong, add entries one at a time, don't dump everything on day one. For bigger repos, point Claude to the right files instead of dumping everything.

---

## PART 4 — PERMISSIONS AND HOOKS

Permissions decide what the agent can touch — in Claude Code this is controlled through `allow`, `ask`, and `deny` rules in `settings.json`.

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)", "Read", "Edit"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Bash(rm -rf:*)"]
  }
}
```

**Common setup:** deny-by-default + a tight allowlist, plus explicit deny rules for risky operations (like network calls).

**Hooks** fire at fixed points in the loop — before a tool runs, after it runs, or when the agent tries to stop. Each hook can allow, warn, or block that step with an exit code.

---

## PART 5 — CONTEXT MANAGEMENT (For Long Sessions)

```
/clear      — reset context between unrelated tasks
/compact    — keep a long session on track with a focus instruction
Subagent    — absorbs exploratory digging, never touches the main window
```

---

## PART 6 — CHECKLIST (Before Every Session)

```
✓ Start with plan mode for complex tasks
✓ Review the plan before implementation
✓ Implement one piece at a time
✓ Commit at every checkpoint
✓ Scan the diff for security before committing
✓ Keep CLAUDE.md under 200 lines
✓ Set permissions explicitly (allow/ask/deny)
```

---

## Further Reading / Sources

- [10 Claude Code Best Practices for Agentic Coding: A 2026 Guide — OpenHands](https://www.openhands.dev/blog/claude-code-best-practices-agentic-coding)
- [Claude Code Best Practices: 12 Patterns Agentic Engineers Use — LevelUp Coding](https://levelup.gitconnected.com/claude-code-best-practices-12-patterns-agentic-engineers-use-65264e3eb919)
- [Agentic Coding Recommendations — Armin Ronacher](https://lucumr.pocoo.org/2025/6/12/agentic-coding/)

---

*Next: read `24_EVAL_DRIVEN_DEVELOPMENT.md` — making AI agents reliable and measurable*
