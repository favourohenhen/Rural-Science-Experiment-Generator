// SubjectCard — displays a single subject using exact JSON keys.
// Shows subject_name only (as instructed for Stage 1).

import type { Subject } from '../types'

// Simple subject-to-emoji map for a friendlier feel.
const SUBJECT_EMOJIS: Record<string, string> = {
  physics: '⚡',
  chemistry: '🧪',
  biology: '🌱',
}

interface Props {
  subject: Subject
}

function SubjectCard({ subject }: Props) {
  const { subject_id, subject_name } = subject
  const emoji = SUBJECT_EMOJIS[subject_id] ?? '🔬'

  return (
    <div className="bg-white border border-amber-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-3">
      <span className="text-3xl" aria-hidden="true">{emoji}</span>
      <span className="text-base font-semibold text-stone-800">
        {subject_name || 'Unknown Subject'}
      </span>
    </div>
  )
}

export default SubjectCard
