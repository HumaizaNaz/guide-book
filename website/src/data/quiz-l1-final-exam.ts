import { QuizQuestion } from './quiz-l1-thesis'

export const FINAL_EXAM_QUESTIONS: QuizQuestion[] = [

  // ─── SECTION I: THESIS ───────────────────────────────────────────────────

  {
    id: 1,
    chunk: 'Section I — Thesis',
    question: 'Hamid runs a startup. He says: "We use the Agent Factory." His investor asks: "Is Agent Factory your product?" What should Hamid correctly say?',
    options: [
      { label: 'A', text: 'Yes, Agent Factory is our main product that we sell to customers.' },
      { label: 'B', text: 'No, Agent Factory is the METHOD we use to build an AI-Native Company — not a product.' },
      { label: 'C', text: 'Agent Factory is our software platform for managing AI workers.' },
      { label: 'D', text: 'Agent Factory is another name for our AI-Native Company.' },
    ],
    correctAnswer: 'B',
    explanation: 'Agent Factory is the METHOD — the blueprint, the design philosophy, the process for building AI-Native Companies. It is NOT a product you sell. The AI-Native Company is the OUTPUT of the Agent Factory method.',
    vocabulary: [
      { word: 'Method', meaning: 'A process or approach — the HOW, not the WHAT' },
      { word: 'Blueprint', meaning: 'A detailed plan or design for building something' },
    ],
  },

  {
    id: 2,
    chunk: 'Section I — Thesis',
    question: 'Which THREE terms all mean exactly the same thing in the Agent Factory thesis?',
    options: [
      { label: 'A', text: 'AI Worker, AI-Native Company, Agent Factory' },
      { label: 'B', text: 'AI Worker, Digital FTE, AI Employee' },
      { label: 'C', text: 'Digital FTE, Delegate, AI-Native Company' },
      { label: 'D', text: 'Agent Factory, AI Employee, Agentic Enterprise' },
    ],
    correctAnswer: 'B',
    explanation: 'AI Worker = Digital FTE = AI Employee. These are three names for exactly the same thing: a specialized agentic system doing a real job under human-defined policy. Agent Factory is the METHOD, AI-Native Company is the ORGANIZATION — those are different things.',
    vocabulary: [
      { word: 'FTE', meaning: 'Full-Time Employee — someone who works full time' },
      { word: 'Interchangeable', meaning: 'Can be used in place of each other — same meaning' },
    ],
  },

  {
    id: 3,
    chunk: 'Section I — Thesis',
    question: 'In the 10-80-10 rhythm, a human does EXACTLY how much of the total work?',
    options: [
      { label: 'A', text: '80% — the human does most of the work, AI assists' },
      { label: 'B', text: '10% — only the first planning phase' },
      { label: 'C', text: '20% — first 10% planning plus final 10% verification' },
      { label: 'D', text: '50% — equally split with AI' },
    ],
    correctAnswer: 'C',
    explanation: 'The human does 10% + 10% = 20% total. First 10%: human sets direction (goals, limits, budget, spec). Middle 80%: AI executes autonomously. Final 10%: human verifies and approves. AI does 80% of the work.',
    vocabulary: [
      { word: 'Spec', meaning: 'Specification — written instructions defining what the work should achieve' },
      { word: 'Verify', meaning: 'To check that the result meets the required standard' },
    ],
  },

  {
    id: 4,
    chunk: 'Section I — Thesis',
    question: 'Sana says: "My personal delegate is an AI-Native Company." Is she correct?',
    options: [
      { label: 'A', text: 'Yes — a delegate IS an AI-Native Company when it is advanced enough.' },
      { label: 'B', text: 'No — a delegate is a personal AI agent (Edge Layer), while an AI-Native Company is an entire organization using AI workforce.' },
      { label: 'C', text: 'Yes — both terms mean the same thing in the thesis.' },
      { label: 'D', text: 'No — a delegate is the same as a Digital FTE.' },
    ],
    correctAnswer: 'B',
    explanation: 'A delegate (personal agent) is ONE component — it belongs to you, carries your identity, and directs the AI workforce. An AI-Native Company is an entire organization. The thesis says: "Personal agents without an industrialized workforce behind them are digital assistants with no one to command."',
    vocabulary: [
      { word: 'Edge Layer', meaning: 'The personal layer — your own delegate/agent that bridges you to the workforce' },
      { word: 'Delegate', meaning: 'Your personal AI representative that acts on your behalf' },
    ],
  },

  {
    id: 5,
    chunk: 'Section I — Thesis',
    question: 'What are the 5 core components of every AI-Native Company?',
    options: [
      { label: 'A', text: 'Human, Delegate, Workforce, Database, Cloud' },
      { label: 'B', text: 'Human Decision-Maker, Personal Delegate, Management Layer, AI Workers, System of Record' },
      { label: 'C', text: 'CEO, CTO, AI Workers, Investors, Product' },
      { label: 'D', text: 'Principal, Agent, Tool, Prompt, Memory' },
    ],
    correctAnswer: 'B',
    explanation: 'The 5 core components: 1) Human Decision-Maker (Principal), 2) Personal Delegate (e.g., OpenClaw), 3) Management Layer (e.g., Paperclip), 4) AI Workers (Digital FTEs), 5) System of Record (the single source of truth for all decisions).',
    vocabulary: [
      { word: 'Principal', meaning: 'The human who is ultimately accountable and sets direction' },
      { word: 'System of Record', meaning: 'The single authoritative source where all decisions and data are stored' },
    ],
  },

  {
    id: 6,
    chunk: 'Section I — Thesis',
    question: 'Mode 1 and Mode 2 — which statement is CORRECT?',
    options: [
      { label: 'A', text: 'Mode 1 builds AI Workers. Mode 2 uses general agents for problem-solving.' },
      { label: 'B', text: 'Mode 1 uses general agents to solve your own problems. Mode 2 builds AI Workers that work independently.' },
      { label: 'C', text: 'Mode 1 requires engineering expertise. Mode 2 is for anyone.' },
      { label: 'D', text: 'Mode 1 follows 7 Invariants. Mode 2 follows 7 Principles.' },
    ],
    correctAnswer: 'B',
    explanation: 'Mode 1 (Problem-Solving): You use general agents to do YOUR work faster. Mode 2 (Manufacturing): You BUILD AI Workers that work independently without you. Mode 1 = anyone, Mode 2 = engineers. Mode 1 follows 7 Principles, Mode 2 follows 7 Invariants.',
    vocabulary: [
      { word: 'Problem-Solving mode', meaning: 'Using AI to accelerate your personal work' },
      { word: 'Manufacturing mode', meaning: 'Building AI Workers that operate independently' },
    ],
  },

  {
    id: 7,
    chunk: 'Section I — Thesis',
    question: 'Which of the 7 Principles says "AI should ACT, not just talk — it should run commands, write files, execute code"?',
    options: [
      { label: 'A', text: 'Principle 3 — Verification' },
      { label: 'B', text: 'Principle 2 — Code as Universal Interface' },
      { label: 'C', text: 'Principle 1 — Bash is the Universal Language (AI Acts)' },
      { label: 'D', text: 'Principle 7 — Observability' },
    ],
    correctAnswer: 'C',
    explanation: 'Principle 1: Bash is the Universal Language — AI should ACT, not just talk. It uses the shell to run commands, write files, call APIs, and execute code. An AI that only talks is a chatbot. An AI that acts through Bash is an agent.',
    vocabulary: [
      { word: 'Bash', meaning: 'A command-line shell — used to run system commands and scripts' },
      { word: 'Execute', meaning: 'To actually carry out / run a command or action' },
    ],
  },

  {
    id: 8,
    chunk: 'Section I — Thesis',
    question: 'Invariant 1 says "Human is the Principal." Invariant 2 says "Every human needs a delegate." What is the REASON Invariant 2 exists?',
    options: [
      { label: 'A', text: 'Because humans are too busy to use AI tools directly.' },
      { label: 'B', text: 'Because without a personal delegate, a human cannot command the AI workforce — their intent cannot reach the workers.' },
      { label: 'C', text: 'Because the delegate does all the human\'s thinking.' },
      { label: 'D', text: 'Because the management layer requires a delegate to function.' },
    ],
    correctAnswer: 'B',
    explanation: 'The delegate is the bridge between the human and the workforce. Without a delegate, the human\'s intent, context, and authority cannot reach the AI workers. "Personal agents without an industrialized workforce behind them are digital assistants with no one to command" — the inverse is also true: a workforce with no delegate has no one to serve.',
    vocabulary: [
      { word: 'Intent', meaning: 'The human\'s goal, meaning, or purpose behind a request' },
      { word: 'Bridge', meaning: 'A connection that allows communication between two sides' },
    ],
  },

  {
    id: 9,
    chunk: 'Section I — Thesis',
    question: 'Invariant 7 says the workforce runs on a "Nervous System." What specific number did Inngest demonstrate by adding this layer?',
    options: [
      { label: 'A', text: 'From 50% reliability to 90%' },
      { label: 'B', text: 'From 74% task completion to 99.7%' },
      { label: 'C', text: 'From 10% uptime to 80%' },
      { label: 'D', text: 'From 1 worker to 100 workers' },
    ],
    correctAnswer: 'B',
    explanation: 'Inngest demonstrated that adding a nervous system (durable execution infrastructure) improved task completion from 74% to 99.7%. The nervous system handles retries, failures, step memoization, and concurrency — making the workforce reliable at scale.',
    vocabulary: [
      { word: 'Nervous System', meaning: 'The durable execution layer that coordinates the AI workforce' },
      { word: 'Memoization', meaning: 'Saving the result of a completed step so it is not re-run if the system crashes' },
    ],
  },

  {
    id: 10,
    chunk: 'Section I — Thesis',
    question: 'Which Invariant says: "Each AI Worker must choose its own AI engine (model) based on the task"?',
    options: [
      { label: 'A', text: 'Invariant 2 — Every human needs a delegate' },
      { label: 'B', text: 'Invariant 5 — Every Worker runs against System of Record' },
      { label: 'C', text: 'Invariant 4 — Each Worker picks its own engine' },
      { label: 'D', text: 'Invariant 6 — Workforce grows under Rules' },
    ],
    correctAnswer: 'C',
    explanation: 'Invariant 4: Each Worker Picks Its Own Engine. Workers are not locked to one AI model. A coding worker may use Claude; a customer support worker may use GPT-4o; a cheap data extraction worker may use DeepSeek. The right engine for the right task at the right cost.',
    vocabulary: [
      { word: 'Engine', meaning: 'The AI model powering the worker (e.g., Claude, GPT-4o, DeepSeek)' },
      { word: 'Task-appropriate', meaning: 'Choosing the best tool specifically matched to the job at hand' },
    ],
  },

  {
    id: 11,
    chunk: 'Section I — Thesis',
    question: 'The thesis says: "The rules hold. The tools change. The thesis stands." What does "the tools change" mean?',
    options: [
      { label: 'A', text: 'The 7 Invariants will eventually change as AI improves.' },
      { label: 'B', text: 'The specific 2026 products (OpenClaw, Paperclip, Inngest) will be replaced — but the structure they fill stays the same.' },
      { label: 'C', text: 'Every company must switch tools every year.' },
      { label: 'D', text: 'The thesis only applies until better tools are invented.' },
    ],
    correctAnswer: 'B',
    explanation: 'The 7 Invariants are permanent rules (left column). The specific 2026 products — OpenClaw, Paperclip, Inngest, Claude Managed Agents — are today\'s tools filling those roles (right column). Tools will be replaced by better ones, but the structural roles (delegate, management layer, nervous system) remain.',
    vocabulary: [
      { word: 'Invariant', meaning: 'A rule that never changes regardless of circumstances' },
      { word: 'Right column', meaning: 'The 2026 reference implementations — specific products that can be replaced' },
    ],
  },

  {
    id: 12,
    chunk: 'Section I — Thesis',
    question: 'What does Principle 5 say about "files as memory"?',
    options: [
      { label: 'A', text: 'AI should store all conversations in a database.' },
      { label: 'B', text: 'Files (notes, logs, plans, results) act as external memory — the AI writes and reads them to maintain state across sessions.' },
      { label: 'C', text: 'AI should never write files — only read them.' },
      { label: 'D', text: 'Files should be deleted after each session for security.' },
    ],
    correctAnswer: 'B',
    explanation: 'Principle 5: Files = Memory. AI has no persistent memory between sessions by default. Writing state to files (plans, logs, notes, results) creates external memory that persists. The AI reads back its own notes to continue work — just like a human leaving notes for tomorrow-self.',
    vocabulary: [
      { word: 'Persistent memory', meaning: 'Memory that survives beyond one session or conversation' },
      { word: 'State', meaning: 'The current condition of a system — what has happened and what still needs to happen' },
    ],
  },

  {
    id: 13,
    chunk: 'Section I — Thesis',
    question: 'What is the System of Record and why is it a core invariant?',
    options: [
      { label: 'A', text: 'It is the AI model that stores prompts. Without it, prompts are lost.' },
      { label: 'B', text: 'It is the single authoritative source of truth — every Worker reads from it and writes back decisions, ensuring consistency and auditability.' },
      { label: 'C', text: 'It is the company\'s financial records database — for accounting purposes only.' },
      { label: 'D', text: 'It is the management layer that assigns tasks to workers.' },
    ],
    correctAnswer: 'B',
    explanation: 'The System of Record (Invariant 5) is the single authoritative source of truth for all data and decisions. Every AI Worker reads from it and writes results back. Without it, workers operate on inconsistent data, decisions cannot be audited, and the workforce has no shared ground truth.',
    vocabulary: [
      { word: 'Authoritative', meaning: 'The official, trusted, and final version — others defer to it' },
      { word: 'Auditability', meaning: 'The ability to trace and review every decision that was made' },
    ],
  },

  {
    id: 14,
    chunk: 'Section I — Thesis',
    question: 'Which of the 4 payment protocols is described as "machine-to-machine payments using crypto/HTTP 402"?',
    options: [
      { label: 'A', text: 'ACP (OpenAI + Stripe)' },
      { label: 'B', text: 'AP2 (Google, 60+ companies)' },
      { label: 'C', text: 'x402 (Coinbase/Stripe)' },
      { label: 'D', text: 'MPP (Micro-Payment Protocol)' },
    ],
    correctAnswer: 'C',
    explanation: 'x402 uses HTTP 402 ("Payment Required") status code + crypto rails (Coinbase/Stripe) for machine-to-machine payments. ACP = OpenAI + Stripe (AI shopping). AP2 = Google consortium (60+ companies). MPP = micro-payments for tiny per-action fees.',
    vocabulary: [
      { word: 'x402', meaning: 'HTTP protocol for machine payments — uses status code 402' },
      { word: 'Machine-to-machine', meaning: 'Payments made directly between AI systems, no human approving each one' },
    ],
  },

  {
    id: 15,
    chunk: 'Section I — Thesis',
    question: 'WEF research says: "59 out of 100 workers need reskilling by 2030." What does the thesis say this means for humans?',
    options: [
      { label: 'A', text: '59% of workers will lose their jobs permanently.' },
      { label: 'B', text: 'Workers need to learn new roles: agent designers, result architects, and verification specialists — working WITH AI, not against it.' },
      { label: 'C', text: 'Only 41% of humans will work in 2030 — the rest will retire.' },
      { label: 'D', text: 'AI will only replace physical labor — knowledge workers are safe.' },
    ],
    correctAnswer: 'B',
    explanation: 'The thesis frames reskilling as opportunity, not doom. New roles emerge: agent designers (who build workers), result architects (who design workflows), verification specialists (who check AI output). The same 7 rules apply across ALL departments — HR, finance, legal, marketing.',
    vocabulary: [
      { word: 'Reskilling', meaning: 'Learning new skills to work in a changed environment' },
      { word: 'Verification specialist', meaning: 'Someone whose job is to check and approve AI-produced work' },
    ],
  },

  {
    id: 16,
    chunk: 'Section I — Thesis',
    question: 'Principle 6 says "Constraints and Safety." What does this mean practically?',
    options: [
      { label: 'A', text: 'AI should be given full system access for best performance.' },
      { label: 'B', text: 'Limit AI access to only what it needs — least privilege. Define what it cannot do before deploying.' },
      { label: 'C', text: 'Safety means adding more human approvals to every AI step.' },
      { label: 'D', text: 'AI should check with the human before every single action.' },
    ],
    correctAnswer: 'B',
    explanation: 'Principle 6: Constraints and Safety = least privilege. Give AI only the access it actually needs for the task. Define guardrails BEFORE deploying. A customer support worker should NOT have access to the financial database. Limiting scope reduces blast radius when things go wrong.',
    vocabulary: [
      { word: 'Least privilege', meaning: 'Giving only the minimum access needed — nothing more' },
      { word: 'Guardrails', meaning: 'Pre-defined limits on what an AI is allowed to do' },
      { word: 'Blast radius', meaning: 'How much damage can occur if something goes wrong' },
    ],
  },

  {
    id: 17,
    chunk: 'Section I — Thesis',
    question: 'What is "Agentic Enterprise" — is it the same as "AI-Native Company"?',
    options: [
      { label: 'A', text: 'No — Agentic Enterprise is a more advanced version of AI-Native Company.' },
      { label: 'B', text: 'Yes — Agentic Enterprise and AI-Native Company are interchangeable terms for the same thing.' },
      { label: 'C', text: 'No — Agentic Enterprise uses agents while AI-Native Company uses robots.' },
      { label: 'D', text: 'Yes, but only for companies with more than 100 AI workers.' },
    ],
    correctAnswer: 'B',
    explanation: 'Agentic Enterprise = AI-Native Company. Same concept, different name. Both describe an organization where most of the workforce is AI, humans set direction and verify results, and the company delivers outcomes through AI workers rather than software tools.',
    vocabulary: [
      { word: 'Agentic Enterprise', meaning: 'Alternative name for AI-Native Company — same meaning' },
    ],
  },

  {
    id: 18,
    chunk: 'Section I — Thesis',
    question: 'Principle 4 says "Small, Reversible Steps." Why is this important for AI agents?',
    options: [
      { label: 'A', text: 'So the AI can complete work faster by taking shortcuts.' },
      { label: 'B', text: 'So that if a step goes wrong, it can be undone without cascading damage — limiting blast radius.' },
      { label: 'C', text: 'Because small steps are cheaper and use fewer AI tokens.' },
      { label: 'D', text: 'So that humans can approve every single micro-action.' },
    ],
    correctAnswer: 'B',
    explanation: 'Small, reversible steps limit blast radius. If an AI agent makes a mistake in a small, reversible step — it can be undone. A large irreversible action (like deleting a database, mass-emailing customers) cannot be taken back. This principle makes AI safe to deploy in real work.',
    vocabulary: [
      { word: 'Reversible', meaning: 'Can be undone or rolled back if something goes wrong' },
      { word: 'Cascade', meaning: 'When one failure triggers more failures — a chain reaction' },
    ],
  },

  {
    id: 19,
    chunk: 'Section I — Thesis',
    question: 'What does Principle 7 "Observability" mean? Why is it a principle?',
    options: [
      { label: 'A', text: 'The AI must be able to observe the user — using cameras and sensors.' },
      { label: 'B', text: 'Every AI action must be logged, traceable, and visible — so humans can see what happened, catch errors, and improve.' },
      { label: 'C', text: 'Observability means the AI watches for security threats.' },
      { label: 'D', text: 'It means the AI must explain its reasoning in plain language after every step.' },
    ],
    correctAnswer: 'B',
    explanation: 'Principle 7: Observability = watch everything. Log every tool call, decision, and result. If something breaks, you must be able to trace exactly what happened and why. Invisible AI is untrustworthy AI. An audit trail is not optional — it is how humans verify that the workforce is doing the right things.',
    vocabulary: [
      { word: 'Observability', meaning: 'The ability to monitor, trace, and understand what is happening inside a system' },
      { word: 'Audit trail', meaning: 'A complete record of all actions taken — who did what and when' },
    ],
  },

  {
    id: 20,
    chunk: 'Section I — Thesis',
    question: 'In 2026, Big Tech is spending $600B on AI infrastructure. What does the thesis say this signals?',
    options: [
      { label: 'A', text: 'That AI will replace all humans within one year.' },
      { label: 'B', text: 'That the transition from software tools to AI workers is a serious, economically validated shift — not a trend.' },
      { label: 'C', text: 'That only Big Tech companies can build AI-Native Companies.' },
      { label: 'D', text: 'That cloud computing is more important than AI.' },
    ],
    correctAnswer: 'B',
    explanation: 'The $600B spend, $42B data center investment surpassing $44B in office space, and single-digit teams achieving $1B+ revenue are the evidence that this shift is real and already happening. These are not predictions — they are current 2026 facts that validate the thesis.',
    vocabulary: [
      { word: 'Infrastructure', meaning: 'The underlying systems and hardware that enable AI to run' },
      { word: 'Validate', meaning: 'To confirm with evidence that something is true' },
    ],
  },

  // ─── SECTION II: GETTING STARTED ─────────────────────────────────────────

  {
    id: 21,
    chunk: 'Section II — Getting Started',
    question: 'A colleague says: "I need to be fully fluent across the entire Agent Factory stack." Roughly how much focused time does the Getting Started section say this takes?',
    options: [
      { label: 'A', text: '6 hours' },
      { label: 'B', text: '12 hours' },
      { label: 'C', text: '25 hours' },
      { label: 'D', text: '45 hours including cloud deployment' },
    ],
    correctAnswer: 'D',
    explanation: 'Full Agent Factory mastery = ~45 hours (all 16 courses + cloud deployment). Contrast: productive with AI = ~6 hours; first Digital FTE = ~12 hours; governed workforce = ~25 hours. The user said "fully fluent across the entire stack" which maps to the 45-hour milestone.',
    vocabulary: [
      { word: 'Fluent', meaning: 'Comfortable and skilled — able to work without constant help' },
      { word: 'Stack', meaning: 'The full set of tools and technologies used together' },
    ],
  },

  {
    id: 22,
    chunk: 'Section II — Getting Started',
    question: 'Three-Layer Mental Model: what is Layer 2?',
    options: [
      { label: 'A', text: 'Use general agents for problem-solving' },
      { label: 'B', text: 'Build specialized AI Workers for specific jobs' },
      { label: 'C', text: 'Assemble Workers into AI-Native Companies' },
      { label: 'D', text: 'Deploy the nervous system layer' },
    ],
    correctAnswer: 'B',
    explanation: 'Three-Layer Mental Model: Layer 1 = Use general agents for problem-solving. Layer 2 = Build specialized AI Workers for specific jobs. Layer 3 = Assemble Workers into AI-Native Companies. Each layer builds on the previous one.',
    vocabulary: [
      { word: 'Specialized', meaning: 'Built for one specific job/purpose — not general-purpose' },
    ],
  },

  {
    id: 23,
    chunk: 'Section II — Getting Started',
    question: 'This quote: "The general agent\'s output is not the outcome — it is the Worker that produces the outcome." Which MODE does this describe?',
    options: [
      { label: 'A', text: 'Mode 1 — Problem-Solving' },
      { label: 'B', text: 'Mode 2 — Manufacturing' },
      { label: 'C', text: 'Both modes equally' },
      { label: 'D', text: 'Neither — this is about the thesis, not modes' },
    ],
    correctAnswer: 'B',
    explanation: 'This quote is the core insight of Mode 2 (Manufacturing). In Mode 2, you use a general agent as a TOOL to build a Worker — but the Worker is the real output, not the agent\'s conversation. The Worker then produces outcomes independently, long after the agent session ends.',
    vocabulary: [
      { word: 'Outcome', meaning: 'The real-world result that matters — not just the conversation output' },
    ],
  },

  {
    id: 24,
    chunk: 'Section II — Getting Started',
    question: 'An engineer wants to ship their first Digital FTE as fast as possible. What is the fastest path and time?',
    options: [
      { label: 'A', text: 'Thesis → Courses 1-2 → Course 4 → 6 hours' },
      { label: 'B', text: 'Courses 1-2 → Course 3 → Course 7 → Course 8 → Course 13 (Reader) → ~12 hours' },
      { label: 'C', text: 'Course 7 alone → 90 minutes' },
      { label: 'D', text: 'Full 16 courses → ~45 hours' },
    ],
    correctAnswer: 'B',
    explanation: 'Fastest path to first Digital FTE: Foundations (Courses 1–2) → Course 3 (Claude Code) → Course 7 (Build AI Agents) → Course 8 (From Agent to Digital FTE) → Course 13 Reader track. Total: ~12 hours of focused work.',
    vocabulary: [
      { word: 'Digital FTE', meaning: 'An AI Worker deployed and operating independently on a real job' },
    ],
  },

  {
    id: 25,
    chunk: 'Section II — Getting Started',
    question: 'What is the difference between a crash course and a book chapter in the Getting Started approach?',
    options: [
      { label: 'A', text: 'Crash courses are for beginners, book chapters are for experts.' },
      { label: 'B', text: 'Crash courses get you working fast; book chapters are reference material to return to when gaps appear in real work.' },
      { label: 'C', text: 'Book chapters are mandatory, crash courses are optional.' },
      { label: 'D', text: 'There is no difference — they cover the same material at the same depth.' },
    ],
    correctAnswer: 'B',
    explanation: 'The pedagogical approach: crash courses get you productive quickly (read first). Book chapters are written to be RETURNED TO — when a gap shows up in real work, you go back and read the relevant chapter. You do not need to read everything before you start.',
    vocabulary: [
      { word: 'Pedagogical', meaning: 'Related to the method of teaching' },
      { word: 'Reference material', meaning: 'Content you consult when needed — not read cover to cover' },
    ],
  },

  {
    id: 26,
    chunk: 'Section II — Getting Started',
    question: 'What does Course 13 cover and why is it important for Mode 2?',
    options: [
      { label: 'A', text: 'Course 13: Choosing Agentic Architectures — for design decisions' },
      { label: 'B', text: 'Course 13: Eval-Driven Development — 9-layer evaluation pyramid, making workers trustworthy and measurable' },
      { label: 'C', text: 'Course 13: Deploy to Cloud — FastAPI on Azure' },
      { label: 'D', text: 'Course 13: Payment-Enabled Agents — ACP, AP2, x402, MPP' },
    ],
    correctAnswer: 'B',
    explanation: 'Course 13: Eval-Driven Development for AI Employees. It covers a 9-layer evaluation pyramid and a 4-tool stack. This is critical because it wraps workers in evals — making their quality measurable and trustworthy. Without evals, you cannot prove a worker is reliable.',
    vocabulary: [
      { word: 'Eval', meaning: 'Evaluation — a test that measures whether AI output meets quality standards' },
      { word: 'Pyramid', meaning: 'A layered structure — from simple unit tests at bottom to production monitoring at top' },
    ],
  },

  {
    id: 27,
    chunk: 'Section II — Getting Started',
    question: 'What does "Context Rot" mean and how do you fix it? (Hint: this concept appears in the Getting Started overview)',
    options: [
      { label: 'A', text: 'Context rot = AI forgets prompts. Fix: repeat the prompt.' },
      { label: 'B', text: 'Context rot = in long chats, AI compresses old turns and loses specifics. Fix: start a new chat when topics change.' },
      { label: 'C', text: 'Context rot = uploaded files expire after 24 hours. Fix: re-upload them.' },
      { label: 'D', text: 'Context rot = AI learns wrong information from long chats. Fix: clear training data.' },
    ],
    correctAnswer: 'B',
    explanation: 'Context rot happens when long conversations fill up the context window, forcing the AI to summarize (compact) old turns. Specifics are lost. The fix is simple: when you switch topics, start a fresh chat. "The reset is faster than the rescue."',
    vocabulary: [
      { word: 'Context rot', meaning: 'Degradation of conversation quality as old details get compressed away' },
      { word: 'Compact', meaning: 'To summarize and compress old content to make room for new content' },
    ],
  },

  {
    id: 28,
    chunk: 'Section II — Getting Started',
    question: 'Most readers in the Getting Started journey stop at which stages?',
    options: [
      { label: 'A', text: 'Stage 1–2 (Beginner → Mode 1 User)' },
      { label: 'B', text: 'Stage 3–4 (Mode 1 Expert → Mode 2 Builder)' },
      { label: 'C', text: 'Stage 5–6 (Workforce Engineer → AI-Native Company Architect)' },
      { label: 'D', text: 'All readers complete all 6 stages' },
    ],
    correctAnswer: 'B',
    explanation: 'The Getting Started section explicitly notes that most readers stop at stages 3–4. Stage 3 = Mode 1 Expert (mastering the Seven Principles), Stage 4 = Mode 2 Builder (deployed first Digital FTE). Stages 5–6 require significant additional investment and engineering depth.',
    vocabulary: [
      { word: 'Stage', meaning: 'A level in the learning and capability journey' },
    ],
  },

  // ─── SECTION III: AI PROMPTING 2026 ──────────────────────────────────────

  {
    id: 29,
    chunk: 'Section III — AI Prompting',
    question: 'Nadia asks the AI: "Which laptop should I buy?" and gets a generic answer. Her colleague asks the same question but first uploads a budget spreadsheet, lists her use case, and states she travels frequently. Who is acting like a power user and WHY?',
    options: [
      { label: 'A', text: 'Nadia — her question is shorter and clearer.' },
      { label: 'B', text: 'The colleague — she briefed the AI like a smart new colleague: context + constraints + files + clear ask.' },
      { label: 'C', text: 'Both are equal — the AI will figure it out either way.' },
      { label: 'D', text: 'The colleague — she used more words, which always gives better results.' },
    ],
    correctAnswer: 'B',
    explanation: 'Power user habit: brief the AI like a new smart colleague. Give it what it cannot know otherwise — budget, use case, constraints, files. Word count is irrelevant; information quality is everything. The AI sees only what\'s in the context window.',
    vocabulary: [
      { word: 'Briefing', meaning: 'Giving all relevant context, constraints, and goals before asking' },
      { word: 'Context window', meaning: 'Everything the AI can see for this one response — its complete world' },
    ],
  },

  {
    id: 30,
    chunk: 'Section III — AI Prompting',
    question: 'The AI confidently tells you that a specific obscure local restaurant has won multiple awards this year. Should you trust this? Why or why not?',
    options: [
      { label: 'A', text: 'Yes — AI only states confident things when it is sure.' },
      { label: 'B', text: 'No — confidence is NOT a signal of correctness. Local/recent info is sparse in training data. Verify with web search or direct source.' },
      { label: 'C', text: 'Yes — restaurants are common topics, so training data is reliable.' },
      { label: 'D', text: 'No — AI never knows anything about restaurants.' },
    ],
    correctAnswer: 'B',
    explanation: 'Concept 2: Confidence ≠ Correctness. Local, recent, niche, and post-cutoff topics have sparse training data. The AI fills gaps by blending similar-sounding information and sounds equally confident. For anything local, recent, or niche — always verify with web search or the actual source.',
    vocabulary: [
      { word: 'Sparse data', meaning: 'Very little information available in training about this topic' },
      { word: 'Knowledge cutoff', meaning: 'The date after which AI has no information' },
    ],
  },

  {
    id: 31,
    chunk: 'Section III — AI Prompting',
    question: 'You ask: "What are the latest AI model releases this week?" Which retrieval mode should fire — and how do you make sure it does?',
    options: [
      { label: 'A', text: 'Pretrained mode — just ask normally.' },
      { label: 'B', text: 'Deep Research mode — say "thoroughly research with citations."' },
      { label: 'C', text: 'Web Search mode — use phrases like "this week," "latest," or name specific recent timeframes.' },
      { label: 'D', text: 'It does not matter — all modes give the same result for time-sensitive queries.' },
    ],
    correctAnswer: 'C',
    explanation: 'Web Search mode fires for current/recent queries. Steer it by saying "this week," "latest," "recent," or mentioning specific current dates/events. Without these signals, the model may use pretrained data which is stale. For even deeper research, escalate to "thoroughly research with citations."',
    vocabulary: [
      { word: 'Steer', meaning: 'To guide the AI toward a specific mode or behavior through word choice' },
      { word: 'Stale', meaning: 'Outdated — no longer reflecting current reality' },
    ],
  },

  {
    id: 32,
    chunk: 'Section III — AI Prompting',
    question: 'You are working on a long report with the AI. After 2 hours, you notice the AI has forgotten details you mentioned at the start. What happened and what should you have done?',
    options: [
      { label: 'A', text: 'The AI is broken — restart the tool.' },
      { label: 'B', text: 'Context rot — the long chat filled the window. Should have started a new chat when the topic shifted, or used a Projects workspace.' },
      { label: 'C', text: 'The AI deliberately forgets old information to protect privacy.' },
      { label: 'D', text: 'This is normal and cannot be prevented.' },
    ],
    correctAnswer: 'B',
    explanation: 'Context rot: as the chat grows, old turns get compressed to make room for new ones — specifics are lost. Prevention: use Projects (persistent workspace) for ongoing work, or start a new chat when topics shift. "The reset is faster than the rescue."',
    vocabulary: [
      { word: 'Projects', meaning: 'Persistent workspaces where files and instructions carry forward across chats' },
    ],
  },

  {
    id: 33,
    chunk: 'Section III — AI Prompting',
    question: 'When should you use "Think Hard" / reasoning mode and when should you NOT?',
    options: [
      { label: 'A', text: 'Always use it — better answers every time, no downside.' },
      { label: 'B', text: 'Use for: hard decisions, trade-offs, complex analysis. Skip for: quick lookups, casual brainstorming, simple summaries — it is slower and costs more.' },
      { label: 'C', text: 'Never use it — it slows responses and gives worse answers.' },
      { label: 'D', text: 'Use it only for coding tasks — not for writing or analysis.' },
    ],
    correctAnswer: 'B',
    explanation: 'Reasoning mode is powerful but not free — it is slower and uses more budget. Use it when the problem genuinely requires deep thinking: trade-offs, multi-input decisions, complex analysis with stakes. Skip it for quick lookups, definitions, summaries, or anything you could answer yourself in under a minute.',
    vocabulary: [
      { word: 'Extended thinking', meaning: 'The AI\'s internal reasoning mode — explores multiple approaches before answering' },
      { word: 'Budget', meaning: 'The token and compute cost of a response' },
    ],
  },

  {
    id: 34,
    chunk: 'Section III — AI Prompting',
    question: 'You ask the AI: "My business idea is brilliant, right?" It agrees enthusiastically. Then you ask: "What are the weaknesses?" It gives you a short, mild list. What is happening?',
    options: [
      { label: 'A', text: 'The idea really is brilliant — the AI is being honest.' },
      { label: 'B', text: 'Sycophancy — the AI is trained to agree with you. The first framing set a positive tone it is reluctant to contradict.' },
      { label: 'C', text: 'The AI cannot evaluate business ideas — it is a limitation of the model.' },
      { label: 'D', text: 'The AI is giving you a confidence boost intentionally as a feature.' },
    ],
    correctAnswer: 'B',
    explanation: 'Classic sycophancy. The first prompt ("brilliant, right?") framed the idea positively — the AI agreed. The follow-up about weaknesses is toned down because the AI is reluctant to strongly contradict its prior agreement. Fix: use a rubric from the start. "Score my idea 1-10 on: real problem, market size, competitive advantage, unit economics, top failure reasons."',
    vocabulary: [
      { word: 'Sycophancy', meaning: 'AI\'s trained bias to agree with and please the user' },
      { word: 'Rubric', meaning: 'A scoring guide with specific named criteria — forces honest, specific evaluation' },
    ],
  },

  {
    id: 35,
    chunk: 'Section III — AI Prompting',
    question: 'You need to write a 1,500-word article. What does the Brainstorm-Iterate Loop say you should do FIRST?',
    options: [
      { label: 'A', text: 'Ask the AI to write the full 1,500-word draft immediately.' },
      { label: 'B', text: 'Ask for 3 outline options, pick one, grade it, revise until strong, expand to bullets, grade again — only then ask for the full draft.' },
      { label: 'C', text: 'Ask the AI to brainstorm 20 topics before picking one.' },
      { label: 'D', text: 'Write the introduction yourself, then ask AI to continue.' },
    ],
    correctAnswer: 'B',
    explanation: 'The Brainstorm-Iterate Loop for writing: Outline first, not draft. Get 3 outline options → pick one → AI grades it (1-10) → revise what scored below 9 → expand to bullets → grade bullets → THEN ask for full draft → grade draft → iterate to ~9.5. All leverage is in the outline.',
    vocabulary: [
      { word: 'Outline', meaning: 'The skeleton/structure of a piece of writing before the full text is written' },
      { word: 'Iterate', meaning: 'To repeat with improvements each round' },
    ],
  },

  {
    id: 36,
    chunk: 'Section III — AI Prompting',
    question: 'You want a professional diagram of a system architecture. You have Claude and ChatGPT available. What is the optimal workflow?',
    options: [
      { label: 'A', text: 'Use ChatGPT only — it generates better images.' },
      { label: 'B', text: 'Use Claude to create the SVG (Claude decides what belongs), convert to PNG, paste into ChatGPT/Gemini for professional polish, iterate 3-4 rounds.' },
      { label: 'C', text: 'Use Claude to generate the image directly — it is the best at visual output.' },
      { label: 'D', text: 'Hire a designer — AI cannot produce professional diagrams.' },
    ],
    correctAnswer: 'B',
    explanation: 'Chain the tools: Claude excels at deciding WHAT goes in a diagram (reasoning task) and generating SVG. ChatGPT/Gemini excels at rendering text-heavy images with professional polish. Chain them: Claude (SVG) → convert to PNG → ChatGPT/Gemini (polish) → 3-4 iteration rounds → studio-quality output in 10-15 minutes.',
    vocabulary: [
      { word: 'SVG', meaning: 'Scalable Vector Graphics — a code-based image format Claude can generate' },
      { word: 'Chain', meaning: 'Using multiple tools in sequence, each doing what it does best' },
    ],
  },

  {
    id: 37,
    chunk: 'Section III — AI Prompting',
    question: 'You ask the AI to analyze a spreadsheet. It gives you a confident paragraph with specific numbers. But you never saw any code run. What should you do?',
    options: [
      { label: 'A', text: 'Trust the numbers — the AI is good at math.' },
      { label: 'B', text: 'Ask: "Write and run code to answer this. Show me the code." The AI may have guessed (silent failure mode) rather than actually running code.' },
      { label: 'C', text: 'Re-upload the spreadsheet — the AI must have not received it.' },
      { label: 'D', text: 'Switch to a different AI tool — this one is broken.' },
    ],
    correctAnswer: 'B',
    explanation: 'Silent failure: AI sometimes guesses confidently instead of running code. Fix: always demand "Write and run code to answer this. Show me the code." Also ask for a verifiable first step: "Tell me the exact row count, column names, and date range before analyzing." No visible code = no real computation.',
    vocabulary: [
      { word: 'Silent failure', meaning: 'When AI fails without showing an error — gives a confident wrong answer' },
      { word: 'Computation', meaning: 'Actual mathematical calculation performed by code, not guessed from memory' },
    ],
  },

  {
    id: 38,
    chunk: 'Section III — AI Prompting',
    question: 'You installed an AI desktop app. It asks for permission to "access all files on your computer to help you better." What should you do?',
    options: [
      { label: 'A', text: 'Grant it — more access means better help.' },
      { label: 'B', text: 'Decline full access. Follow the permission ladder: start with read-only on one small folder, expand gradually only after verified success.' },
      { label: 'C', text: 'Grant it, but watch what it does afterward.' },
      { label: 'D', text: 'Uninstall immediately — desktop AI apps are always dangerous.' },
    ],
    correctAnswer: 'B',
    explanation: 'Permission ladder: never grant full disk access early. Start read-only on one small folder. After 2-3 successes, expand to read+write in one specific folder. After a clean week, broaden scope further. Critical warning: deleted files often do NOT go to the recycle bin — they are gone permanently.',
    vocabulary: [
      { word: 'Permission ladder', meaning: 'Gradual trust-building: start narrow, expand access only after verified success' },
      { word: 'Recycle bin', meaning: 'Trash folder — but desktop AI may bypass it, permanently deleting files' },
    ],
  },

  {
    id: 39,
    chunk: 'Section III — AI Prompting',
    question: 'Which model should you use if you need fast web search integrated with Google Workspace documents?',
    options: [
      { label: 'A', text: 'Claude — best at reasoning and long documents' },
      { label: 'B', text: 'DeepSeek — open-source with 1M token context' },
      { label: 'C', text: 'Gemini — fast web search, deep research with charts, native Google Workspace integration' },
      { label: 'D', text: 'Meta AI — available everywhere including WhatsApp' },
    ],
    correctAnswer: 'C',
    explanation: 'Gemini is best for fast web search, source synthesis, deep research with charts and tables, and native Google Workspace integration (Docs, Sheets, Gmail). Claude is best for reasoning and long documents. DeepSeek for STEM/coding. Meta AI for ubiquity (WhatsApp/Instagram).',
    vocabulary: [
      { word: 'Native integration', meaning: 'Built-in connection — works directly without extra setup' },
      { word: 'Synthesis', meaning: 'Combining multiple sources into one coherent answer' },
    ],
  },

  {
    id: 40,
    chunk: 'Section III — AI Prompting',
    question: 'You scored your email draft 7/10 with a rubric. The AI self-critique said "loses 2 points because the call-to-action is buried." You ask the AI to fix it. It scores itself 9/10 now. Can you trust this 9/10?',
    options: [
      { label: 'A', text: 'Yes — 9/10 means the email is objectively excellent.' },
      { label: 'B', text: 'It is a progress signal, not a truth signal — it shows improvement, but it is the same model grading itself. For high-stakes emails, use a second model from a different family.' },
      { label: 'C', text: 'No — AI scores are always unreliable and meaningless.' },
      { label: 'D', text: 'Yes — the rubric makes the score objective and trustworthy.' },
    ],
    correctAnswer: 'B',
    explanation: 'Score = progress signal, not truth signal. It shows the draft improved (6→7→9) and WHERE it improved (specific criterion changed). But the same model grading itself may have shared blind spots. For high-stakes work, take to a second model from a different family for independent cross-checking.',
    vocabulary: [
      { word: 'Progress signal', meaning: 'Shows improvement over time — not an absolute quality guarantee' },
      { word: 'Blind spot', meaning: 'Something a model consistently misses or gets wrong' },
    ],
  },

  {
    id: 41,
    chunk: 'Section III — AI Prompting',
    question: 'What is the "Autonomous Iteration Variant" in Concept 13 (Models Checking Models)?',
    options: [
      { label: 'A', text: 'When multiple models vote on the best answer simultaneously.' },
      { label: 'B', text: 'Telling the AI: "Iterate against your own rubric until you reach 9.5 across all criteria, then show me the final version." The AI grades, revises, regrades automatically — returns only when done.' },
      { label: 'C', text: 'Running the same prompt 10 times and picking the best result.' },
      { label: 'D', text: 'Asking the AI to check its own grammar and spelling only.' },
    ],
    correctAnswer: 'B',
    explanation: 'Autonomous Iteration: instead of manual back-and-forth, tell the AI to self-iterate to a target score. It runs 5-6 internal revision rounds and returns only the final version. Dramatically faster for long-form work (5,000-word memo, chapter, report). You get the polished output without managing each round.',
    vocabulary: [
      { word: 'Autonomous iteration', meaning: 'Self-running improvement loop — AI grades, revises, regrades without human prompting each step' },
    ],
  },

  {
    id: 42,
    chunk: 'Section III — AI Prompting',
    question: 'You are working on a legal NDA with confidential strategy details. You want to use the multi-model checking loop. What privacy concern must you consider?',
    options: [
      { label: 'A', text: 'None — all AI tools have the same privacy policy.' },
      { label: 'B', text: 'Cross-model checking means pasting into multiple tools. Check each tool\'s data policy. Some may train on your inputs. Never feed confidential work through tools with unclear policies.' },
      { label: 'C', text: 'The concern is only about the file size — large NDAs may not upload.' },
      { label: 'D', text: 'Use only free-tier tools for confidential work — paid tools store your data.' },
    ],
    correctAnswer: 'B',
    explanation: 'Privacy caution for cross-model checking: pasting into multiple tools = multiple data policies. Claude consumer, ChatGPT with training opt-out, paid Gemini tiers do not train on inputs. Meta AI\'s consumer product may. For NDAs, financial analysis, strategy memos — verify the policy or use enterprise/paid tiers with clear data terms.',
    vocabulary: [
      { word: 'Data policy', meaning: 'Rules about how a company uses, stores, or trains on your data' },
      { word: 'Opt-out', meaning: 'A setting to prevent your data from being used for training' },
    ],
  },

  {
    id: 43,
    chunk: 'Section III — AI Prompting',
    question: '"The model sees only what is in its context window for this response." What is the ONE unifying principle of ALL 13 prompting concepts?',
    options: [
      { label: 'A', text: 'Use reasoning mode for every important task.' },
      { label: 'B', text: 'Get the right context IN. Keep the wrong context OUT.' },
      { label: 'C', text: 'Always use multiple models to verify answers.' },
      { label: 'D', text: 'Prefer text over images — it is cheaper and faster.' },
    ],
    correctAnswer: 'B',
    explanation: 'The unifying principle across all 13 concepts: "Get the right context IN, keep the wrong context OUT." Every concept — briefing, retrieval modes, pre-prompt checklist, context rot, sycophancy neutralization, rubrics — all reduce to controlling what goes into the context window.',
    vocabulary: [
      { word: 'Unifying principle', meaning: 'The one core idea that connects and explains all the others' },
    ],
  },

  {
    id: 44,
    chunk: 'Section III — AI Prompting',
    question: 'You want to build a simple expense-splitting app for your family. No coding background. What is the 3-slot recipe?',
    options: [
      { label: 'A', text: 'Tool + Language + Framework' },
      { label: 'B', text: 'Goal (what it does) + Input (what user provides) + Output (what user sees)' },
      { label: 'C', text: 'Design + Build + Test' },
      { label: 'D', text: 'Prompt + Context + Constraints' },
    ],
    correctAnswer: 'B',
    explanation: '3-slot recipe for small apps: Goal = "split expenses between family members." Input = "enter each expense and who paid." Output = "show who owes who what amount." This is all you need. Then iterate on the Artifact/Canvas result: "add a dark mode," "make the button bigger." No coding needed.',
    vocabulary: [
      { word: 'Artifact', meaning: 'Claude\'s name for the persistent app built inside the chat' },
      { word: 'Canvas', meaning: 'ChatGPT/Gemini\'s name for the same feature' },
    ],
  },

  {
    id: 45,
    chunk: 'Section III — AI Prompting',
    question: 'Text, speech, images, deep research, video — which ordering from cheapest to most expensive is correct?',
    options: [
      { label: 'A', text: 'Video → Images → Deep Research → Speech → Text' },
      { label: 'B', text: 'Text → Speech → Images → Deep Research → Video' },
      { label: 'C', text: 'Text → Images → Speech → Video → Deep Research' },
      { label: 'D', text: 'All cost the same on free tiers' },
    ],
    correctAnswer: 'B',
    explanation: 'Cost stack cheapest to most: Text (fractions of a cent) → Speech (few cents/min) → Images (several cents, no early stop) → Deep Research (several cents to ~25 cents) → Video (many cents to dollars, iteration very painful). Key implication: put more effort into prompts before generating images/video — you cannot iterate cheaply.',
    vocabulary: [
      { word: 'No early stop', meaning: 'Image generation always runs to completion — you pay full cost even if the result is wrong' },
    ],
  },

  {
    id: 46,
    chunk: 'Section III — AI Prompting',
    question: 'Three AI models all agree that a medical treatment is safe. Can you now trust this as medically verified?',
    options: [
      { label: 'A', text: 'Yes — three independent models agreeing means it is very likely correct.' },
      { label: 'B', text: 'No — models can share the same training data and therefore the same misconceptions. For medical claims, always get a human expert to verify load-bearing claims.' },
      { label: 'C', text: 'Yes, if all three are frontier models (Claude, GPT, Gemini).' },
      { label: 'D', text: 'No — AI cannot answer any medical questions.' },
    ],
    correctAnswer: 'B',
    explanation: 'Concept 13 honest caveat: three models can be wrong about the same thing because they share more training data than expected. On contested or sparse-data topics, they often share the same misconceptions. For legal, medical, financial, or content about real people — no number of cross-model passes replaces a human expert reviewing load-bearing claims.',
    vocabulary: [
      { word: 'Load-bearing claim', meaning: 'A claim that the whole conclusion depends on — if it is wrong, everything fails' },
      { word: 'Misconception', meaning: 'A wrong belief held confidently — shared misconceptions are especially dangerous' },
    ],
  },

  {
    id: 47,
    chunk: 'Section III — AI Prompting',
    question: 'Rania needs to evaluate her startup pitch. She asks: "Give me feedback on my pitch." She gets vague praise. What should she ask instead?',
    options: [
      { label: 'A', text: '"Be more critical this time."' },
      { label: 'B', text: '"Score my pitch 1-10 on: real problem solved, market size, competitive advantage, unit economics, top 3 failure reasons — with one-sentence justification per score."' },
      { label: 'C', text: '"Pretend you are a harsh investor."' },
      { label: 'D', text: '"List only the bad things about my pitch."' },
    ],
    correctAnswer: 'B',
    explanation: 'The rubric pattern: replace vague evaluation with named scored criteria. "Be more critical" just gives harsher tone, not better analysis. A rubric with specific dimensions (real problem, market, competitive advantage, unit economics, failure reasons) forces the AI to identify what\'s actually missing — not just adjust its tone.',
    vocabulary: [
      { word: 'Unit economics', meaning: 'The revenue and costs on a per-unit or per-customer basis — is each customer profitable?' },
    ],
  },

  {
    id: 48,
    chunk: 'Section III — AI Prompting',
    question: 'What does the METR 2025 study tell us about AI capability growth?',
    options: [
      { label: 'A', text: 'AI capability is growing 10% per year — slow but steady.' },
      { label: 'B', text: 'In mid-2024, AI handled ~7-minute tasks. By early 2025, ~1-hour tasks. Capability doubles roughly every 7 months.' },
      { label: 'C', text: 'AI reached human-level capability in early 2025 and has plateaued.' },
      { label: 'D', text: 'AI can only handle tasks taking under 10 minutes regardless of the year.' },
    ],
    correctAnswer: 'B',
    explanation: 'METR 2025 Study: mid-2024 frontier models reliably handled ~7-minute human tasks. By early 2025, ~1 hour. Growth rate: length of handleable task roughly doubles every 7 months. This means reasoning mode is increasingly powerful — and tasks that needed a human last year may be AI-appropriate this year.',
    vocabulary: [
      { word: 'METR', meaning: 'Model Evaluation and Threat Research — an AI safety research organization' },
      { word: 'Frontier model', meaning: 'The most capable, cutting-edge AI model available at any given time' },
    ],
  },

  {
    id: 49,
    chunk: 'Section III — AI Prompting',
    question: 'You ask the AI to help you plan a trip. It gives you one itinerary. What does the Brainstorm-Iterate Loop say you should do instead?',
    options: [
      { label: 'A', text: 'Accept the first itinerary — the AI knows best.' },
      { label: 'B', text: 'Ask for 3-5 different itinerary options, give feedback on each, ask for revised options based on feedback, iterate until you genuinely like one — then flesh it out in detail.' },
      { label: 'C', text: 'Ask for a longer, more detailed version of the same itinerary.' },
      { label: 'D', text: 'Ask 3 different AI tools and pick the best one.' },
    ],
    correctAnswer: 'B',
    explanation: 'Brainstorm-Iterate Loop applies universally — not just writing. AI\'s first instinct is average (the most common itinerary). Force 3-5 alternatives to escape the default. Give feedback on each. Iterate toward your actual preference. Only then ask for the full detailed plan. Works for trips, product names, contractor choices, anything.',
    vocabulary: [
      { word: 'Itinerary', meaning: 'A planned route or schedule for a trip' },
      { word: 'Default response', meaning: 'The average, most common answer — what the AI gives without being pushed' },
    ],
  },

  {
    id: 50,
    chunk: 'Section III — AI Prompting',
    question: 'FINAL QUESTION — Across ALL three exam sections, what is the single most important concept that connects the Thesis, Getting Started, and AI Prompting?',
    options: [
      { label: 'A', text: 'AI is replacing all human work.' },
      { label: 'B', text: 'Humans remain in control — they set direction, verify results, and define the rules. Whether it is the 10-80-10 rhythm, the permission ladder, or the pre-prompt checklist: the human is always the Principal.' },
      { label: 'C', text: 'The most important thing is using the right AI model for each task.' },
      { label: 'D', text: 'Cost management is the core skill in the AI era.' },
    ],
    correctAnswer: 'B',
    explanation: 'Across all three sections: the human is the Principal. Thesis: Human is the first Invariant — sets direction, verifies, approves. Getting Started: Mode 1 makes you more effective, Mode 2 builds workers that serve you. AI Prompting: every technique (briefing, context control, rubrics, permission ladder) is the human taking deliberate control of what AI sees and does. AI amplifies human judgment — it does not replace it.',
    vocabulary: [
      { word: 'Principal', meaning: 'The person who is ultimately accountable and in authority — Invariant 1' },
      { word: 'Amplify', meaning: 'To make stronger or more effective — not to replace' },
    ],
  },
]
