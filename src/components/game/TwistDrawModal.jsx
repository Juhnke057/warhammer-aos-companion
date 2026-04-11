import { useState } from 'react'
import { useGameStore, getAllUnits } from '../../store/gameStore'
import { AQSHY_TWISTS, GHYRAN_TWISTS } from '../../data/cards'
import { COMMON_STATUS_EFFECTS } from '../units/UnitCard'
import Modal from '../ui/Modal'

// ── Task queue builder ────────────────────────────────────────────────────────
// Returns an array of tasks to execute after underdog + option are known.
// Task types:
//   { type: 'pick-unit',  instruction, fromPlayerIndex, statusId }
//   { type: 'rolloff',    instruction, buildTasks: (winnerIdx) => task[] }
//   { type: 'info',       message }

function buildTasks(cardId, underdogIdx, players, chosenOption) {
  const u = underdogIdx  // null | 0 | 1
  const p = players

  switch (cardId) {

    // ── Aqshy ────────────────────────────────────────────────────────────────

    case 'bloodmarked':
      if (u !== null) {
        // Underdog picks 1 from EACH army
        return [
          { type: 'pick-unit', instruction: `${p[u].name} (Underdog) — pick 1 unit from YOUR OWN army to Bloodmark`, fromPlayerIndex: u, statusId: 'bloodmarked' },
          { type: 'pick-unit', instruction: `${p[u].name} (Underdog) — pick 1 unit from the ENEMY army to Bloodmark`, fromPlayerIndex: 1 - u, statusId: 'bloodmarked' },
        ]
      }
      // No underdog — each player picks 1 enemy unit
      return [
        { type: 'pick-unit', instruction: `${p[0].name} — pick 1 ENEMY unit to Bloodmark`, fromPlayerIndex: 1, statusId: 'bloodmarked' },
        { type: 'pick-unit', instruction: `${p[1].name} — pick 1 ENEMY unit to Bloodmark`, fromPlayerIndex: 0, statusId: 'bloodmarked' },
      ]

    case 'let-the-blood-flow':
      if (u === null) return []
      return [{ type: 'pick-unit', instruction: `${p[u].name} (Underdog) — pick 1 FRIENDLY unit to be Frenzied (+1 to hit in combat this round)`, fromPlayerIndex: u, statusId: 'frenzied' }]

    case 'mount-the-attack':
      if (u === null) return []
      return [{ type: 'pick-unit', instruction: `${p[u].name} (Underdog) — pick 1 FRIENDLY unit as the Spearhead (melee weapons get Charge +1 Damage this round)`, fromPlayerIndex: u, statusId: 'spearhead' }]

    case 'ring-of-fire':
      return [{ type: 'info', message: `${u !== null ? p[u].name + ' (Underdog)' : 'Roll-off winner'} picks 1 objective. That objective cannot be controlled or contested this round, and inflicts D3 Mortal Damage on any unit on it at the end of each turn.` }]

    case 'wreathed-in-smoke':
      return [{ type: 'info', message: `${u !== null ? p[u].name + ' (Underdog)' : 'Roll-off winner'} picks 1 objective. Until end of round, only unmodified hit rolls of 6 successfully hit for attacks targeting units on that objective.` }]

    case 'reclaim-aqshy':
      if (u !== null) return [{ type: 'info', message: `${p[u].name} (Underdog) picks 2 objectives. Each player scores +1 VP at the end of their turn for each of those objectives they control.` }]
      return [{ type: 'info', message: `Each player picks 1 objective (active player first). Each player scores +1 VP at the end of their turn for each of those objectives they control.` }]

    // ── Ghyran ───────────────────────────────────────────────────────────────

    case 'grandfathers-blessing': {
      if (!chosenOption) return [] // wait for option step
      const statusId = chosenOption === 'nurgles-rot' ? 'nurgles-rot' : 'no-ward-saves'
      const effectName = chosenOption === 'nurgles-rot' ? "Nurgle's Rot (−1 to save rolls)" : 'Eroding Miasma (no ward saves)'
      if (u !== null) {
        return [{ type: 'pick-unit', instruction: `${p[u].name} (Underdog) — pick 1 ENEMY unit for ${effectName}`, fromPlayerIndex: 1 - u, statusId }]
      }
      return [{
        type: 'rolloff',
        instruction: `Roll off — winner picks 1 ENEMY unit for ${effectName}`,
        buildTasks: (winnerIdx) => [{ type: 'pick-unit', instruction: `${p[winnerIdx].name} (roll-off winner) — pick 1 ENEMY unit for ${effectName}`, fromPlayerIndex: 1 - winnerIdx, statusId }],
      }]
    }

    case 'grasping-vines':
      if (u !== null) {
        return [{ type: 'pick-unit', instruction: `${p[u].name} (Underdog) — pick 1 ENEMY unit to Ensnare (Move halved, −1 charge dice this round)`, fromPlayerIndex: 1 - u, statusId: 'ensnared' }]
      }
      return [{
        type: 'rolloff',
        instruction: 'Roll off — winner picks 1 ENEMY unit to Ensnare (Move halved, −1 charge dice this round)',
        buildTasks: (winnerIdx) => [{ type: 'pick-unit', instruction: `${p[winnerIdx].name} (roll-off winner) — pick 1 ENEMY unit to Ensnare`, fromPlayerIndex: 1 - winnerIdx, statusId: 'ensnared' }],
      }]

    case 'alarielle-blessing': {
      if (!chosenOption) return []
      if (chosenOption === 'shield-of-thorns') {
        if (u !== null) {
          return [{ type: 'pick-unit', instruction: `${p[u].name} (Underdog) — pick 1 FRIENDLY unit for Shield of Thorns (Ward 6+ this round)`, fromPlayerIndex: u, statusId: 'shield-of-thorns' }]
        }
        return [{
          type: 'rolloff',
          instruction: 'Roll off — winner picks 1 FRIENDLY unit for Shield of Thorns (Ward 6+ this round)',
          buildTasks: (winnerIdx) => [{ type: 'pick-unit', instruction: `${p[winnerIdx].name} (roll-off winner) — pick 1 FRIENDLY unit for Shield of Thorns`, fromPlayerIndex: winnerIdx, statusId: 'shield-of-thorns' }],
        }]
      }
      // Rain of Jade — healing, not a status effect
      return [{ type: 'info', message: '🌿 Rain of Jade: Pick up to 3 friendly units and Heal (D3) each — roll separately for each unit on the table.' }]
    }

    case 'take-the-land':
      if (u !== null) return [{ type: 'info', message: `${p[u].name} (Underdog) adds +1 to wound rolls for attacks made by their units targeting a unit contesting a large terrain feature. Remember this passive bonus!` }]
      return []

    case 'lifespring':
      return [{ type: 'info', message: `${u !== null ? p[u].name + ' (Underdog)' : 'Roll-off winner'} picks 1 objective. That objective gives +1 VP to whoever controls it at end of turn, and Heals (1) all units contesting it at end of each turn.` }]

    case 'reclaim-ghyran':
      if (u !== null) return [{ type: 'info', message: `${p[u].name} (Underdog) picks 2 objectives. Each player scores +1 VP at end of their turn for each of those objectives they control.` }]
      return [{ type: 'info', message: `Each player picks 1 objective (active player first). Each player scores +1 VP at end of their turn for each of those objectives they control.` }]

    default:
      return []
  }
}

// Cards that need an option choice before building tasks
const OPTION_CARDS = {
  'grandfathers-blessing': [
    { id: 'nurgles-rot',      name: "Nurgle's Rot",    description: 'Pick an enemy unit. −1 to save rolls for that unit this battle round.' },
    { id: 'eroding-miasma',   name: 'Eroding Miasma',  description: 'Pick an enemy unit. Ward rolls cannot be made for that unit this battle round.' },
  ],
  'alarielle-blessing': [
    { id: 'shield-of-thorns', name: 'Shield of Thorns', description: 'Pick a friendly unit. That unit has Ward (6+) this battle round.' },
    { id: 'rain-of-jade',     name: 'Rain of Jade',     description: 'Pick up to 3 friendly units. Heal (D3) each (roll separately for each).' },
  ],
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TwistDrawModal({ open, onClose }) {
  const { realm, players, vp, usedTwistIds, selectTwist, addStatusEffect } = useGameStore()

  const [step, setStep]               = useState('pick')    // 'pick' | 'underdog' | 'option' | 'tasks' | 'done'
  const [chosen, setChosen]           = useState(null)       // full card object
  const [underdogIdx, setUnderdogIdx] = useState(null)       // null | 0 | 1 | 'none'
  const [chosenOption, setChosenOption] = useState(null)     // option id for multi-option cards
  const [taskQueue, setTaskQueue]     = useState([])         // remaining tasks
  const [currentTask, setCurrentTask] = useState(null)       // task being worked on

  const allTwists   = realm === 'aqshy' ? AQSHY_TWISTS : GHYRAN_TWISTS
  const available   = allTwists.filter(c => !usedTwistIds.includes(c.id))
  const realmColor  = realm === 'aqshy' ? '#ef4444' : '#10b981'
  const realmLabel  = realm === 'aqshy' ? '🔥 Aqshy' : '🌿 Ghyran'

  // Auto-determine underdog from VP for the suggestion
  const autoUnderdog = vp[0] < vp[1] ? 0 : vp[1] < vp[0] ? 1 : null

  function reset() {
    setStep('pick'); setChosen(null); setUnderdogIdx(null)
    setChosenOption(null); setTaskQueue([]); setCurrentTask(null)
  }

  function handleClose() { reset(); onClose() }

  // ── Step 1: card picked ────────────────────────────────────────────────────
  function handlePickCard(card) {
    setChosen(card)
    setStep('underdog')
  }

  // ── Step 2: underdog confirmed ─────────────────────────────────────────────
  function handleUnderdogConfirmed(idx) {
    // idx: null = no underdog, 0 or 1 = that player
    const realIdx = idx === 'none' ? null : idx
    setUnderdogIdx(realIdx)

    // If card needs an option choice, go there first
    if (OPTION_CARDS[chosen.id]) {
      setStep('option')
      return
    }

    // Build task queue and start
    const tasks = buildTasks(chosen.id, realIdx, players, null)
    startTasks(tasks, chosen, realIdx)
  }

  // ── Step 3 (optional): option chosen ──────────────────────────────────────
  function handleOptionChosen(optId) {
    setChosenOption(optId)
    const realUnderdogIdx = underdogIdx === 'none' ? null : underdogIdx
    const tasks = buildTasks(chosen.id, realUnderdogIdx, players, optId)
    startTasks(tasks, chosen, realUnderdogIdx)
  }

  // ── Start processing tasks ─────────────────────────────────────────────────
  function startTasks(tasks, card, uIdx) {
    selectTwist(card)   // register the card as active immediately
    if (tasks.length === 0) {
      handleClose()
      return
    }
    const [first, ...rest] = tasks
    setCurrentTask(first)
    setTaskQueue(rest)
    setStep('tasks')
  }

  // ── Complete current task, move to next ────────────────────────────────────
  function advanceTask(extraTasks = []) {
    const remaining = [...extraTasks, ...taskQueue]
    if (remaining.length === 0) {
      handleClose()
      return
    }
    const [next, ...rest] = remaining
    setCurrentTask(next)
    setTaskQueue(rest)
  }

  // ── Unit was picked for a pick-unit task ───────────────────────────────────
  function handleUnitPicked(targetPlayerIndex, unit) {
    if (!currentTask || currentTask.type !== 'pick-unit') return
    const effectDef = COMMON_STATUS_EFFECTS.find(e => e.id === currentTask.statusId)
    if (effectDef) {
      addStatusEffect(targetPlayerIndex, unit.id, effectDef)
    }
    advanceTask()
  }

  // ── Roll-off winner chosen ─────────────────────────────────────────────────
  function handleRolloffWinner(winnerIdx) {
    if (!currentTask || currentTask.type !== 'rolloff') return
    const extraTasks = currentTask.buildTasks(winnerIdx)
    advanceTask(extraTasks)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  let title = `${realmLabel} — Draw a Twist Card`
  if (step === 'underdog') title = `${chosen?.name} — Who is the Underdog?`
  if (step === 'option')   title = `${chosen?.name} — Pick an Effect`
  if (step === 'tasks' && currentTask?.type === 'pick-unit')  title = 'Pick Target Unit'
  if (step === 'tasks' && currentTask?.type === 'rolloff')    title = 'Roll Off'
  if (step === 'tasks' && currentTask?.type === 'info')       title = chosen?.name ?? 'Twist Active'

  return (
    <Modal open={open} onClose={handleClose} title={title} accentColor={realmColor}>

      {/* ── Step 1: Pick the card ─────────────────────────────────────────── */}
      {step === 'pick' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 leading-relaxed">
            Draw a card from your {realm === 'aqshy' ? 'Aqshy' : 'Ghyran'} twist deck, then tap it below.
          </p>
          {available.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm">All twist cards have been drawn this game.</div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {available.map(card => (
              <button
                key={card.id}
                onClick={() => handlePickCard(card)}
                className="text-left rounded-lg p-3 active:scale-95 transition-transform"
                style={{ background: realmColor + '12', border: `1px solid ${realmColor}35` }}
              >
                <div className="font-display font-bold text-sm leading-tight mb-1" style={{ color: realmColor }}>
                  {card.name}
                </div>
                <div className="text-xs text-gray-500 leading-tight line-clamp-2">
                  {card.effect.length > 70 ? card.effect.slice(0, 70) + '…' : card.effect}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Underdog ─────────────────────────────────────────────── */}
      {step === 'underdog' && chosen && (
        <div className="space-y-4">
          {/* Full card text */}
          <div className="rounded-lg p-4" style={{ background: realmColor + '12', border: `1px solid ${realmColor}30` }}>
            <div className="text-xs font-display font-bold uppercase tracking-widest mb-2" style={{ color: realmColor }}>
              {realmLabel} Twist
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">{chosen.effect}</p>
            {chosen.underdogBonus && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: realmColor + '25' }}>
                <div className="text-xs font-display font-bold uppercase tracking-wider mb-1" style={{ color: '#9333ea' }}>
                  Underdog Bonus
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{chosen.underdogBonus}</p>
              </div>
            )}
          </div>

          {/* Underdog selection */}
          <div>
            <div className="text-sm font-bold text-gray-300 mb-1">Who is the underdog?</div>
            {autoUnderdog !== null && (
              <p className="text-xs text-gray-500 mb-3">
                Based on current VP ({vp[0]}–{vp[1]}), {players[autoUnderdog].name} has fewer points.
              </p>
            )}
            {autoUnderdog === null && (
              <p className="text-xs text-gray-500 mb-3">VP are equal ({vp[0]}–{vp[1]}) — no underdog unless you choose one.</p>
            )}
            <div className="space-y-2">
              {players.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleUnderdogConfirmed(i)}
                  className="w-full py-3 px-4 rounded-lg text-left font-bold active:scale-95 transition-transform flex items-center justify-between"
                  style={{
                    background: autoUnderdog === i ? realmColor + '20' : 'rgba(255,255,255,0.06)',
                    border: `2px solid ${autoUnderdog === i ? realmColor : 'rgba(255,255,255,0.1)'}`,
                    color: autoUnderdog === i ? realmColor : '#ccc',
                  }}
                >
                  <span>{p.name} is the Underdog</span>
                  {autoUnderdog === i && <span className="text-xs opacity-70">suggested</span>}
                </button>
              ))}
              <button
                onClick={() => handleUnderdogConfirmed('none')}
                className="w-full py-3 px-4 rounded-lg text-left font-bold active:scale-95 transition-transform"
                style={{
                  background: autoUnderdog === null ? realmColor + '20' : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${autoUnderdog === null ? realmColor : 'rgba(255,255,255,0.1)'}`,
                  color: autoUnderdog === null ? realmColor : '#888',
                }}
              >
                No Underdog (equal VP)
                {autoUnderdog === null && <span className="ml-2 text-xs opacity-70">suggested</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3 (optional): Pick option ───────────────────────────────── */}
      {step === 'option' && chosen && OPTION_CARDS[chosen.id] && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Choose which effect to apply this round:</p>
          {OPTION_CARDS[chosen.id].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleOptionChosen(opt.id)}
              className="w-full text-left rounded-lg p-4 active:scale-95 transition-transform"
              style={{ background: realmColor + '12', border: `1px solid ${realmColor}35` }}
            >
              <div className="font-display font-bold text-base mb-1" style={{ color: realmColor }}>{opt.name}</div>
              <p className="text-sm text-gray-300 leading-relaxed">{opt.description}</p>
            </button>
          ))}
        </div>
      )}

      {/* ── Step 4: Process tasks ─────────────────────────────────────────── */}
      {step === 'tasks' && currentTask && (
        <div className="space-y-4">
          {/* Progress indicator */}
          {(taskQueue.length > 0) && (
            <div className="text-xs text-center text-gray-500">
              Step {taskQueue.length > 0 ? '1' : '1'} of {taskQueue.length + 1}
            </div>
          )}

          {/* ── pick-unit task ─────────────────────────────────────────────── */}
          {currentTask.type === 'pick-unit' && (
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: realmColor + '12', border: `1px solid ${realmColor}30` }}>
                <p className="text-sm font-bold text-gray-200 leading-relaxed">{currentTask.instruction}</p>
              </div>
              <div className="space-y-1.5">
                {getAllUnits(
                  players[currentTask.fromPlayerIndex].faction,
                  players[currentTask.fromPlayerIndex].armyVariant,
                ).map(unit => (
                  <button
                    key={unit.id}
                    onClick={() => handleUnitPicked(currentTask.fromPlayerIndex, unit)}
                    className="w-full text-left px-4 py-3 rounded-lg active:scale-95 transition-transform"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <span className="text-base font-bold text-white">{unit.name}</span>
                    {unit.keywords?.includes('Hero') && (
                      <span className="ml-2 text-xs font-bold text-yellow-500">HERO</span>
                    )}
                    {unit.count > 1 && (
                      <span className="ml-2 text-xs text-gray-500">×{unit.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── rolloff task ───────────────────────────────────────────────── */}
          {currentTask.type === 'rolloff' && (
            <div className="space-y-4">
              <div className="rounded-lg p-4" style={{ background: realmColor + '12', border: `1px solid ${realmColor}30` }}>
                <p className="text-sm text-gray-200 leading-relaxed">{currentTask.instruction}</p>
              </div>
              <p className="text-sm text-gray-400 text-center">Roll dice at the table, then tap who won:</p>
              <div className="space-y-2">
                {players.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleRolloffWinner(i)}
                    className="w-full py-4 rounded-lg font-bold text-base active:scale-95 transition-transform"
                    style={{ background: realmColor + '20', border: `2px solid ${realmColor}60`, color: realmColor }}
                  >
                    {p.name} won the roll-off
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── info task ─────────────────────────────────────────────────── */}
          {currentTask.type === 'info' && (
            <div className="space-y-4">
              <div
                className="rounded-lg p-4"
                style={{ background: realmColor + '12', border: `1px solid ${realmColor}30` }}
              >
                <p className="text-sm text-gray-200 leading-relaxed">{currentTask.message}</p>
              </div>
              <button
                onClick={() => advanceTask()}
                className="w-full py-3 rounded-lg font-bold text-sm active:scale-95 transition-transform"
                style={{ background: realmColor, color: 'white' }}
              >
                Got it →
              </button>
            </div>
          )}
        </div>
      )}

    </Modal>
  )
}
