// conceptData.ts — Stage 5 helper map.
// Keyed by topic_id. Provides key principles, key terms, and optional formulas
// for each science topic in the dataset.
// This is purely code-side data — the JSON file is NOT changed.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConceptData {
  keyPrinciple: string    // One clear sentence summarising the main idea
  keyTerms: string[]      // 3–5 vocabulary words with brief explanations
  formula?: string        // Optional short formula or rule (only when relevant)
  formulaLabel?: string   // Label shown above the formula box, e.g. "Formula"
}

// ─── Mapping: topic_id → concept data ────────────────────────────────────────
const CONCEPT_DATA: Record<string, ConceptData> = {

  // Physics ── Electricity
  electricity: {
    keyPrinciple:
      'Electric current flows only when there is a complete, unbroken path called a closed circuit.',
    keyTerms: [
      'Current — the flow of electric charge through a conductor',
      'Circuit — a closed loop that allows current to travel',
      'Conductor — a material that lets electricity pass through it',
      'Insulator — a material that does not allow electricity to pass through',
      'Voltage — the push that drives current around a circuit',
    ],
    formula: 'Voltage (V) = Current (I) × Resistance (R)',
    formulaLabel: 'Ohm\'s Law (simplified)',
  },

  // Chemistry ── Acids and Bases
  acids_and_bases: {
    keyPrinciple:
      'Indicators change colour in acidic and basic solutions, showing the pH of a substance.',
    keyTerms: [
      'Acid — a substance with pH below 7 (e.g. lemon juice, vinegar)',
      'Base — a substance with pH above 7 (e.g. soap water, baking soda)',
      'Neutral — a substance with pH of exactly 7 (e.g. pure water)',
      'Indicator — a substance that changes colour to show acid or base',
      'pH scale — a scale from 0–14 that measures acidity or alkalinity',
    ],
    formula: 'Acid + Base → Salt + Water',
    formulaLabel: 'Neutralisation Rule',
  },

  // Chemistry ── Separation Techniques
  separation_techniques: {
    keyPrinciple:
      'Mixtures can be separated using methods like filtration or evaporation — each method works because of a difference in particle size or state.',
    keyTerms: [
      'Filtration — passing a mixture through a filter to remove solid particles',
      'Evaporation — heating a solution so the liquid turns to gas and the solid remains',
      'Solute — the substance that dissolves (e.g. salt)',
      'Solvent — the liquid in which the solute dissolves (e.g. water)',
      'Residue — the solid left behind on the filter after filtration',
    ],
  },

  // Physics ── Air Pressure
  air_pressure: {
    keyPrinciple:
      'Air has weight and exerts pressure in all directions — this pressure can push, hold, and move objects.',
    keyTerms: [
      'Air pressure — the force that air exerts on surfaces around it',
      'Atmosphere — the layer of air surrounding the Earth',
      'Atmospheric pressure — the pressure caused by the weight of the atmosphere',
      'Pascal (Pa) — the unit used to measure pressure',
      'Vacuum — a space with no air and therefore no air pressure',
    ],
    formula: 'Pressure (Pa) = Force (N) ÷ Area (m²)',
    formulaLabel: 'Pressure Formula',
  },

  // Physics ── Density
  density: {
    keyPrinciple:
      'Denser liquids exert a greater upward push (upthrust) on objects, making them float more easily.',
    keyTerms: [
      'Density — how much mass is packed into a given volume',
      'Upthrust — the upward force a liquid pushes on an object in it',
      'Buoyancy — the ability of an object to float in a liquid',
      'Mass — the amount of matter in an object (measured in grams or kg)',
      'Volume — the amount of space an object takes up',
    ],
    formula: 'Density = Mass ÷ Volume',
    formulaLabel: 'Density Formula',
  },

  // Physics ── Heat
  heat: {
    keyPrinciple:
      'When gases are heated, their particles move faster and spread out more, causing the gas to expand.',
    keyTerms: [
      'Heat — a form of energy that transfers from hotter to cooler objects',
      'Temperature — a measure of how hot or cold something is',
      'Expansion — when a substance gets bigger as it is heated',
      'Contraction — when a substance gets smaller as it cools',
      'Thermal energy — the total energy of particles moving inside a substance',
    ],
    formula: 'Heat always flows from HOT → COLD',
    formulaLabel: 'Direction of Heat Flow',
  },

  // Physics ── Magnetism
  magnetism: {
    keyPrinciple:
      'A magnetised needle aligns with Earth\'s magnetic field, pointing roughly north–south — this is how a compass works.',
    keyTerms: [
      'Magnet — an object that attracts iron and certain other metals',
      'Magnetic field — the invisible area around a magnet where it can attract or repel',
      'Poles — the two ends of a magnet (North and South)',
      'Magnetisation — the process of turning an object into a magnet',
      'Magnetic North — the direction a compass needle points',
    ],
  },

  // Physics ── Light
  light: {
    keyPrinciple:
      'Light changes speed when it moves from one material to another, and this causes it to bend — an effect called refraction.',
    keyTerms: [
      'Refraction — the bending of light as it passes between different materials',
      'Medium — the material through which light travels (e.g. air, water, glass)',
      'Angle of incidence — the angle of the light ray as it hits a surface',
      'Angle of refraction — the angle of the light ray after it bends',
      'Snell\'s Law — the rule that describes how much light bends at a boundary',
    ],
    formula: 'n₁ × sin(θ₁) = n₂ × sin(θ₂)',
    formulaLabel: 'Snell\'s Law (reference only)',
  },

  // Biology ── Plants
  plants: {
    keyPrinciple:
      'Plants carry water upward from roots to leaves through tube-like vessels called xylem.',
    keyTerms: [
      'Xylem — the plant tissue that carries water and minerals upward',
      'Phloem — the plant tissue that carries food (sugars) from leaves downward',
      'Transpiration — the loss of water from leaves as water vapour',
      'Capillary action — the ability of water to move upward through narrow tubes',
      'Germination — the process by which a seed begins to grow into a plant',
    ],
  },

  // Biology ── Osmosis
  osmosis: {
    keyPrinciple:
      'Osmosis is the movement of water through a partially permeable membrane from a dilute region to a more concentrated region.',
    keyTerms: [
      'Osmosis — movement of water through a semi-permeable membrane',
      'Semi-permeable membrane — a barrier that lets water through but not large solutes',
      'Concentration — how much of a substance is dissolved in a solution',
      'Turgid — swollen with water (cells in dilute solution)',
      'Plasmolysis — when a cell loses water and shrinks (in salty solution)',
    ],
  },

  // Physics ── Motion
  motion: {
    keyPrinciple:
      'Objects stored higher up have more gravitational potential energy, which converts into kinetic energy as they move downward.',
    keyTerms: [
      'Kinetic energy — energy an object has because it is moving',
      'Gravitational potential energy — stored energy due to height above the ground',
      'Speed — how fast an object moves (distance ÷ time)',
      'Friction — a force that opposes motion between surfaces',
      'Newton\'s First Law — an object keeps moving or stays still unless a force acts on it',
    ],
    formula: 'Speed = Distance ÷ Time',
    formulaLabel: 'Speed Formula',
  },
}

// ─── Lookup function ──────────────────────────────────────────────────────────
/**
 * Returns the concept data for a given topic_id,
 * or null if no entry exists.
 * Usage: const data = getConceptData(experiment.topic_id)
 */
export function getConceptData(topicId: string): ConceptData | null {
  return CONCEPT_DATA[topicId] ?? null
}
