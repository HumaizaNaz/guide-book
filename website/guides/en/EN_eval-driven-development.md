# Eval-Driven Development for AI Agents
*Making your AI worker trustworthy and measurable*

---

## What Is Eval-Driven Development (EDD)

Just like Test-Driven Development (TDD) has you write tests before code, EDD has you write **evals** (evaluations) before building an agent — success criteria that tell you whether the agent is doing the right thing.

**Without evals:** the agent "feels" like it's doing well, but regressions creep silently into production.

**With evals:** you know after every change whether things actually got better or worse.

---

## PART 1 — WHY IT'S NECESSARY

Early prototyping works fine without evals. But once an agent scales in production, everything starts breaking down without them:

```
✗ Can't tell real regressions from noise
✗ Can't automatically test changes against hundreds of scenarios
✗ Can't measure improvements
✗ Takes weeks to compare when a new model comes out
  (for teams with evals, this takes only a day)
```

---

## PART 2 — TYPES OF EVALS

```
Unit tests        — evaluate specific components of the agent
                     (e.g., a retrieval step's precision/recall,
                     tool selection accuracy separately)

Regression tests  — end-to-end evaluations on a curated dataset,
                     run every time you change the prompt/model/
                     architecture — so performance doesn't degrade
```

---

## PART 3 — ROADMAP FROM ZERO TO EVALS

### Step 0: Start Early
Think you need hundreds of tasks? No — **20-50 simple tasks** drawn from real failures are enough. Early in development, every change has a clear impact, so a small sample size still works.

### Step 1: Start With What You Already Check Manually
The behaviors you verify before every release. If you're in production, look at the bug tracker and support queue — convert user-reported failures into test cases.

### Step 2: Write Unambiguous Tasks (With Reference Solutions)
A good task is one where **two domain experts would independently reach the same pass/fail verdict**. If you can't pass the task yourself, refine it. Build a reference solution for each task — this proves the task is solvable.

### Step 3: Build Balanced Problem Sets
Test both cases — when a behavior **should** happen and when it **shouldn't**. Testing only one side makes the agent optimize one-sidedly.

### Step 6: Read the Transcripts
You won't know if your graders are working well until you read the transcripts and grades yourself. When a task fails, the transcript tells you whether the agent made a mistake or the grader rejected a valid solution.

### Step 7: Watch for Eval Saturation
An eval at 100% only catches regressions, it doesn't signal improvement. Once the agent passes all solvable tasks, you need new, harder evals.

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

This evaluation integrates into a CI/CD pipeline just like a normal test.

---

## PART 5 — EVALS VS OTHER METHODS

```
Method                │ Pro                          │ Con
────────────────────────┼───────────────────────────────┼──────────────────
Automated evals        │ Fast, reproducible, scalable  │ Upfront investment
Production monitoring  │ Real user behavior            │ Reactive, noisy
A/B testing            │ Measures real outcomes         │ Slow, needs traffic
User feedback          │ Surfaces unexpected problems   │ Sparse, not automated
Manual transcript review│ Catches subtle issues         │ Time-intensive
```

**The best teams combine these — no single method is enough on its own.**

---

## PART 6 — CHECKLIST

```
✓ Start with 20-50 real-failure-based tasks
✓ Every task is unambiguous, with a reference solution
✓ Build a balanced set (should-trigger + should-not-trigger)
✓ Read transcripts regularly, don't just trust the score
✓ Integrate into CI/CD (regression tests)
✓ Add new, harder cases at eval saturation
```

---

## Further Reading / Sources

- [Demystifying Evals for AI Agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Eval Driven Development: What it is, how to do it right — DeepEval](https://deepeval.com/blog/eval-driven-development)
- [Evaluation-Driven Development and Operations of LLM Agents — arXiv](https://arxiv.org/html/2411.13768v3)
- [Top 5 Agent Evaluation Tools in 2026 — MLflow](https://mlflow.org/top-5-agent-evaluation-frameworks/)

---

*Next: read `25_DEVELOPER_PORTFOLIO_BRANDING.md` — showcasing your work the right way*
