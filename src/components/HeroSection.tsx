// HeroSection — introductory section with a headline and "Start Demo" CTA.
// Stage 8 + 2-page update: Start Demo navigates to Browse Experiments page.

import type { Page } from '../App'

interface Props {
  onNavigate: (page: Page) => void
}

function HeroSection({ onNavigate }: Props) {
  return (
    <section className="bg-amber-50 border-b border-amber-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3">
          Explore Science with What You Have
        </h2>
        <p className="text-amber-800 text-base sm:text-lg max-w-xl mx-auto mb-8">
          Find beginner-friendly experiments for Physics, Chemistry, and Biology
          using simple, local materials. No lab required.
        </p>

        {/* Start Demo — navigates to Browse Experiments page */}
        <button
          id="start-demo-btn"
          type="button"
          onClick={() => onNavigate('browse')}
          className="bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold px-10 py-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all duration-200"
        >
          Start Demo
        </button>
      </div>
    </section>
  )
}

export default HeroSection
