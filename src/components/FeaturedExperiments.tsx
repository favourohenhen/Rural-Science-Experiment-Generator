// FeaturedExperiments — maps featured_experiments[] to ExperimentCard grid.
// Falls back gracefully if the array is empty or missing.

import type { FeaturedExperiment } from '../types'
import ExperimentCard from './ExperimentCard'

interface Props {
  experiments: FeaturedExperiment[]
}

function FeaturedExperiments({ experiments }: Props) {
  if (!experiments || experiments.length === 0) {
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
          {experiments.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedExperiments
