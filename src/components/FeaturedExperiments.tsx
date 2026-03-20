// FeaturedExperiments — shows exactly 3 featured experiment cards:
// 1 Physics, 1 Chemistry, 1 Biology.
// Picks the first matching experiment per subject from the featured list.
// Safely skips a subject if no match is found — no crash.

import type { FeaturedExperiment } from '../types'
import ExperimentCard from './ExperimentCard'

interface Props {
  experiments: FeaturedExperiment[]
}

// The 3 subjects we want to represent, in display order.
const FEATURED_SUBJECTS = ['physics', 'chemistry', 'biology'] as const

function FeaturedExperiments({ experiments }: Props) {
  // Pick the first featured experiment for each subject. Filter out undefined
  // entries so the array is always safe to render even if a subject is missing.
  const threeCards = FEATURED_SUBJECTS
    .map((subjectId) =>
      experiments.find((exp) => exp.subject_id === subjectId)
    )
    .filter((exp): exp is FeaturedExperiment => exp !== undefined)

  if (threeCards.length === 0) {
    return (
      <section id="featured-experiments" className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Featured Experiments</h2>
          <p className="text-stone-500">No featured experiments available right now.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="featured-experiments" className="py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-stone-800 mb-1">Featured Experiments</h2>
        <p className="text-stone-500 text-sm mb-6">A selection of popular experiments to get you started.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {threeCards.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedExperiments
