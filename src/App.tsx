// App.tsx — root component. Imports the local JSON file and passes data to
// each section. All data access is null-safe via optional chaining.

import data from './data/experiments.json'
import type { ExperimentsData } from './types'

import Header from './components/Header'
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
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedExperiments experiments={featured} />
        <BrowseBySubject subjects={subjects} />
        <BrowseByTopic topics={topics} />
        <BrowseExperiments subjects={subjects} topics={topics} />
      </main>
      <footer className="text-center text-xs text-stone-400 py-6 border-t border-amber-100">
        Rural Science Experiment Generator — Stage 1
      </footer>
    </div>
  )
}

export default App
