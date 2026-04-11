import { useState } from 'react'
import { useGameStore, getArmyData, getAllUnits } from '../../store/gameStore'
import { FACTION_THEMES } from '../../themes/factionThemes'
import UnitCard from '../units/UnitCard'
import WarscrollModal from '../units/WarscrollModal'
import TacticCardHand from './TacticCardHand'
import DelusionTracker from './DelusionTracker'
import { LightningIcon, GemIcon, CardIcon } from '../ui/AosIcons'

// ── Faction edge art — inline flex item, never overlaps content ───────────────
// Rendered as a fixed-width column inside the panel's flex row.
function FactionEdgeArt({ faction, side }) {
  const isLeft = side === 'left'
  // Separator line is on the inner edge (separates art strip from content)
  const lineX = isLeft ? 17 : 1

  if (faction === 'fec') {
    return (
      <div style={{ width: 18, flexShrink: 0, alignSelf: 'stretch' }}>
        <svg
          width="18"
          style={{ width: 18, height: '100%', display: 'block' }}
          viewBox="0 0 18 800"
          preserveAspectRatio="none"
        >
          <rect width="18" height="800" fill="rgba(120,20,20,0.07)" />
          <line x1={lineX} y1="0" x2={lineX} y2="800" stroke="rgba(120,20,20,0.25)" strokeWidth="1" />
          {[0, 160, 320, 480, 640].map(y => (
            <g key={y} opacity="0.2" fill="rgba(100,20,20,1)" transform={`translate(0,${y})`}>
              <ellipse cx="9" cy="30" rx="5" ry="4" />
              <ellipse cx="9" cy="25" rx="3" ry="3" />
              <circle cx="7" cy="25" r="1" />
              <circle cx="11" cy="25" r="1" />
              <rect x="8" y="28" width="2" height="3" rx="0.5" />
            </g>
          ))}
          {[90, 250, 410, 570].map(y => (
            <g key={y} opacity="0.13" fill="rgba(100,20,20,1)" transform={`translate(0,${y})`}>
              <path d="M4 10 Q9 5 14 10 Q9 15 4 10Z" />
              <path d="M4 20 Q9 15 14 20 Q9 25 4 20Z" />
            </g>
          ))}
        </svg>
      </div>
    )
  }

  if (faction === 'skaven') {
    return (
      <div style={{ width: 18, flexShrink: 0, alignSelf: 'stretch' }}>
        <svg
          width="18"
          style={{ width: 18, height: '100%', display: 'block' }}
          viewBox="0 0 18 800"
          preserveAspectRatio="none"
        >
          <rect width="18" height="800" fill="rgba(30,100,20,0.06)" />
          <line x1={lineX} y1="0" x2={lineX} y2="800" stroke="rgba(30,100,20,0.22)" strokeWidth="1" />
          {[20, 180, 340, 500, 660].map(y => (
            <g key={y} opacity="0.15" stroke="rgba(30,100,20,1)" strokeWidth="1"
               strokeLinecap="round" fill="none" transform={`translate(0,${y})`}>
              <path d="M4 5 L14 12" />
              <path d="M5 8 L15 15" />
              <path d="M3 11 L13 18" />
            </g>
          ))}
          {[100, 260, 430, 590].map(y => (
            <g key={y} opacity="0.11" stroke="rgba(30,100,20,1)" strokeWidth="1.3"
               fill="none" transform={`translate(0,${y})`}>
              <path d="M9 0 C5 5 14 10 9 15 C4 20 12 25 9 30" />
            </g>
          ))}
        </svg>
      </div>
    )
  }

  // Stormcast
  return (
    <div style={{ width: 18, flexShrink: 0, alignSelf: 'stretch' }}>
      <svg
        width="18"
        style={{ width: 18, height: '100%', display: 'block' }}
        viewBox="0 0 18 800"
        preserveAspectRatio="none"
      >
        <rect width="18" height="800" fill="rgba(180,140,30,0.06)" />
        <line x1={lineX} y1="0" x2={lineX} y2="800" stroke="rgba(180,140,30,0.22)" strokeWidth="1" />
        {[20, 160, 300, 440, 580, 720].map(y => (
          <g key={y} opacity="0.16" fill="rgba(180,140,30,1)" transform={`translate(0,${y})`}>
            <path d="M12 5 L7 14 L11 14 L6 24 L14 13 L10 13Z" />
          </g>
        ))}
        {[90, 230, 370, 510, 650].map(y => (
          <circle key={y} cx="9" cy={y % 800} r="1.8" fill="rgba(180,140,30,0.12)" />
        ))}
      </svg>
    </div>
  )
}

// ── VP counter ────────────────────────────────────────────────────────────────
function VpCounter({ value, onAdd, onRemove, ft }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
      <button
        onClick={onRemove}
        className="active:scale-90 transition-transform"
        style={{
          width: 30, height: 30, borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 900,
          border: `1.5px solid ${ft.primary}50`,
          color: ft.primary, background: 'transparent',
        }}
      >−</button>
      <div style={{ textAlign: 'center', minWidth: 44 }}>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 26, fontWeight: 900,
          color: ft.inkColor, lineHeight: 1,
        }}>{value}</div>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 7, letterSpacing: '0.25em',
          color: ft.primary, textTransform: 'uppercase', marginTop: 1, opacity: 0.7,
        }}>VP</div>
      </div>
      <button
        onClick={onAdd}
        className="active:scale-90 transition-transform"
        style={{
          width: 30, height: 30, borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 900,
          border: `1.5px solid ${ft.primary}60`,
          color: ft.primary,
          background: `rgba(${ft.edgeRgb},0.12)`,
        }}
      >+</button>
    </div>
  )
}

export default function PlayerPanel({ playerIndex }) {
  const {
    players, vp, addVP, removeVP, activePlayerIndex,
    battleRound, unitStates, usedBattleTraits, toggleBattleTrait,
    destroyReserveUnits,
  } = useGameStore()
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [showTactics, setShowTactics]   = useState(false)

  const player   = players[playerIndex]
  const ft       = FACTION_THEMES[player.faction]
  const army     = getArmyData(player.faction, player.armyVariant)
  const units    = getAllUnits(player.faction, player.armyVariant)
  const isActive = activePlayerIndex === playerIndex

  const regimentAbility = army?.regimentAbilities?.[player.regimentAbilityIndex]
  const enhancement     = army?.enhancements?.[player.enhancementIndex]

  return (
    // Outer flex ROW — edge art sits as a sibling column, never overlaps content
    <div
      className="flex-1 flex flex-row h-full parchment-texture overflow-hidden"
      style={{ background: ft.parchmentPanel }}
    >
      {/* Left edge art — only for player 0 */}
      {playerIndex === 0 && (
        <FactionEdgeArt faction={player.faction} side="left" />
      )}

      {/* ── Main content column ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Panel header ───────────────────────────────────────────────── */}
        <div
          className="flex-shrink-0 flex items-center justify-between"
          style={{
            padding: '12px 14px 10px 12px',
            background: `linear-gradient(180deg, rgba(${ft.edgeRgb},0.10) 0%, transparent 100%)`,
            borderBottom: `1.5px solid rgba(${ft.edgeRgb},0.18)`,
          }}
        >
          <div style={{ flex: 1, minWidth: 0, marginRight: 10 }}>
            {isActive && (
              <div style={{
                display: 'inline-block',
                fontFamily: 'Cinzel, serif', fontSize: 8, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                background: `rgba(${ft.edgeRgb},0.14)`,
                color: ft.archHeaderColor,
                border: `1px solid rgba(${ft.edgeRgb},0.3)`,
                padding: '1px 8px', borderRadius: 20, marginBottom: 3,
              }}>Active Turn</div>
            )}
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 900,
              color: ft.inkColor, textTransform: 'uppercase', letterSpacing: '0.08em',
              lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {player.name}
            </div>
            <div style={{
              fontFamily: 'IM Fell English, Georgia, serif', fontSize: 11,
              color: ft.subInkColor, fontStyle: 'italic', marginTop: 1,
            }}>
              {army?.name}
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
              {regimentAbility && (
                <span style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                  background: `rgba(${ft.edgeRgb},0.10)`,
                  color: ft.archHeaderColor,
                  border: `1px solid rgba(${ft.edgeRgb},0.25)`,
                  padding: '2px 8px', borderRadius: 20,
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                }}>
                  <LightningIcon size={9} color={ft.archHeaderColor} />
                  {regimentAbility.name}
                </span>
              )}
              {enhancement && (
                <span style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                  background: `rgba(${ft.edgeRgb},0.07)`,
                  color: ft.subInkColor,
                  border: `1px solid rgba(${ft.edgeRgb},0.2)`,
                  padding: '2px 8px', borderRadius: 20,
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                }}>
                  <GemIcon size={9} color={ft.subInkColor} />
                  {enhancement.name}
                </span>
              )}
            </div>
          </div>
          <VpCounter
            value={vp[playerIndex]}
            onAdd={() => addVP(playerIndex, 1)}
            onRemove={() => removeVP(playerIndex, 1)}
            ft={ft}
          />
        </div>

        {/* ── FEC Noble Deeds tracker ──────────────────────────────────────── */}
        {player.faction === 'fec' && (
          <DelusionTracker army={army} playerIndex={playerIndex} isDark={false} theme={ft} />
        )}

        {/* ── Vigilant Brotherhood Holy Orders ────────────────────────────── */}
        {player.armyVariant === 'vigilant' && army?.battleTraits?.[0]?.abilities && (
          <div
            className="flex-shrink-0"
            style={{
              padding: '8px 14px',
              background: `rgba(${ft.edgeRgb},0.04)`,
              borderBottom: `1px solid rgba(${ft.edgeRgb},0.12)`,
            }}
          >
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 8, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: ft.archHeaderColor, marginBottom: 5,
            }}>Holy Orders</div>
            <div className="flex gap-2">
              {army.battleTraits[0].abilities.map(ability => {
                const isUsed = !!usedBattleTraits[`${playerIndex}-${ability.id}`]
                return (
                  <button
                    key={ability.id}
                    onClick={() => toggleBattleTrait(playerIndex, ability.id)}
                    className="flex-1 active:scale-95 transition-all"
                    style={{
                      padding: '6px 8px', borderRadius: 8, textAlign: 'left',
                      background: isUsed ? 'rgba(0,0,0,0.04)' : `rgba(${ft.edgeRgb},0.10)`,
                      border: `1px solid ${isUsed ? 'rgba(0,0,0,0.08)' : `rgba(${ft.edgeRgb},0.28)`}`,
                      opacity: isUsed ? 0.45 : 1,
                    }}
                  >
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, color: isUsed ? '#888' : ft.archHeaderColor, lineHeight: 1.2 }}>
                      {isUsed ? '✓ ' : ''}{ability.name}
                    </div>
                    <div style={{ fontSize: 9, color: ft.subInkColor, marginTop: 2, lineHeight: 1.3 }}>
                      {ability.timing.replace('Once Per Battle, ', '')}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Lurking Vermintide warning ───────────────────────────────────── */}
        {player.faction === 'skaven' && player.armyVariant === 'gnawfeast' && battleRound >= 3 &&
          getAllUnits(player.faction, player.armyVariant).some(
            u => unitStates[`${playerIndex}-${u.id}`]?.inReserve
          ) && (
          <div className="flex-shrink-0 px-3 py-2" style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid rgba(239,68,68,0.22)' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, color: '#cc2222', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              ⚠ Lurking Vermintide Deadline!
            </div>
            <div style={{ fontSize: 10, color: '#884444', marginTop: 2, lineHeight: 1.4 }}>
              {battleRound === 3
                ? 'Units still in tunnels must use Gnawhole Ambush this round or be destroyed at end of Round 3.'
                : 'Round 3 has passed — units still in reserve should have been destroyed.'}
            </div>
            {battleRound >= 4 && (
              <button
                onClick={() => {
                  if (window.confirm('Mark all reserve units as destroyed? (Lurking Vermintide deadline passed)'))
                    destroyReserveUnits(playerIndex)
                }}
                className="mt-2 w-full py-1.5 active:scale-95 transition-transform"
                style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  background: 'rgba(176,24,24,0.12)',
                  color: '#cc2222',
                  border: '1px solid rgba(176,24,24,0.3)',
                  borderRadius: 6,
                }}
              >
                ✕ Destroy Reserve Units
              </button>
            )}
          </div>
        )}

        {/* ── Tactics button ───────────────────────────────────────────────── */}
        <div
          className="flex-shrink-0"
          style={{
            padding: '5px 12px',
            background: ft.archHeaderBg,
            borderBottom: `1px solid rgba(${ft.edgeRgb},0.12)`,
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <button
            onClick={() => setShowTactics(!showTactics)}
            className="active:scale-95 transition-all"
            style={{
              fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              background: showTactics ? `rgba(${ft.edgeRgb},0.14)` : `rgba(${ft.edgeRgb},0.07)`,
              color: ft.archHeaderColor,
              border: `1px solid rgba(${ft.edgeRgb},${showTactics ? '0.35' : '0.18'})`,
              padding: '3px 10px', borderRadius: 20,
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <CardIcon size={10} color={ft.archHeaderColor} />
            Tactics
          </button>
        </div>

        {showTactics && <TacticCardHand playerIndex={playerIndex} isDark={false} />}

        {/* ── Section heading ──────────────────────────────────────────────── */}
        <div
          className="arch-header flex-shrink-0"
          style={{
            padding: '5px 12px',
            color: ft.archHeaderColor,
            background: ft.archHeaderBg,
            borderBottom: `1px solid rgba(${ft.edgeRgb},0.12)`,
          }}
        >
          General's Regiment
        </div>

        {/* ── Unit list ────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto panel-scroll" style={{ padding: '6px 10px' }}>
          {units.map(unit => (
            <UnitCard
              key={unit.id}
              unit={unit}
              playerIndex={playerIndex}
              theme={ft}
              onClick={() => setSelectedUnit(unit)}
            />
          ))}
        </div>

        {/* Warscroll modal */}
        {selectedUnit && (
          <WarscrollModal
            unit={selectedUnit}
            playerIndex={playerIndex}
            army={army}
            theme={ft}
            isDark={false}
            onClose={() => setSelectedUnit(null)}
          />
        )}
      </div>
      {/* ── End main content column ──────────────────────────────────────── */}

      {/* Right edge art — only for player 1 */}
      {playerIndex === 1 && (
        <FactionEdgeArt faction={player.faction} side="right" />
      )}
    </div>
  )
}
