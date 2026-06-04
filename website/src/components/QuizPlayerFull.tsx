'use client'
import { useState } from 'react'
import { FULL_VERSION_QUIZ } from '@/data/quiz-l1-thesis-full'

export function QuizPlayerFull() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(FULL_VERSION_QUIZ.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const q = FULL_VERSION_QUIZ[current]
  const total = FULL_VERSION_QUIZ.length
  const isLast = current === total - 1

  const handleSelect = (label: string) => { if (!confirmed) setSelected(label) }

  const handleConfirm = () => {
    if (!selected) return
    const updated = [...answers]
    updated[current] = selected
    setAnswers(updated)
    setConfirmed(true)
  }

  const handleNext = () => {
    if (isLast) { setShowResult(true) }
    else {
      setCurrent(c => c + 1)
      setSelected(answers[current + 1])
      setConfirmed(answers[current + 1] !== null)
    }
  }

  const handlePrev = () => {
    if (current === 0) return
    setCurrent(c => c - 1)
    setSelected(answers[current - 1])
    setConfirmed(answers[current - 1] !== null)
  }

  const handleRestart = () => {
    setCurrent(0); setSelected(null)
    setAnswers(Array(FULL_VERSION_QUIZ.length).fill(null))
    setShowResult(false); setConfirmed(false)
  }

  const score = answers.filter((a, i) => a === FULL_VERSION_QUIZ[i].correctAnswer).length
  const pct = Math.round((score / total) * 100)

  const getGrade = () => {
    if (pct >= 90) return { grade: 'A+', msg: 'Outstanding! Full Version mastered!', color: 'text-green-600' }
    if (pct >= 80) return { grade: 'A', msg: 'Excellent! Strong on all new concepts.', color: 'text-green-600' }
    if (pct >= 70) return { grade: 'B', msg: 'Good! Review the sections you missed.', color: 'text-blue-600' }
    if (pct >= 60) return { grade: 'C', msg: 'Passing — but review engines and harness concepts.', color: 'text-yellow-600' }
    return { grade: 'D', msg: 'Re-read the Full Version notes and try again.', color: 'text-red-600' }
  }

  const chunkScores = () => {
    const chunks: Record<string, { correct: number; total: number }> = {}
    FULL_VERSION_QUIZ.forEach((q, i) => {
      if (!chunks[q.chunk]) chunks[q.chunk] = { correct: 0, total: 0 }
      chunks[q.chunk].total++
      if (answers[i] === q.correctAnswer) chunks[q.chunk].correct++
    })
    return chunks
  }

  if (showResult) {
    const { grade, msg } = getGrade()
    const chunks = chunkScores()
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-10 text-center">
            <div className="text-7xl font-black mb-2 text-white">{grade}</div>
            <div className="text-5xl font-bold text-white mb-1">{score}/{total}</div>
            <div className="text-2xl text-purple-100 mb-3">{pct}% Correct</div>
            <p className="text-purple-100 text-lg">{msg}</p>
          </div>
          <div className="px-8 py-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
              <div className="h-4 rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: pct >= 80 ? '#16a34a' : pct >= 60 ? '#2563eb' : '#dc2626' }} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Score by Topic</h3>
            <div className="space-y-3 mb-8">
              {Object.entries(chunks).map(([chunk, { correct, total }]) => {
                const p = Math.round((correct / total) * 100)
                return (
                  <div key={chunk}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{chunk}</span>
                      <span className={`font-bold ${p >= 80 ? 'text-green-600' : p >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{correct}/{total} ({p}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${p}%`, background: p >= 80 ? '#16a34a' : p >= 60 ? '#ca8a04' : '#dc2626' }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Question Review</h3>
            <div className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2">
              {FULL_VERSION_QUIZ.map((q, i) => {
                const isCorrect = answers[i] === q.correctAnswer
                return (
                  <div key={q.id} className={`flex items-start gap-3 p-3 rounded-lg border ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                    <span className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>{isCorrect ? '✓' : '✗'}</span>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Q{q.id}:</span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">{q.question.slice(0, 80)}...</span>
                      {!isCorrect && <div className="mt-1 text-xs text-red-700 dark:text-red-400">Your answer: <strong>{answers[i] || 'Not answered'}</strong> — Correct: <strong>{q.correctAnswer}</strong></div>}
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={handleRestart} className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg transition-colors">Retake Quiz</button>
          </div>
        </div>
      </div>
    )
  }

  const isCorrect = confirmed && selected === q.correctAnswer

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span className="font-medium text-purple-600 dark:text-purple-400">{q.chunk}</span>
          <span>Question {current + 1} of {total}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="h-2.5 rounded-full bg-purple-600 transition-all duration-300" style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Score: {answers.filter((a, i) => a === FULL_VERSION_QUIZ[i].correctAnswer).length}/{answers.filter(a => a !== null).length} answered</span>
          <span>{Math.round(((current + 1) / total) * 100)}% complete</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div className="px-6 py-5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">Q{q.id}</span>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">Full Version</span>
          </div>
          <p className="text-gray-900 dark:text-white font-medium text-base leading-relaxed">{q.question}</p>
        </div>
        <div className="p-6 space-y-3">
          {q.options.map(opt => {
            const isSelected = selected === opt.label
            const isRight = opt.label === q.correctAnswer
            let cls = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
            if (confirmed) {
              if (isRight) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
              else if (isSelected && !isRight) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
              else cls = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 opacity-60'
            } else if (isSelected) {
              cls = 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200'
            }
            return (
              <button key={opt.label} onClick={() => handleSelect(opt.label)} disabled={confirmed}
                className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150 ${cls} ${!confirmed ? 'cursor-pointer' : 'cursor-default'}`}>
                <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                  {confirmed && isRight ? '✓' : confirmed && isSelected && !isRight ? '✗' : opt.label}
                </span>
                <span className="text-sm leading-relaxed">{opt.text}</span>
              </button>
            )
          })}
        </div>
        {confirmed && (
          <div className={`mx-6 mb-4 p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'}`}>
            <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
              {isCorrect ? '✓ Correct!' : `✗ Incorrect — Correct answer: ${q.correctAnswer}`}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{q.explanation}</p>
            {q.vocabulary && q.vocabulary.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Vocabulary</p>
                <div className="space-y-1.5">
                  {q.vocabulary.map(v => (
                    <div key={v.word} className="text-xs">
                      <span className="font-bold text-purple-700 dark:text-purple-300">{v.word}</span>
                      <span className="text-gray-600 dark:text-gray-400"> — {v.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={handlePrev} disabled={current === 0}
          className="px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          ← Previous
        </button>
        {!confirmed ? (
          <button onClick={handleConfirm} disabled={!selected}
            className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition-colors">
            Submit Answer
          </button>
        ) : (
          <button onClick={handleNext}
            className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors">
            {isLast ? 'See Final Score →' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
