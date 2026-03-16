// DemoFlowBanner.tsx — Stage 8 polish component.
// Shows a clear step-by-step demo flow near the top of the page.
// Helps presenters and new users understand the app at a glance.
// Lightweight — no state, no animation.

const STEPS = [
  { number: '1', label: 'Select a Topic', icon: '📚' },
  { number: '2', label: 'Perform Experiment', icon: '🔬' },
  { number: '3', label: 'Local vs Lab', icon: '⚗️' },
  { number: '4', label: 'Concept Explanation', icon: '💡' },
  { number: '5', label: 'Exam Practice', icon: '📝' },
] as const

export default function DemoFlowBanner() {
  return (
    <aside
      aria-label="Demo flow overview"
      className="bg-amber-700 border-b border-amber-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <p className="text-amber-200 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
          Demo Flow — 5 Steps
        </p>
        <ol
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
          aria-label="Demo steps"
        >
          {STEPS.map((step, idx) => (
            <li
              key={step.number}
              className="flex items-center gap-1.5"
            >
              {/* Step pill */}
              <span className="flex items-center gap-1.5 bg-amber-800/60 text-amber-100 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-600/50 whitespace-nowrap">
                <span
                  className="bg-white text-amber-800 font-bold text-xs rounded-full w-4 h-4 flex items-center justify-center shrink-0 leading-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <span aria-hidden="true">{step.icon}</span>
                {step.label}
              </span>

              {/* Arrow separator — hidden after last step */}
              {idx < STEPS.length - 1 && (
                <span className="text-amber-500 text-xs hidden sm:inline" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
