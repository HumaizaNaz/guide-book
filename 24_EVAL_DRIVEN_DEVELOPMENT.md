# Eval-Driven Development for AI Agents
*Apne AI worker ko trustworthy aur measurable banana*

---

## Eval-Driven Development (EDD) Kya Hai

Jaise Test-Driven Development (TDD) mein tum code likhne se pehle test likhte ho, waise hi EDD mein tum agent build karne se pehle **evals** (evaluations) likhte ho — success criteria jo batate hain agent sahi kaam kar raha hai ya nahi.

**Bina evals ke:** agent "feel" karta hai ke acha kaam kar raha hai, lekin production mein regressions silently aa jaate hain.

**Evals ke saath:** har change ke baad pata chalta hai kya sach mein better hua ya worse.

---

## PART 1 — KYUN ZAROORI HAI

Early prototyping mein evals ke bina bhi kaam chal jata hai. Lekin jab agent production mein scale hota hai, evals ke bina yeh sab break hone lagta hai:

```
✗ Real regressions vs noise mein farq nahi kar sakte
✗ Changes ko automatically hundreds of scenarios pe test nahi kar sakte
✗ Improvements measure nahi kar sakte
✗ Naye model aane pe hafton lagte hain compare karne mein
  (evals waalon ke liye yeh sirf din lagta hai)
```

---

## PART 2 — TYPES OF EVALS

```
Unit tests        — agent ke specific components evaluate karte hain
                     (e.g., retrieval step ka precision/recall,
                     tool selection accuracy alag se)

Regression tests  — curated dataset pe end-to-end evaluations,
                     har baar chalao jab prompt/model/architecture
                     change karo — taake performance degrade na ho
```

---

## PART 3 — ZERO SE EVALS BANANE KA ROADMAP

### Step 0: Jaldi Start Karo
Sochte ho hundreds of tasks chahiye? Nahi — **20-50 simple tasks** real failures se kaafi hain. Early development mein har change ka clear impact hota hai, isliye chhota sample size bhi kaam karta hai.

### Step 1: Jo Manually Check Karte Ho, Wahan Se Start Karo
Wahi behaviors jo tum har release se pehle verify karte ho. Agar production mein ho, to bug tracker aur support queue dekho — user-reported failures ko test cases mein convert karo.

### Step 2: Unambiguous Tasks Likho (Reference Solutions Ke Saath)
Ek acha task woh hai jahan **do domain experts independently same pass/fail verdict** pe pahunchein. Agar task khud pass nahi kar sakte, to task ko refine karo. Har task ke liye ek reference solution banao — yeh prove karta hai task solvable hai.

### Step 3: Balanced Problem Sets Banao
Dono cases test karo — jab behavior **hona chahiye** aur jab **nahi hona chahiye**. Sirf ek side test karoge to agent one-sided optimize ho jayega.

### Step 6: Transcripts Padho
Jab tak tum transcripts aur grades khud nahi padhoge, pata nahi chalega graders sahi kaam kar rahe hain ya nahi. Jab task fail ho, transcript batata hai agent ne galti ki ya grader ne valid solution reject kar diya.

### Step 7: Eval Saturation Pe Nazar Rakho
100% pe eval sirf regressions catch karta hai, improvement ka signal nahi deta. Jab agent solvable saare tasks pass kar le, naye harder evals chahiye hote hain.

---

## PART 4 — EVAL FRAMEWORKS COMPARISON

```
Framework    │ Best For                          │ Style
──────────────┼────────────────────────────────────┼──────────────
DeepEval     │ Pytest-native, 50+ metrics         │ Open-source
Braintrust   │ Offline eval + production monitor  │ Platform
LangSmith    │ LangChain ecosystem integration     │ Platform
Langfuse     │ Self-hosted, data residency needs   │ Open-source
Arize Phoenix│ Tracing, debugging, optimization    │ Open-source/SaaS
```

### Quick Example (DeepEval + Pytest)

```python
import pytest
from deepeval import assert_test
from deepeval.dataset import EvaluationDataset, Golden
from deepeval.metrics import TaskCompletionMetric

dataset = EvaluationDataset(
    goldens=[Golden(input="What is pi rounded to 2 decimal places?")]
)

@pytest.mark.parametrize("golden", dataset.goldens)
def test_my_agent(golden: Golden):
    result = my_ai_agent(golden.input)
    assert_test(golden=golden, metrics=[TaskCompletionMetric()])
```

Yeh evaluation CI/CD pipeline mein normal test ki tarah integrate ho jata hai.

---

## PART 5 — EVALS VS OTHER METHODS

```
Method                │ Pro                          │ Con
────────────────────────┼───────────────────────────────┼──────────────────
Automated evals        │ Fast, reproducible, scalable  │ Upfront investment
Production monitoring  │ Real user behavior            │ Reactive, noisy
A/B testing            │ Real outcomes measure hote hain│ Slow, traffic chahiye
User feedback          │ Unexpected problems dikhata   │ Sparse, not automated
Manual transcript review│ Subtle issues catch karta    │ Time-intensive
```

**Best teams inko combine karte hain — koi ek method akela kaafi nahi.**

---

## PART 6 — CHECKLIST

```
✓ 20-50 real-failure-based tasks se start karo
✓ Har task unambiguous ho, reference solution ke saath
✓ Balanced set banao (should-trigger + should-not-trigger)
✓ Transcripts regularly padho, sirf score pe bharosa mat karo
✓ CI/CD mein integrate karo (regression tests)
✓ Eval saturation pe naye harder cases add karo
```

---

## Further Reading / Sources

- [Demystifying Evals for AI Agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Eval Driven Development: What it is, how to do it right — DeepEval](https://deepeval.com/blog/eval-driven-development)
- [Evaluation-Driven Development and Operations of LLM Agents — arXiv](https://arxiv.org/html/2411.13768v3)
- [Top 5 Agent Evaluation Tools in 2026 — MLflow](https://mlflow.org/top-5-agent-evaluation-frameworks/)

---

*Next: `25_DEVELOPER_PORTFOLIO_BRANDING.md` padho — apna kaam sahi tareeke se dikhana*
