# Agentic Coding with Claude Code
*Plan mode, CLAUDE.md, aur permissions — professional workflow 2026*

---

## Agentic Coding Kya Hai

Agentic coding = AI agent (Claude Code, Cursor, etc.) ko poori codebase samajhne dena aur multi-step tasks khud complete karne dena — sirf autocomplete nahi, balke **plan bana kar, files padh kar, aur changes karke.**

Yeh section is DevGuides site ki `12_AI_TOOLS_GUIDE.md` ka natural extension hai — wahan tools compare kiye the, yahan **professional workflow** sikhaya ja raha hai.

---

## PART 1 — THE CORE LOOP (4 Steps)

```
1. Explore (Plan Mode)   — read-only exploration, kuch change nahi
2. Plan                  — ek reviewed plan banao implementation se pehle
3. Implement             — plan ke against, ek piece at a time
4. Commit                — clean, revertible steps mein
```

### 1. Explore in Plan Mode Pehle

Plan mode agent ko **read-only** rakhta hai — woh codebase map karta hai bina kuch touch kiye.

```bash
claude --permission-mode plan
```

Ya session ke andar `Shift+Tab` se cycle karo, ya `/plan` command use karo. Complex architectural questions ke liye, agent ko pehle sochne do, propose karne se pehle — isse baad mein backtracking bachti hai.

### 2. Exploration Ko Reviewed Plan Mein Badlo

Plan ko review kiye bina ek line code mat likhwao. Ek acha pattern: Claude se `planning.md` file mein open questions likhwao, unka jawab do, aur tab tak iterate karo jab tak plan sahi na ho. **Achha plan matlab implementation ek hi pass mein land hoti hai.**

### 3. Plan Ke Against Implement Karo, Piece By Piece

Plan approve hone ke baad, `Shift+Tab` se accept-edits mode mein cycle karo taake agent bina har step pe prompt ke kaam kare. Agent ko drift hone se rokne ke liye — ek function ek time pe maango, ya pehle functions stub karwao phir fill karwao, poora change ek saath maangne ke bajaye.

### 4. Clean, Revertible Steps Mein Commit Karo

Har logical checkpoint pe git se stage aur commit karo — agent ko auto-commit sab kuch karne dene se behtar hai. Kuch changes tumhe revert karne padenge, aur clean commits isse one-line operation bana dete hain, archaeology project nahi. Har commit se pehle diff scan karo security issues ke liye.

---

## PART 2 — WRITING PROMPTS AGENT FINISH KAR SAKE

Vague prompt bhi apni jagah rakhta hai — "is file mein tum kya improve karoge" poochna theek hai jab agent ka opinion chahiye ho, jab tak scope tang rakho taake woh sainkron files mein na bhatak jaye.

---

## PART 3 — CLAUDE.md KA SAHI USE

```
✓ Project commands     — exact test, build, lint commands (e.g. npm test)
✓ Architecture rules   — constraints jo agent ko respect karni hain,
                          directories jo touch nahi karni
✓ Team conventions     — rules jo linter enforce nahi karta lekin
                          reviewers expect karte hain

✗ Personality notes aur generic directives (linter already covers)
```

**Critical finding:** 60 lines optimal hai, **200 lines ceiling** hai. File ko late start karo — jab pata chale Claude actually kya galat karta hai, tab entries ek-ek karke add karo, sab kuch pehle din dump mat karo. Bade repos ke liye, Claude ko sahi files point karo poora dump karne ke bajaye.

---

## PART 4 — PERMISSIONS AUR HOOKS

Permissions decide karte hain agent kya touch kar sakta hai — Claude Code mein yeh `settings.json` mein `allow`, `ask`, aur `deny` rules ke through control hote hain.

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)", "Read", "Edit"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Bash(rm -rf:*)"]
  }
}
```

**Common setup:** deny-by-default + tight allowlist, plus explicit deny rules risky operations (jaise network calls) ke liye.

**Hooks** loop ke fixed points pe fire hote hain — tool chalne se pehle, chalne ke baad, ya jab agent stop karne ki koshish kare. Har hook us step ko allow, warn, ya exit code se block kar sakta hai.

---

## PART 5 — CONTEXT MANAGEMENT (Lambi Sessions Ke Liye)

```
/clear      — unrelated tasks ke beech context reset karo
/compact    — focus instruction ke saath lambi session ko track pe rakho
Subagent    — exploratory digging ko absorb karta hai, main window
              kabhi touch nahi hota
```

---

## PART 6 — CHECKLIST (Har Session Se Pehle)

```
✓ Plan mode se start karo complex tasks ke liye
✓ Plan review karo implementation se pehle
✓ Ek piece at a time implement karo
✓ Har checkpoint pe commit karo
✓ Diff scan karo security ke liye commit se pehle
✓ CLAUDE.md ko 200 lines se neeche rakho
✓ Permissions explicitly set karo (allow/ask/deny)
```

---

## Further Reading / Sources

- [10 Claude Code Best Practices for Agentic Coding: A 2026 Guide — OpenHands](https://www.openhands.dev/blog/claude-code-best-practices-agentic-coding)
- [Claude Code Best Practices: 12 Patterns Agentic Engineers Use — LevelUp Coding](https://levelup.gitconnected.com/claude-code-best-practices-12-patterns-agentic-engineers-use-65264e3eb919)
- [Agentic Coding Recommendations — Armin Ronacher](https://lucumr.pocoo.org/2025/6/12/agentic-coding/)

---

*Next: `24_EVAL_DRIVEN_DEVELOPMENT.md` padho — AI agents ko reliable aur measurable banana*
