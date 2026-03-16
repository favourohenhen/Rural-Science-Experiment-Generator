// HeroSection — introductory section with a headline and a clear "Start Demo" CTA.
// Stage 8: Larger, more prominent button. Improved mobile padding.

function HeroSection() {
  function handleStartDemo() {
    const section = document.getElementById('browse-experiments')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

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

        {/* Prominent Start Demo button */}
        <button
          id="start-demo-btn"
          type="button"
          onClick={handleStartDemo}
          className="bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold px-10 py-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all duration-200"
        >
          Start Demo
        </button>
      </div>
    </section>
  )
}

export default HeroSection
