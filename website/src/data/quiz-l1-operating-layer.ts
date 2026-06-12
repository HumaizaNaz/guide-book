export interface OperatingLayerQuestion {
  id: number
  chunk: string
  question: string
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
  vocabulary?: { word: string; meaning: string }[]
}

export const OPERATING_LAYER_QUESTIONS: OperatingLayerQuestion[] = [
  {
    id: 1,
    chunk: 'Chunk 1 — Two Deaths + SaaSpocalypse',
    question: 'According to the article, what did NVIDIA\'s RTX Spark announcement on June 1, 2026 signal?',
    options: [
      { label: 'A', text: 'The release of the world\'s fastest gaming GPU' },
      { label: 'B', text: 'The functional end of the personal computer as we\'ve known it for 40 years — a change in who operates the computer' },
      { label: 'C', text: 'The end of cloud computing' },
      { label: 'D', text: 'The death of mobile phones' },
    ],
    correctAnswer: 'B',
    explanation: 'RTX Spark represented a paradigm shift — not faster hardware, but a change in who operates the computer. For 40 years, humans drove machines through apps and manual input. Jensen Huang: "For forty years, you launched apps. Click. Type. With RTX Spark and Microsoft Windows, you ask — and the PC does the work."',
    vocabulary: [
      { word: 'Paradigm shift', meaning: 'A fundamental change in how something works — not just an improvement' },
      { word: 'Operating model', meaning: 'The way humans interact with and use a system' },
    ],
  },
  {
    id: 2,
    chunk: 'Chunk 1 — Two Deaths + SaaSpocalypse',
    question: 'The article describes "two deaths." Which is the BIGGER of the two?',
    options: [
      { label: 'A', text: 'The death of SaaS' },
      { label: 'B', text: 'The death of Apple' },
      { label: 'C', text: 'The death of the PC as a machine humans operate' },
      { label: 'D', text: 'The death of keyboards' },
    ],
    correctAnswer: 'C',
    explanation: 'SaaS dissolving into function calls is a smaller event inside the larger event: the personal computer as a machine humans operate becoming obsolete. "The SaaSpocalypse: Real but smaller event — app dissolving into function call. The Larger Event: Dissolution of personal computer as machine you operate."',
    vocabulary: [
      { word: 'SaaSpocalypse', meaning: 'The end of SaaS as a destination product' },
      { word: 'Obsolescence', meaning: 'Becoming outdated and no longer the standard way of doing things' },
    ],
  },
  {
    id: 3,
    chunk: 'Chunk 1 — Two Deaths + SaaSpocalypse',
    question: 'In the SaaS three-layer model, which layer "becomes the prize" when agents take over?',
    options: [
      { label: 'A', text: 'Workflow UI' },
      { label: 'B', text: 'Set of Capabilities' },
      { label: 'C', text: 'System of Record' },
      { label: 'D', text: 'The pricing model' },
    ],
    correctAnswer: 'C',
    explanation: '"System of record becomes the prize — whoever owns authoritative data holds the surviving position. Agents only perform as well as the data they reason over. SaaS vendors enduring will be those realizing they were databases with UI, and the UI was disposable."',
    vocabulary: [
      { word: 'System of Record', meaning: 'The authoritative database holding real data — customers, invoices, contracts' },
      { word: 'Authoritative data', meaning: 'The single, trusted source of truth for a given type of information' },
    ],
  },
  {
    id: 4,
    chunk: 'Chunk 1 — Two Deaths + SaaSpocalypse',
    question: 'Why does the Workflow UI die FIRST in the SaaSpocalypse?',
    options: [
      { label: 'A', text: 'It is too expensive to maintain' },
      { label: 'B', text: 'Its purpose was enabling human operation — when agents operate instead, screens have no audience' },
      { label: 'C', text: 'Users prefer dark mode' },
      { label: 'D', text: 'APIs are faster than screens' },
    ],
    correctAnswer: 'B',
    explanation: '"Workflow UI dies first — its purpose was enabling human operation; when agents operate instead, screens have no audience. Morning dashboards become agents that report only changed data and decisions needed." The screen had one job: letting humans drive. Remove the human driver and the screen has no purpose.',
    vocabulary: [
      { word: 'Workflow UI', meaning: 'The screens, forms, and buttons humans used to drive software manually' },
      { word: 'Unbundled', meaning: 'Broken apart — the three layers separated and sold or used differently' },
    ],
  },
  {
    id: 5,
    chunk: 'Chunk 2 — Forty-Year Stack + AI Operating Layer',
    question: 'What is the "forty-year prosthetic" the article refers to?',
    options: [
      { label: 'A', text: 'The internet browser' },
      { label: 'B', text: 'The mouse and keyboard' },
      { label: 'C', text: 'The desktop metaphor (graphical shell) — a compensation for computers that couldn\'t understand intent' },
      { label: 'D', text: 'Spreadsheet software' },
    ],
    correctAnswer: 'C',
    explanation: '"Every step represented human compensation for a computer unable to understand intent. The desktop metaphor is a forty-year prosthetic for that incapacity." Remove the incapacity — grant the machine intent-understanding — and the prosthetic becomes unnecessary.',
    vocabulary: [
      { word: 'Prosthetic', meaning: 'A replacement built to compensate for something missing or broken' },
      { word: 'Desktop metaphor', meaning: 'The design of computers as a virtual desk with files and folders' },
    ],
  },
  {
    id: 6,
    chunk: 'Chunk 2 — Forty-Year Stack + AI Operating Layer',
    question: 'What is the key distinction between a chat assistant and a general agent?',
    options: [
      { label: 'A', text: 'Chat is free; agents cost money' },
      { label: 'B', text: 'Chat answers questions (answer-in-place); agents work inside environments and complete tasks (act-in-the-world)' },
      { label: 'C', text: 'Chat uses the internet; agents do not' },
      { label: 'D', text: 'Agents can only work on phones' },
    ],
    correctAnswer: 'B',
    explanation: '"Chat answers questions and keeps users in chat. General agents work inside an environment and complete tasks there. Answer-in-place versus act-in-the-world differentiates assistant from operating layer." This distinction is fundamental to understanding what makes something a true operating layer.',
    vocabulary: [
      { word: 'Answer-in-place', meaning: 'Responding with text while keeping the user in the conversation' },
      { word: 'Act-in-the-world', meaning: 'Working inside a real environment — opening files, running tools, completing tasks' },
    ],
  },
  {
    id: 7,
    chunk: 'Chunk 3 — Two Agent Types',
    question: 'Which of these is a Personal Agent characteristic?',
    options: [
      { label: 'A', text: 'Task-scoped, summoned for a job, dismissed when done' },
      { label: 'B', text: 'Always-on, persistent memory, proactive, oriented toward you across all tasks' },
      { label: 'C', text: 'Only works during business hours' },
      { label: 'D', text: 'Requires a separate subscription per task' },
    ],
    correctAnswer: 'B',
    explanation: 'Personal agents are "always with you; hold your context; plan ahead; act on your behalf across every task. Oriented toward you, not toward single tasks. Private, local, carry persistent memory of work and preferences. Proactive rather than responsive; span all apps and files." Option A describes a General Agent.',
    vocabulary: [
      { word: 'Identic AI', meaning: 'Self-sovereign personal agent you own, not rent — carries your identity' },
      { word: 'Persistent memory', meaning: 'Memory that carries over across sessions — the agent remembers who you are' },
    ],
  },
  {
    id: 8,
    chunk: 'Chunk 3 — Two Agent Types',
    question: 'In the chief-of-staff model, what is the build and runtime relationship between personal and general agents?',
    options: [
      { label: 'A', text: 'General agents manage personal agents at runtime' },
      { label: 'B', text: 'You use general agents (Claude Code) to build your personal agent; at runtime, the personal agent dispatches general agents to do work' },
      { label: 'C', text: 'They work completely independently with no relationship' },
      { label: 'D', text: 'Personal agents only work on mobile devices' },
    ],
    correctAnswer: 'B',
    explanation: '"You build and manage the personal agent using general agents (Claude Code, OpenCode) — configuring memory, permissions, skills with developer-grade tools. At runtime, this reverses: the personal agent, understanding your intent, dispatches general agents and workers." Chief-of-staff relationship: you manage the chief; the chief manages the rest.',
    vocabulary: [
      { word: 'Chief-of-staff', meaning: 'Person who manages operations on behalf of a leader — personal agent plays this role' },
      { word: 'Dispatch', meaning: 'To send out agents to handle specific tasks' },
    ],
  },
  {
    id: 9,
    chunk: 'Chunk 4 — Why This Time Is Different',
    question: 'The OSWorld benchmark measures agent success on real desktop tasks. What makes it a rigorous test?',
    options: [
      { label: 'A', text: 'It measures how fast an AI types' },
      { label: 'B', text: 'It measures token count per response' },
      { label: 'C', text: 'Agents are dropped into real desktops with real applications — no partial credit, task completed or task failed' },
      { label: 'D', text: 'It measures AI image quality' },
    ],
    correctAnswer: 'C',
    explanation: '"OSWorld Benchmark: Drops agents into real desktops with real applications. Awards no partial credit: task completed or task failed." This rigor is why the data is meaningful — agents must actually complete real tasks, not just produce plausible-looking output.',
    vocabulary: [
      { word: 'OSWorld Benchmark', meaning: 'A test that drops agents into real desktops with real applications to measure success' },
      { word: 'Partial credit', meaning: 'Points for incomplete work — OSWorld gives none' },
    ],
  },
  {
    id: 10,
    chunk: 'Chunk 4 — Why This Time Is Different',
    question: 'What was the agent success rate on OSWorld approximately two years before the article was written?',
    options: [
      { label: 'A', text: '72%' },
      { label: 'B', text: '45%' },
      { label: 'C', text: '~12%' },
      { label: 'D', text: '~66%' },
    ],
    correctAnswer: 'C',
    explanation: 'The Stanford 2026 AI Index tracked OSWorld scores: "agent success climbed from ~12% to ~66% in about two years." Starting at ~12% was barely above random. The rapid climb to 66% — approaching human baseline of ~72% — is what makes this different from the Siri decade.',
    vocabulary: [
      { word: 'Baseline', meaning: 'The performance level humans achieve — the benchmark agents are measured against' },
      { word: 'Stanford 2026 AI Index', meaning: 'The annual report tracking AI capability progress across benchmarks' },
    ],
  },
  {
    id: 11,
    chunk: 'Chunk 4 — Why This Time Is Different',
    question: 'By late 2025, what was the OSWorld score and how did it compare to the human baseline?',
    options: [
      { label: 'A', text: '12%; well below human baseline of 50%' },
      { label: 'B', text: '~66% average; first agents crossed the ~72% human baseline (Simular\'s Agent S: 72.6%)' },
      { label: 'C', text: '90%; well above human baseline' },
      { label: 'D', text: '40%; halfway to human baseline' },
    ],
    correctAnswer: 'B',
    explanation: '"Late 2025: first agents crossed the ~72% human baseline. Simular\'s Agent S reported 72.6% in December 2025 (above 72.36% human baseline)." The average was ~66%, meaning many agents already match humans on many tasks even if the average doesn\'t yet reach the baseline.',
    vocabulary: [
      { word: 'Simular\'s Agent S', meaning: 'The first agent to cross the human baseline on OSWorld in December 2025 (72.6%)' },
      { word: 'Caveat', meaning: 'An important qualification — 66% average still means 1 in 3 tasks fails' },
    ],
  },
  {
    id: 12,
    chunk: 'Chunk 4 — Why This Time Is Different',
    question: 'Why does a "cloud-only agentic era" fail to reach its full potential?',
    options: [
      { label: 'A', text: 'Cloud is too expensive to run AI at all' },
      { label: 'B', text: 'Every task metered per token + network latency + privacy/compliance walls = cloud-only stalls at the office door for sensitive work' },
      { label: 'C', text: 'Cloud servers are unreliable' },
      { label: 'D', text: 'Users prefer downloading software over cloud services' },
    ],
    correctAnswer: 'B',
    explanation: '"Suppose agents stayed cloud-bound: every delegated task is metered per token, latency-bound by network round trips, requires shipping files, codebases, client data, medical records off-device for processing. Consumers: privacy non-starter. Regulated enterprises: procurement and compliance wall that won\'t fall." Local compute removes these barriers.',
    vocabulary: [
      { word: 'Latency', meaning: 'Delay between request and response — cloud adds network round-trip time' },
      { word: 'Compliance wall', meaning: 'Regulatory requirements that prevent cloud processing of sensitive data' },
    ],
  },
  {
    id: 13,
    chunk: 'Chunk 4 — Why This Time Is Different',
    question: 'What does RTX Spark\'s ~1 petaflop on-device compute enable that was not possible before?',
    options: [
      { label: 'A', text: 'Prettier window animations and better battery life' },
      { label: 'B', text: 'Faster internet connections' },
      { label: 'C', text: 'Frontier-class models and autonomous agents running locally without cloud round-trips — enabling private, sensitive, high-value work' },
      { label: 'D', text: 'More simultaneous browser tabs' },
    ],
    correctAnswer: 'C',
    explanation: '"RTX Spark: ~1 petaflop on-device AI compute, up to 128GB unified memory. Allows frontier-class models and autonomous agents to run locally without cloud round-trips." This enables agents to handle the sensitive, high-volume work where real value sits — medical records, financial data, client files — without shipping them to a server.',
    vocabulary: [
      { word: 'Petaflop', meaning: 'One quadrillion floating-point operations per second — a measure of computing power' },
      { word: 'Unified memory', meaning: 'Memory shared between CPU and GPU — key for running large AI models on-device' },
    ],
  },
  {
    id: 14,
    chunk: 'Chunk 4 — Why This Time Is Different',
    question: 'What is OpenShell and what does it do?',
    options: [
      { label: 'A', text: 'A new programming language for AI development' },
      { label: 'B', text: 'A new type of web browser' },
      { label: 'C', text: 'NVIDIA\'s runtime that decides what agents may do, routes sensitive work to local models, and obscures personal information before anything leaves the machine' },
      { label: 'D', text: 'A Microsoft cloud service for running agents remotely' },
    ],
    correctAnswer: 'C',
    explanation: '"OpenShell Runtime (NVIDIA): Decides what agents may do. Routes sensitive work to local models. Obscures personal information before anything leaves the machine." OpenShell is the permission and privacy layer — the gatekeeper of what local agents are allowed to do and what data they can touch.',
    vocabulary: [
      { word: 'OpenShell', meaning: 'NVIDIA\'s local agent runtime — manages permissions and data privacy for on-device agents' },
      { word: 'Route', meaning: 'To direct work to the appropriate model or location based on sensitivity' },
    ],
  },
  {
    id: 15,
    chunk: 'Chunk 5 — Honest Objections',
    question: 'Which of these best describes prompt injection risk in agentic systems?',
    options: [
      { label: 'A', text: 'An AI that sends too many messages to the user' },
      { label: 'B', text: 'A software bug that slows down AI responses' },
      { label: 'C', text: 'Hidden instructions buried in content that trick an agent into taking unauthorized actions — no breach needed, just an autonomous actor with too broad a grant' },
      { label: 'D', text: 'A firewall blocking the AI from accessing the internet' },
    ],
    correctAnswer: 'C',
    explanation: 'The article\'s example: agent has standing email access. Counterparty sends long thread with a hidden instruction. Agent reads it as a command and sends a contract amendment agreeing to an unauthorized price change. "No breach, no malware — just autonomous actor with too broad grant and no checkpoint." This is why governed capability matters.',
    vocabulary: [
      { word: 'Prompt injection', meaning: 'A hidden instruction in content that tricks an agent into unauthorized action' },
      { word: 'Standing access', meaning: 'Permanent ongoing permission — dangerous when scope is too broad' },
    ],
  },
  {
    id: 16,
    chunk: 'Chunk 5 — Honest Objections',
    question: 'What is "governed capability" and why is it called the agentic era\'s hardest problem?',
    options: [
      { label: 'A', text: 'Government regulations applied to AI companies' },
      { label: 'B', text: 'Capability that operates within defined permission, auditability, and the ability to say no — harder than capability itself because trust is harder to build than skill' },
      { label: 'C', text: 'Capabilities only available to enterprise customers with special contracts' },
      { label: 'D', text: 'AI features governed by the user\'s stated preferences in a settings file' },
    ],
    correctAnswer: 'B',
    explanation: '"The Game: The whole agentic era\'s hardest problem is not capability but governed capability — permission, auditability, ability to say no." Capability (OSWorld ~66%) has been demonstrated. But capability without governance = autonomous actor with no controls. The platform solving trust, not just FLOPs, wins.',
    vocabulary: [
      { word: 'Governed capability', meaning: 'Capability that operates within rules: permission, auditability, and veto power' },
      { word: 'Auditability', meaning: 'The ability to review and verify every action an agent took' },
    ],
  },
  {
    id: 17,
    chunk: 'Chunk 5 — Honest Objections',
    question: 'The hybrid objection is considered the strongest objection to the thesis. Why?',
    options: [
      { label: 'A', text: 'It correctly argues that nothing will ever change about how we use computers' },
      { label: 'B', text: 'It argues the stable equilibrium is collaboration not full delegation — screen surviving as inspection and approval surface — and this is probably correct for high-stakes work now' },
      { label: 'C', text: 'It proves that SaaS will survive completely unchanged' },
      { label: 'D', text: 'It shows that agents are not yet profitable for any business' },
    ],
    correctAnswer: 'B',
    explanation: '"Most serious counterargument: the durable equilibrium is not full delegation but collaboration — human plus UI plus agent, with screen surviving as inspection, correction, approval place." The article says this objection "has force and is probably correct for now for high-stakes work." It is the strongest because it is likely true in the near term.',
    vocabulary: [
      { word: 'Hybrid equilibrium', meaning: 'A stable state where humans and agents collaborate — screen as review surface' },
      { word: 'High-stakes work', meaning: 'Tasks where being wrong has serious consequences — agents not yet trusted here' },
    ],
  },
  {
    id: 18,
    chunk: 'Chunk 5 — Honest Objections',
    question: 'Even if the hybrid objection is correct, what structural point does it still concede?',
    options: [
      { label: 'A', text: 'The old model is completely safe and the thesis is wrong' },
      { label: 'B', text: 'Even in hybrid, the human moved from operator to reviewer; UI shrunk from workplace to checking surface — a diff view is not a workspace' },
      { label: 'C', text: 'Agents have no practical business uses and are purely theoretical' },
      { label: 'D', text: 'SaaS will recover fully and the per-seat model will persist unchanged' },
    ],
    correctAnswer: 'B',
    explanation: '"This objection has force and is probably correct for now for high-stakes work. But it concedes structural point: Even in hybrid, human moved from operator to reviewer; UI shrunk from workplace to checking surface. A diff view is not a workspace." The hybrid is not a stable alternative — it is the thesis in transitional phase.',
    vocabulary: [
      { word: 'Diff view', meaning: 'A display showing only what changed — reviewing, not working' },
      { word: 'Transitional phase', meaning: 'An intermediate state on the way to the final state — not a permanent outcome' },
    ],
  },
  {
    id: 19,
    chunk: 'Chunk 6 — Governance + Builders',
    question: 'The Klarna case demonstrated AI handling the equivalent of how many full-time agents?',
    options: [
      { label: 'A', text: '70 full-time agents' },
      { label: 'B', text: '200 full-time agents' },
      { label: 'C', text: '~700 full-time agents — 2.3M conversations in the first month, resolution time from 11 min to under 2 min' },
      { label: 'D', text: '7,000 full-time agents' },
    ],
    correctAnswer: 'C',
    explanation: '"Klarna case (February 2024): AI agent handled two-thirds of customer service chats in first month (2.3M conversations), equivalent to ~700 full-time agents, reduced resolution time from 11 minutes to under 2 minutes, projected $40M profit improvement for 2024." This is the article\'s evidence that "scale intelligence rather than headcount" is real, not speculative.',
    vocabulary: [
      { word: 'FTE equivalent', meaning: 'The number of full-time human employees the AI replaced or equaled' },
      { word: 'Resolution time', meaning: 'How long it takes to solve a customer\'s problem from first contact' },
    ],
  },
  {
    id: 20,
    chunk: 'Chunk 6 — Governance + Builders',
    question: 'What is the "new moat" for builders in the agentic era?',
    options: [
      { label: 'A', text: 'Beautiful UI design and sticky destination products with high daily active users' },
      { label: 'B', text: 'Being the layer agents live in, the capability agents must call, or the governance layer agents must obey' },
      { label: 'C', text: 'The fastest server infrastructure and lowest latency cloud provider' },
      { label: 'D', text: 'Having the most social media followers and brand recognition' },
    ],
    correctAnswer: 'B',
    explanation: '"Old moat: Beautiful UI, sticky destination. Agent has no eyes for your interface. New moat: Being layer agent lives in / Being capability agent must call / Being governance layer agent must obey." The article states: "The firm learning to manufacture and orchestrate agents will out-produce the firm merely buying more seats of old software."',
    vocabulary: [
      { word: 'Moat', meaning: 'A competitive advantage that is hard for others to copy or overcome' },
      { word: 'Governance layer', meaning: 'The system of permissions, memory, and auditability that agents must comply with' },
    ],
  },
]

export const OPERATING_LAYER_CHUNK_LABELS = [
  'Chunk 1 — Two Deaths + SaaSpocalypse',
  'Chunk 2 — Forty-Year Stack + AI Operating Layer',
  'Chunk 3 — Two Agent Types',
  'Chunk 4 — Why This Time Is Different',
  'Chunk 5 — Honest Objections',
  'Chunk 6 — Governance + Builders',
]
