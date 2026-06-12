import { QuizPlayerOperatingLayer } from '@/components/QuizPlayerOperatingLayer'

export const metadata = {
  title: 'AI Operating Layer Quiz — 20 Questions',
  description: '20 scenario-based questions on "The Agent Is the Operating Layer" — two deaths, SaaSpocalypse, AI Operating Layer, agent types, OSWorld data, and governance.',
}

export default function QuizOperatingLayerPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-block bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
          New Topic — AI Operating Layer
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          The Agent Is the Operating Layer — Quiz
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base mb-4">
          20 questions covering the full article — two deaths, SaaSpocalypse (3-layer model), AI Operating Layer architecture, personal vs general agents, OSWorld benchmark, local compute, honest objections, and governance.
        </p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { label: 'Two Deaths + SaaSpocalypse', n: '4 Qs', color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300' },
            { label: '40-Year Stack + New Layer', n: '2 Qs', color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300' },
            { label: 'Two Agent Types', n: '2 Qs', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300' },
            { label: 'Why This Time Is Different', n: '6 Qs', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' },
            { label: 'Honest Objections', n: '3 Qs', color: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300' },
            { label: 'Governance + Builders', n: '3 Qs', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' },
          ].map(item => (
            <div key={item.label} className={`flex flex-col items-center justify-center p-2 rounded-lg text-center ${item.color}`}>
              <span className="text-xs font-bold">{item.n}</span>
              <span className="text-xs mt-0.5 opacity-80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <QuizPlayerOperatingLayer />
    </div>
  )
}
