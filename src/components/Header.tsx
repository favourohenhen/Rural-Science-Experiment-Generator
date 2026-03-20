// Header — shows app name and navigation links.
// Stage 8 + 2-page update: Added nav links for Home and Browse Experiments.

import type { Page } from '../App'

interface Props {
  currentPage: Page
  onNavigate: (page: Page) => void
}

function Header({ currentPage, onNavigate }: Props) {
  return (
    <header className="w-full bg-amber-700 text-white py-4 px-4 sm:px-6 shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* App name and subtitle */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            🌿 Rural Science Experiment Generator
          </h1>
          <p className="text-amber-100 text-sm mt-0.5">
            Safe experiments for every classroom, using everyday materials.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-2 flex-wrap" aria-label="Main navigation">
          <button
            type="button"
            id="nav-home"
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
              currentPage === 'home'
                ? 'bg-white text-amber-800'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            id="nav-browse"
            onClick={() => onNavigate('browse')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
              currentPage === 'browse'
                ? 'bg-white text-amber-800'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            Browse Experiments
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
