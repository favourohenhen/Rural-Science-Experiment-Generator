// LabComparison.tsx — Stage 4 component.
// Shows a side-by-side "Local / Everyday Materials" vs "Standard Lab Equivalent" block.
// Stage 8: Improved fallback state text.

import type { FlatExperiment } from '../types'
import { getLabEquivalent } from '../data/labEquivalents'

interface Props {
  experiment: FlatExperiment
}

function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 text-sm text-stone-700 leading-relaxed">
          <span className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function LabComparison({ experiment }: Props) {
  const { id, materials, local_alternatives } = experiment
  const labData = getLabEquivalent(id)

  const localItems = [
    ...(materials ?? []),
    ...(local_alternatives ?? []),
  ]

  if (!labData) {
    return (
      <section>
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-2">
          🔬 Local vs Lab Equivalent
        </h3>
        <div className="bg-stone-50 border border-dashed border-stone-300 rounded-xl p-4 text-center">
          <p className="text-sm text-stone-500">
            Lab equivalent data is not yet available for this experiment.
          </p>
          <p className="text-xs text-stone-400 mt-1">
            The local materials listed above teach the same scientific principles.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-4">
        🔬 Local vs Lab Equivalent
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LEFT: Local / Everyday Materials */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">🏡</span>
            <p className="text-sm font-bold text-amber-800">Local / Everyday Materials</p>
          </div>
          {localItems.length > 0 ? (
            <ItemList items={localItems} />
          ) : (
            <p className="text-sm text-stone-400 italic">No local materials listed.</p>
          )}
        </div>

        {/* RIGHT: Standard Lab Equivalent */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">🧪</span>
            <p className="text-sm font-bold text-blue-800">Standard Lab Equivalent</p>
          </div>
          <ItemList items={labData.items} />
        </div>
      </div>

      {/* Same-science note */}
      <p className="mt-4 text-sm text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 leading-relaxed">
        <span className="font-semibold text-stone-800">💡 Same science: </span>
        {labData.principle}
      </p>
    </section>
  )
}

export default LabComparison
