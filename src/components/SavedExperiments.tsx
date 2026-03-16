// SavedExperiments.tsx — Stage 7 component.
// Displays the list of experiments the user has saved to localStorage.
// Stage 8: Added aria-live, Offline Ready badge, improved aria-labels.

import type { FlatExperiment } from '../types'

interface Props {
  saved: FlatExperiment[]
  onOpen: (experiment: FlatExperiment) => void
  onRemove: (id: string) => void
}

export default function SavedExperiments({ saved, onOpen, onRemove }: Props) {
  // Don't render the section at all when the saved list is empty.
  if (saved.length === 0) return null

  return (
    <section className="mb-8" aria-label="Saved experiments">
      {/* Section heading */}
      <h2 className="text-lg font-bold text-stone-800 mb-1 flex items-center gap-2">
        🔖 Saved Experiments
        <span className="text-sm font-normal text-stone-400">
          ({saved.length} saved)
        </span>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 px-2 py-0.5 rounded-full">
          <span aria-hidden="true">📶</span> Offline Ready
        </span>
      </h2>
      <p className="text-stone-500 text-sm mb-4">
        Your saved experiments are stored on this device and remain available offline.
      </p>

      {/* Saved item list — aria-live announces changes to screen readers */}
      <div className="space-y-2" aria-live="polite" aria-label="Saved experiment list">
        {saved.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center justify-between gap-3 bg-white border border-amber-200 rounded-xl px-4 py-3 shadow-sm"
          >
            {/* Left: title + badges */}
            <div className="min-w-0">
              <p className="font-semibold text-stone-800 text-sm truncate">
                {exp.title}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {exp.subject_name && (
                  <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full">
                    {exp.subject_name}
                  </span>
                )}
                {exp.topic_name && (
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                    {exp.topic_name}
                  </span>
                )}
              </div>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onOpen(exp)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-150"
                aria-label={`Open saved experiment: ${exp.title}`}
              >
                Open
              </button>
              <button
                type="button"
                onClick={() => onRemove(exp.id)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-200 text-stone-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors duration-150"
                aria-label={`Remove ${exp.title} from saved`}
              >
                ✕ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
