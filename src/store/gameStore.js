import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BATTLE_TACTICS } from '../data/cards'
import { STORMCAST_ARMIES } from '../data/stormcast'
import { SKAVEN_ARMIES } from '../data/skaven'
import { FEC_ARMIES } from '../data/fec'

// ── helpers ──────────────────────────────────────────────────────────────────

// Clear status effects by expiry type. playerIndexFilter=null clears all players.
function clearStatusEffectsByExpiry(unitStates, expiry, playerIndexFilter) {
  const result = {}
  for (const [key, state] of Object.entries(unitStates)) {
    if (playerIndexFilter != null && !key.startsWith(`${playerIndexFilter}-`)) {
      result[key] = state
      continue
    }
    const effects = state.statusEffects ?? []
    const remaining = effects.filter(e => e.expiresAt !== expiry)
    result[key] = remaining.length !== effects.length ? { ...state, statusEffects: remaining } : state
  }
  return result
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getArmyData(faction, variant) {
  if (faction === 'stormcast') return STORMCAST_ARMIES[variant]
  if (faction === 'skaven') return SKAVEN_ARMIES[variant]
  if (faction === 'fec') return FEC_ARMIES[variant]
  return null
}

export function getAllUnits(faction, variant) {
  const army = getArmyData(faction, variant)
  if (!army) return []
  return [army.general, ...army.units]
}

// Build initial unit states for a player
function buildUnitStates(faction, variant) {
  const units = getAllUnits(faction, variant)
  const states = {}
  units.forEach(unit => {
    states[unit.id] = {
      damagePoints: 0,
      destroyed: false,
      reinforced: false,
      inReserve: !!unit.startInReserve,
      statusEffects: [],
      tokens: unit.id === 'lord-veritant' ? { gryphcrow: true } : {},
    }
  })
  return states
}

// ── phases ────────────────────────────────────────────────────────────────────

export const PHASES = [
  { id: 'round-start', label: 'Start of Round', icon: '⚔️', description: 'Both players roll off for priority — the winner chooses who takes the first turn (or second). The player with fewer VPs is the Underdog (roll off if tied). Draw and resolve the Twist Card together. Use any Start of Battle Round abilities.' },
  { id: 'hero', label: 'Hero Phase', icon: '🏰', description: 'Use Hero Phase abilities. Wizards cast spells (casting roll 2D6, target number varies). Priests chant prayers. Heroes can use their named abilities.' },
  { id: 'movement', label: 'Movement Phase', icon: '👟', description: 'Each unit can: Normal Move (up to Move value) · Run (roll D6, add to Move — cannot Shoot or Charge after) · Retreat (leave combat — roll D6 mortal damage, cannot Charge after). Units with Fly ignore terrain height and can move over other units.' },
  { id: 'shooting', label: 'Shooting Phase', icon: '🏹', description: 'Units not in combat (within ½" of enemy) can shoot. Targets must be visible and within range. Units that Ran this turn cannot shoot. Units in cover (behind terrain) subtract 1 from hit rolls against them.' },
  { id: 'charge', label: 'Charge Phase', icon: '💥', description: 'Pick a unit not in combat that has not Run or Retreated this turn. Roll 2D6 for the charge roll — the unit must be able to end its move within ½" of an enemy unit and the distance to that unit must be equal to or less than the charge roll.' },
  { id: 'combat', label: 'Combat Phase', icon: '⚡', description: 'Use non-Fight Combat Phase abilities first. Then both players alternate choosing a unit to Fight, starting with the active player. IMPORTANT: every unit within ½" of an enemy MUST fight before the phase ends — you cannot skip them. Strike-First units fight before all others. Strike-Last units fight after all others.' },
  { id: 'end', label: 'End of Turn', icon: '🏁', description: 'Use End of Turn abilities → Score VPs: 1 VP if you control 1+ objectives · 1 VP if you control 2+ objectives · 1 VP if you control more objectives than your opponent · 1 VP per completed Battle Tactic. Then check if all 4 battle rounds are complete — if so, the game ends.' },
]

// ── default state ─────────────────────────────────────────────────────────────

const DEFAULT_PLAYER = (index) => ({
  id: index,
  name: `Player ${index + 1}`,
  faction: index === 0 ? 'stormcast' : 'skaven',
  armyVariant: index === 0 ? 'yndrasta' : 'gnawfeast',
  regimentAbilityIndex: 0,
  enhancementIndex: 0,
})

const initialState = {
  // App settings
  theme: 'dark',

  // Game phase: 'setup' | 'prebattle' | 'game' | 'gameover'
  screen: 'setup',

  // Setup
  players: [DEFAULT_PLAYER(0), DEFAULT_PLAYER(1)],

  // Pre-battle
  realm: 'aqshy',
  deploymentMap: 'horizontal',
  attackerIndex: 0,

  // Game
  battleRound: 1,
  activePlayerIndex: 0,
  currentPhaseIndex: 0, // index into PHASES (0 = round-start)
  playerTurnsDoneThisRound: 0, // 0 = nobody has gone, 1 = P1 done, 2 = both done

  // Victory points
  vp: [0, 0],

  // Twist deck — manual draw flow
  activeTwist: null,
  activeTwistOptionId: null, // which pick-one option was selected for this twist
  usedTwistIds: [],
  twistDrawPending: true, // true = player needs to draw & select a twist card

  // Battle tactic hands [player0hand, player1hand]
  tacticDeck: [],
  playerHands: [[], []],
  discardedTacticIds: [],

  // Unit states: { [playerId-unitId]: { damagePoints, destroyed, reinforced, inReserve, statusEffects } }
  unitStates: {},

  // Objective control: { objId: null | 0 | 1 } — null = neutral, 0 = player 0, 1 = player 1
  objectiveControl: { dracothion: null, ignax: null, behemat: null, vulcatrix: null, nagendra: null },

  // FEC Noble Deeds tracking: { 'playerIndex-unitId': pointsNumber }
  nobleDeedsPoints: {},
  // Once-per-battle trait tracking: { 'playerIndex-traitId': boolean }
  usedBattleTraits: {},
  // Once-per-battle tactic command tracking: { 'playerIndex-tacticId': boolean }
  usedTacticCommands: {},
  // Ability used this turn: { 'playerIndex-unitId-abilityId': boolean } — resets each turn
  usedAbilitiesThisTurn: {},
  // Ability used this battle: { 'playerIndex-unitId-abilityId': boolean } — persists all game
  usedAbilitiesThisBattle: {},
}

// ── store ─────────────────────────────────────────────────────────────────────

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // ── Settings ────────────────────────────────────────────────────────────

      toggleTheme() {
        set(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' }))
      },

      // ── Setup ────────────────────────────────────────────────────────────────

      setPlayerName(playerIndex, name) {
        set(s => {
          const players = [...s.players]
          players[playerIndex] = { ...players[playerIndex], name }
          return { players }
        })
      },

      setPlayerFaction(playerIndex, faction) {
        // Reset variant to first available when faction changes
        const variantMap = {
          stormcast: 'yndrasta',
          skaven: 'gnawfeast',
          fec: 'carrionRetainers',
        }
        set(s => {
          const players = [...s.players]
          players[playerIndex] = {
            ...players[playerIndex],
            faction,
            armyVariant: variantMap[faction],
            regimentAbilityIndex: 0,
            enhancementIndex: 0,
          }
          return { players }
        })
      },

      setPlayerVariant(playerIndex, variant) {
        set(s => {
          const players = [...s.players]
          players[playerIndex] = { ...players[playerIndex], armyVariant: variant, regimentAbilityIndex: 0, enhancementIndex: 0 }
          return { players }
        })
      },

      setPlayerRegimentAbility(playerIndex, index) {
        set(s => {
          const players = [...s.players]
          players[playerIndex] = { ...players[playerIndex], regimentAbilityIndex: index }
          return { players }
        })
      },

      setPlayerEnhancement(playerIndex, index) {
        set(s => {
          const players = [...s.players]
          players[playerIndex] = { ...players[playerIndex], enhancementIndex: index }
          return { players }
        })
      },

      setRealm(realm) { set({ realm }) },
      setDeploymentMap(map) { set({ deploymentMap: map }) },
      setAttacker(index) { set({ attackerIndex: index }) },

      goToPreBattle() { set({ screen: 'prebattle' }) },
      goBackToSetup() { set({ screen: 'setup' }) },

      // ── Start Game ───────────────────────────────────────────────────────────

      startGame() {
        const { players } = get()

        // Build unit states for each player
        const unitStates = {}
        players.forEach((p, pi) => {
          const states = buildUnitStates(p.faction, p.armyVariant)
          Object.entries(states).forEach(([unitId, state]) => {
            unitStates[`${pi}-${unitId}`] = state
          })
        })

        // Shuffle tactic deck only — twists are drawn manually from physical cards
        const tacticDeck = shuffle(BATTLE_TACTICS)

        const playerHands = [
          tacticDeck.slice(0, 3).map(c => c.id),
          tacticDeck.slice(3, 6).map(c => c.id),
        ]
        const remainingDeck = tacticDeck.slice(6).map(c => c.id)

        set({
          screen: 'game',
          unitStates,
          activeTwist: null,
          usedTwistIds: [],
          twistDrawPending: true,
          tacticDeck: remainingDeck,
          playerHands,
          discardedTacticIds: [],
          battleRound: 1,
          activePlayerIndex: get().attackerIndex,
          currentPhaseIndex: 0,
          playerTurnsDoneThisRound: 0,
          vp: [0, 0],
          nobleDeedsPoints: {},
          usedBattleTraits: {},
          usedTacticCommands: {},
          usedAbilitiesThisTurn: {},
          usedAbilitiesThisBattle: {},
          objectiveControl: { dracothion: null, ignax: null, behemat: null, vulcatrix: null, nagendra: null },
        })
      },

      // ── Phase Navigation ─────────────────────────────────────────────────────

      nextPhase() {
        const { currentPhaseIndex, activePlayerIndex, playerTurnsDoneThisRound, battleRound, unitStates } = get()

        const lastPhaseIndex = PHASES.length - 1

        // Always clear end-of-phase effects for the active player on any phase advance
        let newUnitStates = clearStatusEffectsByExpiry(unitStates, 'end-of-phase', activePlayerIndex)

        if (currentPhaseIndex === lastPhaseIndex) {
          // End of active player's turn — clear end-of-turn effects for them
          newUnitStates = clearStatusEffectsByExpiry(newUnitStates, 'end-of-turn', activePlayerIndex)

          const turnsDone = playerTurnsDoneThisRound + 1

          if (turnsDone >= 2) {
            // Both players done — clear end-of-round effects for ALL units
            newUnitStates = clearStatusEffectsByExpiry(newUnitStates, 'end-of-round', null)

            const nextRound = battleRound + 1

            if (nextRound > 4) {
              set({ screen: 'gameover', unitStates: newUnitStates })
              return
            }

            const { tacticDeck: remainingTactics, playerHands } = get()
            let deck = [...remainingTactics]
            const newHands = playerHands.map(hand => {
              const needed = 3 - hand.length
              const drawn = deck.slice(0, needed)
              deck = deck.slice(needed)
              return [...hand, ...drawn]
            })

            set({
              battleRound: nextRound,
              currentPhaseIndex: 0,
              playerTurnsDoneThisRound: 0,
              activeTwist: null,
              activeTwistOptionId: null,
              twistDrawPending: true,
              tacticDeck: deck,
              playerHands: newHands,
              unitStates: newUnitStates,
              usedAbilitiesThisTurn: {},
            })
          } else {
            // Switch to other player's turn — reset per-turn ability usage
            set({
              activePlayerIndex: 1 - activePlayerIndex,
              currentPhaseIndex: 1,
              playerTurnsDoneThisRound: turnsDone,
              unitStates: newUnitStates,
              usedAbilitiesThisTurn: {},
            })
          }
        } else {
          const next = currentPhaseIndex === 0 ? 1 : currentPhaseIndex + 1
          set({ currentPhaseIndex: next, unitStates: newUnitStates })
        }
      },

      prevPhase() {
        const { currentPhaseIndex, playerTurnsDoneThisRound } = get()
        // Don't allow going back to Round Start (index 0) during Player 2's turn
        const minPhase = playerTurnsDoneThisRound >= 1 ? 1 : 0
        set({ currentPhaseIndex: Math.max(minPhase, currentPhaseIndex - 1) })
      },

      // ── VP ───────────────────────────────────────────────────────────────────

      addVP(playerIndex, amount) {
        set(s => {
          const vp = [...s.vp]
          vp[playerIndex] = Math.max(0, vp[playerIndex] + amount)
          return { vp }
        })
      },

      removeVP(playerIndex, amount) {
        set(s => {
          const vp = [...s.vp]
          vp[playerIndex] = Math.max(0, vp[playerIndex] - amount)
          return { vp }
        })
      },

      // ── Unit State ───────────────────────────────────────────────────────────

      getUnitState(playerIndex, unitId) {
        return get().unitStates[`${playerIndex}-${unitId}`] ?? {
          damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [],
        }
      },

      addDamage(playerIndex, unitId, amount) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          return {
            unitStates: {
              ...s.unitStates,
              [key]: { ...state, damagePoints: Math.max(0, state.damagePoints + amount) },
            },
          }
        })
      },

      removeDamage(playerIndex, unitId, amount) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          return {
            unitStates: {
              ...s.unitStates,
              [key]: { ...state, damagePoints: Math.max(0, state.damagePoints - amount) },
            },
          }
        })
      },

      setUnitDestroyed(playerIndex, unitId, destroyed) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          return {
            unitStates: {
              ...s.unitStates,
              [key]: { ...state, destroyed, damagePoints: destroyed ? state.damagePoints : 0 },
            },
          }
        })
      },

      setUnitReinforced(playerIndex, unitId) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          return {
            unitStates: {
              ...s.unitStates,
              [key]: { ...state, reinforced: true, destroyed: false, damagePoints: 0, inReserve: false },
            },
          }
        })
      },

      setUnitInReserve(playerIndex, unitId, inReserve) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          return {
            unitStates: { ...s.unitStates, [key]: { ...state, inReserve } },
          }
        })
      },

      addStatusEffect(playerIndex, unitId, effect) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          const already = state.statusEffects.some(e => e.id === effect.id)
          if (already) return {}
          return {
            unitStates: {
              ...s.unitStates,
              [key]: { ...state, statusEffects: [...state.statusEffects, effect] },
            },
          }
        })
      },

      removeStatusEffect(playerIndex, unitId, effectId) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          return {
            unitStates: {
              ...s.unitStates,
              [key]: { ...state, statusEffects: state.statusEffects.filter(e => e.id !== effectId) },
            },
          }
        })
      },

      clearAllStatusEffects(playerIndex, unitId) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [] }
          return {
            unitStates: { ...s.unitStates, [key]: { ...state, statusEffects: [] } },
          }
        })
      },

      // ── Battle Tactic Cards ──────────────────────────────────────────────────

      discardTactic(playerIndex, cardId) {
        set(s => {
          const hands = [...s.playerHands]
          hands[playerIndex] = hands[playerIndex].filter(id => id !== cardId)
          return {
            playerHands: hands,
            discardedTacticIds: [...s.discardedTacticIds, cardId],
          }
        })
      },

      drawTacticCard(playerIndex) {
        const { tacticDeck, playerHands } = get()
        if (tacticDeck.length === 0) return
        const [next, ...rest] = tacticDeck
        const hands = [...playerHands]
        hands[playerIndex] = [...hands[playerIndex], next]
        set({ tacticDeck: rest, playerHands: hands })
      },

      // ── FEC Noble Deeds ──────────────────────────────────────────────────────

      addNobleDeedsPoints(playerIndex, unitId, amount) {
        const key = `${playerIndex}-${unitId}`
        set(s => ({
          nobleDeedsPoints: {
            ...s.nobleDeedsPoints,
            [key]: Math.min(6, Math.max(0, (s.nobleDeedsPoints[key] ?? 0) + amount)),
          },
        }))
      },

      spendNobleDeedsPoints(playerIndex, unitId, amount) {
        const key = `${playerIndex}-${unitId}`
        set(s => ({
          nobleDeedsPoints: {
            ...s.nobleDeedsPoints,
            [key]: Math.max(0, (s.nobleDeedsPoints[key] ?? 0) - amount),
          },
        }))
      },

      // ── Twist Card Manual Draw ───────────────────────────────────────────────

      selectTwist(card) {
        set(s => ({
          activeTwist: card,
          activeTwistOptionId: null,
          usedTwistIds: [...s.usedTwistIds, card.id],
          twistDrawPending: false,
        }))
      },

      setTwistOptionId(optionId) {
        set({ activeTwistOptionId: optionId })
      },

      // ── Per-Ability Usage Tracking ───────────────────────────────────────────

      // Toggle whether an ability was used this turn (resets each turn automatically)
      toggleAbilityThisTurn(playerIndex, unitId, abilityId) {
        const key = `${playerIndex}-${unitId}-${abilityId}`
        set(s => ({ usedAbilitiesThisTurn: { ...s.usedAbilitiesThisTurn, [key]: !s.usedAbilitiesThisTurn[key] } }))
      },

      // Toggle whether a once-per-battle ability has been used (never auto-resets)
      toggleAbilityThisBattle(playerIndex, unitId, abilityId) {
        const key = `${playerIndex}-${unitId}-${abilityId}`
        set(s => ({ usedAbilitiesThisBattle: { ...s.usedAbilitiesThisBattle, [key]: !s.usedAbilitiesThisBattle[key] } }))
      },

      // ── Tactic Command Tracking ──────────────────────────────────────────────

      toggleTacticCommandUsed(playerIndex, tacticId) {
        const key = `${playerIndex}-${tacticId}`
        set(s => ({
          usedTacticCommands: { ...s.usedTacticCommands, [key]: !s.usedTacticCommands[key] },
        }))
      },

      // ── Once-Per-Battle Traits ───────────────────────────────────────────────

      toggleBattleTrait(playerIndex, traitId) {
        const key = `${playerIndex}-${traitId}`
        set(s => ({
          usedBattleTraits: {
            ...s.usedBattleTraits,
            [key]: !s.usedBattleTraits[key],
          },
        }))
      },

      // ── Objective Control ────────────────────────────────────────────────────

      // owner: null = neutral, 0 = player 0, 1 = player 1
      setObjectiveControl(objId, owner) {
        set(s => ({ objectiveControl: { ...s.objectiveControl, [objId]: owner } }))
      },

      // Cycle neutral → player 0 → player 1 → neutral
      cycleObjectiveControl(objId) {
        set(s => {
          const cur = s.objectiveControl[objId]
          const next = cur === null ? 0 : cur === 0 ? 1 : null
          return { objectiveControl: { ...s.objectiveControl, [objId]: next } }
        })
      },

      // ── Lurking Vermintide ───────────────────────────────────────────────────

      // Destroy all units still in reserve for a player (Vermintide deadline)
      destroyReserveUnits(playerIndex) {
        set(s => {
          const newUnitStates = { ...s.unitStates }
          for (const [key, state] of Object.entries(newUnitStates)) {
            if (key.startsWith(`${playerIndex}-`) && state.inReserve) {
              newUnitStates[key] = { ...state, inReserve: false, destroyed: true }
            }
          }
          return { unitStates: newUnitStates }
        })
      },

      // ── Unit Tokens ──────────────────────────────────────────────────────────

      toggleUnitToken(playerIndex, unitId, tokenName) {
        const key = `${playerIndex}-${unitId}`
        set(s => {
          const state = s.unitStates[key] ?? { damagePoints: 0, destroyed: false, reinforced: false, inReserve: false, statusEffects: [], tokens: {} }
          const tokens = state.tokens ?? {}
          return {
            unitStates: {
              ...s.unitStates,
              [key]: { ...state, tokens: { ...tokens, [tokenName]: !tokens[tokenName] } },
            },
          }
        })
      },

      // ── Reset ────────────────────────────────────────────────────────────────

      resetGame() {
        set({
          ...initialState,
          theme: get().theme,
          players: get().players,
          objectiveControl: { dracothion: null, ignax: null, behemat: null, vulcatrix: null, nagendra: null },
        })
      },

      fullReset() {
        set({ ...initialState })
      },
    }),
    {
      name: 'aos-companion-state',
      partialize: (state) => ({
        theme: state.theme,
        screen: state.screen,
        players: state.players,
        realm: state.realm,
        deploymentMap: state.deploymentMap,
        attackerIndex: state.attackerIndex,
        battleRound: state.battleRound,
        activePlayerIndex: state.activePlayerIndex,
        currentPhaseIndex: state.currentPhaseIndex,
        playerTurnsDoneThisRound: state.playerTurnsDoneThisRound,
        vp: state.vp,
        activeTwist: state.activeTwist,
        activeTwistOptionId: state.activeTwistOptionId,
        usedTwistIds: state.usedTwistIds,
        twistDrawPending: state.twistDrawPending,
        tacticDeck: state.tacticDeck,
        playerHands: state.playerHands,
        discardedTacticIds: state.discardedTacticIds,
        unitStates: state.unitStates,
        nobleDeedsPoints: state.nobleDeedsPoints,
        usedBattleTraits: state.usedBattleTraits,
        usedTacticCommands: state.usedTacticCommands,
        usedAbilitiesThisTurn: state.usedAbilitiesThisTurn,
        usedAbilitiesThisBattle: state.usedAbilitiesThisBattle,
        objectiveControl: state.objectiveControl,
      }),
    }
  )
)
