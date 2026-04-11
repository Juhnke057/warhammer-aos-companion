export const AQSHY_TWISTS = [
  {
    id: 'let-the-blood-flow',
    name: 'Let the Blood Flow',
    realm: 'aqshy',
    effect: 'Each player scores 1 extra victory point at the end of their turn for each enemy unit that was destroyed in that turn.',
    underdogBonus: 'The Underdog picks 1 friendly unit on the battlefield to be Frenzied. Add 1 to hit rolls for combat attacks made by that unit this battle round.',
    statusEffects: [{ id: 'frenzied', name: 'Frenzied', description: '+1 to hit rolls for combat attacks this battle round.' }],
  },
  {
    id: 'mount-the-attack',
    name: 'Mount the Attack',
    realm: 'aqshy',
    effect: 'Each player scores 1 extra victory point at the end of their turn for each objective they control that was controlled by their opponent at the start of their turn.',
    underdogBonus: 'The Underdog picks 1 friendly unit to be the Spearhead. That unit\'s melee weapons have Charge (+1 Damage) this battle round.',
    statusEffects: [{ id: 'spearhead', name: 'Spearhead', description: 'Melee weapons have Charge (+1 Damage) this battle round.' }],
  },
  {
    id: 'bloodmarked',
    name: 'Bloodmarked',
    realm: 'aqshy',
    effect: 'The Underdog picks one unit in each player\'s army to be Bloodmarked. If no Underdog, each player picks one enemy unit to be Bloodmarked. Each player scores 1 extra VP if the enemy Bloodmarked unit is destroyed this battle round.',
    statusEffects: [{ id: 'bloodmarked', name: 'Bloodmarked', description: 'Enemy scores 1 extra VP if this unit is destroyed this battle round.' }],
  },
  {
    id: 'ring-of-fire',
    name: 'Ring of Fire',
    realm: 'aqshy',
    effect: 'The Underdog picks one objective. That objective is no longer controlled by either player and cannot be controlled or contested this battle round. At the end of each turn, after VP have been scored, inflict D3 Mortal Damage on each unit with any models on it.',
    statusEffects: [{ id: 'ring-of-fire', name: 'Ring of Fire Objective', description: 'Cannot be controlled or contested. Inflicts D3 mortal damage on units on it at end of each turn.' }],
  },
  {
    id: 'wreathed-in-smoke',
    name: 'Wreathed in Smoke',
    realm: 'aqshy',
    effect: 'The Underdog picks one objective. That objective is Wreathed in Smoke. Until the end of the battle round, only unmodified hit rolls of 6 successfully hit for attacks that target a unit contesting that objective.',
    statusEffects: [{ id: 'wreathed-smoke', name: 'Wreathed in Smoke', description: 'Only unmodified hit rolls of 6 hit for attacks targeting units on this objective.' }],
  },
  {
    id: 'reclaim-aqshy',
    name: 'Reclaim Aqshy',
    realm: 'aqshy',
    effect: 'The Underdog picks 2 objectives. If no Underdog, each player picks 1 objective (active player first). Each player scores 1 extra VP at the end of their turn for each of those objectives they control.',
  },
]

export const GHYRAN_TWISTS = [
  {
    id: 'grandfathers-blessing',
    name: "The Grandfather's Blessing",
    realm: 'ghyran',
    effect: 'The Underdog can pick one effect below. If no Underdog, players roll off and winner picks.',
    options: [
      { id: 'nurgles-rot', name: "Nurgle's Rot", description: 'Pick an enemy unit. Subtract 1 from save rolls for that unit this battle round.' },
      { id: 'eroding-miasma', name: 'Eroding Miasma', description: 'Pick an enemy unit. Ward rolls cannot be made for that unit this battle round.' },
    ],
    statusEffects: [
      { id: 'nurgles-rot', name: "Nurgle's Rot", description: '-1 to save rolls this battle round.' },
      { id: 'no-ward-saves', name: 'Eroding Miasma', description: 'Ward rolls cannot be made this battle round.' },
    ],
  },
  {
    id: 'grasping-vines',
    name: 'Grasping Vines',
    realm: 'ghyran',
    effect: 'The Underdog picks an enemy unit. If no Underdog, players roll off and winner picks. That unit is Ensnared. Until the end of the battle round, halve its Move characteristic and roll 1 fewer dice when making a charge roll.',
    statusEffects: [{ id: 'ensnared', name: 'Ensnared', description: 'Move halved. Roll 1 fewer dice on charge rolls. Until end of battle round.' }],
  },
  {
    id: 'alarielle-blessing',
    name: "Alarielle's Blessing",
    realm: 'ghyran',
    effect: 'The Underdog can pick one effect below. If no Underdog, players roll off and winner picks.',
    options: [
      { id: 'shield-of-thorns', name: 'Shield of Thorns', description: 'Pick a friendly unit. That unit has Ward (6+) this battle round. If it already has a ward save, add 1 to ward rolls instead.' },
      { id: 'rain-of-jade', name: 'Rain of Jade', description: 'Pick up to 3 friendly units. Heal (D3) each of those units (roll for each).' },
    ],
    statusEffects: [
      { id: 'shield-of-thorns', name: 'Shield of Thorns', description: 'Ward (6+) this battle round (or +1 to existing ward rolls).' },
    ],
  },
  {
    id: 'take-the-land',
    name: 'Take the Land',
    realm: 'ghyran',
    effect: 'Each player scores 1 extra VP at the end of their turn if there are more friendly models contesting the large terrain feature in enemy territory than there are enemy models contesting it. The Underdog adds 1 to wound rolls for attacks made by friendly units that target a unit contesting a large terrain feature.',
  },
  {
    id: 'lifespring',
    name: 'Lifespring',
    realm: 'ghyran',
    effect: 'The Underdog picks 1 objective. If no Underdog, players roll off. That objective becomes a Lifespring this battle round. Each player scores 1 extra VP at the end of their turn if they control that objective. At the end of each turn, Heal (1) each unit contesting that objective.',
    statusEffects: [{ id: 'lifespring', name: 'Lifespring Objective', description: '+1 VP for control. Heal (1) all contesting units at end of each turn.' }],
  },
  {
    id: 'reclaim-ghyran',
    name: 'Reclaim Ghyran',
    realm: 'ghyran',
    effect: 'The Underdog picks 2 objectives. If no Underdog, each player picks 1 (active player first). Each player scores 1 extra VP at the end of their turn for each of those objectives they control.',
  },
]

export const BATTLE_TACTICS = [
  {
    id: 'ignax-dais',
    name: 'The Ignax Dais',
    tactic: 'You complete this battle tactic if you control the Ignax objective at the end of your turn.',
    command: {
      name: 'Forward to Victory',
      timing: 'Reaction — You declared a Charge ability',
      effect: 'You can re-roll the charge roll.',
    },
  },
  {
    id: 'war-of-attrition',
    name: 'War of Attrition',
    tactic: 'You complete this battle tactic at the end of your turn if any enemy units were destroyed this turn and more enemy units than friendly units were destroyed this turn.',
    command: {
      name: 'Stand Guard',
      timing: 'Enemy Hero Phase',
      effect: 'Pick a friendly unit to use this ability. That unit has Strike-First this turn.',
    },
  },
  {
    id: 'take-without-warning',
    name: 'Take Without Warning',
    tactic: 'You complete this battle tactic at the end of your turn if you gain control of an objective that was controlled by your opponent at the start of the turn and none of the units contesting that objective used a Fight ability this turn.',
    command: {
      name: 'Fight to the Last',
      timing: 'Reaction — Opponent declared an attack ability',
      effect: 'That unit has Ward (5+) this phase.',
    },
  },
  {
    id: 'behemat-dais',
    name: 'The Behemat Dais',
    tactic: 'You complete this battle tactic if you control the Behemat objective at the end of your turn.',
    command: {
      name: 'Scroll of Arcane Bolt',
      timing: 'Any Hero Phase',
      effect: 'Pick a friendly Hero, pick a visible enemy unit within 12" of them, then roll a dice. On a 2+, inflict D3 Mortal Damage on that enemy unit.',
    },
  },
  {
    id: 'dracothion-dais',
    name: 'The Dracothion Dais',
    tactic: 'You complete this battle tactic if you control the Dracothian objective at the end of your turn.',
    command: {
      name: 'Go to Ground',
      timing: 'Reaction — Opponent declared a Shoot ability',
      effect: 'Until the end of the phase, only unmodified hit rolls of 6 hit for attacks that target that unit. However, that unit has Strike-last this turn.',
    },
  },
  {
    id: 'take-the-flanks',
    name: 'Take the Flanks',
    tactic: 'You complete this battle tactic at the end of your turn if there are any friendly units within 3" of each short battlefield edge.',
    command: {
      name: 'Redeploy',
      timing: 'Enemy Movement Phase',
      effect: 'Pick a friendly unit that is not in combat. That unit can move up to D6". That unit cannot move into combat during any part of that move.',
    },
  },
  {
    id: 'raid',
    name: 'Raid',
    tactic: 'You complete this battle tactic at the end of your turn if any friendly units are wholly within enemy territory and not in combat.',
    command: {
      name: 'Steel Defence',
      timing: 'Reaction — Opponent declared an attack ability',
      effect: 'Ignore the Rend characteristic of attacks that target that unit this phase.',
    },
  },
  {
    id: 'hold-ground',
    name: 'Hold Ground',
    tactic: 'You complete this battle tactic at the end of your turn if there are more friendly models contesting the large terrain feature in your territory than there are enemy models contesting it.',
    command: {
      name: 'Rise to the Challenge',
      timing: 'Any Combat Phase',
      effect: 'Pick a friendly Hero to use this ability. Heal (D6) that Hero.',
    },
  },
  {
    id: 'raze',
    name: 'Raze',
    tactic: 'You complete this battle tactic at the end of your turn if there are any friendly units within 3" of the long battlefield edge in enemy territory.',
    command: {
      name: 'Inspiring Presence',
      timing: 'Any Hero Phase',
      effect: 'Pick a friendly Hero to use this ability. Roll a dice. For the rest of the turn, add the number rolled to the control score of that Hero.',
    },
  },
  {
    id: 'attack-on-two-fronts',
    name: 'Attack on Two Fronts',
    tactic: 'You complete this battle tactic at the end of your turn if you control 2 objectives that were controlled by your opponent at the start of the turn.',
    command: {
      name: 'Call Reinforcements',
      timing: 'Any Movement Phase',
      effect: 'Pick a friendly infantry or cavalry unit with 5+ models that has been destroyed and not already replaced. Set up a replacement unit consisting of D3 models anywhere on the battlefield more than 6" from all enemy units.',
    },
  },
  {
    id: 'cut-off-the-head',
    name: 'Cut Off the Head',
    tactic: "You complete this battle tactic at the end of your turn if the enemy general was slain this turn, OR if the enemy general was slain in an earlier turn AND any enemy units were destroyed this turn.",
    command: {
      name: 'Counter Charge',
      timing: 'Enemy Charge Phase',
      effect: 'Pick a friendly unit that is not in combat. That unit can use a Charge ability as if it were your charge phase.',
    },
  },
  {
    id: 'do-not-waver',
    name: 'Do Not Waver',
    tactic: 'You complete this battle tactic at the end of your turn if any friendly units used a Fight ability this turn and no friendly units were destroyed this turn.',
    command: {
      name: 'Fall Back and Rally',
      timing: 'Reaction — You declared a Retreat ability',
      effect: 'No mortal damage is inflicted on that unit by the Retreat ability. After the ability is resolved, roll one dice for each slain model from that unit. For each 5+, you can return 1 slain model to that unit.',
    },
  },
]

export const OBJECTIVES = [
  { id: 'dracothion', name: 'Dracothion', position: 'centre' },
  { id: 'ignax', name: 'Ignax', position: 'attacker-left' },
  { id: 'behemat', name: 'Behemat', position: 'attacker-right' },
  { id: 'vulcatrix', name: 'Vulcatrix', position: 'defender-left' },
  { id: 'nagendra', name: 'Nagendra', position: 'defender-right' },
]
