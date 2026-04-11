export const FEC_ARMIES = {
  carrionRetainers: {
    id: 'carrionRetainers',
    name: 'Carrion Retainers',
    lore: "The Flesh-eater Courts believe themselves noble knights serving a great king. In truth they are voracious ghouls following a monstrous Archregent. Their delusional bravery earns them Noble Deeds — dark power that fuels their feeding frenzy.",
    general: {
      id: 'abhorrant-archregent',
      name: 'Abhorrant Archregent',
      move: '6"',
      health: 6,
      save: '5+',
      control: 2,
      keywords: ['Hero', 'Infantry', 'Ward (6+)'],
      wardValue: 6,
      meleeWeapons: [
        { name: 'Gory Talons and Fangs', attacks: '5', hit: '3+', wound: '3+', rend: 1, damage: '2', ability: '—' },
      ],
      abilities: [
        {
          id: 'deranged-transformation',
          name: 'Deranged Transformation',
          timing: 'Your Hero Phase',
          effect: "Make a casting roll of 2D6. On a 6+, pick a friendly unit wholly within 12\" of this unit. Until the start of your next turn, add 2\" to that unit's Move characteristic and add 1 to wound rolls for that unit's combat attacks.",
        },
      ],
    },
    units: [
      {
        id: 'cryptguard',
        name: 'Cryptguard',
        count: 10,
        move: '6"',
        health: 1,
        save: '6+',
        control: 1,
        keywords: ['Infantry', 'Reinforcements', 'Ward (5+)'],
        wardValue: 5,
        hasReinforcements: true,
        meleeWeapons: [
          { name: 'Cursed Weapon', attacks: '3', hit: '4+', wound: '4+', rend: 1, damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'royal-bodyguard',
            name: 'Royal Bodyguard',
            timing: 'Passive',
            effect: 'Add 1 to ward rolls for friendly Heroes while they are wholly within the combat range of this unit.',
          },
        ],
      },
      {
        id: 'morbheg-knights',
        name: 'Morbheg Knights',
        count: 3,
        move: '12"',
        health: 4,
        save: '4+',
        control: 1,
        keywords: ['Cavalry', 'Fly', 'Ward (6+)'],
        wardValue: 6,
        meleeWeapons: [
          { name: 'Grisly Lance', attacks: '2', hit: '3+', wound: '4+', rend: 1, damage: '1', ability: 'Charge (+1 Damage)' },
          { name: "Nightshrieker's Claws and Teeth", attacks: '3', hit: '4+', wound: '3+', rend: 1, damage: '2', ability: 'Companion' },
        ],
        abilities: [
          {
            id: 'predators-pounce',
            name: "Predator's Pounce",
            timing: 'Passive',
            effect: 'This unit can use Charge abilities even if it used a Retreat ability earlier in the same turn. No mortal damage is inflicted on this unit when it uses a Retreat ability.',
          },
        ],
      },
      {
        id: 'varghulf-courtier',
        name: 'Varghulf Courtier',
        move: '10"',
        health: 8,
        save: '5+',
        control: 2,
        keywords: ['Hero', 'Infantry', 'Ward (6+)'],
        wardValue: 6,
        meleeWeapons: [
          { name: 'Immense Claws', attacks: '7', hit: '4+', wound: '3+', rend: 1, damage: '2', ability: '—' },
          { name: 'Dagger-like Fangs', attacks: '1', hit: '3+', wound: '2+', rend: 2, damage: '3', ability: '—' },
        ],
        abilities: [
          {
            id: 'victory-feast',
            name: 'Victory Feast',
            timing: 'End of Any Turn',
            effect: 'If any models were slain by this unit this turn, Heal (D6) this unit. This unit can then immediately use a Retreat ability as if it were your movement phase, and no mortal damage is inflicted on it.',
          },
        ],
      },
    ],
    battleTraits: [
      {
        id: 'noble-deeds',
        name: 'Noble Deeds',
        timing: 'Passive',
        description: 'Each time a friendly Hero uses a Fight ability, give that Hero noble deeds points equal to the number of damage points allocated to enemy units by that ability. Each Hero can have a maximum of 6 noble deeds points at once.',
      },
      {
        id: 'feeding-frenzy',
        name: 'Feeding Frenzy',
        timing: 'Passive',
        description: 'Add 1 to the Attacks characteristic of melee weapons for friendly units wholly within 12" of any friendly Hero that has 6 noble deeds points.',
      },
      {
        id: 'summon-loyal-subjects',
        name: 'Summon Loyal Subjects',
        timing: 'Your Movement Phase',
        description: 'Pick a friendly Hero that has noble deeds points. You can spend those points as follows: 1 point — return 1 slain Cryptguard model to a Cryptguard unit within 9" of that Hero. 2 points — return 1 slain Morbheg Knights model to a Morbheg Knights unit within 9" of that Hero. You can spend points multiple times.',
      },
    ],
    regimentAbilities: [
      {
        id: 'crusading-army',
        name: 'Crusading Army',
        timing: 'Passive',
        effect: 'Add 1 to run rolls and charge rolls for friendly units.',
      },
      {
        id: 'defenders-of-the-realm',
        name: 'Defenders of the Realm',
        timing: 'Passive',
        effect: 'Add 1 to save rolls for friendly units while they are contesting an objective you control.',
      },
    ],
    enhancements: [
      {
        id: 'ulguan-cloak',
        name: 'Ulguan Cloak',
        timing: 'Passive',
        effect: 'Your general is not visible to enemy models that are more than 12" away.',
      },
      {
        id: 'blood-river-chalice',
        name: 'Blood-River Chalice',
        timing: 'Once Per Battle, Your Hero Phase',
        effect: 'Heal (2D3) your general.',
      },
      {
        id: 'rousing-oration',
        name: 'Rousing Oration',
        timing: 'Your Hero Phase',
        effect: 'Roll a dice for each friendly unit wholly within 12" of your general (not including your general). For each roll of 5+, give 1 noble deeds point to your general.',
      },
      {
        id: 'crimson-victuals',
        name: 'Crimson Victuals',
        timing: 'Your Hero Phase',
        effect: 'Pick a visible enemy unit within 18" of your general, then make a casting roll of 2D6. On a 6+, inflict D3 mortal damage on the target. If a Cryptguard unit is within 6" of the target, return 1 slain Cryptguard model to that unit for each damage point allocated.',
      },
    ],
  },
}
