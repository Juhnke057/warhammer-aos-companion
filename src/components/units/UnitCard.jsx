import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import Modal from '../ui/Modal'
import { UnitIcon, hasUnitIcon } from '../ui/UnitIcons'
import UnitTypeIcon from '../ui/UnitTypeIcon'
import {
  MoveIcon, HealthIcon, ShieldIcon, ControlIcon, WardIcon,
  SkullIcon, BirdIcon, ReserveIcon, LightningIcon, CrownIcon,
} from '../ui/AosIcons'

// ── Status effect definitions ─────────────────────────────────────────────────
export const COMMON_STATUS_EFFECTS = [
  { id: 'bloodmarked',      name: 'Bloodmarked',               expiresAt: 'end-of-round', description: 'Enemy scores 1 extra VP if this unit is destroyed this battle round.' },
  { id: 'frenzied',         name: 'Frenzied',                  expiresAt: 'end-of-round', description: '+1 to hit rolls for combat attacks this battle round.' },
  { id: 'ensnared',         name: 'Ensnared',                  expiresAt: 'end-of-round', description: 'Move halved. Roll 1 fewer dice on charge rolls this battle round.' },
  { id: 'spearhead',        name: 'Spearhead',                 expiresAt: 'end-of-round', description: 'Melee weapons have Charge (+1 Damage) this battle round.' },
  { id: 'nurgles-rot',      name: "Nurgle's Rot",              expiresAt: 'end-of-round', description: '-1 to save rolls this battle round.' },
  { id: 'no-ward-saves',    name: 'Eroding Miasma',            expiresAt: 'end-of-round', description: 'Ward rolls cannot be made for this unit this battle round.' },
  { id: 'shield-of-thorns', name: 'Shield of Thorns',          expiresAt: 'end-of-round', description: 'Ward (6+) this battle round. (Or +1 to existing ward rolls.)' },
  { id: 'strike-first',     name: 'Strike-First',              expiresAt: 'end-of-turn',  description: 'This unit fights before units without Strike-First.' },
  { id: 'strike-last',      name: 'Strike-Last',               expiresAt: 'end-of-turn',  description: 'This unit fights after all units without Strike-Last.' },
  { id: 'ward-5',           name: 'Ward (5+)',                 expiresAt: 'end-of-turn',  description: 'Roll a D6 for each damage point — on a 5+ it is negated.' },
  { id: 'ward-6',           name: 'Ward (6+)',                 expiresAt: 'end-of-turn',  description: 'Roll a D6 for each damage point — on a 6 it is negated.' },
  { id: 'charged',          name: 'Charged',                   expiresAt: 'end-of-turn',  description: 'This unit charged this turn — eligible for Charge (+1 Damage) weapons.' },
  { id: 'ran',              name: 'Ran',                       expiresAt: 'end-of-turn',  description: 'Cannot Shoot or Charge this turn.' },
  { id: 'retreated',        name: 'Retreated',                 expiresAt: 'end-of-turn',  description: 'Cannot Shoot or Charge this turn.' },
  { id: 'cover',            name: 'In Cover',                  expiresAt: null,           description: '-1 to hit rolls for attacks targeting this unit.' },
  { id: 'deranged',         name: 'Deranged (+2 Mv, +1 Wnd)', expiresAt: 'end-of-turn',  description: '+2" Move and +1 to wound rolls for combat attacks this turn.' },
]

const STATUS_STYLES = {
  'frenzied':          { bg: '#10b98116', border: '#10b98140', color: '#10b981' },
  'spearhead':         { bg: '#10b98116', border: '#10b98140', color: '#34d399' },
  'ward-5':            { bg: '#3b82f616', border: '#3b82f640', color: '#60a5fa' },
  'ward-6':            { bg: '#3b82f616', border: '#3b82f640', color: '#93c5fd' },
  'shield-of-thorns':  { bg: '#3b82f616', border: '#3b82f640', color: '#60a5fa' },
  'strike-first':      { bg: '#f59e0b16', border: '#f59e0b40', color: '#f59e0b' },
  'cover':             { bg: '#6366f116', border: '#6366f140', color: '#6366f1' },
  'bloodmarked':       { bg: '#ef444416', border: '#ef444440', color: '#ef4444' },
  'ensnared':          { bg: '#ef444416', border: '#ef444440', color: '#f87171' },
  'nurgles-rot':       { bg: '#7c3aed16', border: '#7c3aed40', color: '#a78bfa' },
  'no-ward-saves':     { bg: '#ef444416', border: '#ef444440', color: '#ef4444' },
  'strike-last':       { bg: '#64748b16', border: '#64748b40', color: '#64748b' },
  'charged':           { bg: '#f9731616', border: '#f9731640', color: '#f97316' },
  'ran':               { bg: '#64748b16', border: '#64748b40', color: '#64748b' },
  'retreated':         { bg: '#64748b16', border: '#64748b40', color: '#64748b' },
  'deranged':          { bg: '#c026d316', border: '#c026d340', color: '#c026d3' },
}
const DEFAULT_STATUS_STYLE = { bg: '#f59e0b16', border: '#f59e0b40', color: '#f59e0b' }

const EXPIRY_LABELS = {
  'end-of-round': '∎ round',
  'end-of-turn':  '∎ turn',
  'end-of-phase': '∎ phase',
}

// ── HP box grid — parchment wound tracker ─────────────────────────────────────
function HpBoxes({ totalHealth, damagePoints, factionColor }) {
  const boxes   = Math.min(totalHealth, 20)
  const damaged = Math.min(damagePoints, boxes)
  return (
    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', maxWidth: 200, marginTop: 6 }}>
      {Array.from({ length: boxes }).map((_, i) => (
        <div key={i} style={{
          width: 16, height: 16, borderRadius: 4,
          border: `1.5px solid ${i < damaged ? factionColor + '80' : 'rgba(0,0,0,0.20)'}`,
          background: i < damaged ? factionColor + '60' : 'rgba(255,255,255,0.60)',
          flexShrink: 0,
        }} />
      ))}
    </div>
  )
}

export default function UnitCard({ unit, playerIndex, theme, onClick }) {
  const {
    getUnitState, addDamage, removeDamage, setUnitDestroyed, setUnitReinforced,
    setUnitInReserve, addStatusEffect, removeStatusEffect, toggleUnitToken,
    battleRound,
  } = useGameStore()
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  const state = getUnitState(playerIndex, unit.id)
  const { damagePoints, destroyed, inReserve, reinforced, statusEffects } = state

  const isHero            = unit.keywords?.includes('Hero')
  const hasReinforcements = unit.hasReinforcements && !reinforced
  const totalHealth       = unit.health * (unit.count ?? 1)

  const isSwarm     = unit.health === 1 && (unit.count ?? 1) > 1
  const modelsAlive = isSwarm ? Math.max(0, (unit.count ?? 1) - damagePoints) : null

  // Total control score = per-model value × models currently alive
  const modelsCount   = unit.count ?? 1
  const modelsAliveFull = modelsCount > 1
    ? Math.max(0, Math.ceil((totalHealth - damagePoints) / unit.health))
    : 1
  const totalControl = unit.control * modelsAliveFull

  // Whether any weapon has Charge (+1 Damage) and unit has Charged status
  const hasCharged      = statusEffects.some(e => e.id === 'charged')
  const hasChargeWeapon = [...(unit.meleeWeapons ?? []), ...(unit.rangedWeapons ?? [])]
    .some(w => w.ability?.includes('Charge'))

  const hasCorneredRat = unit.id === 'clawlord' && damagePoints > 0
  const keywordWard    = unit.wardValue ? unit.wardValue : null

  // Card visual state
  const cardBg = destroyed
    ? `rgba(${theme.edgeRgb},0.07)`
    : inReserve
    ? 'rgba(80,60,200,0.05)'
    : isHero
    ? theme.heroCardTint
    : theme.cardTint

  const accentColor = destroyed ? '#8b0000' : inReserve ? '#4f46e5' : theme.primary
  const borderOpacity = destroyed ? '50' : inReserve ? '55' : isHero ? 'cc' : '28'

  return (
    <>
      <div
        className="overflow-hidden slide-in-up parchment-card"
        style={{
          background: cardBg,
          border: `1px solid rgba(${theme.edgeRgb},${borderOpacity === 'cc' ? '0.45' : borderOpacity === '50' ? '0.3' : borderOpacity === '55' ? '0.3' : '0.2'})`,
          borderLeft: `3px solid ${accentColor}${isHero ? 'cc' : destroyed ? '80' : inReserve ? '90' : '60'}`,
          boxShadow: isHero && !destroyed
            ? `0 2px 10px rgba(${theme.edgeRgb},0.15)`
            : '0 1px 3px rgba(0,0,0,0.10)',
          opacity: destroyed ? 0.6 : 1,
          marginBottom: 6,
          borderRadius: isHero ? 12 : 10,
        }}
      >
        {/* ── Header row — tap to open warscroll ───────────────────────────── */}
        <button
          onClick={onClick}
          className="w-full flex items-center justify-between px-3 py-2.5 text-left active:opacity-70"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Unit icon */}
            <div style={{
              width: 40, height: 40, borderRadius: 9, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `rgba(${theme.edgeRgb},0.10)`,
              border: `1px solid rgba(${theme.edgeRgb},0.2)`,
              color: accentColor,
            }}>
              {hasUnitIcon(unit.id)
                ? <UnitIcon unitId={unit.id} size={26} color={accentColor} />
                : <UnitTypeIcon keywords={unit.keywords} color={accentColor} size={22} />
              }
            </div>

            <div className="min-w-0">
              {/* Name row */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <div
                  className="font-display font-bold truncate"
                  style={{
                    fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 700,
                    color: theme.inkColor, textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}
                >
                  {unit.name}
                  {unit.count > 1 && (
                    <span style={{ marginLeft: 5, fontWeight: 400, opacity: 0.5, fontSize: 11 }}>
                      ×{unit.count}
                    </span>
                  )}
                </div>

                {isHero && (
                  <span
                    className="flex items-center gap-0.5 flex-shrink-0"
                    style={{
                      fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                      background: `rgba(${theme.edgeRgb},0.12)`,
                      color: theme.archHeaderColor,
                      border: `1px solid rgba(${theme.edgeRgb},0.28)`,
                      padding: '2px 6px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}
                  >
                    <CrownIcon size={9} color={theme.archHeaderColor} />
                    Hero
                  </span>
                )}
              </div>

              {/* Stat row */}
              <div className="flex items-center gap-2.5 mt-1 flex-wrap" style={{ color: theme.subInkColor }}>
                <StatPill icon={<MoveIcon size={12} />} label={`${unit.move}"`} />
                <StatPill icon={<HealthIcon size={12} />} label={unit.health} />
                <StatPill icon={<ShieldIcon size={12} />} label={`${unit.save}+`} />
                <StatPill icon={<ControlIcon size={12} />} label={totalControl} />
                {keywordWard && (
                  <StatPill
                    icon={<WardIcon size={12} color="#4f86c6" />}
                    label={`${unit.wardValue}+`}
                    color="#4f86c6"
                  />
                )}
              </div>
            </div>
          </div>

          <ChevronRight size={15} color={accentColor + '80'} />
        </button>

        {/* ── Cornered Rat passive ─────────────────────────────────────────── */}
        {hasCorneredRat && (
          <div
            className="mx-3 mb-1.5 px-2 py-1.5 flex items-center gap-2"
            style={{
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.28)',
              borderRadius: 8,
            }}
          >
            <LightningIcon size={12} color="#f97316" />
            <span style={{ fontSize: 11, fontFamily: 'Cinzel, serif', fontWeight: 700, color: '#f97316' }}>
              Cornered Rat — Warpforged Halberd +3 Attacks while damaged
            </span>
          </div>
        )}

        {/* ── Active status badges ──────────────────────────────────────────── */}
        {statusEffects.length > 0 && (
          <div className="px-3 pb-1.5 flex flex-wrap gap-1">
            {statusEffects.map(e => {
              const s = STATUS_STYLES[e.id] ?? DEFAULT_STATUS_STYLE
              return (
                <button
                  key={e.id}
                  onClick={() => removeStatusEffect(playerIndex, unit.id, e.id)}
                  className="flex items-center gap-1.5 px-2 py-0.5 active:scale-95 transition-transform"
                  style={{
                    background: s.bg, border: `1px solid ${s.border}`, borderRadius: 20,
                  }}
                >
                  <span style={{ fontSize: 11, fontFamily: 'Cinzel, serif', fontWeight: 700, color: s.color }}>
                    {e.name}
                  </span>
                  {e.expiresAt && (
                    <span style={{ color: s.color + '70', fontSize: 10 }}>
                      {EXPIRY_LABELS[e.expiresAt]}
                    </span>
                  )}
                  <span style={{ color: s.color + '80', fontSize: 11 }}>✕</span>
                </button>
              )
            })}
          </div>
        )}

        {/* ── HP / Controls (on-field alive units) ─────────────────────────── */}
        {!destroyed && !inReserve && (
          <div className="px-3 pb-3">
            {/* HP boxes */}
            <div className="flex items-center gap-2 mb-2">
              <HpBoxes
                totalHealth={totalHealth}
                damagePoints={damagePoints}
                factionColor={theme.hpBarColor}
              />
              <span
                style={{
                  fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700,
                  color: theme.subInkColor, flexShrink: 0, marginLeft: 'auto',
                  minWidth: 64, textAlign: 'right',
                }}
              >
                {isSwarm
                  ? `${modelsAlive}/${unit.count}`
                  : `${Math.max(0, totalHealth - damagePoints)}/${totalHealth} HP`
                }
              </span>
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => removeDamage(playerIndex, unit.id, 1)}
                className="h-10 w-10 font-bold text-xl flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
                style={{
                  background: 'rgba(16,185,129,0.10)',
                  color: '#10b981',
                  border: '1px solid rgba(16,185,129,0.28)',
                  borderRadius: 8,
                  fontFamily: 'Cinzel, serif',
                }}
              >−</button>

              <div className="flex-1 text-center">
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 700,
                  color: theme.subInkColor,
                }}>
                  {isSwarm
                    ? (damagePoints > 0 ? `${damagePoints} slain` : 'All standing')
                    : (damagePoints > 0 ? `${damagePoints} dmg` : 'No damage')
                  }
                </div>
              </div>

              <button
                onClick={() => addDamage(playerIndex, unit.id, 1)}
                className="h-10 w-10 font-bold text-xl flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
                style={{
                  background: `rgba(${theme.edgeRgb},0.10)`,
                  color: theme.archHeaderColor,
                  border: `1px solid rgba(${theme.edgeRgb},0.28)`,
                  borderRadius: 8,
                  fontFamily: 'Cinzel, serif',
                }}
              >+</button>

              <button
                onClick={() => setShowStatusMenu(true)}
                className="h-10 px-2 active:scale-90 transition-transform flex-shrink-0"
                style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  background: 'rgba(180,140,30,0.08)',
                  color: '#8a7020',
                  border: '1px solid rgba(180,140,30,0.25)',
                  borderRadius: 8,
                }}
              >
                + Status
              </button>

              <button
                onClick={() => setUnitDestroyed(playerIndex, unit.id, true)}
                className="h-10 px-2 flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
                style={{
                  background: 'rgba(176,24,24,0.07)',
                  border: '1px solid rgba(176,24,24,0.22)',
                  borderRadius: 8,
                }}
              >
                <SkullIcon size={16} color="#aa2222" />
              </button>
            </div>

            {/* Ward save reminder */}
            {keywordWard && (
              <div
                className="flex items-center gap-1.5 mt-1.5 px-2 py-1"
                style={{
                  background: 'rgba(79,134,198,0.08)',
                  border: '1px solid rgba(79,134,198,0.22)',
                  borderRadius: 6,
                }}
              >
                <WardIcon size={10} color="#4f86c6" />
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700, color: '#4f86c6' }}>
                  Ward ({keywordWard}+) — remember to roll for each damage point
                </span>
              </div>
            )}

            {/* Charge (+1 Damage) reminder */}
            {hasCharged && hasChargeWeapon && (
              <div
                className="flex items-center gap-1.5 mt-1 px-2 py-1"
                style={{
                  background: 'rgba(249,115,22,0.08)',
                  border: '1px solid rgba(249,115,22,0.28)',
                  borderRadius: 6,
                }}
              >
                <LightningIcon size={10} color="#f97316" />
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700, color: '#f97316' }}>
                  Charged — Charge (+1 Damage) weapons are active this turn
                </span>
              </div>
            )}

            {/* Gryph-crow token */}
            {unit.id === 'lord-veritant' && (
              <div
                className="flex items-center justify-between mt-2 pt-2"
                style={{ borderTop: `1px solid rgba(${theme.edgeRgb},0.12)` }}
              >
                <span className="flex items-center gap-1.5" style={{ fontSize: 10, fontFamily: 'Cinzel, serif', fontWeight: 700, color: '#4f86c6' }}>
                  <BirdIcon size={12} color="#4f86c6" />
                  Gryph-crow — Ward (5+)
                </span>
                <button
                  onClick={() => toggleUnitToken(playerIndex, unit.id, 'gryphcrow')}
                  className="px-3 py-1.5 active:scale-95 transition-transform"
                  style={{
                    fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                    background: state.tokens?.gryphcrow ? 'rgba(180,140,30,0.12)' : 'rgba(176,24,24,0.08)',
                    color:      state.tokens?.gryphcrow ? '#8a7020' : '#aa2222',
                    border: `1px solid ${state.tokens?.gryphcrow ? 'rgba(180,140,30,0.28)' : 'rgba(176,24,24,0.22)'}`,
                    borderRadius: 8,
                  }}
                >
                  {state.tokens?.gryphcrow ? '✓ Active' : '✕ Removed'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Destroyed footer ──────────────────────────────────────────────── */}
        {destroyed && (
          <div className="px-3 pb-3 flex items-center gap-2">
            <SkullIcon size={14} color="#aa2222" />
            <div
              className="flex-1"
              style={{ fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#aa2222' }}
            >
              Destroyed
            </div>
            {hasReinforcements && (
              <button
                onClick={() => setUnitReinforced(playerIndex, unit.id)}
                className="px-3 py-1.5 active:scale-95 transition-transform"
                style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                  background: 'rgba(16,185,129,0.10)',
                  color: '#10b981',
                  border: '1px solid rgba(16,185,129,0.28)',
                  borderRadius: 8,
                }}
              >
                Reinforce ↩
              </button>
            )}
            <button
              onClick={() => setUnitDestroyed(playerIndex, unit.id, false)}
              className="px-3 py-1.5 active:scale-95 transition-transform"
              style={{
                fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                background: `rgba(${theme.edgeRgb},0.06)`,
                color: theme.subInkColor,
                border: `1px solid rgba(${theme.edgeRgb},0.15)`,
                borderRadius: 8,
              }}
            >
              Undo
            </button>
          </div>
        )}

        {/* ── In Reserve footer ─────────────────────────────────────────────── */}
        {inReserve && (
          <div className="px-3 pb-3 flex items-center justify-between">
            <div
              className="flex items-center gap-1.5"
              style={{ fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4f46e5' }}
            >
              <ReserveIcon size={12} color="#4f46e5" />
              In Reserve
              {unit.availableFromRound && battleRound < unit.availableFromRound && (
                <span style={{ fontSize: 9, fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#666' }}>
                  (rnd {unit.availableFromRound})
                </span>
              )}
            </div>
            {(!unit.availableFromRound || battleRound >= unit.availableFromRound) && (
              <button
                onClick={() => setUnitInReserve(playerIndex, unit.id, false)}
                className="px-3 py-1.5 active:scale-95 transition-transform"
                style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                  background: 'rgba(99,102,241,0.10)',
                  color: '#6366f1',
                  border: '1px solid rgba(99,102,241,0.28)',
                  borderRadius: 8,
                }}
              >
                Deploy ↓
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Status effect picker modal ────────────────────────────────────── */}
      <Modal
        open={showStatusMenu}
        onClose={() => setShowStatusMenu(false)}
        title={`Add Status — ${unit.name}`}
        accentColor={theme.primary}
      >
        <div className="space-y-1">
          {[
            { label: 'Until End of Round', sublabel: 'Twist cards & realm effects', expiry: 'end-of-round', dot: '#ef4444' },
            { label: 'Until End of Turn',  sublabel: 'Abilities & commands',         expiry: 'end-of-turn',  dot: '#f59e0b' },
            { label: 'Permanent',          sublabel: 'Remove manually',              expiry: null,           dot: '#6366f1' },
          ].map(group => {
            const effects = COMMON_STATUS_EFFECTS.filter(e => e.expiresAt === group.expiry)
            return (
              <div key={group.label} className="mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.dot }} />
                  <div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: group.dot }}>
                      {group.label}
                    </div>
                    <div style={{ fontSize: 10, color: '#666' }}>{group.sublabel}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {effects.map(eff => {
                    const alreadyApplied = statusEffects.some(e => e.id === eff.id)
                    const s = STATUS_STYLES[eff.id] ?? DEFAULT_STATUS_STYLE
                    return (
                      <button
                        key={eff.id}
                        onClick={() => {
                          if (!alreadyApplied) {
                            addStatusEffect(playerIndex, unit.id, eff)
                            setShowStatusMenu(false)
                          }
                        }}
                        disabled={alreadyApplied}
                        className="text-left p-3 active:scale-95 transition-transform disabled:opacity-30"
                        style={{
                          background: alreadyApplied ? 'rgba(255,255,255,0.03)' : s.bg,
                          border: `1px solid ${alreadyApplied ? 'rgba(255,255,255,0.07)' : s.border}`,
                          borderRadius: 8,
                        }}
                      >
                        <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 11, color: alreadyApplied ? '#444' : s.color }}>
                          {alreadyApplied ? '✓ ' : ''}{eff.name}
                        </div>
                        <div style={{ fontSize: 10, marginTop: 2, lineHeight: 1.35, color: '#666' }}>
                          {eff.description}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function StatPill({ icon, label, color }) {
  return (
    <span
      className="flex items-center gap-1 tabular-nums"
      style={{ color: color || 'inherit', fontSize: 12, fontWeight: 700 }}
    >
      {icon}
      {label}
    </span>
  )
}

function ChevronRight({ size = 13, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}
