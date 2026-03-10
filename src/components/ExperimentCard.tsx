// ExperimentCard — displays a single experiment from featured_experiments[].
// Fields shown: title, subject_name badge, short_description,
// topic_name (only if present directly on the object), and up to 3 materials.
// All fields are null-safe.

import type { FeaturedExperiment } from '../types'

interface Props {
  experiment: FeaturedExperiment
}

function ExperimentCard({ experiment }: Props) {
  const { title, subject_name, topic_name } = experiment

  return (
    <div className="bg-white border border-amber-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Subject badge */}
      {subject_name && (
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
          {subject_name}
        </span>
      )}

      {/* Title */}
      <h3 className="text-base font-bold text-stone-800 mb-2 leading-snug">
        {title || 'Untitled Experiment'}
      </h3>

      {/* Topic name — shown only if it exists directly on the featured item */}
      {topic_name && (
        <p className="text-xs text-amber-700 mb-2">
          Topic: <span className="font-medium">{topic_name}</span>
        </p>
      )}
    </div>
  )
}

export default ExperimentCard
