export const STORMCAST_ARMIES = {
  yndrasta: {
    id: 'yndrasta',
    name: "Yndrasta's Spearhead",
    lore: "Yndrasta is one of Sigmar's mightiest champions. Her Spearhead works in two elements: Vanquishers that strike from the heavens, and Annihilators whose meteoric charge crushes all foes.",
    general: {
      id: 'yndrasta',
      name: 'Yndrasta, the Celestial Spear',
      move: '12"',
      health: 8,
      save: '3+',
      control: 2,
      keywords: ['Hero', 'Infantry', 'Fly', 'Ward (6+)'],
      wardValue: 6,
      rangedWeapons: [
        { name: 'Thengavar', range: '12"', attacks: '1', hit: '3+', wound: '2+', rend: 2, damage: '4', ability: 'Shoot in Combat' },
      ],
      meleeWeapons: [
        { name: 'Blade of the High Heavens', attacks: '5', hit: '3+', wound: '3+', rend: 2, damage: '3', ability: '—' },
      ],
      abilities: [
        {
          id: 'champion-of-sigmar',
          name: 'Champion of Sigmar',
          timing: 'Once Per Battle, Any Combat Phase',
          effect: 'This unit has Ward (5+) this phase.',
        },
      ],
      startInReserve: true,
      availableFromRound: 3,
      reserveAbility: {
        name: 'Lightning-Strike Arrival',
        timing: 'Your Movement Phase (Round 3+)',
        effect: 'Set up this unit anywhere on the battlefield more than 6" from all enemy units.',
      },
    },
    units: [
      {
        id: 'knight-vexillor',
        name: 'Knight-Vexillor',
        move: '5"',
        health: 6,
        save: '3+',
        control: 5,
        keywords: ['Hero', 'Infantry'],
        meleeWeapons: [
          { name: 'Sigmarite Warblade', attacks: '4', hit: '3+', wound: '3+', rend: 1, damage: '2', ability: '—' },
        ],
        abilities: [
          {
            id: 'banner-of-the-reforged',
            name: 'Banner of the Reforged',
            timing: 'Your Hero Phase',
            effect: 'Pick a friendly unit wholly within 12" of this unit. Heal (D3) the target. Add 3 to that unit\'s control score until the start of your next turn.',
          },
        ],
      },
      {
        id: 'annihilators',
        name: 'Annihilators',
        count: 3,
        move: '4"',
        health: 3,
        save: '2+',
        control: 1,
        keywords: ['Infantry'],
        meleeWeapons: [
          { name: 'Meteoric Hammer', attacks: '3', hit: '3+', wound: '3+', rend: 1, damage: '2', ability: '—' },
        ],
        abilities: [
          {
            id: 'force-of-a-falling-star',
            name: 'Force of a Falling Star',
            timing: 'Any Charge Phase',
            effect: 'If this unit charged this phase and the unmodified charge roll was 8+, pick an enemy unit within 1" of it. That enemy unit has Strike-last this turn.',
          },
        ],
        startInReserve: true,
        availableFromRound: 3,
        reserveAbility: {
          name: 'Lightning-Strike Arrival',
          timing: 'Your Movement Phase (Round 3+)',
          effect: 'Set up this unit anywhere on the battlefield more than 6" from all enemy units.',
        },
      },
      {
        id: 'vanquishers-1',
        name: 'Vanquishers',
        count: 5,
        move: '5"',
        health: 2,
        save: '3+',
        control: 1,
        keywords: ['Infantry'],
        meleeWeapons: [
          { name: 'Celestial Greatsword', attacks: '2', hit: '3+', wound: '3+', rend: 1, damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'lightning-strikes',
            name: 'Lightning Strikes',
            timing: 'Passive',
            effect: 'Add 1 to the Damage characteristic of this unit\'s Celestial Greatswords for attacks that target an enemy unit that has 5 or more models.',
          },
        ],
      },
      {
        id: 'vanquishers-2',
        name: 'Vanquishers',
        count: 5,
        move: '5"',
        health: 2,
        save: '3+',
        control: 1,
        keywords: ['Infantry'],
        meleeWeapons: [
          { name: 'Celestial Greatsword', attacks: '2', hit: '3+', wound: '3+', rend: 1, damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'lightning-strikes',
            name: 'Lightning Strikes',
            timing: 'Passive',
            effect: 'Add 1 to the Damage characteristic of this unit\'s Celestial Greatswords for attacks that target an enemy unit that has 5 or more models.',
          },
        ],
      },
      {
        id: 'stormstrike-chariot',
        name: 'Stormstrike Chariot',
        move: '10"',
        health: 10,
        save: '3+',
        control: 2,
        keywords: ['War Machine'],
        rangedWeapons: [
          { name: 'Great Stormbow', range: '18"', attacks: '2', hit: '3+', wound: '3+', rend: 1, damage: '1', ability: '—' },
        ],
        meleeWeapons: [
          { name: 'Stormstrike Axe', attacks: '3', hit: '3+', wound: '3+', rend: 1, damage: '1', ability: '—' },
          { name: "Gryph-chargers' Beaks and Claws", attacks: '6', hit: '4+', wound: '3+', rend: 1, damage: '1', ability: 'Companion' },
        ],
        abilities: [
          {
            id: 'azyr-unleashed',
            name: 'Azyr Unleashed',
            timing: 'Any Charge Phase',
            effect: 'If this unit charged this phase, pick an enemy unit within 1" and roll a dice. On a 2+, inflict D3 mortal damage on the target.',
          },
        ],
      },
    ],
    battleTraits: [
      {
        id: 'scions-of-the-storm',
        name: 'Scions of the Storm',
        description: 'Yndrasta and your Annihilators unit are not set up during the deployment phase. From the 3rd battle round onwards, they can use Lightning-Strike Arrival to set up anywhere more than 6" from all enemy units.',
      },
    ],
    regimentAbilities: [
      {
        id: 'drive-them-back',
        name: 'Drive Them Back',
        timing: 'End of Any Turn',
        effect: 'Pick any number of friendly units that are both contesting an objective and in combat. Each of those units can make a pile-in move. For each unit that did so, pick an enemy unit within 1" of it and roll a dice. On a 4+, inflict 1 mortal damage on that enemy unit.',
      },
      {
        id: 'defend-to-the-last',
        name: 'Defend to the Last',
        timing: 'Passive',
        effect: 'Friendly units have Ward (6+) while they are contesting an objective you control.',
      },
    ],
    enhancements: [
      {
        id: 'prime-huntress',
        name: 'The Prime Huntress',
        timing: 'Passive',
        effect: "The Damage characteristic of Thengavar (Yndrasta's spear) is 2D6 for attacks that target a Monster.",
      },
      {
        id: 'tempests-rage',
        name: "Strike with the Tempest's Rage",
        timing: 'Passive',
        effect: 'Your general has Strike-first if they charged in the same turn.',
      },
      {
        id: 'dazzling-radiance',
        name: 'Dazzling Radiance',
        timing: 'Once Per Battle, Your Movement Phase',
        effect: 'Pick your general to use this ability if they were set up this phase. You can return 1 slain model to each friendly unit wholly within 12" of your general.',
      },
      {
        id: 'hawk-of-celestial-skies',
        name: 'Hawk of the Celestial Skies',
        timing: 'Once Per Battle, Any Combat Phase',
        effect: 'Until the end of the phase, add 1 to hit rolls for attacks made by friendly units while they are wholly within 12" of your general.',
      },
    ],
  },

  vigilant: {
    id: 'vigilant',
    name: 'Vigilant Brotherhood',
    lore: "Elite formations led by Lord-Vigilants of the Ruination chambers. Prosecutors fly above while Liberators hold the line. The Lord-Veritant watches over his comrades' fading identities.",
    general: {
      id: 'lord-vigilant',
      name: 'Lord-Vigilant on Gryph-stalker',
      move: '12"',
      health: 8,
      save: '3+',
      control: 2,
      keywords: ['Hero', 'Cavalry'],
      meleeWeapons: [
        { name: 'Hallowed Greataxe', attacks: '5', hit: '3+', wound: '3+', rend: 2, damage: '2', ability: '—' },
        { name: "Gryph-stalker's Beak and Talons", attacks: '3', hit: '4+', wound: '3+', rend: 1, damage: '2', ability: 'Companion' },
      ],
      abilities: [
        {
          id: 'deliver-judgement',
          name: 'Deliver Judgement',
          timing: 'Once Per Battle, Any Combat Phase',
          effect: 'Pick a friendly non-Hero unit wholly within 12" of this unit. The target can use 2 Fight abilities this phase. After the first is used, the target has Strike-last for the rest of the phase.',
        },
        {
          id: 'plan-the-attack',
          name: 'Plan the Attack',
          timing: 'Your Hero Phase',
          effect: 'Pick an objective you do not control. For the rest of the turn, add 1 to hit rolls for combat attacks made by friendly units that target enemy units contesting that objective.',
        },
      ],
    },
    units: [
      {
        id: 'lord-veritant',
        name: 'Lord-Veritant',
        move: '6"',
        health: 6,
        save: '3+',
        control: 2,
        keywords: ['Hero', 'Priest', 'Infantry'],
        meleeWeapons: [
          { name: 'Staff of Abjuration', attacks: '1', hit: '3+', wound: '3+', rend: 1, damage: '3', ability: '—' },
          { name: 'Judgement Blade', attacks: '3', hit: '3+', wound: '3+', rend: 1, damage: 'D3', ability: 'Anti-Wizard (+1 Rend), Anti-Priest (+1 Rend)' },
        ],
        abilities: [
          {
            id: 'sense-unholy-sorcery',
            name: 'Sense Unholy Sorcery',
            timing: 'Passive',
            effect: "This unit's Gryph-crow is a token. This unit has Ward (5+) while its Gryph-crow is on the battlefield. If you make an unmodified ward roll of 1 for this unit, remove its Gryph-crow from the battlefield.",
          },
          {
            id: 'cleansing-fires',
            name: 'Cleansing Fires',
            timing: 'Your Hero Phase',
            effect: 'Pick a visible enemy unit within 12" of this unit, then make a chanting roll of D6. On a 3+, roll a dice for each model in the target unit. For each 5+, inflict 1 mortal damage on the target unit.',
          },
        ],
      },
      {
        id: 'prosecutors',
        name: 'Prosecutors',
        count: 3,
        move: '12"',
        health: 2,
        save: '3+',
        control: 1,
        keywords: ['Infantry', 'Fly', 'Reinforcements'],
        hasReinforcements: true,
        rangedWeapons: [
          { name: 'Stormcall Javelin', range: '10"', attacks: '1', hit: '3+', wound: '3+', rend: 1, damage: 'D3', ability: '—' },
        ],
        meleeWeapons: [
          { name: 'Stormcall Javelin', attacks: '3', hit: '3+', wound: '3+', rend: 1, damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'skirmishers',
            name: 'Skirmishers',
            timing: 'Passive',
            effect: 'This unit has a coherency range of 2".',
          },
          {
            id: 'heralds-of-righteousness',
            name: 'Heralds of Righteousness',
            timing: 'Passive',
            effect: 'When you make a charge roll for this unit, roll 1 additional dice.',
          },
        ],
      },
      {
        id: 'liberators',
        name: 'Liberators',
        count: 5,
        move: '5"',
        health: 2,
        save: '3+',
        control: 1,
        keywords: ['Infantry', 'Reinforcements'],
        hasReinforcements: true,
        meleeWeapons: [
          { name: 'Warhammer', attacks: '2', hit: '3+', wound: '3+', rend: 1, damage: '1', ability: 'Crit (Mortal)' },
          { name: 'Grandhammer', attacks: '2', hit: '3+', wound: '3+', rend: 1, damage: '2', ability: 'Crit (Mortal)' },
        ],
        weaponNote: '4 Liberators armed with Warhammer, 1 with Grandhammer.',
        abilities: [
          {
            id: 'stalwart-defenders',
            name: 'Stalwart Defenders',
            timing: 'Passive',
            effect: "Add 3 to this unit's control score while it contests an objective wholly within friendly territory.",
          },
        ],
      },
    ],
    battleTraits: [
      {
        id: 'holy-orders',
        name: 'Holy Orders',
        description: 'During the battle you can use these once-per-battle abilities:',
        abilities: [
          {
            id: 'shield-of-azyr',
            name: 'Shield of Azyr',
            timing: 'Once Per Battle, Your Hero Phase',
            effect: 'Pick a friendly unit. Until the start of your next turn, that unit has Ward (5+).',
          },
          {
            id: 'storm-charge',
            name: 'Storm Charge',
            timing: 'Once Per Battle, Your Charge Phase',
            effect: 'Pick a friendly unit that is not in combat. That unit can use Charge abilities this turn even if it used a Run ability in the same turn.',
          },
        ],
      },
    ],
    regimentAbilities: [
      {
        id: 'strike-where-needed',
        name: 'Strike Where Needed',
        timing: 'Once Per Battle, Reaction: You declared a Retreat ability',
        effect: 'Used By: The unit using that Retreat ability. No mortal damage is inflicted on that unit by that Retreat ability. In addition, that unit can still use Charge abilities this turn even though it used a Retreat ability.',
      },
      {
        id: 'blaze-of-glory',
        name: 'Blaze of Glory',
        timing: 'Once Per Battle, Any Combat Phase',
        effect: 'Pick a friendly unit that is in combat. Until the end of the phase, each time a model in that unit is slain, make a vengeance roll of D6. On a 4+, inflict 1 mortal damage on an enemy unit in combat with that unit.',
      },
    ],
    enhancements: [
      {
        id: 'hallowed-scrolls',
        name: 'Hallowed Scrolls',
        timing: 'Passive',
        effect: 'Your general has Ward (5+).',
      },
      {
        id: 'morrda-talon',
        name: "Morrda's Talon",
        timing: 'Passive',
        effect: "Your general's Hallowed Greataxe has Crit (Mortal).",
      },
      {
        id: 'quicksilver-draught',
        name: 'Quicksilver Draught',
        timing: 'Once Per Battle, Any Combat Phase',
        effect: 'Your general has Strike-first this phase.',
      },
      {
        id: 'null-pendant',
        name: 'Null Pendant',
        timing: 'Once Per Battle, End of Any Turn',
        effect: 'Roll a dice for each enemy unit contesting the same objective as your general. On a 2+, subtract the roll from the control score of that enemy unit this turn.',
      },
    ],
  },
}
