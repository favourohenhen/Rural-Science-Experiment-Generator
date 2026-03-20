// App.tsx — root component. Manages page state for simple 2-page routing.
// Pages: 'home' | 'browse'
// Stage 8 + 2-page update: Added onNavigate prop threading; no extra router package needed.

import { useState } from 'react'
import data from './data/experiments.json'
import type { ExperimentsData } from './types'

import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturedExperiments from './components/FeaturedExperiments'
import BrowseExperiments from './components/BrowseExperiments'

// Cast the imported JSON to our typed interface.
const experimentsData = data as ExperimentsData

// Page type used across the app for navigation.
export type Page = 'home' | 'browse'

function App() {
  // ─── Simple page state — no router library needed ─────────────────────────
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const featured = experimentsData?.featured_experiments ?? []
  const subjects = experimentsData?.subjects ?? []
  const topics = experimentsData?.topics ?? []

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip-to-content link — visible on keyboard focus only */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-amber-800 focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:border focus:border-amber-400"
      >
        Skip to main content
      </a>

      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      <main id="main-content" className="flex-1">
        {currentPage === 'home' ? (
          <>
            <HeroSection onNavigate={setCurrentPage} />
            <FeaturedExperiments experiments={featured} />
          </>
        ) : (
          <BrowseExperiments subjects={subjects} topics={topics} />
        )}
      </main>

      <footer className="text-center text-xs text-stone-400 py-6 border-t border-amber-100">
        Rural Science Experiment Generator — Stage 8 · Demo Ready
      </footer>
    </div>
  )
}

export default App
