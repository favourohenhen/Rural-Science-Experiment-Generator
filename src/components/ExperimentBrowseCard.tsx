// ExperimentBrowseCard — shows a full experiment from the browse section.
// Fields: title, short_description, subject_name, topic_name,
// first 2–3 items from materials[], and a "View Experiment" button.
// Stage 8: Added Safe + Everyday Materials badges; improved card consistency.

import type { FlatExperiment } from '../types'

interface Props {
  experiment: FlatExperiment
  onSelect: (experiment: FlatExperiment) => void
}

function ExperimentBrowseCard({ experiment, onSelect }: Props) {
  const {
    title,
    subject_name,
    topic_name,
    short_description,
    materials,
  } = experiment

  // Show at most 3 materials as a preview.
  const materialsPreview = (materials ?? []).slice(0, 3)

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* Subject + topic badges */}
      <div className="flex flex-wrap gap-1.5">
        {subject_name && (
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {subject_name}
          </span>
        )}
        {topic_name && (
          <span className="bg-stone-100 text-stone-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {topic_name}
          </span>
        )}
        {/* Stage 8: attribute badges */}
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded-full">
          <span aria-hidden="true">✅</span> Safe
        </span>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
          <span aria-hidden="true">🏡</span> Everyday Materials
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-stone-800 leading-snug">
        {title || 'Untitled Experiment'}
      </h3>

      {/* Short description */}
      {short_description && (
        <p className="text-sm text-stone-600 leading-relaxed">
          {short_description}
        </p>
      )}

      {/* Materials preview */}
      {materialsPreview.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
            Materials needed
          </p>
          <ul className="space-y-0.5">
            {materialsPreview.map((item, index) => (
              <li key={index} className="text-sm text-stone-600 flex gap-1.5">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">•</span>
                {item}
              </li>
            ))}
            {(materials ?? []).length > 3 && (
              <li className="text-xs text-stone-400 italic">
                + {(materials ?? []).length - 3} more…
              </li>
            )}
          </ul>
        </div>
      )}

      {/* View Experiment button — wires to Stage 3 detail view */}
      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={() => onSelect(experiment)}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-150"
          aria-label={`View experiment: ${title}`}
        >
          View Experiment →
        </button>
      </div>
    </div>
  )
}

export default ExperimentBrowseCard
