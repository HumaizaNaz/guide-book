import { QuizPlayerFull } from '@/components/QuizPlayerFull'

export const metadata = {
  title: 'Full Version Quiz — Engines, Harness, Economic Actors',
  description: '25 scenario-based questions on the new content from the Full Version thesis — engine comparison, harness vs compute, trigger orthogonality, and AI economic actors.',
}

export default function QuizFullPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
          Full Version — New Content Only
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Thesis Full Version Quiz
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base mb-4">
          25 questions covering content that was NOT in the Plain English version — engine comparison, harness vs compute, trigger orthogonality, AI economic actors, and per-engine durability methods.
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { label: 'Engine Comparison', n: '8 Qs', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' },
            { label: 'Harness vs Compute', n: '5 Qs', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' },
            { label: 'Trigger Orthogonality', n: '4 Qs', color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' },
            { label: 'Economic Actors', n: '5 Qs', color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' },
            { label: 'Durability Methods', n: '3 Qs', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' },
          ].map(item => (
            <div key={item.label} className={`flex flex-col items-center justify-center p-2 rounded-lg text-center ${item.color}`}>
              <span className="text-xs font-bold">{item.n}</span>
              <span className="text-xs mt-0.5 opacity-80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <QuizPlayerFull />
    </div>
  )
}
