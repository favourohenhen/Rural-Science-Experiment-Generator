// Header component — shows app name and subtitle at the top of every page.
// Stage 8: Improved mobile padding and layout.

function Header() {
  return (
    <header className="w-full bg-amber-700 text-white py-4 px-4 sm:px-6 shadow-sm">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          🌿 Rural Science Experiment Generator
        </h1>
        <p className="text-amber-100 text-sm mt-0.5">
          Safe experiments for every classroom, using everyday materials.
        </p>
      </div>
    </header>
  )
}

export default Header
