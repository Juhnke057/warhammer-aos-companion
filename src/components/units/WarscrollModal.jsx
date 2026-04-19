import { useState } from 'react'
import { useGameStore, getArmyData, getAllUnits } from '../../store/gameStore'
import { COMMON_STATUS_EFFECTS } from './UnitCard'
import Modal from '../ui/Modal'

// ── Dice roll helper ──────────────────────────────────────────────────────────
function parseDice(text) {
  const seen = new Set()
  const result = []
  for (const m of text.matchAll(/\b(\d+)?[Dd](\d+)\b/g)) {
    const expr = m[0].toUpperCase()
    if (!seen.has(expr)) { seen.add(expr); result.push(expr) }
  }
  return result
}

function rollExpr(expr) {
  const m = expr.match(/^(\d+)?D(\d+)$/i)
  if (!m) return null
  const count = parseInt(m[1] || '1')
  const sides = parseInt(m[2])
  const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1)
  return rolls.reduce((a, b) => a + b, 0)
}

function DiceHelper({ effect }) {
  const [results, setResults] = useState({})
  const exprs = parseDice(effect)
  if (exprs.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {exprs.map(expr => (
        <button
          key={expr}
          onClick={() => setResults(r => ({ ...r, [expr]: rollExpr(expr) }))}
          className="flex items-center gap-1.5 px-2.5 py-1 active:scale-95 transition-transform"
          style={{ background: '#f59e0b18', border: '1px solid #f59e0b40', borderRadius: 20, fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, color: '#f59e0b' }}
        >
          🎲 Roll {expr}
          {results[expr] != null && (
            <span style={{ background: '#f59e0b', color: '#000', borderRadius: 10, padding: '0 6px', marginLeft: 2 }}>
              {results[expr]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Ability context footnotes ─────────────────────────────────────────────────
function AbilityFootnotes({ timing, effect }) {
  const notes = []
  if (timing?.startsWith('Reaction'))
    notes.push({ color: '#818cf8', text: 'Reaction: declare this ability immediately when your opponent announces the listed trigger — before they resolve it.' })
  if (/Heal\s*\(/.test(effect))
    notes.push({ color: '#10b981', text: 'Heal: remove that many damage points from the unit card. Tap the green Heal button on the unit card to reduce damage.' })
  if (/wholly within/i.test(effect))
    notes.push({ color: '#94a3b8', text: '"Wholly within X"": every model in the unit must be inside the distance. "Within X"" only requires any one model to be close enough.' })
  if (notes.length === 0) return null
  return (
    <div className="space-y-1 mt-2">
      {notes.map((n, i) => (
        <div key={i} style={{ fontSize: 10, color: n.color, background: n.color + '10', border: `1px solid ${n.color}25`, borderRadius: 6, padding: '4px 8px', lineHeight: 1.45 }}>
          {n.text}
        </div>
      ))}
    </div>
  )
}

// Abilities that apply a trackable status effect to a target unit.
// Maps abilityId → the status effect id it applies.
const ABILITY_APPLIES_STATUS = {
  'deranged-transformation': 'deranged',      // +2 Move, +1 wound rolls
  'will-of-horned-rat':      null,             // control bonus — not a unit status
  'wither':                  null,             // deals damage — no ongoing status
  'cage-of-warp-lightning':  'strike-last',   // enemy unit gets Strike-Last
  'cleansing-fires':         null,             // deals mortal damage
  'plan-the-attack':         null,             // objective targeted, not a unit
  'shield-of-azyr':          'ward-5',        // friendly unit gets Ward (5+)
  'deliver-judgement':       'strike-last',   // target gets Strike-Last after first fight
  'force-of-a-falling-star': 'strike-last',   // enemy unit gets Strike-Last
  'banner-of-the-reforged':  null,            // heals + control — no ongoing status
}

function ArmyRulesSection({ title, accentColor, rules, playerIndex }) {
  const { usedBattleTraits, toggleBattleTrait } = useGameStore()
  return (
    <div>
      <div className="aos-rule" style={{ color: accentColor }} />
      <div className="text-xs font-display font-bold uppercase tracking-widest mb-2" style={{ color: accentColor + '99' }}>
        {title}
      </div>
      <div className="space-y-2">
        {rules.map(rule => {
          const isOnceBattle = rule.timing?.includes('Once Per Battle')
          const isPassive    = rule.timing === 'Passive'
          const traitKey     = `${playerIndex}-${rule.id}`
          const isUsed       = isOnceBattle && !!usedBattleTraits[traitKey]
          const text         = rule.effect || rule.description
          return (
            <div
              key={rule.id}
              className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${isUsed ? 'rgba(255,255,255,0.08)' : accentColor + '25'}`, opacity: isUsed ? 0.55 : 1 }}
            >
              <div className="px-3 py-2 flex items-center justify-between gap-2" style={{ background: isUsed ? 'rgba(255,255,255,0.04)' : accentColor + '12' }}>
                <div>
                  <div className="font-display font-bold text-sm uppercase tracking-wide" style={{ color: isUsed ? '#555' : accentColor }}>
                    {isUsed ? '✓ ' : ''}{rule.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: isUsed ? '#444' : accentColor + '70' }}>
                    {rule.timing}
                    {isOnceBattle && <span className="ml-2 px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: '#f59e0b20', color: '#f59e0b' }}>Once Per Battle</span>}
                  </div>
                </div>
                {!isPassive && (
                  <button
                    onClick={() => toggleBattleTrait(playerIndex, rule.id)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                    style={{
                      background: isUsed ? 'rgba(255,255,255,0.06)' : accentColor + '25',
                      color: isUsed ? '#555' : accentColor,
                      border: `1px solid ${isUsed ? 'rgba(255,255,255,0.08)' : accentColor + '40'}`,
                    }}
                  >
                    {isUsed ? 'Mark Unused' : 'Mark Used'}
                  </button>
                )}
              </div>
              <div className="px-3 py-2.5">
                <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                <DiceHelper effect={text ?? ''} />
                <AbilityFootnotes timing={rule.timing} effect={text ?? ''} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatGem({ label, value, accentColor }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg py-2 px-1 flex-1"
      style={{ background: accentColor + '12', border: `1px solid ${accentColor}40` }}
    >
      <div
        className="text-xs font-display font-bold uppercase tracking-wider leading-none mb-1"
        style={{ color: accentColor + 'aa', fontSize: '9px' }}
      >
        {label}
      </div>
      <div className="text-xl font-bold font-display leading-none" style={{ color: accentColor }}>
        {value}
      </div>
    </div>
  )
}

// Weapon ability keyword glossary — shown as a reference below any weapon table that uses them
const WEAPON_ABILITY_GLOSSARY = {
  'Companion':         'This weapon cannot be enhanced by abilities that affect attacks (it acts independently of the unit\'s main weapons).',
  'Shoot in Combat':   'This weapon can be used even while the unit is in combat (within ½" of an enemy). Most ranged weapons cannot shoot in combat.',
  'Crit (Auto-wound)': 'An unmodified hit roll of 6 (a critical hit) automatically wounds — skip the wound roll.',
  'Crit (Mortal)':     'An unmodified hit roll of 6 inflicts 1 mortal damage and the attack sequence ends (no wound or save roll).',
  'Charge (+1 Damage)':'Add 1 to the Damage characteristic of this weapon if the attacking unit charged this turn.',
}

function WeaponTable({ weapons, title, accentColor }) {
  if (!weapons || weapons.length === 0) return null
  const isRanged = title === 'Ranged Weapons'

  // Collect unique ability keywords present in this weapon table
  const usedKeywords = Object.keys(WEAPON_ABILITY_GLOSSARY).filter(kw =>
    weapons.some(w => w.ability && w.ability.includes(kw))
  )

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${accentColor}28` }}>
      <div className="px-3 py-1.5 flex items-center gap-2" style={{ background: accentColor + '18' }}>
        <span className="text-sm">{isRanged ? '🏹' : '⚔️'}</span>
        <span className="text-xs font-display font-bold uppercase tracking-widest" style={{ color: accentColor }}>
          {title}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
              <th className="text-left px-3 py-1.5 font-display uppercase tracking-wide text-gray-500">Weapon</th>
              {isRanged && <th className="px-2 py-1.5 font-display uppercase tracking-wide text-gray-500">Rng</th>}
              <th className="px-2 py-1.5 font-display uppercase tracking-wide text-gray-500">Att</th>
              <th className="px-2 py-1.5 font-display uppercase tracking-wide text-gray-500">Hit</th>
              <th className="px-2 py-1.5 font-display uppercase tracking-wide text-gray-500">Wnd</th>
              <th className="px-2 py-1.5 font-display uppercase tracking-wide text-gray-500">Rnd</th>
              <th className="px-2 py-1.5 font-display uppercase tracking-wide text-gray-500">Dmg</th>
              <th className="text-left px-3 py-1.5 font-display uppercase tracking-wide text-gray-500">Ability</th>
            </tr>
          </thead>
          <tbody>
            {weapons.map((w, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <td className="px-3 py-2 font-bold text-white">{w.name}</td>
                {isRanged && <td className="px-2 py-2 text-center text-gray-300">{w.range}</td>}
                <td className="px-2 py-2 text-center font-bold" style={{ color: accentColor }}>{w.attacks}</td>
                <td className="px-2 py-2 text-center text-gray-300">{w.hit}</td>
                <td className="px-2 py-2 text-center text-gray-300">{w.wound}</td>
                <td className="px-2 py-2 text-center text-gray-300">{w.rend}</td>
                <td className="px-2 py-2 text-center font-bold" style={{ color: accentColor }}>{w.damage}</td>
                <td className="px-3 py-2 text-gray-400 italic text-xs">{w.ability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Keyword glossary for any special abilities present */}
      {usedKeywords.length > 0 && (
        <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {usedKeywords.map(kw => (
            <div key={kw} className="flex gap-2 mb-1 last:mb-0">
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, color: accentColor, flexShrink: 0 }}>
                {kw}:
              </span>
              <span style={{ fontSize: 10, color: '#888', lineHeight: 1.4 }}>
                {WEAPON_ABILITY_GLOSSARY[kw]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WarscrollModal({ unit, playerIndex, army, theme, onClose }) {
  const accentColor = theme.primary
  const {
    players,
    usedAbilitiesThisTurn, usedAbilitiesThisBattle,
    toggleAbilityThisTurn, toggleAbilityThisBattle,
    addStatusEffect,
  } = useGameStore()

  // Target picker state — when an ability applies a status to another unit
  const [pickingTarget, setPickingTarget] = useState(null) // { ability, statusEffectId }

  function handleAbilityUse(ability) {
    const isOnceBattle = ability.timing?.includes('Once Per Battle')
    const isPassive    = ability.timing === 'Passive'
    if (isPassive) return

    const statusId = ABILITY_APPLIES_STATUS[ability.id]

    if (statusId) {
      // This ability applies a status to a target — open target picker
      setPickingTarget({ ability, statusEffectId: statusId })
    } else {
      // Just toggle used state
      if (isOnceBattle) {
        toggleAbilityThisBattle(playerIndex, unit.id, ability.id)
      } else {
        toggleAbilityThisTurn(playerIndex, unit.id, ability.id)
      }
    }
  }

  function handleApplyToTarget(targetPlayerIndex, targetUnit) {
    if (!pickingTarget) return
    const effectDef = COMMON_STATUS_EFFECTS.find(e => e.id === pickingTarget.statusEffectId)
    if (effectDef) {
      addStatusEffect(targetPlayerIndex, targetUnit.id, effectDef)
    }
    // Mark the source ability as used
    const isOnceBattle = pickingTarget.ability.timing?.includes('Once Per Battle')
    if (isOnceBattle) {
      toggleAbilityThisBattle(playerIndex, unit.id, pickingTarget.ability.id)
    } else {
      toggleAbilityThisTurn(playerIndex, unit.id, pickingTarget.ability.id)
    }
    setPickingTarget(null)
  }

  return (
    <>
      <Modal open={true} onClose={onClose} title={unit.name} accentColor={accentColor}>
        <div className="space-y-4">

          {/* Stat block */}
          <div className="flex gap-2">
            <StatGem label="Move"    value={unit.move}    accentColor={accentColor} />
            <StatGem label="Health"  value={unit.health}  accentColor={accentColor} />
            <StatGem label="Save"    value={unit.save}    accentColor={accentColor} />
            <StatGem label="Control" value={unit.control} accentColor={accentColor} />
            {unit.wardValue && (
              <StatGem label="Ward" value={`${unit.wardValue}+`} accentColor="#4f86c6" />
            )}
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1.5">
            {unit.keywords?.map(kw => (
              <span
                key={kw}
                className="text-xs px-2 py-0.5 rounded-full font-display font-bold uppercase tracking-wider"
                style={{ background: accentColor + '18', color: accentColor, border: `1px solid ${accentColor}35` }}
              >
                {kw}
              </span>
            ))}
          </div>

          <div className="aos-rule" style={{ color: accentColor }} />

          {/* Unit size / weapon notes */}
          {(unit.count > 1 || unit.weaponNote) && (
            <div
              className="text-sm text-gray-400 italic leading-relaxed px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {unit.count > 1 && `Unit of ${unit.count} models. `}
              {unit.weaponNote}
            </div>
          )}

          {/* Reserve info */}
          {unit.startInReserve && (
            <div className="rounded-lg p-3" style={{ background: '#6366f112', border: '1px solid #6366f135' }}>
              <div className="text-xs font-display font-bold text-indigo-400 uppercase tracking-widest mb-1.5">
                ⬇ Starts in Reserve
              </div>
              <div className="text-xs font-bold text-indigo-300 mb-0.5">{unit.reserveAbility?.name}</div>
              <p className="text-gray-300 text-sm leading-relaxed">{unit.reserveAbility?.effect}</p>
            </div>
          )}

          {/* Weapons */}
          <WeaponTable weapons={unit.rangedWeapons} title="Ranged Weapons" accentColor="#10b981" />
          <WeaponTable weapons={unit.meleeWeapons}  title="Melee Weapons"  accentColor={accentColor} />

          {/* Abilities */}
          {unit.abilities?.length > 0 && (
            <>
              <div className="aos-rule" style={{ color: accentColor }} />
              {unit.abilities.map(ability => {
                const isPassive    = ability.timing === 'Passive'
                const isOnceBattle = ability.timing?.includes('Once Per Battle')
                const battleKey    = `${playerIndex}-${unit.id}-${ability.id}`
                const turnKey      = `${playerIndex}-${unit.id}-${ability.id}`
                const usedBattle   = !!usedAbilitiesThisBattle[battleKey]
                const usedTurn     = !!usedAbilitiesThisTurn[turnKey]
                const isUsed       = isOnceBattle ? usedBattle : usedTurn
                const hasTarget    = ABILITY_APPLIES_STATUS[ability.id] != null

                return (
                  <div
                    key={ability.id}
                    className="rounded-lg overflow-hidden"
                    style={{
                      border: `1px solid ${isUsed ? 'rgba(255,255,255,0.08)' : accentColor + '25'}`,
                      opacity: isUsed ? 0.55 : 1,
                    }}
                  >
                    {/* Ability header */}
                    <div
                      className="px-3 py-2 flex items-center justify-between gap-2"
                      style={{ background: isUsed ? 'rgba(255,255,255,0.04)' : accentColor + '12' }}
                    >
                      <div className="min-w-0">
                        <span
                          className="font-display font-bold text-sm uppercase tracking-wide"
                          style={{ color: isUsed ? '#555' : accentColor }}
                        >
                          {isUsed ? '✓ ' : ''}{ability.name}
                        </span>
                        <div className="text-xs mt-0.5" style={{ color: isUsed ? '#444' : accentColor + '70' }}>
                          {ability.timing}
                          {isOnceBattle && (
                            <span className="ml-2 px-1.5 py-0.5 rounded text-xs font-bold"
                              style={{ background: '#f59e0b20', color: '#f59e0b' }}>
                              Once Per Battle
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Use / toggle button */}
                      {!isPassive && (
                        <button
                          onClick={() => handleAbilityUse(ability)}
                          className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                          style={{
                            background: isUsed ? 'rgba(255,255,255,0.06)' : accentColor + '25',
                            color: isUsed ? '#555' : accentColor,
                            border: `1px solid ${isUsed ? 'rgba(255,255,255,0.08)' : accentColor + '40'}`,
                          }}
                        >
                          {isUsed
                            ? 'Mark Unused'
                            : hasTarget
                            ? 'Use → Pick Target'
                            : 'Mark Used'}
                        </button>
                      )}
                    </div>

                    {/* Ability effect text */}
                    <div className="px-3 py-2.5">
                      <p className="text-sm text-gray-300 leading-relaxed">{ability.effect}</p>
                      <DiceHelper effect={ability.effect ?? ''} />
                      <AbilityFootnotes timing={ability.timing} effect={ability.effect ?? ''} />
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {/* Army-level rules — shown on the general's warscroll */}
          {unit.id === army?.general?.id && (
            <>
              {army.enhancements?.length > 0 && (
                <ArmyRulesSection title="Enhancements" accentColor={accentColor} rules={army.enhancements} playerIndex={playerIndex} />
              )}
              {army.battleTraits?.length > 0 && (
                <ArmyRulesSection title="Battle Traits" accentColor="#6366f1" rules={army.battleTraits} playerIndex={playerIndex} />
              )}
              {army.regimentAbilities?.length > 0 && (
                <ArmyRulesSection title="Regiment Abilities" accentColor="#10b981" rules={army.regimentAbilities} playerIndex={playerIndex} />
              )}
            </>
          )}

          {/* Lore blurb */}
          {army?.lore && unit.id === army?.general?.id && (
            <div
              className="rounded-lg p-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="text-xs font-display font-bold uppercase tracking-widest mb-1.5" style={{ color: '#555577' }}>
                Lore
              </div>
              <p className="text-xs text-gray-400 italic leading-relaxed">{army.lore}</p>
            </div>
          )}
        </div>
      </Modal>

      {/* ── Target picker modal ──────────────────────────────────────────── */}
      {pickingTarget && (
        <Modal
          open={true}
          onClose={() => setPickingTarget(null)}
          title={`${pickingTarget.ability.name} — Pick Target`}
          accentColor={accentColor}
        >
          <div className="space-y-4">
            {/* What the effect does */}
            <div
              className="rounded-lg p-3"
              style={{ background: accentColor + '12', border: `1px solid ${accentColor}30` }}
            >
              <p className="text-sm text-gray-300 leading-relaxed">{pickingTarget.ability.effect}</p>
            </div>

            <p className="text-sm text-gray-400">Which unit does this apply to?</p>

            {players.map((player, pi) => {
              const pArmy  = getArmyData(player.faction, player.armyVariant)
              const pUnits = pArmy ? getAllUnits(player.faction, player.armyVariant) : []
              return (
                <div key={pi}>
                  <div
                    className="text-xs font-display font-bold uppercase tracking-widest mb-2"
                    style={{ color: pi === 0 ? '#C9A84C' : '#4D9E4D' }}
                  >
                    {player.name}
                  </div>
                  <div className="space-y-1.5">
                    {pUnits.map(u => (
                      <button
                        key={u.id}
                        onClick={() => handleApplyToTarget(pi, u)}
                        className="w-full text-left px-3 py-3 rounded-lg active:scale-95 transition-transform"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <span className="text-sm text-white font-bold">{u.name}</span>
                        {u.keywords?.includes('Hero') && (
                          <span className="ml-2 text-xs text-yellow-500">Hero</span>
                        )}
                        {u.count > 1 && (
                          <span className="ml-2 text-xs text-gray-500">×{u.count}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Modal>
      )}
    </>
  )
}
