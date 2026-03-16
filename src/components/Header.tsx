// Header component — shows app name and subtitle at the top of every page.
// Stage 8: Added Offline Ready badge, improved mobile padding.

function Header() {
  return (
    <header className="w-full bg-amber-700 text-white py-4 px-4 sm:px-6 shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            🌿 Rural Science Experiment Generator
          </h1>
          <p className="text-amber-100 text-sm mt-0.5">
            Safe experiments for every classroom, using everyday materials.
          </p>
        </div>
        {/* Offline Ready badge */}
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-800/60 text-amber-100 border border-amber-600/50 px-2.5 py-1 rounded-full whitespace-nowrap"
          title="This app works offline via PWA caching"
        >
          📶 Offline Ready
        </span>
      </div>
    </header>
  )
}

export default Header
