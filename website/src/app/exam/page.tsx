import Link from 'next/link'

export const metadata = {
  title: 'Exam Prep — L1 P1-AFAP Agent Foundations And Prompting',
  description: 'Complete exam preparation for L1 P1-AFAP certification — Agent Foundations and Prompting. Notes in English and Roman Urdu, plus 60 scenario-based quiz questions.',
}

const sections = [
  {
    id: 'I',
    title: 'Thesis for Professionals',
    subtitle: 'Section I',
    status: 'complete',
    items: [
      {
        label: 'English Notes',
        desc: 'Complete Plain English thesis — all 51 sections, 7 chunks, vocabulary, revision cards',
        href: '/guide/exam-prep-l1-thesis',
        tag: 'English',
        tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      },
      {
        label: 'Roman Urdu Notes',
        desc: 'Poora thesis Roman Urdu mein — sab 7 chunks, vocabulary, master revision',
        href: '/guide/exam-prep-l1-thesis-roman-urdu',
        tag: 'Roman Urdu',
        tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
      },
      {
        label: 'Full Version — New Content',
        desc: 'Engine comparison table, selection framework, harness vs compute, trigger orthogonality — what Plain English did not cover',
        href: '/guide/exam-prep-l1-thesis-full',
        tag: 'Full Version',
        tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
      },
    ],
  },
  {
    id: 'II',
    title: 'Getting Started Overview',
    subtitle: 'Section II',
    status: 'coming',
    items: [],
  },
  {
    id: 'III',
    title: 'AI Prompting in 2026',
    subtitle: 'Section III',
    status: 'coming',
    items: [],
  },
]

const sourceLinks = [
  { label: 'Thesis — Full (English)', href: 'https://agentfactory.panaversity.org/docs/thesis' },
  { label: 'Thesis — Plain English', href: 'https://agentfactory.panaversity.org/docs/thesis/plain-english' },
  { label: 'Thesis — Roman Urdu', href: 'https://agentfactory.panaversity.org/roman/docs/thesis/plain-english' },
  { label: 'Getting Started (EN)', href: 'https://agentfactory.panaversity.org/docs/getting-started' },
  { label: 'AI Prompting 2026 (EN)', href: 'https://agentfactory.panaversity.org/docs/ai-prompting-2026' },
]

export default function ExamPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
          <span>📅</span>
          <span>Exam Date: 7 June 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          L1: P1-AFAP Exam Prep
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
          Agent Foundations And Prompting — Certification Exam
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Covers Sections I–III of the Agent Factory curriculum. Notes in English and Roman Urdu, plus a 60-question scenario-based quiz.
        </p>
      </div>

      {/* Quick access — Quiz */}
      <div className="mb-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">📝 Plain English Quiz</h2>
            <p className="text-indigo-100 text-sm">60 scenario-based questions — all 7 chapters of the Plain English version. Score + section breakdown at the end.</p>
          </div>
          <Link href="/quiz" className="flex-shrink-0 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
            Start Quiz →
          </Link>
        </div>
      </div>
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">🔬 Full Version Quiz</h2>
            <p className="text-purple-100 text-sm">25 questions on new content only — engine comparison, harness vs compute, trigger orthogonality, economic actors.</p>
          </div>
          <Link href="/quiz-full" className="flex-shrink-0 bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm">
            Start Quiz →
          </Link>
        </div>
      </div>

      {/* Exam Sections */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Study Notes by Section</h2>
      <div className="space-y-4 mb-10">
        {sections.map(section => (
          <div
            key={section.id}
            className={`rounded-2xl border ${section.status === 'complete' ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900' : 'border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'}`}
          >
            {/* Section header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                  {section.id}
                </span>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">{section.subtitle}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white">{section.title}</h3>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${section.status === 'complete' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                {section.status === 'complete' ? '✓ Complete' : 'Coming Soon'}
              </span>
            </div>

            {/* Items */}
            {section.items.length > 0 && (
              <div className="p-4 grid gap-3 sm:grid-cols-2">
                {section.items.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                        {item.label}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline mt-auto">
                      Open notes →
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {section.status === 'coming' && (
              <div className="px-6 py-4 text-sm text-gray-400 dark:text-gray-500 italic">
                Notes for this section are being prepared...
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Today's Progress */}
      <div className="mb-10 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Study Plan Progress</h2>
        <div className="space-y-2.5">
          {[
            { day: 'Day 1–2 (May 30–31)', task: 'Thesis — Plain English (all 7 chunks)', done: true },
            { day: 'Day 3 (Jun 1)', task: 'Thesis — Full Version (deeper detail)', done: false },
            { day: 'Day 4 (Jun 2)', task: 'Getting Started Overview', done: false },
            { day: 'Day 5 (Jun 3)', task: 'AI Prompting in 2026', done: false },
            { day: 'Day 6 (Jun 4)', task: 'Revision + Notes review', done: false },
            { day: 'Day 7 (Jun 5)', task: 'Practice Quiz — target 80%+', done: false },
            { day: 'Day 8 (Jun 6)', task: 'Final revision + weak areas', done: false },
            { day: '7 June', task: '🎯 EXAM DAY', done: false },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 text-sm ${item.done ? 'opacity-100' : 'opacity-70'}`}>
              <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${item.done ? 'bg-green-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600'}`}>
                {item.done ? '✓' : ''}
              </span>
              <span className={`font-medium ${item.done ? 'text-green-700 dark:text-green-400 line-through' : 'text-gray-500 dark:text-gray-400'}`}>{item.day}</span>
              <span className={item.done ? 'text-gray-500 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Source links */}
      <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Official Source Material</h3>
        <div className="flex flex-wrap gap-2">
          {sourceLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:border-indigo-300 transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
