export const SKAVEN_ARMIES = {
  gnawfeast: {
    id: 'gnawfeast',
    name: 'Gnawfeast Clawpack',
    lore: "Clanrats swarm to overwhelm foes alongside frenzied Rat Ogors. The Clawlord rides in to claim the credit. A Grey Seer and Warlock Engineer offer deadly — if unpredictable — support.",
    general: {
      id: 'clawlord',
      name: 'Clawlord on Gnaw-beast',
      move: '9"',
      health: 7,
      save: '4+',
      control: 2,
      keywords: ['Hero', 'Cavalry', 'Ward (6+)'],
      wardValue: 6,
      rangedWeapons: [
        { name: 'Ratling Pistol', range: '10"', attacks: 'D6', hit: '3+', wound: '3+', rend: 1, damage: '1', ability: 'Crit (Auto-wound), Shoot in Combat' },
      ],
      meleeWeapons: [
        { name: 'Warpforged Halberd', attacks: '5', hit: '3+', wound: '4+', rend: 1, damage: '2', ability: '—' },
        { name: "Gnaw-beast's Chisel Fangs", attacks: '4', hit: '4+', wound: '3+', rend: 1, damage: 'D3', ability: 'Companion' },
      ],
      abilities: [
        {
          id: 'cornered-rat',
          name: 'Cornered Rat',
          timing: 'Passive',
          effect: 'While this unit is damaged, add 3 to the Attacks characteristic of its Warpforged Halberd.',
        },
      ],
    },
    units: [
      {
        id: 'grey-seer',
        name: 'Grey Seer',
        move: '6"',
        health: 5,
        save: '6+',
        control: 2,
        keywords: ['Hero', 'Wizard', 'Infantry'],
        meleeWeapons: [
          { name: 'Warpstone Staff', attacks: '3', hit: '4+', wound: '4+', rend: 1, damage: 'D3', ability: '—' },
        ],
        abilities: [
          {
            id: 'will-of-horned-rat',
            name: 'Will of the Horned Rat',
            timing: 'Your Hero Phase',
            effect: "Pick a friendly unit wholly within 13\" of this unit, then roll a dice. On a 3+, add the roll to the target's control score until the start of your next turn.",
          },
          {
            id: 'wither',
            name: 'Wither',
            timing: 'Your Hero Phase',
            effect: 'Pick a visible enemy unit within 13" of this unit, then make a casting roll of 2D6. On a 6+, inflict D3 mortal damage on the target.',
          },
        ],
      },
      {
        id: 'warlock-engineer',
        name: 'Warlock Engineer',
        move: '6"',
        health: 5,
        save: '5+',
        control: 2,
        keywords: ['Hero', 'Infantry'],
        rangedWeapons: [
          { name: 'Warplock Musket', range: '24"', attacks: '2', hit: '3+', wound: '3+', rend: 2, damage: 'D3', ability: 'Crit (Auto-wound)' },
        ],
        meleeWeapons: [
          { name: 'Warpforged Dagger', attacks: '3', hit: '4+', wound: '4+', rend: '-', damage: '2', ability: '—' },
        ],
        abilities: [
          {
            id: 'more-more-warp-energy',
            name: 'More-More Warp Energy!',
            timing: 'Reaction: You declared a Shoot ability for this unit and it has not used a Move ability this turn',
            effect: 'Roll a dice. On a 2+, set the Damage characteristic of its Warplock Musket to 3 this phase. On a 1, inflict D3 mortal damage on this unit.',
          },
        ],
      },
      {
        id: 'clanrats-1',
        name: 'Clanrats',
        count: 10,
        move: '6"',
        health: 1,
        save: '5+',
        control: 1,
        keywords: ['Infantry', 'Reinforcements'],
        hasReinforcements: true,
        meleeWeapons: [
          { name: 'Rusty Blade', attacks: '2', hit: '4+', wound: '5+', rend: '-', damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'seething-swarm',
            name: 'Seething Swarm',
            timing: 'End of Any Turn',
            effect: 'You can return D3 slain models to this unit.',
          },
        ],
      },
      {
        id: 'clanrats-2',
        name: 'Clanrats',
        count: 10,
        move: '6"',
        health: 1,
        save: '5+',
        control: 1,
        keywords: ['Infantry', 'Reinforcements'],
        hasReinforcements: true,
        meleeWeapons: [
          { name: 'Rusty Blade', attacks: '2', hit: '4+', wound: '5+', rend: '-', damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'seething-swarm',
            name: 'Seething Swarm',
            timing: 'End of Any Turn',
            effect: 'You can return D3 slain models to this unit.',
          },
        ],
      },
      {
        id: 'rat-ogors',
        name: 'Rat Ogors',
        count: 3,
        move: '6"',
        health: 4,
        save: '5+',
        control: 1,
        keywords: ['Infantry'],
        weaponNote: '2 Rat Ogors with Claws, Blades and Fangs; 1 with Warpfire Gun and Claws, Blades and Fangs.',
        rangedWeapons: [
          { name: 'Warpfire Gun', range: '10"', attacks: '2D6', hit: '2+', wound: '4+', rend: 2, damage: '1', ability: 'Shoot in Combat' },
        ],
        meleeWeapons: [
          { name: 'Claws, Blades and Fangs', attacks: '5', hit: '4+', wound: '3+', rend: 1, damage: '2', ability: '—' },
        ],
        abilities: [
          {
            id: 'unleashed-warp-fury',
            name: 'Unleashed Warp-Fury',
            timing: 'Any Combat Phase, Once Per Battle',
            effect: 'Inflict D3 mortal damage on this unit. Then, add 1 to the Attacks characteristic of its melee weapons this phase.',
          },
        ],
      },
    ],
    battleTraits: [
      {
        id: 'lurking-vermintide',
        name: 'The Lurking Vermintide',
        timing: 'Once Per Battle, Deployment Phase',
        effect: 'Pick a friendly unit that has not been deployed. That unit is set up in reserve in the tunnels below. Units in the tunnels below that have not used the Gnawhole Ambush ability by the end of the third battle round are destroyed.',
      },
      {
        id: 'gnawhole-ambush',
        name: 'Gnawhole Ambush',
        timing: 'Your Movement Phase',
        effect: 'Pick a friendly unit that is in the tunnels below. Set up that unit wholly within 6" of a corner of the battlefield and more than 9" from all enemy units.',
      },
    ],
    regimentAbilities: [
      {
        id: 'warpstone-laced-bullets',
        name: 'Warpstone-Laced Bullets',
        timing: 'Once Per Battle, Your Shooting Phase',
        effect: 'Pick a ranged weapon a friendly unit is armed with. That weapon has Crit (Mortal) this phase.',
      },
      {
        id: 'too-quick-to-hit',
        name: 'Too Quick to Hit-Hit',
        timing: 'Passive',
        effect: 'No mortal damage is inflicted on friendly units when they use Retreat abilities.',
      },
    ],
    enhancements: [
      {
        id: 'lead-the-seething-horde',
        name: 'Lead the Seething Horde',
        timing: "Reaction: You declared the 'Call for Reinforcements' ability",
        effect: 'Instead of using the set-up instructions in the Call for Reinforcements ability, the replacement unit can be set up wholly within 13" of this unit and not in combat.',
      },
      {
        id: 'skryre-connections',
        name: 'Skryre Connections',
        timing: 'Passive',
        effect: "Your general's Ratling Pistol has an Attacks characteristic of 2D6 instead of D6.",
      },
      {
        id: 'warpstone-charm',
        name: 'Warpstone Charm',
        timing: 'Passive',
        effect: 'Subtract 1 from save rolls for enemy units in combat with your general.',
      },
      {
        id: 'cloak-of-stitched-victories',
        name: 'Cloak of Stitched Victories',
        timing: 'Passive',
        effect: 'Your general has Ward (5+).',
      },
    ],
  },

  warpspark: {
    id: 'warpspark',
    name: 'Warpspark Clawpack',
    lore: "Grey Seers bind the competing clans into a unified force. Clanrats emerge from gnawholes while Stormfiends deliver devastating ranged fire. The Warp Lightning Cannon is the most feared weapon of the Skryre clans.",
    general: {
      id: 'grey-seer-warpspark',
      name: 'Grey Seer',
      move: '6"',
      health: 5,
      save: '6+',
      control: 2,
      keywords: ['Hero', 'Wizard', 'Infantry'],
      meleeWeapons: [
        { name: 'Warpstone Staff', attacks: '3', hit: '4+', wound: '4+', rend: 1, damage: 'D3', ability: '—' },
      ],
      abilities: [
        {
          id: 'will-of-horned-rat',
          name: 'Will of the Horned Rat',
          timing: 'Your Hero Phase',
          effect: "Pick a friendly unit wholly within 13\" of this unit, then roll a dice. On a 3+, add the roll to the target's control score until the start of your next turn.",
        },
        {
          id: 'wither',
          name: 'Wither',
          timing: 'Your Hero Phase',
          effect: 'Pick a visible enemy unit within 13" of this unit, then make a casting roll of 2D6. On a 6+, inflict D3 mortal damage on the target.',
        },
      ],
    },
    units: [
      {
        id: 'stormfiends',
        name: 'Stormfiends',
        count: 3,
        move: '6"',
        health: 6,
        save: '4+',
        control: 2,
        keywords: ['Infantry'],
        weaponNote: '1 with Shock Gauntlets; 1 with Windlaunchers and Clubbing Blows; 1 with Ratling Cannons and Clubbing Blows.',
        rangedWeapons: [
          { name: 'Ratling Cannons', range: '15"', attacks: '3D6', hit: '4+', wound: '3+', rend: 1, damage: '1', ability: '—' },
          { name: 'Windlaunchers', range: '15"', attacks: '3', hit: '4+', wound: '3+', rend: 2, damage: 'D3', ability: '—' },
        ],
        meleeWeapons: [
          { name: 'Shock Gauntlets', attacks: '4', hit: '4+', wound: '2+', rend: 1, damage: '2', ability: '—' },
          { name: 'Clubbing Blows', attacks: '4', hit: '4+', wound: '2+', rend: '-', damage: '2', ability: '—' },
        ],
        abilities: [
          {
            id: 'shock-gauntlets',
            name: 'Shock Gauntlets',
            timing: 'Passive',
            effect: 'Each time an attack made with this unit\'s Shock Gauntlets scores a critical hit, that attack scores D6 hits instead of 1 (make a wound roll for each hit).',
          },
        ],
      },
      {
        id: 'warp-lightning-cannon',
        name: 'Warp Lightning Cannon',
        move: '3"',
        health: 8,
        save: '4+',
        control: 2,
        keywords: ['War Machine'],
        rangedWeapons: [
          { name: 'Warp Lightning Blast', range: '20"', attacks: '2D6', hit: '4+', wound: 'See ability', rend: '-', damage: 'See ability', ability: '—' },
        ],
        meleeWeapons: [
          { name: "Crew's Teeth and Knives", attacks: 'D6', hit: '4+', wound: '5+', rend: '-', damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'warp-lightning-blast',
            name: 'Warp Lightning Blast',
            timing: 'Passive',
            effect: 'Each attack made with this weapon in a single phase must target the same enemy unit. Each hit inflicts 1 mortal damage on the target and the attack sequence ends.',
          },
        ],
      },
      {
        id: 'clanrats-ws-1',
        name: 'Clanrats',
        count: 10,
        move: '6"',
        health: 1,
        save: '5+',
        control: 1,
        keywords: ['Infantry', 'Reinforcements'],
        hasReinforcements: true,
        meleeWeapons: [
          { name: 'Rusty Blade', attacks: '2', hit: '4+', wound: '5+', rend: '-', damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'seething-swarm',
            name: 'Seething Swarm',
            timing: 'End of Any Turn',
            effect: 'You can return D3 slain models to this unit.',
          },
        ],
      },
      {
        id: 'clanrats-ws-2',
        name: 'Clanrats',
        count: 10,
        move: '6"',
        health: 1,
        save: '5+',
        control: 1,
        keywords: ['Infantry', 'Reinforcements'],
        hasReinforcements: true,
        meleeWeapons: [
          { name: 'Rusty Blade', attacks: '2', hit: '4+', wound: '5+', rend: '-', damage: '1', ability: '—' },
        ],
        abilities: [
          {
            id: 'seething-swarm',
            name: 'Seething Swarm',
            timing: 'End of Any Turn',
            effect: 'You can return D3 slain models to this unit.',
          },
        ],
      },
    ],
    battleTraits: [
      {
        id: 'always-three-clawsteps',
        name: 'Always Three Clawsteps Ahead',
        timing: 'Once Per Phase, Enemy Movement Phase',
        effect: 'Pick a friendly unit that is not in combat. That unit can use the Normal Move ability as if it were your movement phase.',
      },
    ],
    regimentAbilities: [
      {
        id: 'warpstone-laced-armour',
        name: 'Warpstone-Laced Armour',
        timing: 'Once Per Battle, Reaction: Opponent declared an Attack ability targeting your Stormfiends unit',
        effect: 'Used By: Your Stormfiends unit. Your Stormfiends unit has Ward (4+) this phase.',
      },
      {
        id: 'endless-swarm-of-rats',
        name: 'Endless Swarm of Rats',
        timing: 'Passive',
        effect: "When a friendly Clanrats unit uses its Seething Swarm ability, you can return D6 slain models to that unit instead of D3.",
      },
    ],
    enhancements: [
      {
        id: 'skilled-manipulator',
        name: 'Skilled Manipulator',
        timing: 'Passive',
        effect: 'Your general has Ward (4+) while they are within 1" of any friendly Clanrats units.',
      },
      {
        id: 'skitterleap',
        name: 'Skitterleap',
        timing: 'Your Hero Phase',
        effect: 'Make a casting roll of 2D6. On a 6+, remove your general from the battlefield and set them up again more than 6" from all enemy units. They cannot use Move abilities in the following movement phase.',
      },
      {
        id: 'cage-of-warp-lightning',
        name: 'Cage of Warp Lightning',
        timing: 'Once Per Battle, Any Combat Phase',
        effect: 'Pick a visible enemy unit within 6" of your general and roll a dice. On a 2+, the enemy unit has Strike-last this phase. On a 1, inflict 1 mortal damage on your general.',
      },
      {
        id: 'scurry-away',
        name: 'Scurry Away',
        timing: 'Any Combat Phase',
        effect: 'Roll a dice. On a 3+, this unit can immediately use the Retreat ability as if it were your movement phase. If it does so, no mortal damage is inflicted on it.',
      },
    ],
  },
}
