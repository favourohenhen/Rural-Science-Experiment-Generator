// ConceptTeaching.tsx — Stage 5 component.
// Replaces the old plain concept_explanation section and diagram_hint text.
//
// This component shows four sub-sections inside the experiment detail view:
//   1. Concept Explanation  — the existing concept_explanation text, better styled
//   2. Key Principle box    — a highlighted one-sentence summary from conceptData.ts
//   3. Key Terms list       — vocabulary words with short explanations
//   4. Formula/Rule box     — shown only when formula data exists for the topic
//   5. Diagram block        — simple SVG/CSS diagram, or a diagram_hint fallback box

import type { FlatExperiment } from '../types'
import { getConceptData } from '../data/conceptData'

interface Props {
  experiment: FlatExperiment
}

// ── Helpers ────────────────────────────────────────────────────────────────────

// Each key term is stored as "Term — explanation". Split on " — " for display.
function parseKeyTerm(term: string): { word: string; meaning: string } {
  const parts = term.split(' — ')
  if (parts.length >= 2) {
    return { word: parts[0], meaning: parts.slice(1).join(' — ') }
  }
  return { word: term, meaning: '' }
}

// ── Simple inline SVG diagrams per topic ─────────────────────────────────────
// Each function returns a small educational SVG (symbolic, not realistic).
// All are under ~50 lines so they stay readable.

function DiagramElectricity() {
  return (
    <svg viewBox="0 0 280 120" className="w-full max-w-sm mx-auto" aria-label="Circuit diagram">
      {/* Battery */}
      <rect x="10" y="50" width="30" height="20" rx="3" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
      <text x="25" y="65" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">BAT</text>
      {/* Wires forming a loop */}
      <polyline points="40,55 130,55 130,30 200,30 200,90 130,90 130,70 40,70"
        fill="none" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
      {/* Bulb circle */}
      <circle cx="200" cy="60" r="20" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="200" y="64" textAnchor="middle" fontSize="11" fill="#92400e">💡</text>
      {/* Labels */}
      <text x="25" y="88" textAnchor="middle" fontSize="8" fill="#6b7280">Battery</text>
      <text x="200" y="90" textAnchor="middle" fontSize="8" fill="#6b7280">Bulb</text>
      <text x="120" y="22" textAnchor="middle" fontSize="8" fill="#6b7280">Wire (closed loop)</text>
    </svg>
  )
}

function DiagramAcidBase() {
  // Four coloured cups showing indicator colour change
  const cups = [
    { x: 20,  label: 'Acid',    color: '#fca5a5', text: 'Pink/Red' },
    { x: 85,  label: 'Neutral', color: '#86efac', text: 'Purple'   },
    { x: 150, label: 'Base',    color: '#93c5fd', text: 'Blue/Green'},
    { x: 215, label: 'Base+',   color: '#6ee7b7', text: 'Yellow'   },
  ]
  return (
    <svg viewBox="0 0 280 110" className="w-full max-w-sm mx-auto" aria-label="Acid-base indicator diagram">
      {cups.map((c) => (
        <g key={c.x}>
          {/* Cup trapezoid */}
          <polygon points={`${c.x},30 ${c.x+50},30 ${c.x+44},90 ${c.x+6},90`}
            fill={c.color} stroke="#9ca3af" strokeWidth="1.5" />
          <text x={c.x + 25} y={64} textAnchor="middle" fontSize="8" fill="#1f2937" fontWeight="bold">{c.text}</text>
          <text x={c.x + 25} y={104} textAnchor="middle" fontSize="8" fill="#6b7280">{c.label}</text>
        </g>
      ))}
      <text x="140" y="16" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="bold">Indicator colour change</text>
    </svg>
  )
}

function DiagramSeparation() {
  // Layer order top → bottom matches water flow direction:
  // Dirty water enters → Stones (largest particles) → Sand (medium) → Cloth (finest trap) → cleaner water exits
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" aria-label="Filtration funnel diagram">
      {/* Funnel outer shape */}
      <polygon points="40,20 160,20 130,80 70,80" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" />

      {/* TOP layer — Stones / Gravel (first to catch large debris) */}
      <polygon points="85,45 115,45 112,35 88,35" fill="#6b7280" />
      <text x="100" y="42" textAnchor="middle" fontSize="7" fill="white">Stones</text>

      {/* MIDDLE layer — Sand (catches medium particles) */}
      <polygon points="80,60 120,60 115,45 85,45" fill="#d2b48c" />
      <text x="100" y="55" textAnchor="middle" fontSize="7" fill="#3d1f00">Sand</text>

      {/* BOTTOM layer — Cloth (finest filter, sits at neck) */}
      <polygon points="72,80 128,80 120,60 80,60" fill="#fef9c3" stroke="#ca8a04" strokeWidth="0.5" />
      <text x="100" y="72" textAnchor="middle" fontSize="7" fill="#713f12" fontWeight="bold">Cloth</text>

      {/* Funnel neck */}
      <line x1="90" y1="80" x2="85" y2="115" stroke="#6b7280" strokeWidth="3" />
      <line x1="110" y1="80" x2="115" y2="115" stroke="#6b7280" strokeWidth="3" />

      {/* Cleaner water drop */}
      <ellipse cx="100" cy="125" rx="6" ry="10" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
      <text x="100" y="148" textAnchor="middle" fontSize="8" fill="#3b82f6">Cleaner water</text>

      {/* Entry label */}
      <text x="100" y="13" textAnchor="middle" fontSize="8" fill="#92400e">Dirty water ↓</text>
    </svg>
  )
}

function DiagramAirPressure() {
  // Cup dimensions — upside down, so the closed base is at the TOP
  // and the open mouth faces DOWN toward the card.
  const cupLeft = 55, cupRight = 145, cupTop = 18, cupBottom = 82
  const wallThickness = 9
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" aria-label="Air pressure upside-down cup diagram">

      {/* ── Water fill (drawn first, sits inside the cup walls) ── */}
      <rect
        x={cupLeft + wallThickness} y={cupTop + wallThickness}
        width={cupRight - cupLeft - wallThickness * 2}
        height={cupBottom - cupTop - wallThickness}
        fill="#bfdbfe"
      />
      <text x="100" y="63" textAnchor="middle" fontSize="9" fill="#1e40af">Water</text>

      {/* ── Cup walls drawn ON TOP of water so they stay visible ── */}
      {/* Closed base (at top — this is the actual bottom of the cup) */}
      <rect x={cupLeft} y={cupTop} width={cupRight - cupLeft} height={wallThickness}
        fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
      {/* Left wall */}
      <rect x={cupLeft} y={cupTop} width={wallThickness} height={cupBottom - cupTop}
        fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
      {/* Right wall */}
      <rect x={cupRight - wallThickness} y={cupTop} width={wallThickness} height={cupBottom - cupTop}
        fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />

      {/* Cup label */}
      <text x="100" y="14" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="bold">
        Cup (upside down)
      </text>

      {/* ── Card covering the open mouth ── */}
      <rect x={cupLeft - 6} y={cupBottom} width={cupRight - cupLeft + 12} height="9"
        rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="100" y="99" textAnchor="middle" fontSize="7" fill="#92400e" fontWeight="bold">Card</text>

      {/* ── Air pressure arrows pushing upward ── */}
      <line x1="75"  y1="130" x2="75"  y2="98" stroke="#059669" strokeWidth="2" markerEnd="url(#apArrow)" />
      <line x1="100" y1="130" x2="100" y2="98" stroke="#059669" strokeWidth="2" markerEnd="url(#apArrow)" />
      <line x1="125" y1="130" x2="125" y2="98" stroke="#059669" strokeWidth="2" markerEnd="url(#apArrow)" />
      <defs>
        <marker id="apArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#059669" />
        </marker>
      </defs>
      <text x="100" y="148" textAnchor="middle" fontSize="8" fill="#059669">
        Air pressure pushes card up
      </text>
    </svg>
  )
}

function DiagramDensity() {
  return (
    <svg viewBox="0 0 220 130" className="w-full max-w-sm mx-auto" aria-label="Density diagram">
      {/* Cup 1 — plain water */}
      <rect x="15" y="20" width="80" height="90" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Egg near bottom */}
      <ellipse cx="55" cy="95" rx="18" ry="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="55" y="100" textAnchor="middle" fontSize="8" fill="#92400e">🥚</text>
      <text x="55" y="17" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">Plain water</text>
      <text x="55" y="120" textAnchor="middle" fontSize="8" fill="#6b7280">Egg sinks</text>

      {/* Cup 2 — salt water */}
      <rect x="125" y="20" width="80" height="90" rx="4" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
      {/* Egg floating near top */}
      <ellipse cx="165" cy="45" rx="18" ry="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="165" y="50" textAnchor="middle" fontSize="8" fill="#92400e">🥚</text>
      <text x="165" y="17" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">Salt water</text>
      <text x="165" y="120" textAnchor="middle" fontSize="8" fill="#6b7280">Egg floats</text>
    </svg>
  )
}

function DiagramHeat() {
  return (
    <svg viewBox="0 0 240 130" className="w-full max-w-sm mx-auto" aria-label="Heat expansion diagram">
      {/* Bottle 1 warm */}
      <rect x="20" y="50" width="40" height="70" rx="5" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" />
      <ellipse cx="40" cy="38" rx="14" ry="20" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" />
      <text x="40" y="41" textAnchor="middle" fontSize="8" fill="#7f1d1d">Big</text>
      <text x="40" y="130" textAnchor="middle" fontSize="8" fill="#ef4444">Warm water</text>
      <text x="40" y="44" textAnchor="middle" fontSize="7" fill="#7f1d1d">balloon</text>
      {/* Arrow */}
      <text x="100" y="80" textAnchor="middle" fontSize="20" fill="#d1d5db">↔</text>
      {/* Bottle 2 cool */}
      <rect x="150" y="50" width="40" height="70" rx="5" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" />
      <ellipse cx="170" cy="46" rx="8" ry="12" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="170" y="50" textAnchor="middle" fontSize="7" fill="#1e40af">Small</text>
      <text x="170" y="130" textAnchor="middle" fontSize="8" fill="#3b82f6">Cool water</text>
      {/* Heat label */}
      <text x="120" y="20" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="bold">Heat → Air expands</text>
    </svg>
  )
}

function DiagramMagnetism() {
  return (
    <svg viewBox="0 0 220 130" className="w-full max-w-sm mx-auto" aria-label="Compass diagram">
      {/* Bowl of water */}
      <ellipse cx="110" cy="90" rx="80" ry="30" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
      <ellipse cx="110" cy="80" rx="80" ry="12" fill="none" stroke="#3b82f6" strokeWidth="1" />
      <text x="110" y="115" textAnchor="middle" fontSize="8" fill="#1e40af">Bowl of still water</text>
      {/* Float */}
      <ellipse cx="110" cy="78" rx="18" ry="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
      {/* Needle pointing N–S */}
      <line x1="82" y1="78" x2="138" y2="78" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <polygon points="138,78 130,74 130,82" fill="#dc2626" />
      <polygon points="82,78 90,74 90,82" fill="#374151" />
      {/* Labels */}
      <text x="148" y="81" fontSize="9" fill="#dc2626" fontWeight="bold">N</text>
      <text x="68" y="81" fontSize="9" fill="#374151" fontWeight="bold">S</text>
      <text x="110" y="28" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="bold">Needle aligns with Earth's field</text>
    </svg>
  )
}

function DiagramLight() {
  return (
    <svg viewBox="0 0 220 150" className="w-full max-w-sm mx-auto" aria-label="Refraction diagram">
      {/* Cup */}
      <polygon points="40,40 180,40 165,130 55,130" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Water surface label */}
      <line x1="40" y1="40" x2="180" y2="40" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,2" />
      <text x="190" y="44" fontSize="8" fill="#3b82f6">Surface</text>
      {/* Pencil in water (appears bent) */}
      <line x1="145" y1="10" x2="110" y2="40" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      <line x1="110" y1="40" x2="100" y2="120" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      {/* Apparent bend indicator */}
      <text x="115" y="37" fontSize="8" fill="#dc2626">← bends here</text>
      {/* Label */}
      <text x="110" y="148" textAnchor="middle" fontSize="8" fill="#374151">Pencil looks bent — it is not!</text>
    </svg>
  )
}

function DiagramPlants() {
  return (
    <svg viewBox="0 0 180 160" className="w-full max-w-xs mx-auto" aria-label="Plant transport diagram">
      {/* Cup */}
      <polygon points="30,90 150,90 140,150 40,150" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="90" y="128" textAnchor="middle" fontSize="8" fill="#4c1d95">Coloured water</text>
      {/* Stem */}
      <rect x="82" y="20" width="16" height="72" rx="4" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
      <text x="90" y="58" textAnchor="middle" fontSize="7" fill="#14532d" fontWeight="bold">Stem</text>
      {/* Upward arrows inside stem */}
      <text x="90" y="45" textAnchor="middle" fontSize="10" fill="#15803d">↑</text>
      <text x="90" y="75" textAnchor="middle" fontSize="10" fill="#15803d">↑</text>
      {/* Leaf */}
      <ellipse cx="110" cy="20" rx="22" ry="14" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />
      <text x="110" y="24" textAnchor="middle" fontSize="8" fill="#14532d">Leaf</text>
      {/* Xylem label */}
      <text x="55" y="58" textAnchor="end" fontSize="7" fill="#7c3aed">Xylem ←</text>
    </svg>
  )
}

function DiagramOsmosis() {
  return (
    <svg viewBox="0 0 260 130" className="w-full max-w-sm mx-auto" aria-label="Osmosis diagram">
      {/* Cup 1 — plain water, potato gains water */}
      <rect x="10" y="20" width="100" height="90" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="40" y="40" width="40" height="60" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="60" y="74" textAnchor="middle" fontSize="7" fill="#92400e" fontWeight="bold">Potato</text>
      {/* Arrows into potato */}
      <text x="25" y="72" textAnchor="middle" fontSize="12" fill="#3b82f6">→</text>
      <text x="95" y="72" textAnchor="middle" fontSize="12" fill="#3b82f6">←</text>
      <text x="60" y="17" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">Plain water</text>
      <text x="60" y="120" textAnchor="middle" fontSize="7" fill="#059669">Potato firms up</text>

      {/* vs label */}
      <text x="140" y="70" textAnchor="middle" fontSize="14" fill="#9ca3af" fontWeight="bold">vs</text>

      {/* Cup 2 — salt water, potato loses water */}
      <rect x="155" y="20" width="100" height="90" rx="4" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="185" y="40" width="40" height="60" rx="3" fill="#fed7aa" stroke="#d97706" strokeWidth="1.5" />
      <text x="205" y="74" textAnchor="middle" fontSize="7" fill="#92400e" fontWeight="bold">Potato</text>
      {/* Arrows out of potato */}
      <text x="170" y="72" textAnchor="middle" fontSize="12" fill="#7c3aed">←</text>
      <text x="240" y="72" textAnchor="middle" fontSize="12" fill="#7c3aed">→</text>
      <text x="205" y="17" textAnchor="middle" fontSize="8" fill="#6d28d9" fontWeight="bold">Salt water</text>
      <text x="205" y="120" textAnchor="middle" fontSize="7" fill="#dc2626">Potato softens</text>
    </svg>
  )
}

function DiagramMotion() {
  return (
    <svg viewBox="0 0 260 130" className="w-full max-w-sm mx-auto" aria-label="Ramp and car diagram">
      {/* Floor */}
      <line x1="10" y1="110" x2="250" y2="110" stroke="#9ca3af" strokeWidth="2" />
      {/* Low ramp */}
      <polygon points="10,110 80,110 80,80 10,110" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" />
      <text x="30" y="107" fontSize="7" fill="#374151">Low</text>
      {/* Short arrow */}
      <line x1="80" y1="107" x2="130" y2="107" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow2)" />
      {/* High ramp */}
      <polygon points="140,110 210,110 210,50 140,110" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="155" y="100" fontSize="7" fill="#1e40af">High</text>
      {/* Long arrow */}
      <line x1="210" y1="107" x2="255" y2="107" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow3)" />
      {/* Labels */}
      <text x="105" y="96" textAnchor="middle" fontSize="7" fill="#d97706">Short distance</text>
      <text x="232" y="96" textAnchor="middle" fontSize="8" fill="#1e40af">Farther!</text>
      <text x="130" y="20" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="bold">Higher ramp → more speed → farther</text>
      <defs>
        <marker id="arrow2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 z" fill="#f59e0b" />
        </marker>
        <marker id="arrow3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 z" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>
  )
}

// ── Experiment-specific diagrams ──────────────────────────────────────────────
// exp_003 — Natural Indicator with Hibiscus or Red Cabbage
// diagram_hint: four cups labeled lemon juice, plain water, soap water, baking soda solution
function DiagramIndicatorCups() {
  // Actual substances used in the experiment and their indicator colour results
  const cups = [
    { label: 'Lemon\njuice',   color: '#fca5a5', result: 'Pink/Red',   note: 'Acid'    },
    { label: 'Plain\nwater',  color: '#c4b5fd', result: 'Purple',     note: 'Neutral' },
    { label: 'Soap\nwater',   color: '#93c5fd', result: 'Blue/Green', note: 'Base'    },
    { label: 'Baking\nsoda',  color: '#6ee7b7', result: 'Yellow',     note: 'Base'    },
  ]
  const startX = 10, gap = 65
  return (
    <svg viewBox="0 0 280 120" className="w-full max-w-sm mx-auto" aria-label="Natural indicator cups diagram">
      <text x="140" y="10" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="bold">
        Indicator colour in each cup
      </text>
      {cups.map((c, i) => {
        const cx = startX + i * gap
        return (
          <g key={i}>
            {/* Cup trapezoid — wider at top, narrower at bottom */}
            <polygon
              points={`${cx},22 ${cx+52},22 ${cx+46},82 ${cx+6},82`}
              fill={c.color} stroke="#9ca3af" strokeWidth="1.5"
            />
            {/* Colour result label inside cup */}
            <text x={cx + 28} y={55} textAnchor="middle" fontSize="7" fill="#1f2937" fontWeight="bold">
              {c.result}
            </text>
            {/* Substance name below cup — split across two tspans to handle \n */}
            <text x={cx + 28} y={94} textAnchor="middle" fontSize="7" fill="#374151">
              {c.label.split('\n').map((line, li) => (
                <tspan key={li} x={cx + 28} dy={li === 0 ? 0 : 11}>{line}</tspan>
              ))}
            </text>
          </g>
        )
      })}
      {/* Arrow labels */}
      <text x="18" y="116" fontSize="6" fill="#dc2626">↑ Acid</text>
      <text x="200" y="116" fontSize="6" fill="#3b82f6">↑ Base</text>
    </svg>
  )
}
// Used when a topic-level diagram doesn't match a particular experiment's
// diagram_hint. Keyed by experiment id. Checked BEFORE the topic map.

// exp_002 — Conductors & Insulators: circuit with a GAP and a test material
function DiagramConductors() {
  return (
    <svg viewBox="0 0 280 120" className="w-full max-w-sm mx-auto" aria-label="Conductors and insulators diagram">
      {/* Battery */}
      <rect x="10" y="48" width="30" height="20" rx="3" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
      <text x="25" y="62" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">BAT</text>
      {/* Bulb on right */}
      <circle cx="220" cy="58" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="220" y="62" textAnchor="middle" fontSize="11" fill="#92400e">💡</text>
      {/* Top wire: battery → gap */}
      <line x1="40" y1="53" x2="95" y2="53" stroke="#374151" strokeWidth="2" />
      {/* Top wire: gap → bulb */}
      <line x1="155" y1="53" x2="202" y2="53" stroke="#374151" strokeWidth="2" />
      {/* Bottom wire: battery → bulb (complete) */}
      <line x1="40" y1="68" x2="202" y2="68" stroke="#374151" strokeWidth="2" />
      {/* GAP — two exposed wire ends */}
      <circle cx="95"  cy="53" r="4" fill="white" stroke="#374151" strokeWidth="2" />
      <circle cx="155" cy="53" r="4" fill="white" stroke="#374151" strokeWidth="2" />
      {/* Test material bridging the gap */}
      <rect x="90" y="43" width="70" height="20" rx="4" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1.5" />
      <text x="125" y="57" textAnchor="middle" fontSize="8" fill="#1a2e05" fontWeight="bold">Test material</text>
      {/* Labels */}
      <text x="25" y="85" textAnchor="middle" fontSize="7" fill="#6b7280">Battery</text>
      <text x="220" y="83" textAnchor="middle" fontSize="7" fill="#6b7280">Bulb</text>
      <text x="125" y="8" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="bold">Gap in circuit — place test material here</text>
      <text x="125" y="18" textAnchor="middle" fontSize="7" fill="#6b7280">Bulb lights → conductor  |  Bulb stays off → insulator</text>
    </svg>
  )
}

// exp_004 — Vinegar + Baking Soda: bottle with balloon inflating from gas
function DiagramBalloonReaction() {
  return (
    <svg viewBox="0 0 180 160" className="w-full max-w-xs mx-auto" aria-label="Acid-base balloon reaction diagram">
      {/* Bottle body */}
      <rect x="60" y="70" width="60" height="75" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="90" y="112" textAnchor="middle" fontSize="8" fill="#065f46" fontWeight="bold">Vinegar</text>
      {/* Bottle neck */}
      <rect x="76" y="55" width="28" height="18" rx="3" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      {/* Baking soda falling from balloon into bottle */}
      <text x="90" y="68" textAnchor="middle" fontSize="7" fill="#6b7280">↓ powder</text>
      {/* Balloon — inflated, sits over the neck */}
      <ellipse cx="90" cy="28" rx="28" ry="24" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5" />
      <text x="90" y="26" textAnchor="middle" fontSize="7" fill="#7f1d1d" fontWeight="bold">Balloon</text>
      <text x="90" y="36" textAnchor="middle" fontSize="7" fill="#7f1d1d">inflates!</text>
      {/* Balloon tie at bottom */}
      <line x1="90" y1="52" x2="90" y2="55" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      {/* CO2 gas rising bubbles */}
      <circle cx="80" cy="88" r="4" fill="none" stroke="#6b7280" strokeWidth="1" />
      <circle cx="95" cy="78" r="3" fill="none" stroke="#6b7280" strokeWidth="1" />
      <circle cx="105" cy="86" r="5" fill="none" stroke="#6b7280" strokeWidth="1" />
      {/* Label */}
      <text x="90" y="155" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="bold">CO₂ gas rises and fills balloon</text>
    </svg>
  )
}

// exp_006 — Evaporation & Salt Recovery: two dishes before/after in sunlight
function DiagramEvaporation() {
  return (
    <svg viewBox="0 0 260 140" className="w-full max-w-sm mx-auto" aria-label="Evaporation diagram">
      {/* Sun */}
      <circle cx="130" cy="18" r="12" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      {/* Sun rays */}
      {[0,45,90,135,180,225,270,315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 130 + 14 * Math.cos(rad), y1 = 18 + 14 * Math.sin(rad)
        const x2 = 130 + 20 * Math.cos(rad), y2 = 18 + 20 * Math.sin(rad)
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="1.5" />
      })}

      {/* Dish 1 — full salt solution */}
      <ellipse cx="65" cy="95" rx="52" ry="14" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="13" y="82" width="104" height="13" fill="#bfdbfe" />
      <ellipse cx="65" cy="82" rx="52" ry="10" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="65" y="86" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">Salt solution</text>
      <text x="65" y="115" textAnchor="middle" fontSize="8" fill="#374151">Before</text>
      {/* Evaporation arrows from dish 1 */}
      <text x="40" y="68" textAnchor="middle" fontSize="10" fill="#9ca3af">↑</text>
      <text x="65" y="62" textAnchor="middle" fontSize="10" fill="#9ca3af">↑</text>
      <text x="90" y="68" textAnchor="middle" fontSize="10" fill="#9ca3af">↑</text>
      <text x="65" y="55" textAnchor="middle" fontSize="7" fill="#9ca3af">water vapour</text>

      {/* Arrow between dishes */}
      <text x="130" y="95" textAnchor="middle" fontSize="18" fill="#d1d5db">→</text>

      {/* Dish 2 — dry with crystals */}
      <ellipse cx="195" cy="105" rx="52" ry="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="143" y="96" width="104" height="9" fill="#f5f3ff" />
      <ellipse cx="195" cy="96" rx="52" ry="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      {/* Salt crystal dots */}
      {[170,185,200,215,180,200].map((cx, i) => (
        <rect key={i} x={cx} y={i % 2 === 0 ? 90 : 93} width="6" height="5" rx="1"
          fill="#a78bfa" stroke="#7c3aed" strokeWidth="0.8" />
      ))}
      <text x="195" y="122" textAnchor="middle" fontSize="8" fill="#374151">After — salt crystals left</text>
    </svg>
  )
}

// exp_013 — Seed Germination
// caption: "Draw a container with wet cotton and seeds on top.
//            Show later stages with a root and a shoot emerging from the seed."
// Design: two-stage side-by-side layout
//   Stage 1 — container + wet cotton + 3 seeds sitting on top (before)
//   Stage 2 — same container + one seed with root ↓ and shoot ↑  (after)
function DiagramGermination() {
  return (
    <svg
      viewBox="0 0 300 175"
      className="w-full max-w-sm mx-auto"
      aria-label="Seed germination two-stage diagram"
    >
      {/* ─── Header ─────────────────────────────────────── */}
      <text x="150" y="12" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="bold">
        Seed Germination Stages
      </text>

      {/* ─── Stage 1 (left) — Seeds on wet cotton ──────── */}
      <text x="68" y="26" textAnchor="middle" fontSize="8" fill="#6b7280" fontStyle="italic">
        Stage 1: Before
      </text>

      {/* Container outline */}
      <rect x="8" y="32" width="120" height="90" rx="6"
        fill="white" stroke="#16a34a" strokeWidth="2" />
      {/* Container label */}
      <text x="68" y="47" textAnchor="middle" fontSize="7" fill="#16a34a" fontWeight="bold">
        Container
      </text>

      {/* Wet cotton layer */}
      <rect x="12" y="96" width="112" height="22" rx="4"
        fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="68" y="111" textAnchor="middle" fontSize="7" fill="#065f46" fontWeight="bold">
        Wet cotton
      </text>
      {/* Water drop dots on cotton */}
      <circle cx="30"  cy="104" r="3" fill="#93c5fd" opacity="0.8"/>
      <circle cx="68"  cy="102" r="3" fill="#93c5fd" opacity="0.8"/>
      <circle cx="106" cy="104" r="3" fill="#93c5fd" opacity="0.8"/>

      {/* 3 seeds resting on top of cotton */}
      <ellipse cx="32"  cy="92" rx="13" ry="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <ellipse cx="68"  cy="92" rx="13" ry="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <ellipse cx="104" cy="92" rx="13" ry="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>

      {/* "Seeds" label with pointer */}
      <text x="68" y="72" textAnchor="middle" fontSize="7" fill="#92400e" fontWeight="bold">
        Seeds
      </text>
      <line x1="68" y1="74" x2="68" y2="83" stroke="#92400e" strokeWidth="1" strokeDasharray="2,2"/>

      {/* Conditions note */}
      <text x="68" y="134" textAnchor="middle" fontSize="7" fill="#6b7280">
        Keep moist 3–5 days
      </text>

      {/* ─── Arrow between stages ───────────────────────── */}
      <text x="148" y="88" textAnchor="middle" fontSize="22" fill="#d1d5db">→</text>

      {/* ─── Stage 2 (right) — Germinated seed ─────────── */}
      <text x="232" y="26" textAnchor="middle" fontSize="8" fill="#6b7280" fontStyle="italic">
        Stage 2: After
      </text>

      {/* Container outline */}
      <rect x="172" y="32" width="120" height="90" rx="6"
        fill="white" stroke="#16a34a" strokeWidth="2" />

      {/* Wet cotton layer */}
      <rect x="176" y="96" width="112" height="22" rx="4"
        fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="232" y="111" textAnchor="middle" fontSize="7" fill="#065f46" fontWeight="bold">
        Wet cotton
      </text>

      {/* ── Root ── grows down through cotton */}
      <line x1="232" y1="92" x2="232" y2="118"
        stroke="#92400e" strokeWidth="3" strokeLinecap="round"/>
      {/* Root arrowhead */}
      <polygon points="232,121 228,113 236,113" fill="#92400e"/>
      {/* Root label */}
      <text x="250" y="110" fontSize="7" fill="#92400e" fontWeight="bold">Root</text>
      <text x="250" y="120" fontSize="6" fill="#92400e">(grows ↓)</text>

      {/* ── Germinated seed in the middle */}
      <ellipse cx="232" cy="88" rx="14" ry="9"
        fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="232" y="92" textAnchor="middle" fontSize="7" fill="#92400e" fontWeight="bold">
        Seed
      </text>

      {/* ── Shoot ── grows upward */}
      <line x1="232" y1="79" x2="232" y2="50"
        stroke="#16a34a" strokeWidth="3" strokeLinecap="round"/>
      {/* Small leaf at tip of shoot */}
      <ellipse cx="250" cy="54" rx="18" ry="10"
        fill="#4ade80" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="250" y="58" textAnchor="middle" fontSize="7" fill="#14532d">Leaf</text>
      {/* Shoot label */}
      <text x="205" y="58" fontSize="7" fill="#16a34a" fontWeight="bold">Shoot</text>
      <text x="205" y="68" fontSize="6" fill="#16a34a">(grows ↑)</text>

      {/* ─── Footer caption ──────────────────────────────── */}
      <text x="150" y="160" textAnchor="middle" fontSize="8" fill="#374151">
        Root grows down first, then shoot pushes up
      </text>
      <text x="150" y="172" textAnchor="middle" fontSize="7" fill="#6b7280">
        Needs: Water · Air · Warmth
      </text>
    </svg>
  )
}

// Map topic_id → diagram component
const DIAGRAMS: Record<string, () => JSX.Element> = {
  electricity:           DiagramElectricity,
  acids_and_bases:       DiagramAcidBase,
  separation_techniques: DiagramSeparation,
  air_pressure:          DiagramAirPressure,
  density:               DiagramDensity,
  heat:                  DiagramHeat,
  magnetism:             DiagramMagnetism,
  light:                 DiagramLight,
  plants:                DiagramPlants,
  osmosis:               DiagramOsmosis,
  motion:                DiagramMotion,
}

// Experiment-level diagrams take priority over topic-level when there is a mismatch.
// Add an entry here any time a specific experiment's diagram_hint doesn't match
// its topic's shared diagram.
const EXPERIMENT_DIAGRAMS: Record<string, () => JSX.Element> = {
  exp_002: DiagramConductors,       // conductors/insulators: gap circuit with test material
  exp_003: DiagramIndicatorCups,    // natural indicator: cups with actual substance names + colours
  exp_004: DiagramBalloonReaction,  // vinegar + baking soda: bottle + inflating balloon + CO₂
  exp_006: DiagramEvaporation,      // salt evaporation: two dishes before/after, not filtration funnel
  exp_013: DiagramGermination,      // seed germination: cotton + seed + root/shoot, not stem transport
}


// ── Main Component ─────────────────────────────────────────────────────────────

function ConceptTeaching({ experiment }: Props) {
  const { id, topic_id, concept_explanation, diagram_hint } = experiment
  const conceptData = getConceptData(topic_id)

  // Check experiment-specific diagram first (exact match), then fall back to topic-level.
  const DiagramComponent = EXPERIMENT_DIAGRAMS[id] ?? DIAGRAMS[topic_id] ?? null

  return (
    <section className="space-y-5">

      {/* ── Section heading ─────────────────────────────────────────────────── */}
      <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide">
        💡 Concept &amp; Science Explained
      </h3>

      {/* ── 1. Concept Explanation ─────────────────────────────────────────── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
          What is happening?
        </p>
        <p className="text-sm text-stone-700 leading-relaxed">
          {concept_explanation || 'No concept explanation available for this experiment.'}
        </p>
      </div>

      {/* ── 2. Key Principle — only if conceptData exists ──────────────────── */}
      {conceptData && (
        <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl px-4 py-3">
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">
            🔑 Key Principle
          </p>
          <p className="text-sm text-green-900 font-medium leading-relaxed">
            {conceptData.keyPrinciple}
          </p>
        </div>
      )}

      {/* ── 3. Key Terms — only if conceptData exists ──────────────────────── */}
      {conceptData && conceptData.keyTerms.length > 0 && (
        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">
            📖 Key Terms
          </p>
          <ul className="space-y-2">
            {conceptData.keyTerms.map((term, index) => {
              const { word, meaning } = parseKeyTerm(term)
              return (
                <li
                  key={index}
                  className="flex items-start gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2"
                >
                  <span className="bg-amber-200 text-amber-900 text-xs font-bold rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    {word}
                  </span>
                  {meaning && (
                    <span className="text-sm text-stone-600 leading-relaxed">{meaning}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* ── 4. Formula / Rule box — only shown when formula data exists ────── */}
      {conceptData?.formula && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">
            📐 {conceptData.formulaLabel ?? 'Formula'}
          </p>
          <p className="text-sm font-mono font-semibold text-blue-900 bg-white border border-blue-100 rounded-lg px-3 py-2 mt-1">
            {conceptData.formula}
          </p>
        </div>
      )}

      {/* ── 5. Diagram block ────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">
          ✏️ Diagram
        </p>

        {DiagramComponent ? (
          // Render the topic-specific SVG diagram
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-2">
            <DiagramComponent />
            {diagram_hint && (
              <p className="text-xs text-stone-400 italic text-center max-w-xs">
                {diagram_hint}
              </p>
            )}
          </div>
        ) : diagram_hint ? (
          // Fallback: show diagram_hint text in a styled box
          <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <span className="text-2xl shrink-0">🖼️</span>
            <p className="text-sm text-stone-600 italic leading-relaxed">
              {diagram_hint}
            </p>
          </div>
        ) : (
          // No diagram and no hint
          <p className="text-sm text-stone-400 italic">
            No diagram or diagram hint available for this experiment.
          </p>
        )}
      </div>

    </section>
  )
}

export default ConceptTeaching
