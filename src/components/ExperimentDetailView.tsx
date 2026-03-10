// ExperimentDetailView — shows full details for a selected experiment.
// Rendered inline below the card grid inside BrowseExperiments.
// All fields are null-safe with friendly fallback messages.

import type { FlatExperiment } from '../types'
import LabComparison from './LabComparison'
import ConceptTeaching from './ConceptTeaching'
import ExamPractice from './ExamPractice'

interface Props {
  experiment: FlatExperiment
  onClose: () => void
}

// Helper: renders a simple bulleted list, or a fallback if the list is empty.
function BulletList({ items, fallback }: { items?: string[]; fallback: string }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-stone-400 italic">{fallback}</p>
  }
  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-sm text-stone-700 flex gap-2">
          <span className="text-amber-500 mt-0.5 shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// Helper: renders a numbered list for instructions, or a fallback.
function NumberedList({ items, fallback }: { items?: string[]; fallback: string }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-stone-400 italic">{fallback}</p>
  }
  return (
    <ol className="space-y-2">
      {items.map((step, index) => (
        <li key={index} className="text-sm text-stone-700 flex gap-3">
          <span className="bg-amber-100 text-amber-800 font-bold text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
            {index + 1}
          </span>
          <span className="leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  )
}

function ExperimentDetailView({ experiment, onClose }: Props) {
  const {
    title,
    subject_name,
    topic_name,
    short_description,
    materials,
    local_alternatives,
    instructions,
    safety_notes,
  } = experiment

  return (
    <div
      id="experiment-detail"
      className="mt-8 bg-white border border-amber-200 rounded-2xl shadow-md overflow-hidden"
    >
      {/* ── Header bar ───────────────────────────────────────────────────── */}
      <div className="bg-amber-700 text-white px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold leading-snug">
            {title || 'Untitled Experiment'}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {subject_name && (
              <span className="bg-amber-900/40 text-amber-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                {subject_name}
              </span>
            )}
            {topic_name && (
              <span className="bg-amber-900/40 text-amber-100 text-xs font-medium px-2 py-0.5 rounded-full">
                {topic_name}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-150"
          aria-label="Close experiment detail"
        >
          ✕ Close
        </button>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="px-6 py-6 space-y-7">

        {/* Short description */}
        {short_description && (
          <section>
            <p className="text-stone-600 leading-relaxed">{short_description}</p>
          </section>
        )}

        {/* Safety notes — highlighted warning box */}
        <section>
          <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-2">
            ⚠️ Safety Notes
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <BulletList
              items={safety_notes}
              fallback="No specific safety notes for this experiment."
            />
          </div>
        </section>

        {/* Materials */}
        <section>
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-2">
            🧰 Materials Needed
          </h3>
          <BulletList
            items={materials}
            fallback="No materials listed."
          />
        </section>

        {/* Local alternatives */}
        <section>
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-2">
            🏡 Local Alternatives
          </h3>
          <BulletList
            items={local_alternatives}
            fallback="No local alternatives listed."
          />
        </section>

        {/* Stage 4: Local vs Lab comparison */}
        <LabComparison experiment={experiment} />

        {/* Instructions */}
        <section>
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-3">
            📋 Instructions
          </h3>
          <NumberedList
            items={instructions}
            fallback="No instructions available."
          />
        </section>

        {/* Stage 5: Improved concept teaching section (replaces old concept explanation + diagram hint) */}
        <section>
          <ConceptTeaching experiment={experiment} />
        </section>

        {/* Stage 6: Interactive exam practice (replaces static quiz preview) */}
        <ExamPractice experiment={experiment} />

        {/* Close button at the bottom */}
        <div className="pt-2 border-t border-stone-100">
          <button
            onClick={onClose}
            className="text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors duration-150"
          >
            ← Back to experiment list
          </button>
        </div>

      </div>
    </div>
  )
}

export default ExperimentDetailView
