// labEquivalents.ts — Stage 4 helper map.
// Keyed by experiment ID. Add or update entries here as the dataset grows.
// Does NOT modify the JSON — purely a code-side lookup.

export interface LabEquivalent {
  items: string[]
  principle: string // one-sentence "same science" note shown below the comparison
}

// ─── Mapping: experiment id → lab equivalent data ────────────────────────────
const LAB_EQUIVALENTS: Record<string, LabEquivalent> = {
  // Physics — Electricity
  exp_001: {
    items: [
      'DC power supply (1.5 V – 4.5 V)',
      'Bulb holder with mounted bulb',
      'Toggle switch',
      'Connecting wires with crocodile clips',
    ],
    principle:
      'Whether you use dry cells or a lab power supply, current can only flow through a complete closed circuit — the scientific principle is identical.',
  },
  // Physics — Electricity (conductors / insulators)
  exp_002: {
    items: [
      'DC power supply',
      'Galvanometer or ammeter',
      'Set of conductor/insulator test specimens (lab kit)',
      'Connecting wires with crocodile clips',
    ],
    principle:
      'Metals conduct electricity and non-metals generally do not — this holds true whether you test with a torch bulb or a lab galvanometer.',
  },
  // Chemistry — Acids and Bases (natural indicator)
  exp_003: {
    items: [
      'Litmus solution (red and blue)',
      'Phenolphthalein indicator',
      'Methyl orange indicator',
      'Test tubes and test-tube rack',
    ],
    principle:
      'A natural plant indicator and a lab chemical indicator both work by changing colour in acids and bases because they share the same molecular response to pH.',
  },
  // Chemistry — Acids and Bases (vinegar + baking soda)
  exp_004: {
    items: [
      'Dilute hydrochloric acid (HCl)',
      'Sodium hydrogen carbonate (NaHCO₃)',
      'Conical flask',
      'Gas collection tube',
    ],
    principle:
      'Vinegar reacting with baking soda demonstrates the same acid-base gas-evolution reaction as HCl with a carbonate — carbon dioxide is produced either way.',
  },
  // Chemistry — Separation (water filter)
  exp_005: {
    items: [
      'Filter funnel',
      'Filter paper (Whatman grade)',
      'Retort stand with ring clamp',
      'Conical flask to collect filtrate',
    ],
    principle:
      'Gravity filtration through sand and cloth obeys the same principle as lab filtration through filter paper — physical barriers separate insoluble particles from liquid.',
  },
  // Chemistry — Separation (evaporation)
  exp_006: {
    items: [
      'Evaporating dish',
      'Tripod stand and wire gauze',
      'Bunsen burner or spirit lamp',
      'Heat-resistant mat',
    ],
    principle:
      'Leaving salt solution in the sun or heating it on a Bunsen burner both drive away the water solvent — evaporation separates the dissolved solid in both cases.',
  },
  // Physics — Air Pressure
  exp_007: {
    items: [
      'Bell jar with vacuum pump',
      'Rubber sheet or manometer',
      'Pressure gauge',
    ],
    principle:
      'Air exerts pressure in all directions; whether shown with an inverted cup-and-card or a bell jar, the principle of atmospheric pressure is the same.',
  },
  // Physics — Density
  exp_008: {
    items: [
      'Measuring cylinder (100 mL)',
      'Hydrometer',
      'Density comparison set',
      'Analytical balance',
    ],
    principle:
      'An egg floating in salt water demonstrates the same density and upthrust concept measured precisely with a hydrometer and measuring cylinder in the lab.',
  },
  // Physics — Heat (expansion)
  exp_009: {
    items: [
      'Round-bottomed flask',
      'Thermometer',
      'Water bath with temperature control',
      'Gas syringe',
    ],
    principle:
      'Warming air in a plastic bottle or in a gas syringe both show thermal expansion of gases — the volume increases with temperature in both cases.',
  },
  // Physics — Magnetism
  exp_010: {
    items: [
      'Bar magnets (north/south labelled)',
      'Compass needle on pivot',
      'Iron filings on paper',
      'Magnetometer',
    ],
    principle:
      'A magnetised sewing needle floating on water aligns with Earth\'s magnetic field the same way a pivoting lab compass needle does — both reveal the geomagnetic field.',
  },
  // Physics — Light (refraction)
  exp_011: {
    items: [
      'Rectangular glass block',
      'Ray box with single-slit aperture',
      'Protractor and tracing paper',
      'Optical bench',
    ],
    principle:
      'Light bending at the air-water boundary (pencil-in-water) follows the same law of refraction (Snell\'s Law) measured precisely with a ray box and glass block.',
  },
  // Biology — Plants (transport)
  exp_012: {
    items: [
      'Prepared cross-section slides of xylem tissue',
      'Compound microscope',
      'Dropper with food dye',
      'Petri dish',
    ],
    principle:
      'Coloured water moving up a stem and dyed xylem cells viewed under a microscope both demonstrate the same plant transport system through xylem vessels.',
  },
  // Biology — Plants (germination)
  exp_013: {
    items: [
      'Germination jars (glass)',
      'Controlled growth chamber',
      'Seed viability tester',
    ],
    principle:
      'Seeds sprouting on wet cotton or in a controlled lab chamber both require the same conditions — water, oxygen, and suitable temperature — to trigger germination.',
  },
  // Biology — Osmosis
  exp_014: {
    items: [
      'Visking (dialysis) tubing',
      'Sucrose solution of known concentration',
      'Osmometer',
      'Measuring cylinders',
    ],
    principle:
      'Potato pieces shrinking or swelling in salt water show the same osmotic movement of water across a semi-permeable membrane as a lab osmometer using Visking tubing.',
  },
  // Physics — Motion
  exp_015: {
    items: [
      'Dynamics trolley and ramp',
      'Light gate with data logger',
      'Ticker tape and timer',
      'Electronic balance',
    ],
    principle:
      'A toy car rolling down a cardboard ramp demonstrates the same conversion of gravitational potential energy to kinetic energy studied with a dynamics trolley and ticker timer.',
  },
}

/**
 * Look up the lab equivalent for an experiment.
 * Returns null if no mapping exists — the UI must handle this gracefully.
 */
export function getLabEquivalent(experimentId: string): LabEquivalent | null {
  return LAB_EQUIVALENTS[experimentId] ?? null
}
