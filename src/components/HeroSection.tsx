// HeroSection — introductory section with a headline and a prominent "Start Demo" CTA.
// Stage 8: Larger button, feature pill badges row, tighter mobile layout.

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
        <p className="text-amber-800 text-base sm:text-lg max-w-xl mx-auto mb-5">
          Find beginner-friendly experiments for Physics, Chemistry, and Biology
          using simple, local materials. No lab required.
        </p>

        {/* Feature pill badges */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-7"
          aria-label="App features"
        >
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-800 border border-green-200 px-2.5 py-1 rounded-full">
            <span aria-hidden="true">✅</span> Safe
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
            <span aria-hidden="true">🏡</span> Everyday Materials
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full">
            <span aria-hidden="true">📝</span> WAEC-Friendly
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 px-2.5 py-1 rounded-full">
            <span aria-hidden="true">📶</span> Offline Ready
          </span>
        </div>

        {/* Prominent Start Demo button */}
        <button
          id="start-demo-btn"
          type="button"
          onClick={handleStartDemo}
          className="bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold px-8 py-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all duration-200"
        >
          🚀 Start Demo
        </button>

        <p className="mt-3 text-sm text-amber-600">
          Scroll down or click above to begin
        </p>
      </div>
    </section>
  )
}

export default HeroSection
