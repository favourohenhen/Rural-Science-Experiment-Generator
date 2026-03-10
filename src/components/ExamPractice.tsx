// ExamPractice.tsx — Stage 6 component.
// Renders an interactive exam practice section inside the experiment detail view.
//
// Two parts:
//   1. Multiple-Choice Questions — from experiment.quiz (JSON data)
//      • User selects an option (stored as index), then submits that question
//      • Options are locked (disabled) once the question is submitted
//      • Correct / Incorrect feedback + explanation shown after each submit
//      • Final score summary + Restart button
//   2. Structured Question — one written-style question per experiment (from structuredQuestions.ts)
//      • User reads the question and writes their own answer on paper
//      • A "See Sample Answer" toggle reveals the model answer

import { useState } from 'react'
import type { FlatExperiment } from '../types'
import { getStructuredQuestion } from '../data/structuredQuestions'

interface Props {
  experiment: FlatExperiment
}

export default function ExamPractice({ experiment }: Props) {
  const { id, quiz } = experiment
  const structuredQ = getStructuredQuestion(id)

  // ── MCQ state ──────────────────────────────────────────────────────────────
  // answers[i] = index of the selected option for question i (or undefined)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  // checked[i] = true once the user has submitted question i
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  // ── Structured question state ──────────────────────────────────────────────
  const [showSampleAnswer, setShowSampleAnswer] = useState(false)

  // ── Derived values ─────────────────────────────────────────────────────────
  const hasQuiz = Array.isArray(quiz) && quiz.length > 0
  const totalQuestions = hasQuiz ? quiz.length : 0
  const checkedCount = Object.values(checked).filter(Boolean).length
  const allChecked = hasQuiz && checkedCount === totalQuestions

  // Count correct answers
  const correctCount = hasQuiz
    ? quiz.filter((q, i) => checked[i] && q.options[answers[i]] === q.answer).length
    : 0

  // ── Handlers ───────────────────────────────────────────────────────────────
  function selectOption(questionIndex: number, optionIndex: number) {
    // Do not allow selection after the question has been submitted
    if (checked[questionIndex]) return
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }))
  }

  function checkAnswer(questionIndex: number) {
    // Only submit if the user has selected an option
    if (answers[questionIndex] === undefined) return
    setChecked(prev => ({ ...prev, [questionIndex]: true }))
  }

  function restart() {
    setAnswers({})
    setChecked({})
    setShowSampleAnswer(false)
  }

  // ── Option button style helper ─────────────────────────────────────────────
  // Returns Tailwind classes based on state: selected, correct, incorrect, or neutral
  function optionClass(questionIndex: number, optionIndex: number): string {
    const isSelected  = answers[questionIndex] === optionIndex
    const isSubmitted = checked[questionIndex]
    const isCorrect   = quiz?.[questionIndex]?.options[optionIndex] === quiz?.[questionIndex]?.answer

    const base = 'w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-colors duration-150 '

    if (!isSubmitted) {
      // Before submission: show selection highlight only
      return base + (isSelected
        ? 'bg-amber-100 border-amber-400 text-amber-900 font-medium'
        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50')
    }

    // After submission: show correct / incorrect colouring
    if (isCorrect) {
      return base + 'bg-green-50 border-green-400 text-green-800 font-semibold cursor-not-allowed'
    }
    if (isSelected && !isCorrect) {
      return base + 'bg-red-50 border-red-400 text-red-800 cursor-not-allowed'
    }
    return base + 'bg-white border-stone-100 text-stone-400 cursor-not-allowed'
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="space-y-6">

      {/* Section heading */}
      <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide">
        📝 Exam Practice
      </h3>

      {/* ── Part 1: Multiple-choice ─────────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
          Part A — Multiple Choice
        </p>

        {/* Fallback when no quiz data */}
        {!hasQuiz && (
          <p className="text-sm text-stone-400 italic">
            No quiz questions available for this experiment yet.
          </p>
        )}

        {/* Question cards */}
        {hasQuiz && quiz!.map((item, qi) => {
          const isSubmitted = checked[qi]
          const selectedIdx = answers[qi]
          const isCorrect   = isSubmitted && item.options[selectedIdx] === item.answer

          return (
            <div
              key={qi}
              className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3"
            >
              {/* Question text */}
              <p className="text-sm font-semibold text-stone-800">
                {qi + 1}. {item.question}
              </p>

              {/* Option buttons */}
              <div className="space-y-2">
                {(item.options ?? []).map((option, oi) => (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => selectOption(qi, oi)}
                    disabled={isSubmitted}
                    className={optionClass(qi, oi)}
                    aria-pressed={answers[qi] === oi}
                  >
                    <span className="font-bold mr-2 text-stone-400">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Check Answer button — only before submission */}
              {!isSubmitted && (
                <button
                  type="button"
                  onClick={() => checkAnswer(qi)}
                  disabled={selectedIdx === undefined}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  Check Answer
                </button>
              )}

              {/* Feedback — shown after submission */}
              {isSubmitted && (
                <div className={`rounded-lg px-4 py-3 text-sm space-y-1 ${
                  isCorrect
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className="font-semibold">
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                  </p>
                  {!isCorrect && (
                    <p className="text-stone-600">
                      Correct answer: <span className="font-semibold text-green-700">{item.answer}</span>
                    </p>
                  )}
                  {item.explanation && (
                    <p className="text-stone-600 leading-relaxed">
                      {item.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Score summary — appears when all questions are checked */}
        {hasQuiz && allChecked && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-amber-800">
                {correctCount === totalQuestions
                  ? '🎉 Perfect score!'
                  : correctCount >= Math.ceil(totalQuestions / 2)
                  ? '👍 Good effort!'
                  : '📚 Keep practising!'}
              </p>
              <p className="text-sm text-amber-700 mt-0.5">
                You scored{' '}
                <span className="font-bold">
                  {correctCount} / {totalQuestions}
                </span>{' '}
                correct.
              </p>
            </div>
            <button
              type="button"
              onClick={restart}
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-150 shrink-0"
            >
              🔄 Restart Quiz
            </button>
          </div>
        )}
      </div>

      {/* ── Part 2: Structured question ────────────────────────────────────── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
          Part B — Structured Question
        </p>

        {/* Fallback when no structured question exists for this experiment */}
        {!structuredQ && (
          <p className="text-sm text-stone-400 italic">
            No structured question available for this experiment yet.
          </p>
        )}

        {structuredQ && (
          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">

            {/* Question */}
            <p className="text-sm font-semibold text-stone-800">
              {structuredQ.question}
            </p>

            {/* Optional thinking hint */}
            {structuredQ.hint && (
              <p className="text-xs text-stone-400 italic">
                💭 Hint: {structuredQ.hint}
              </p>
            )}

            {/* Answer writing prompt */}
            <p className="text-xs text-stone-400">
              Write your answer on paper, then check it below.
            </p>

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowSampleAnswer(prev => !prev)}
              className="text-xs font-semibold px-4 py-2 rounded-lg border border-amber-400 text-amber-700 hover:bg-amber-50 transition-colors duration-150"
            >
              {showSampleAnswer ? '🙈 Hide Sample Answer' : '👀 See Sample Answer'}
            </button>

            {/* Sample answer — toggled */}
            {showSampleAnswer && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">
                  Sample Answer
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {structuredQ.sampleAnswer}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </section>
  )
}
