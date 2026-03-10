// HeroSection — introductory section with a headline and a "Start Demo" CTA.
// The button scrolls to the featured experiments section (no routing needed).

function HeroSection() {
  function handleStartDemo() {
    const section = document.getElementById('featured-experiments')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-amber-50 border-b border-amber-100 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-3">
          Explore Science with What You Have
        </h2>
        <p className="text-amber-800 text-lg max-w-xl mx-auto mb-6">
          Find beginner-friendly experiments for Physics, Chemistry, and Biology
          using simple, local materials. No lab required.
        </p>
        <button
          id="start-demo-btn"
          onClick={handleStartDemo}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Start Demo
        </button>
      </div>
    </section>
  )
}

export default HeroSection
