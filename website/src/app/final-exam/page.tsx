import { FinalExamPlayer } from '@/components/FinalExamPlayer'

export const metadata = {
  title: 'L1 P1-AFAP Final Exam Practice — 50 Questions',
  description: 'Comprehensive final exam covering all three sections: Thesis, Getting Started, and AI Prompting 2026.',
}

export default function FinalExamPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-block bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
          Final Exam Practice — 7 June 2026
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          L1 P1-AFAP — Full Exam Simulation
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          50 tricky scenario-based questions covering ALL three exam sections: Thesis, Getting Started Overview, and AI Prompting 2026.
          Questions are designed to test deep understanding — not just recall.
        </p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '50 Questions', icon: '📝' },
            { label: 'All 3 Sections', icon: '📚' },
            { label: 'Tricky & Twisted', icon: '🧠' },
            { label: 'Full Explanations', icon: '💡' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
            Section breakdown: Q1–20 = Thesis | Q21–28 = Getting Started | Q29–50 = AI Prompting 2026
          </p>
        </div>
      </div>

      <FinalExamPlayer />
    </div>
  )
}
