// structuredQuestions.ts
// One open-ended structured question and a sample answer for each experiment.
// Keyed by experiment id. Used by ExamPractice.tsx to show a written-style
// exam question alongside the multiple-choice quiz.
//
// To add a new experiment: add an entry here with the experiment's id as key.

export interface StructuredQuestion {
  question: string        // the exam question text
  hint?: string           // optional prompt to guide the student's thinking
  sampleAnswer: string    // model answer shown after the student clicks "See Sample Answer"
}

const STRUCTURED_QUESTIONS: Record<string, StructuredQuestion> = {

  exp_001: {
    question: 'Explain why the bulb lights up only when all wires are connected in a complete loop.',
    hint: 'Think about what a circuit needs for current to flow.',
    sampleAnswer:
      'The bulb lights up because electricity needs a complete, unbroken path to flow from the battery, through the wire, through the bulb, and back to the battery — this is called a closed circuit. If any wire is disconnected, the path is broken (open circuit) and no current flows, so the bulb goes off.',
  },

  exp_002: {
    question: 'What makes a material a conductor? Give one example and explain why it allows current to flow.',
    hint: 'Think about free electrons inside metals.',
    sampleAnswer:
      'A conductor is a material that allows electricity to flow through it easily. Copper is a conductor because it has many free electrons that can move through its structure when a voltage is applied. When placed across the gap in a test circuit, these moving electrons carry current, completing the circuit and lighting the bulb.',
  },

  exp_003: {
    question: 'Describe what happens to hibiscus indicator when it is added to lemon juice. Explain why this colour change occurs.',
    hint: 'Think about whether lemon juice is acidic or basic.',
    sampleAnswer:
      'When hibiscus indicator is added to lemon juice, the solution turns pink or red. This happens because lemon juice is acidic. The natural pigment (anthocyanin) in the hibiscus changes colour in the presence of acids, producing a pink or red colour. This colour tells us the substance is acidic.',
  },

  exp_004: {
    question: 'Explain why the balloon inflates when vinegar and baking soda are mixed inside the bottle.',
    hint: 'Think about the name and type of gas produced in this chemical reaction.',
    sampleAnswer:
      'When vinegar (an acid) reacts with baking soda (a base), a chemical reaction takes place. One of the products of this reaction is carbon dioxide (CO₂) gas. The CO₂ gas is produced inside the bottle and rises through the neck into the balloon, causing it to inflate. This is an example of an acid-base reaction that produces a gas.',
  },

  exp_005: {
    question: 'State one limitation of the simple filtration method used in this water filter experiment.',
    hint: 'Think about what types of impurities filtration cannot remove.',
    sampleAnswer:
      'One limitation is that simple filtration cannot remove dissolved substances from the water. For example, dissolved salt, harmful chemicals, or disease-causing bacteria pass through the filter along with the water. Filtration can only remove solid particles that are large enough to be trapped by the filter layers.',
  },

  exp_006: {
    question: 'Explain how evaporation is used to separate salt from salt water. Describe what happens to both the water and the salt.',
    hint: 'Think about the different boiling points of water and salt.',
    sampleAnswer:
      'When salt water is left in sunlight or heated, the water evaporates because it has a low boiling point and turns into water vapour easily. Salt, however, has a very high melting point and does not evaporate at normal temperatures. As all the water vapour escapes into the air, the salt is left behind as solid crystals in the dish, successfully separating the two substances.',
  },

  exp_007: {
    question: 'Explain why the water does not fall out when the cup is turned upside down with a card covering the opening.',
    hint: 'Think about the force that the surrounding air exerts on the card from below.',
    sampleAnswer:
      'When the cup is turned upside down with a card covering the opening, air pressure from outside pushes upward on the card. This upward push of the air is greater than the downward weight of the water inside the cup. As a result, the card stays in place and holds the water inside. This experiment shows that air exerts pressure in all directions, not just downward.',
  },

  exp_008: {
    question: 'Describe why the egg floats in salt water but sinks in plain water.',
    hint: 'Think about how adding salt changes the density of the water.',
    sampleAnswer:
      'An egg sinks in plain water because the egg is denser than the water — it is heavier than the same volume of water. When salt is dissolved in water, the salt water becomes denser (heavier per unit volume) than the egg. Because the salt water is now denser than the egg, the upward force (upthrust) it exerts on the egg is greater than the egg\'s weight, causing the egg to float. A denser liquid provides greater upthrust.',
  },

  exp_009: {
    question: 'Explain why the balloon on the bottle inflates when the bottle is placed in warm water.',
    hint: 'Think about what heat does to air molecules inside the bottle.',
    sampleAnswer:
      'When the bottle is placed in warm water, the air inside is heated. As air is heated, its molecules move faster and spread further apart — the air expands and takes up more space. Because the rigid bottle cannot expand, the air is pushed out through the neck into the balloon, causing it to inflate. When the bottle is cooled, the air contracts and the balloon deflates again.',
  },

  exp_010: {
    question: 'Explain how a magnetised needle floating freely in water acts as a compass.',
    hint: 'Think about how the Earth itself behaves like a large magnet.',
    sampleAnswer:
      'When a needle is magnetised by stroking it with a permanent magnet, the needle becomes a weak magnet with a north and south pole. The Earth has its own magnetic field, behaving like a giant bar magnet. When the magnetised needle is placed on a floating cork in still water, it is free to rotate. The needle\'s north pole is attracted toward Earth\'s magnetic north, so the needle always aligns itself in a north–south direction — just like a compass needle.',
  },

  exp_011: {
    question: 'A pencil placed in a glass of water appears bent at the water surface. Explain why this happens.',
    hint: 'Think about how the speed of light changes when moving from water to air.',
    sampleAnswer:
      'This effect is caused by refraction. Light travels at different speeds in different materials — it travels slower in water than in air. When light rays from the submerged part of the pencil pass from water into air, they change speed and bend (change direction) at the boundary. Our eyes trace these bent rays back in a straight line, making the pencil appear to be in a different position and look bent at the water surface, even though the pencil itself is straight.',
  },

  exp_012: {
    question: 'Explain how water travels from a cup of coloured water upward through the plant stem to reach the leaves.',
    hint: 'Think about capillary action and transpiration pull.',
    sampleAnswer:
      'Water moves up the plant stem through two forces working together. First, capillary action draws water up through the tiny xylem tubes — water molecules cling to the tube walls and to each other, pulling water up. Second, leaves lose water vapour through tiny pores (stomata) in a process called transpiration. This creates a pulling force that draws more water up from below. The coloured water travels the same path, staining the stem and petals.',
  },

  exp_013: {
    question: 'State three conditions a seed needs to germinate and describe the role of one of those conditions.',
    hint: 'Think about what the seed needs from its environment to start growing.',
    sampleAnswer:
      'A seed needs water, warmth (suitable temperature), and air (oxygen) to germinate. Role of water: water activates enzymes inside the seed that break down stored food into energy for the embryo. Water also softens the tough seed coat, allowing the root and shoot to push through. Without water the seed stays dormant and cannot begin to grow.',
  },

  exp_014: {
    question: 'Describe what happens to a potato strip left in strongly salted water overnight. Explain why using the idea of osmosis.',
    hint: 'Think about the direction water moves by osmosis — from lower to higher concentration.',
    sampleAnswer:
      'The potato strip becomes soft, limp, and smaller — it loses water. This happens because of osmosis. The salt water outside the potato cells has a higher concentration of dissolved substances than the liquid inside the cells. Water moves by osmosis through the semi-permeable cell membrane from the area of lower concentration (inside the potato) to the area of higher concentration (the salt water). The potato cells lose water and become flaccid (floppy).',
  },

  exp_015: {
    question: 'Predict how increasing the height of the ramp affects the distance the toy car travels. Explain your prediction.',
    hint: 'Think about the relationship between height, gravitational potential energy, speed, and distance.',
    sampleAnswer:
      'Increasing the height of the ramp will cause the toy car to travel further. A higher ramp gives the car more gravitational potential energy at the top. As the car rolls down, this potential energy is converted into kinetic energy (movement energy). Greater height means more potential energy, so the car reaches the bottom with higher speed and travels further along the floor before stopping. Higher ramp → more energy → more speed → greater distance.',
  },

}

// ── Public accessor ──────────────────────────────────────────────────────────
// Returns null if no structured question exists for the given experiment id.
export function getStructuredQuestion(id: string): StructuredQuestion | null {
  return STRUCTURED_QUESTIONS[id] ?? null
}
