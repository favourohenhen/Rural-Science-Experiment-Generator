// App.tsx — root component. Imports the local JSON file and passes data to
// each section. All data access is null-safe via optional chaining.
// Stage 8: Added DemoFlowBanner, skip-to-content link, and updated footer.

import data from './data/experiments.json'
import type { ExperimentsData } from './types'

import Header from './components/Header'
import DemoFlowBanner from './components/DemoFlowBanner'
import HeroSection from './components/HeroSection'
import FeaturedExperiments from './components/FeaturedExperiments'
import BrowseBySubject from './components/BrowseBySubject'
import BrowseByTopic from './components/BrowseByTopic'
import BrowseExperiments from './components/BrowseExperiments'

// Cast the imported JSON to our typed interface.
const experimentsData = data as ExperimentsData

function App() {
  const featured = experimentsData?.featured_experiments ?? []
  const subjects  = experimentsData?.subjects ?? []
  const topics    = experimentsData?.topics ?? []

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip-to-content link — visible on keyboard focus only */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-amber-800 focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:border focus:border-amber-400"
      >
        Skip to main content
      </a>

      <Header />
      <DemoFlowBanner />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <FeaturedExperiments experiments={featured} />
        <BrowseBySubject subjects={subjects} />
        <BrowseByTopic topics={topics} />
        <BrowseExperiments subjects={subjects} topics={topics} />
      </main>

      <footer className="text-center text-xs text-stone-400 py-6 border-t border-amber-100">
        Rural Science Experiment Generator — Stage 8 · Demo Ready
      </footer>
    </div>
  )
}

export default App
