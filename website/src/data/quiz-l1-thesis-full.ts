export interface QuizQuestion {
  id: number
  chunk: string
  question: string
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
  vocabulary?: { word: string; meaning: string }[]
}

export const FULL_VERSION_QUIZ: QuizQuestion[] = [

  // ENGINE COMPARISON — Q1–Q8
  {
    id: 1,
    chunk: 'Engine Comparison',
    question: 'MediCorp needs an AI worker to process patient records — a mission-critical task that absolutely cannot fail silently. Which engine should they choose and why?',
    options: [
      { label: 'A', text: 'OpenClaw-native — lightweight and fast to deploy' },
      { label: 'B', text: 'Cursor SDK — built for parallel agents' },
      { label: 'C', text: 'Dapr Agents — durable execution, auto-recovery, full observability. Best for "can\'t fail" workloads' },
      { label: 'D', text: 'Claude Managed Agents — fully hosted by Anthropic' },
    ],
    correctAnswer: 'C',
    explanation: 'The Engine Selection Framework says: "Can\'t fail" → Dapr Agents (wrapping an SDK). Dapr provides durable execution through workflow checkpointing — every step is saved, and if the system crashes, it resumes from the last saved point rather than starting over. This makes it the correct choice for mission-critical work.',
    vocabulary: [
      { word: 'Dapr Agents', meaning: 'Durable distributed agent engine — Apache 2.0, no vendor lock-in, uses Kubernetes' },
      { word: 'Durability', meaning: 'The ability to complete work even after failures — completed steps are never lost' },
      { word: 'Workflow checkpointing', meaning: 'Dapr\'s method of saving state after each step so execution can resume after a crash' },
    ],
  },
  {
    id: 2,
    chunk: 'Engine Comparison',
    question: 'A startup wants to build AI workers but their team has no infrastructure expertise — they do not want to manage servers, Kubernetes clusters, or anything operational. Which engine fits best?',
    options: [
      { label: 'A', text: 'Dapr Agents — runs on your Kubernetes cluster' },
      { label: 'B', text: 'OpenAI Agents SDK — self-hosted, production-grade' },
      { label: 'C', text: 'Claude Managed Agents — fully hosted and operated by Anthropic, zero infrastructure to manage' },
      { label: 'D', text: 'Cursor SDK — requires cloud VM setup' },
    ],
    correctAnswer: 'C',
    explanation: 'Claude Managed Agents is the "shouldn\'t fail, don\'t want to operate" choice. The compute plane is Anthropic-hosted — you do not manage servers, Kubernetes, or runtime infrastructure. The tradeoff is total vendor lock-in (harness + runtime + model all from Anthropic).',
    vocabulary: [
      { word: 'Claude Managed Agents', meaning: 'Fully managed runtime hosted by Anthropic — no infrastructure to operate yourself' },
      { word: 'Vendor lock-in', meaning: 'Dependence on one vendor that makes switching costly' },
      { word: 'Total lock-in', meaning: 'When harness, runtime, and model are all from the same provider' },
    ],
  },
  {
    id: 3,
    chunk: 'Engine Comparison',
    question: 'TechCorp wants reliable AI workers but also wants the freedom to switch AI providers in the future — no lock-in. Which engine has the LEAST vendor lock-in?',
    options: [
      { label: 'A', text: 'OpenAI Agents SDK — HIGH lock-in, tuned to OpenAI models' },
      { label: 'B', text: 'Claude Managed Agents — TOTAL lock-in, everything from Anthropic' },
      { label: 'C', text: 'Cursor SDK — HIGH lock-in at harness level' },
      { label: 'D', text: 'Dapr Agents — NONE. Apache 2.0 open source, CNCF standard, runs on your own Kubernetes' },
    ],
    correctAnswer: 'D',
    explanation: 'Dapr Agents has zero vendor lock-in. It is Apache 2.0 licensed (open source), part of the CNCF (Cloud Native Computing Foundation), and runs on your own Kubernetes cluster. You are not tied to any single provider. This makes it the choice for teams that need reliability AND portability.',
    vocabulary: [
      { word: 'Apache 2.0', meaning: 'An open-source license — free to use, modify, and distribute' },
      { word: 'CNCF', meaning: 'Cloud Native Computing Foundation — open-source standards body for cloud infrastructure' },
      { word: 'Kubernetes', meaning: 'Open-source container orchestration system for running distributed workloads' },
    ],
  },
  {
    id: 4,
    chunk: 'Engine Comparison',
    question: 'Cursor the company runs AI coding agents that work in parallel on cloud computers — 35% of their product changes are made by these agents. Which engine is purpose-built for exactly this use case?',
    options: [
      { label: 'A', text: 'Dapr Agents — designed for distributed workflows' },
      { label: 'B', text: 'Claude Managed Agents — fully hosted' },
      { label: 'C', text: 'Cursor SDK — purpose-built for parallel cloud coding agents, proven at Cursor scale' },
      { label: 'D', text: 'OpenClaw-native — lightweight and fast' },
    ],
    correctAnswer: 'C',
    explanation: 'Cursor SDK is the "engineering fleet, parallel cloud agents" choice. It is purpose-built for parallel coding agents, supports subagents and artifact handoff between agents, and uses Cloud VM persistence per task. It is model-agnostic at the underlying level despite high harness lock-in.',
    vocabulary: [
      { word: 'Cursor SDK', meaning: 'Engine purpose-built for parallel cloud coding agents — TypeScript-based' },
      { word: 'Model-agnostic', meaning: 'Works with different AI models — not tied to one specific model' },
      { word: 'Artifact handoff', meaning: 'Passing the output of one agent as input to another' },
    ],
  },
  {
    id: 5,
    chunk: 'Engine Comparison',
    question: 'A company is reviewing four engines. Their CTO says: "We should just pick the best one and use it for all workers." What is fundamentally wrong with this approach?',
    options: [
      { label: 'A', text: 'Nothing wrong — one engine is simpler to manage' },
      { label: 'B', text: 'These are not competing products — they are different architectural theories. A serious Agent Factory deploys all four for different workers, as Invariant 4 requires' },
      { label: 'C', text: 'The CTO should pick the cheapest one' },
      { label: 'D', text: 'Engines do not matter — any engine works for any task' },
    ],
    correctAnswer: 'B',
    explanation: '"These are not competing products but different architectural theories about where the agent ends and infrastructure begins." Each engine excels at different job profiles. Invariant 4 (each worker picks its own engine) exists precisely because different jobs need different reliability/cost trade-offs. A monoculture of one engine creates shared vulnerability.',
    vocabulary: [
      { word: 'Architectural theory', meaning: 'A philosophy about how a system should be structured' },
      { word: 'Monoculture', meaning: 'Using a single engine for all workers — creates shared vulnerability' },
    ],
  },
  {
    id: 6,
    chunk: 'Engine Comparison',
    question: 'FinanceAI needs workers for two tasks: (1) Monthly financial close — zero tolerance for failure. (2) Formatting emails — minor inconvenience if it fails. Which engines should they use respectively?',
    options: [
      { label: 'A', text: 'Cursor SDK for both — it is the most advanced' },
      { label: 'B', text: 'Claude Managed for both — simplest to operate' },
      { label: 'C', text: '(1) Dapr Agents — "can\'t fail" workload. (2) OpenClaw-native — "nice if it works" routine task' },
      { label: 'D', text: 'Same engine for both — consistency is important' },
    ],
    correctAnswer: 'C',
    explanation: 'Engine selection follows job profile, not company-wide uniformity. Financial close = "can\'t fail" → Dapr Agents (durable, auto-recovery). Email formatting = "nice if it works" routine task → OpenClaw-native (lightweight, fast deployment). This is Invariant 4 applied correctly.',
    vocabulary: [
      { word: 'Job profile', meaning: 'The characteristics of a specific task — failure tolerance, complexity, frequency' },
      { word: 'OpenClaw-native', meaning: 'Lightweight engine for routine tasks — fast deployment, integrated with delegate system' },
    ],
  },
  {
    id: 7,
    chunk: 'Engine Comparison',
    question: 'An engineer says: "OpenAI Agents SDK has HIGH vendor lock-in — we should avoid it." Is this the correct way to evaluate the engine?',
    options: [
      { label: 'A', text: 'Yes — high lock-in is always bad, avoid it' },
      { label: 'B', text: 'No — lock-in is one dimension among many. OpenAI SDK is production-grade, self-hosted, and vendor-flexible at the compute plane. It is the right choice when you need reliability + portability but are OK operating it yourself' },
      { label: 'C', text: 'Yes — Dapr is always the best choice' },
      { label: 'D', text: 'Lock-in does not matter for AI engines' },
    ],
    correctAnswer: 'B',
    explanation: 'Engine selection requires evaluating TWO axes: failure tolerance AND infrastructure ownership preference. OpenAI Agents SDK is the "shouldn\'t fail, want portability" choice — it is self-hosted and integrates with 7 compute partners (E2B, Cloudflare, Daytona, Modal, etc.). High harness lock-in does not mean it is the wrong choice for its target use case.',
    vocabulary: [
      { word: 'Compute partner', meaning: 'External compute providers that an engine can integrate with for sandboxed execution' },
      { word: 'Self-hosted', meaning: 'You run and operate the engine on your own infrastructure' },
    ],
  },
  {
    id: 8,
    chunk: 'Engine Comparison',
    question: 'GlobalCorp already has a mature Kubernetes infrastructure and strong DevOps team. They need AI workers with zero vendor lock-in and full control. Which engine is their natural fit?',
    options: [
      { label: 'A', text: 'Claude Managed Agents — fully managed, easiest to set up' },
      { label: 'B', text: 'Cursor SDK — purpose-built for coding agents' },
      { label: 'C', text: 'Dapr Agents — runs on your own Kubernetes cluster, Apache 2.0, no lock-in, full control' },
      { label: 'D', text: 'OpenClaw-native — lightweight, fast' },
    ],
    correctAnswer: 'C',
    explanation: 'Dapr Agents is designed for teams that already have Kubernetes infrastructure. It runs on your cluster (full control), uses Apache 2.0 license (no lock-in), and leverages CNCF standards. For a team with strong Kubernetes expertise, this is the natural choice.',
    vocabulary: [
      { word: 'DevOps', meaning: 'Development + Operations — team that builds and runs infrastructure' },
      { word: 'Kubernetes cluster', meaning: 'A set of machines running containerized workloads, managed by Kubernetes' },
    ],
  },

  // HARNESS VS COMPUTE — Q9–Q13
  {
    id: 9,
    chunk: 'Harness vs Compute',
    question: 'An AI worker is processing a customer order. It needs to: (1) Call the OpenAI API using a secret API key. (2) Run model-generated code to calculate the order total. Where should each happen — harness or compute plane?',
    options: [
      { label: 'A', text: 'Both in the harness — it is safer' },
      { label: 'B', text: 'Both in the compute plane — it is faster' },
      { label: 'C', text: '(1) API key call → harness (credentials live here, safe). (2) Model-generated code → compute/sandbox (untrusted code runs here, isolated)' },
      { label: 'D', text: 'The split does not matter — it is the same result' },
    ],
    correctAnswer: 'C',
    explanation: 'The harness/compute split is a security architecture. Credentials (API keys, tokens) always live in the harness (control plane) — safe and trusted. Untrusted model-generated code runs in the compute sandbox — isolated from credentials. This prevents compromised code from accessing secrets.',
    vocabulary: [
      { word: 'Harness (Control Plane)', meaning: 'Manages agent logic, credentials, model calls, tool routing — trusted zone' },
      { word: 'Compute plane', meaning: 'Sandboxed execution environment for model-generated code — untrusted zone' },
      { word: 'Sandbox', meaning: 'An isolated environment where untrusted code runs safely, separated from credentials' },
    ],
  },
  {
    id: 10,
    chunk: 'Harness vs Compute',
    question: 'TechCorp is running Claude Managed Agents. They want to switch their compute execution environment from E2B to Cloudflare Workers without changing their agent logic. Is this possible?',
    options: [
      { label: 'A', text: 'No — switching compute requires full agent rewrite' },
      { label: 'B', text: 'Yes — the compute plane can be swapped independently of the harness. Agent logic stays the same; only the execution environment changes' },
      { label: 'C', text: 'Only possible with Dapr Agents' },
      { label: 'D', text: 'The harness and compute are always fused — cannot be separated' },
    ],
    correctAnswer: 'B',
    explanation: 'The harness/compute split enables compute plane swapping without agent rewriting. OpenAI Agents SDK integrates with E2B, Cloudflare, Daytona, Modal, Runloop, Vercel, and Blaxel as compute options — all without changing the agent logic in the harness. This is the architectural advantage of separating the two planes.',
    vocabulary: [
      { word: 'E2B', meaning: 'A compute sandbox provider that integrates with AI agent engines' },
      { word: 'Cloudflare Workers', meaning: 'Edge compute platform — another option for the compute/execution plane' },
      { word: 'Compute plane swap', meaning: 'Changing the execution environment without rewriting the agent' },
    ],
  },
  {
    id: 11,
    chunk: 'Harness vs Compute',
    question: 'Which of the following correctly identifies what the HARNESS handles vs what the COMPUTE plane handles?',
    options: [
      { label: 'A', text: 'Harness: runs model-generated code. Compute: manages API keys and approvals' },
      { label: 'B', text: 'Harness: agent loop, model calls, tool routing, approvals, tracing, recovery, credentials. Compute: sandboxed execution of model-directed code' },
      { label: 'C', text: 'Both handle the same things — the split is just organizational' },
      { label: 'D', text: 'Harness: database connections. Compute: UI rendering' },
    ],
    correctAnswer: 'B',
    explanation: 'Harness (Control Plane) = agent loop + model calls + tool routing + approvals + tracing + recovery + CREDENTIALS (trusted zone). Compute Plane = sandboxed environment where model-generated code executes (untrusted zone). The split ensures credentials are never exposed to potentially compromised model-generated code.',
    vocabulary: [
      { word: 'Agent loop', meaning: 'The cycle of: receive task → think → act → observe → repeat' },
      { word: 'Tool routing', meaning: 'Deciding which tool to call for which action' },
      { word: 'Tracing', meaning: 'Recording every step of agent execution for debugging and auditing' },
    ],
  },
  {
    id: 12,
    chunk: 'Harness vs Compute',
    question: 'Claude Managed Agents "fuses" the harness and compute planes. OpenAI Agents SDK "separates" them. What is the practical difference for a company choosing between them?',
    options: [
      { label: 'A', text: 'No practical difference — both work the same way' },
      { label: 'B', text: 'Fused (Claude Managed): simpler setup, less flexibility, Anthropic manages both. Separated (OpenAI SDK): can swap compute providers (E2B, Cloudflare, Modal, etc.) without changing agent logic' },
      { label: 'C', text: 'Separated is always better' },
      { label: 'D', text: 'Fused means more vendor lock-in but also more compute options' },
    ],
    correctAnswer: 'B',
    explanation: 'Claude Managed Agents fuses both planes — Anthropic hosts and manages everything (simpler but total lock-in). OpenAI SDK separates them — the harness stays the same while you swap compute backends between 7 partner options. The separation gives flexibility at the cost of operational complexity.',
    vocabulary: [
      { word: 'Fused', meaning: 'Harness and compute combined into one system — provider manages both' },
      { word: 'Separated', meaning: 'Harness and compute are distinct — compute can be swapped independently' },
    ],
  },
  {
    id: 13,
    chunk: 'Harness vs Compute',
    question: 'A security auditor asks: "In your AI system, where are the API keys stored, and where does the model-generated code run?" What is the correct answer for a properly designed Agent Factory?',
    options: [
      { label: 'A', text: 'Both are in the same place — the compute sandbox' },
      { label: 'B', text: 'API keys in the database; code runs in the harness' },
      { label: 'C', text: 'API keys live in the harness (trusted control plane); model-generated code runs in the compute sandbox (isolated, untrusted zone) — they are always separated' },
      { label: 'D', text: 'API keys are encrypted and stored in the compute plane alongside the code' },
    ],
    correctAnswer: 'C',
    explanation: 'Security by design: credentials (API keys, tokens) always live in the harness — the trusted control plane. Model-generated code — which could potentially be compromised — runs in the compute sandbox, isolated from credentials. This architectural separation prevents a malicious or buggy model output from accessing sensitive secrets.',
    vocabulary: [
      { word: 'Credential', meaning: 'Authentication information — API keys, tokens, passwords used to access systems' },
      { word: 'Isolated', meaning: 'Separated and contained — cannot access things outside its boundary' },
    ],
  },

  // TRIGGER ORTHOGONALITY — Q14–Q17
  {
    id: 14,
    chunk: 'Trigger Orthogonality',
    question: 'ShopEase is switching their AI workers from Dapr Agents to Claude Managed Agents. Their trigger system uses Inngest for all events. Do they need to reconfigure Inngest?',
    options: [
      { label: 'A', text: 'Yes — switching engines requires rewiring all triggers' },
      { label: 'B', text: 'No — triggers (Inngest) and engines are orthogonal (independent). Changing the engine does not require rewiring the trigger system' },
      { label: 'C', text: 'Partially — some triggers need updating' },
      { label: 'D', text: 'Inngest only works with Dapr Agents' },
    ],
    correctAnswer: 'B',
    explanation: 'Trigger systems and engines are orthogonal — they are independent of each other. Inngest fires workers from schedules, webhooks, or inbound API calls regardless of which engine the worker runs on. Switching engines does not require rewiring Inngest. This is "trigger and sandbox orthogonality."',
    vocabulary: [
      { word: 'Orthogonal', meaning: 'Independent — changing one does not affect the other' },
      { word: 'Trigger system', meaning: 'The infrastructure that decides WHEN to start a worker' },
    ],
  },
  {
    id: 15,
    chunk: 'Trigger Orthogonality',
    question: 'A company has: Inngest triggering workers for general business tasks. Claude Code Routines triggering coding agents. They want to add a new type of trigger for IoT device events. Which system should handle it?',
    options: [
      { label: 'A', text: 'Claude Code Routines — it handles all new triggers' },
      { label: 'B', text: 'A new system is needed for IoT' },
      { label: 'C', text: 'Inngest — it handles general workforce events including external triggers like webhooks and API calls. IoT events can be sent as webhooks to Inngest' },
      { label: 'D', text: 'The engine handles triggers directly' },
    ],
    correctAnswer: 'C',
    explanation: 'Inngest fronts the general workforce and handles external triggers (schedules, webhooks, inbound API calls). IoT events can be forwarded to Inngest as webhooks. Claude Code Routines is specialized for coding-agent events only. The two coexist without conflict.',
    vocabulary: [
      { word: 'IoT', meaning: 'Internet of Things — physical devices that send data over the internet' },
      { word: 'Webhook', meaning: 'An automated HTTP notification sent when an event occurs' },
      { word: 'Coexist', meaning: 'Work alongside each other without conflict' },
    ],
  },
  {
    id: 16,
    chunk: 'Trigger Orthogonality',
    question: 'What is the correct relationship between Inngest and Claude Code Routines in an Agent Factory?',
    options: [
      { label: 'A', text: 'They are competitors — use one or the other' },
      { label: 'B', text: 'Claude Code Routines replaces Inngest for all tasks' },
      { label: 'C', text: 'Both coexist: Inngest fronts the general workforce (all workers), Claude Code Routines fronts the coding agents (specialist coding tasks). Each handles its domain without conflict' },
      { label: 'D', text: 'Inngest is the backup when Claude Code Routines fails' },
    ],
    correctAnswer: 'C',
    explanation: '"Both coexist: Inngest fronts the workforce; Routines fronts the coding agent." They serve different but complementary purposes. Inngest handles general workforce events — schedules, webhooks, handoffs. Claude Code Routines handles coding-specific triggers — when code-related events occur.',
    vocabulary: [
      { word: 'Inngest', meaning: '2026 reference implementation — general workforce event system' },
      { word: 'Claude Code Routines', meaning: 'Specialist trigger system specifically for coding agent automation' },
    ],
  },
  {
    id: 17,
    chunk: 'Trigger Orthogonality',
    question: 'TechCorp changes their compute sandbox from Modal to Vercel (without changing their engine). Do they need to update their Inngest configuration?',
    options: [
      { label: 'A', text: 'Yes — Inngest is tightly coupled to the compute sandbox' },
      { label: 'B', text: 'No — triggers (Inngest) and compute sandboxes are orthogonal. Swapping compute does not require updating triggers' },
      { label: 'C', text: 'Only if they are using webhooks' },
      { label: 'D', text: 'Inngest does not support Vercel' },
    ],
    correctAnswer: 'B',
    explanation: 'The thesis states: "Any engine\'s compute plane swaps between E2B, Cloudflare, Daytona, Modal, or Kubernetes without agent modification" and triggers fire workers "without rewiring." Triggers, engines, and compute sandboxes are all orthogonal to each other — a three-way independence.',
    vocabulary: [
      { word: 'Compute sandbox', meaning: 'The isolated environment where code executes — E2B, Cloudflare, Modal, Vercel, etc.' },
      { word: 'Tightly coupled', meaning: 'Two systems that depend heavily on each other — changing one forces changes in the other' },
    ],
  },

  // ECONOMIC ACTORS — Q18–Q22
  {
    id: 18,
    chunk: 'Agents as Economic Actors',
    question: 'An AI worker is assigned the goal: "Reduce customer churn by 15%." It autonomously identifies that it needs customer behavior data. According to the Agent Factory design, what should happen next?',
    options: [
      { label: 'A', text: 'The AI stops and waits for a human to purchase the data' },
      { label: 'B', text: 'The AI worker purchases the data independently within the human-set budget and permission envelope — no per-transaction approval needed' },
      { label: 'C', text: 'The AI uses hallucinated data instead' },
      { label: 'D', text: 'The AI sends an email to the procurement team' },
    ],
    correctAnswer: 'B',
    explanation: 'In the Agent Factory model, AI agents are economic actors. They can autonomously purchase compute, negotiate API contracts, and provision services within human-established budgets and permission envelopes. The human sets the budget and rules upfront — the AI acts within those boundaries without per-transaction approval.',
    vocabulary: [
      { word: 'Economic actor', meaning: 'An entity capable of independently making and executing financial decisions' },
      { word: 'Permission envelope', meaning: 'The defined set of actions an AI is authorized to take autonomously' },
      { word: 'Procurement', meaning: 'The process of acquiring goods or services' },
    ],
  },
  {
    id: 19,
    chunk: 'Agents as Economic Actors',
    question: 'A company\'s AI worker made a $50,000 purchase of cloud computing resources to train a model. The CEO had not been informed. How should a properly designed Agent Factory have prevented this?',
    options: [
      { label: 'A', text: 'AI workers should not be able to spend money at all' },
      { label: 'B', text: 'A budget cap should have been set — a hard spending limit enforced by the management layer. The Trust Layer (mandate enforcement + audit trail) would have flagged this' },
      { label: 'C', text: 'The CEO should have been monitoring the AI 24/7' },
      { label: 'D', text: 'AI workers can spend whatever is needed for the goal' },
    ],
    correctAnswer: 'B',
    explanation: 'The Trust Layer has three components: Mandate enforcement (staying within rules), Audit trails (complete transaction records), and Liability (clear accountability). A budget cap set in the management layer would have prevented overspending. "Design agents and infrastructure for economic participation from inception — agents require budgets, not just permissions."',
    vocabulary: [
      { word: 'Budget cap', meaning: 'A hard spending limit that cannot be exceeded — enforced by the management layer' },
      { word: 'Trust layer', meaning: 'The system ensuring AI economic actors stay within authorized limits' },
      { word: 'Mandate enforcement', meaning: 'Technical mechanisms ensuring agents follow their established rules' },
    ],
  },
  {
    id: 20,
    chunk: 'Agents as Economic Actors',
    question: 'A CTO says: "We should give our AI workers API keys and permissions so they can access what they need." What is fundamentally missing from this approach according to the Full Version thesis?',
    options: [
      { label: 'A', text: 'Nothing — API keys and permissions are sufficient' },
      { label: 'B', text: 'Budgets and outcome contracts. "Agents require budgets (not just permissions) and outcome contracts (not just API keys)." Economic actors need financial constraints, not just access rights' },
      { label: 'C', text: 'More permissions are needed' },
      { label: 'D', text: 'API keys should be replaced with passwords' },
    ],
    correctAnswer: 'B',
    explanation: '"Design agents and infrastructure for economic participation from inception. Agents require budgets (not just permissions) and outcome contracts (not just API keys)." This is the key builder insight: access rights (permissions/API keys) control what an agent CAN do; budgets and outcome contracts control WHAT IT COSTS and WHAT IT MUST DELIVER.',
    vocabulary: [
      { word: 'API key', meaning: 'A credential that gives access to an API — controls what you can access' },
      { word: 'Budget', meaning: 'A spending limit — controls how much an agent can spend' },
      { word: 'Outcome contract', meaning: 'An agreement specifying what result must be delivered and at what cost' },
    ],
  },
  {
    id: 21,
    chunk: 'Agents as Economic Actors',
    question: 'The thesis describes companies becoming "self-provisioning systems." What does this mean in practice?',
    options: [
      { label: 'A', text: 'Companies build their own servers and infrastructure' },
      { label: 'B', text: 'AI workers dynamically discover and acquire their own resources (compute, data, services) in real time — optimizing for task completion, cost, speed, and quality simultaneously' },
      { label: 'C', text: 'Companies provision resources for their human employees automatically' },
      { label: 'D', text: 'AI workers replace the procurement department entirely' },
    ],
    correctAnswer: 'B',
    explanation: '"AI-Native Companies transition from consuming human-allocated resources to dynamically sourcing them. Compute, data, and specialist services become real-time-discovered inputs, transforming companies into self-provisioning systems optimizing simultaneously for task completion, cost, speed, and quality."',
    vocabulary: [
      { word: 'Self-provisioning', meaning: 'A system that finds and acquires its own needed resources dynamically' },
      { word: 'Dynamically', meaning: 'In real time — changing as conditions change, not pre-planned' },
    ],
  },
  {
    id: 22,
    chunk: 'Agents as Economic Actors',
    question: 'Which THREE components form the "Trust Layer" for AI economic actors?',
    options: [
      { label: 'A', text: 'Budget, API keys, and permissions' },
      { label: 'B', text: 'Mandate enforcement, audit trails, and liability' },
      { label: 'C', text: 'Specs, skills, and feedback loops' },
      { label: 'D', text: 'Harness, compute, and triggers' },
    ],
    correctAnswer: 'B',
    explanation: 'The Trust Layer has exactly three components: (1) Mandate enforcement — ensuring agents respect established rules and stay within limits. (2) Audit trails — complete records of every decision and transaction. (3) Liability — determining legal responsibility when outcomes fail. These address the real challenge: not capability, but trust.',
    vocabulary: [
      { word: 'Liability', meaning: 'Legal responsibility — who is legally accountable when something goes wrong' },
      { word: 'Audit trail', meaning: 'A chronological record of all decisions and transactions — inspectable and replayable' },
    ],
  },

  // DURABILITY METHODS — Q23–Q25
  {
    id: 23,
    chunk: 'Engine Durability Methods',
    question: 'MediCorp uses Dapr Agents. Their 10-step medical record processing workflow crashes at step 7. What happens when the system recovers?',
    options: [
      { label: 'A', text: 'The entire workflow starts over from step 1' },
      { label: 'B', text: 'The workflow resumes from step 7 — Dapr Workflow checkpointing saved the state of all completed steps (1-6), so only step 7 onwards needs to run again' },
      { label: 'C', text: 'Steps 1-7 all run again to ensure consistency' },
      { label: 'D', text: 'The workflow is abandoned and a human must restart it' },
    ],
    correctAnswer: 'B',
    explanation: 'Dapr Agents uses Dapr Workflow checkpointing — saving state after each completed step. When a crash occurs, the system resumes from the last successful checkpoint (step 6), running only step 7 onwards. This achieves ~99.7% success rate even with multi-step workflows.',
    vocabulary: [
      { word: 'Dapr Workflow checkpointing', meaning: 'Dapr\'s durability method — saves state at each step, resumes from last checkpoint after crash' },
      { word: 'Checkpoint', meaning: 'A saved state that allows resuming from a specific point after failure' },
    ],
  },
  {
    id: 24,
    chunk: 'Engine Durability Methods',
    question: 'A team compares durability across the four engines. Which statement correctly matches each engine to its durability method?',
    options: [
      { label: 'A', text: 'All engines use the same checkpoint method' },
      { label: 'B', text: 'Dapr = workflow checkpointing | Claude Managed = server-side session persistence | OpenAI SDK = stateful workflows | Cursor SDK = cloud VM persistence per task' },
      { label: 'C', text: 'Only Dapr supports durability — others have no crash recovery' },
      { label: 'D', text: 'Claude Managed = workflow checkpointing | Dapr = VM persistence | OpenAI = server-side sessions' },
    ],
    correctAnswer: 'B',
    explanation: 'Each engine has its own durability approach: Dapr Agents = Dapr Workflow checkpointing. Claude Managed Agents = server-side session persistence (Anthropic manages it). OpenAI Agents SDK = stateful workflows (built-in state management). Cursor SDK = Cloud VM persistence per task (each task gets its own VM). All four achieve durability through different architectural approaches.',
    vocabulary: [
      { word: 'Server-side persistence', meaning: 'The provider\'s servers save state — you do not manage the durability infrastructure' },
      { word: 'Stateful workflow', meaning: 'A workflow that maintains state between steps, enabling recovery' },
      { word: 'VM persistence', meaning: 'Each task runs in its own virtual machine that persists the task state' },
    ],
  },
  {
    id: 25,
    chunk: 'Engine Durability Methods',
    question: 'The thesis states: "Engines are increasingly absorbing durability natively." What does this mean for how you choose an engine?',
    options: [
      { label: 'A', text: 'You no longer need to think about durability — all engines handle it automatically' },
      { label: 'B', text: 'Durability is now available in all four major engines — the choice of engine determines HOW durability is achieved (checkpointing, sessions, stateful workflows, VM persistence), not WHETHER it is available' },
      { label: 'C', text: 'Only Dapr has native durability — others need external tools' },
      { label: 'D', text: 'You should always add durability manually, never rely on the engine' },
    ],
    correctAnswer: 'B',
    explanation: '"Engines increasingly absorb durability natively: Dapr through workflow checkpointing, Claude Managed Agents through server-side sessions, OpenAI SDK through stateful workflows, Cursor SDK through cloud-VM persistence per task." The question is no longer "does this engine support durability?" but "how does this engine implement durability and does that approach fit my needs?"',
    vocabulary: [
      { word: 'Natively', meaning: 'Built into the engine itself — not requiring external add-ons' },
      { word: 'Absorbing', meaning: 'Taking on a capability as a core built-in feature' },
    ],
  },
]

export const FULL_VERSION_CHUNK_LABELS = [
  'Engine Comparison',
  'Harness vs Compute',
  'Trigger Orthogonality',
  'Agents as Economic Actors',
  'Engine Durability Methods',
]
