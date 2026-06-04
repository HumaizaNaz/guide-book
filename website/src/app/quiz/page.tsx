import { QuizPlayer } from '@/components/QuizPlayer'

export const metadata = {
  title: 'L1 P1-AFAP Certification Quiz — 60 Questions',
  description: 'Scenario-based quiz for the L1 P1-AFAP Agent Foundations and Prompting certification exam. 60 questions covering all 7 chunks of the thesis.',
}

export default function QuizPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
          Exam Prep — 7 June 2026
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          L1 P1-AFAP Certification Quiz
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          60 scenario-based questions covering the Agent Factory Thesis — Agent Foundations and Prompting.
          Select your answer, submit, read the explanation, then move to the next question.
          Your final score with a section-by-section breakdown appears at the end.
        </p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '60 Questions', icon: '📝' },
            { label: 'Scenario-Based', icon: '🎯' },
            { label: 'With Explanations', icon: '💡' },
            { label: 'Score + Breakdown', icon: '📊' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <QuizPlayer />
    </div>
  )
}
