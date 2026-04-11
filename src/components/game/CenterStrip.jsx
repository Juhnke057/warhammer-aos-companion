import { useState } from 'react'
import { useGameStore, PHASES } from '../../store/gameStore'
import { FACTION_THEMES } from '../../themes/factionThemes'
import Modal from '../ui/Modal'
import TwistDrawModal from './TwistDrawModal'
import {
  PHASE_ICONS, FlameIcon, LeafIcon, BookIcon, StarIcon,
  TwistIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon,
} from '../ui/AosIcons'

const PDF_FILES = [
  { label: 'Core Rules',         file: 'core-rules.pdf' },
  { label: 'Stormcast Eternals', file: 'stormcast-spearhead.pdf' },
  { label: 'Skaven',             file: 'skaven-spearhead.pdf' },
  { label: 'Flesh-eater Courts', file: 'fec-spearhead.pdf' },
  { label: 'Reference',          file: 'spearhead-reference.pdf' },
]

const PHASE_COLORS = {
  'round-start': '#9a6000',
  'hero':        '#c9a84c',
  'movement':    '#5a8ac0',
  'shooting':    '#4a8a4a',
  'charge':      '#aa2222',
  'combat':      '#c06010',
  'end':         '#7060a0',
}

// Named objectives with short display names
const OBJECTIVES = [
  { id: 'dracothion', short: 'Draco',  full: 'Dracothion', position: 'Centre' },
  { id: 'ignax',      short: 'Ignax',  full: 'Ignax',      position: 'Attacker Left' },
  { id: 'behemat',    short: 'Behe',   full: 'Behemat',    position: 'Attacker Right' },
  { id: 'vulcatrix',  short: 'Vulca',  full: 'Vulcatrix',  position: 'Defender Left' },
  { id: 'nagendra',   short: 'Nagen',  full: 'Nagendra',   position: 'Defender Right' },
]

// Dark wood/leather center strip colors
const C = {
  bg:       '#160c02',
  panel:    '#1a0f04',
  border:   '#3a2000',
  gold:     '#d4a017',
  goldDim:  '#7a5500',
  goldFade: '#3a2800',
  text:     '#c8aa78',
  textDim:  '#7a5a30',
  textFaint:'#3a2a10',
}

export default function CenterStrip() {
  const {
    battleRound, currentPhaseIndex, activePlayerIndex, players,
    activeTwist, nextPhase, prevPhase, vp, resetGame,
    playerTurnsDoneThisRound, twistDrawPending, realm,
    objectiveControl, cycleObjectiveControl,
  } = useGameStore()

  const [showTwist,    setShowTwist]    = useState(false)
  const [showPhaseHelp,setShowPhaseHelp]= useState(false)
  const [showPdfs,     setShowPdfs]     = useState(false)
  const [showTwistDraw,setShowTwistDraw]= useState(false)

  const realmColor = realm === 'aqshy' ? '#cc3030' : '#2a8a2a'
  const RealmIcon  = realm === 'aqshy' ? FlameIcon  : LeafIcon
  const currentPhase = PHASES[currentPhaseIndex]
  const phaseColor   = PHASE_COLORS[currentPhase?.id] ?? C.gold
  const PhaseIcon    = PHASE_ICONS[currentPhase?.id] ?? PHASE_ICONS['round-start']

  const turnLabel = playerTurnsDoneThisRound === 0
    ? `${players[activePlayerIndex]?.name}'s Turn`
    : playerTurnsDoneThisRound === 1
    ? `${players[1 - activePlayerIndex]?.name}'s Turn`
    : 'Round End'

  const rounds = [1, 2, 3, 4]

  // Underdog = player with fewer VPs (null if tied)
  const underdogIndex = vp[0] < vp[1] ? 0 : vp[1] < vp[0] ? 1 : null

  // Objective counts per player
  const objCounts = [0, 1].map(pi =>
    OBJECTIVES.filter(o => objectiveControl[o.id] === pi).length
  )

  // VP colors from faction themes
  const playerVpColor = (i) => FACTION_THEMES[players[i]?.faction]?.primary ?? C.gold

  // Reusable button base style
  const cBtn = (extra = {}) => ({
    width: '100%', padding: '7px 8px', borderRadius: 10,
    fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.12em',
    border: `1px solid ${C.border}`, background: C.panel,
    color: C.textDim, cursor: 'pointer',
    ...extra,
  })

  return (
    <div
      className="panel-texture flex-shrink-0 flex flex-col items-center gap-2 py-2 px-2"
      style={{
        width: 148,
        background: C.bg,
        borderLeft:  `2px solid ${C.border}`,
        borderRight: `2px solid ${C.border}`,
      }}
    >
      {/* ── Battle round panel ─────────────────────────────────────────────── */}
      <div
        className="w-full text-center round-badge"
        style={{
          padding: '12px 8px 10px',
          background: `linear-gradient(160deg, #1e1008 0%, #130a02 100%)`,
          border: `1px solid ${C.goldDim}`,
          boxShadow: `0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: '25%', right: '25%', height: 2,
          background: C.gold, boxShadow: `0 0 8px ${C.gold}80`, borderRadius: 2,
        }} />
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, color: C.goldDim, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Battle Round
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 52, fontWeight: 900, color: C.gold, lineHeight: 1, textShadow: `0 0 20px ${C.gold}50`, marginTop: 2 }}>
          {battleRound}
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {rounds.map(r => (
            <div key={r} style={{
              width:        r === battleRound ? 12 : 7,
              height:       r === battleRound ? 7  : 7,
              borderRadius: r === battleRound ? 4  : '50%',
              background:   r < battleRound  ? C.goldDim
                          : r === battleRound ? C.gold
                          : C.textFaint,
              boxShadow:    r === battleRound ? `0 0 6px ${C.gold}80` : 'none',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* ── Turn label ─────────────────────────────────────────────────────── */}
      <div
        className="w-full text-center"
        style={{
          padding: '6px 8px', borderRadius: 8,
          background: `rgba(212,160,23,0.08)`,
          border: `1px solid rgba(212,160,23,0.18)`,
        }}
      >
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: C.gold, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {turnLabel}
        </div>
      </div>

      {/* ── Twist draw pending ─────────────────────────────────────────────── */}
      {twistDrawPending && (
        <button
          onClick={() => setShowTwistDraw(true)}
          className="w-full text-center active:scale-95 transition-all glow-pulse"
          style={{
            padding: '10px 8px', borderRadius: 12,
            background: `linear-gradient(135deg, ${realmColor}25 0%, ${realmColor}10 100%)`,
            border: `2px solid ${realmColor}`,
            boxShadow: `0 0 16px ${realmColor}30`,
            color: realmColor,
          }}
        >
          <RealmIcon size={22} color={realmColor} style={{ margin: '0 auto 4px' }} />
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Draw Twist Card
          </div>
          <div style={{ fontSize: 9, marginTop: 2, color: realmColor + '80' }}>
            tap to open
          </div>
        </button>
      )}

      {/* ── Active twist card ───────────────────────────────────────────────── */}
      {!twistDrawPending && activeTwist && (
        <button
          onClick={() => setShowTwist(true)}
          className="w-full text-center active:scale-95 transition-all"
          style={{
            padding: '8px', borderRadius: 10,
            background: C.panel,
            border: `1px solid ${activeTwist.realm === 'aqshy' ? 'rgba(204,48,48,0.4)' : 'rgba(42,138,42,0.4)'}`,
          }}
        >
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <TwistIcon size={11} color={activeTwist.realm === 'aqshy' ? '#cc3030' : '#2a8a2a'} />
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: activeTwist.realm === 'aqshy' ? '#cc3030' : '#2a8a2a' }}>
              Twist Active
            </div>
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, color: C.text }}>
            {activeTwist.name}
          </div>
        </button>
      )}

      {/* ── Phase indicator ─────────────────────────────────────────────────── */}
      <button
        onClick={() => setShowPhaseHelp(true)}
        className="w-full text-center active:scale-95 transition-all phase-btn"
        style={{
          padding: '11px 8px',
          background: `linear-gradient(160deg, ${phaseColor}28 0%, ${phaseColor}10 100%)`,
          border: `2px solid ${phaseColor}70`,
          boxShadow: `0 0 14px ${phaseColor}18`,
          color: phaseColor,
        }}
      >
        <PhaseIcon size={26} color={phaseColor} style={{ margin: '0 auto 5px' }} />
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: phaseColor }}>
          {currentPhase?.label}
        </div>
        <div style={{ fontSize: 8, marginTop: 2, color: phaseColor + '60', fontStyle: 'italic' }}>
          tap for guide
        </div>
      </button>

      {/* ── Phase navigation ────────────────────────────────────────────────── */}
      <div className="w-full flex gap-1">
        <button
          onClick={prevPhase}
          disabled={currentPhaseIndex === 0 || (currentPhaseIndex === 1 && playerTurnsDoneThisRound >= 1)}
          className="flex items-center justify-center py-2.5 disabled:opacity-20 active:scale-95 transition-transform"
          style={{ width: 38, borderRadius: 8, border: `1px solid ${C.border}`, background: C.panel, color: C.goldDim }}
        >
          <ChevronLeftIcon size={15} color={C.goldDim} />
        </button>
        <button
          onClick={nextPhase}
          className="flex-1 py-2.5 active:scale-95 transition-all"
          style={{
            borderRadius: 8,
            background: `linear-gradient(135deg, ${phaseColor}dd 0%, ${phaseColor}aa 100%)`,
            color: 'white',
            fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.08em',
            boxShadow: `0 2px 8px ${phaseColor}40`,
          }}
        >
          Next →
        </button>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      <div className="w-full px-2">
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDim}, transparent)` }} />
      </div>

      {/* ── Objective control tracker ────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden"
        style={{ background: C.panel, border: `1px solid ${C.goldFade}`, borderRadius: 10 }}
      >
        <div
          className="flex items-center justify-center gap-1"
          style={{ padding: '4px 8px', borderBottom: `1px solid ${C.textFaint}` }}
        >
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: C.goldDim }}>
            Objectives
          </span>
        </div>
        {/* 3 + 2 grid */}
        <div style={{ padding: '5px 5px 4px' }}>
          <div className="flex gap-1 mb-1">
            {OBJECTIVES.slice(0, 3).map(obj => (
              <ObjButton
                key={obj.id}
                obj={obj}
                owner={objectiveControl[obj.id]}
                players={players}
                onCycle={() => cycleObjectiveControl(obj.id)}
              />
            ))}
          </div>
          <div className="flex gap-1 justify-center">
            {OBJECTIVES.slice(3).map(obj => (
              <ObjButton
                key={obj.id}
                obj={obj}
                owner={objectiveControl[obj.id]}
                players={players}
                onCycle={() => cycleObjectiveControl(obj.id)}
              />
            ))}
          </div>
        </div>
        {/* Controlled count summary */}
        <div className="flex" style={{ borderTop: `1px solid ${C.textFaint}` }}>
          {players.map((p, i) => {
            const col = playerVpColor(i)
            return (
              <div key={i} className="flex-1 text-center" style={{ padding: '3px 4px', borderRight: i === 0 ? `1px solid ${C.textFaint}` : 'none' }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 900, color: objCounts[i] > 0 ? col : C.textFaint }}>
                  {objCounts[i]}
                </span>
                <span style={{ fontSize: 7, color: C.textDim, marginLeft: 2 }}>obj</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── VP scoreboard ───────────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden"
        style={{ background: C.panel, border: `1px solid ${C.goldFade}`, borderRadius: 12 }}
      >
        <div
          className="flex items-center justify-center gap-1.5"
          style={{ padding: '5px 8px', borderBottom: `1px solid ${C.textFaint}` }}
        >
          <StarIcon size={10} color={C.goldDim} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: C.goldDim }}>
            Score
          </span>
        </div>
        {players.map((p, i) => {
          const col = playerVpColor(i)
          const isUnderdog = underdogIndex === i
          return (
            <div key={i} className="flex items-center justify-between" style={{ padding: '6px 10px', borderTop: i > 0 ? `1px solid ${C.textFaint}` : 'none' }}>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: 9, color: C.textDim, display: 'block', maxWidth: 68, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </span>
                {isUnderdog && (
                  <span style={{
                    fontFamily: 'Cinzel, serif', fontSize: 7, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: '#6366f1', background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    padding: '0px 4px', borderRadius: 4, display: 'inline-block', marginTop: 1,
                  }}>
                    ⚑ Underdog
                  </span>
                )}
              </div>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 900, color: col, lineHeight: 1 }}>
                {vp[i]}
              </span>
            </div>
          )
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      <div className="w-full px-2">
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDim}, transparent)` }} />
      </div>

      {/* ── Rulebooks ───────────────────────────────────────────────────────── */}
      <button
        onClick={() => setShowPdfs(true)}
        className="w-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
        style={cBtn()}
      >
        <BookIcon size={12} color={C.goldDim} />
        Rulebooks
      </button>

      {/* ── End game ────────────────────────────────────────────────────────── */}
      <button
        onClick={() => { if (window.confirm('End the game and return to setup?')) resetGame() }}
        className="w-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
        style={cBtn({ background: 'rgba(176,24,24,0.07)', color: '#cc3030', borderColor: 'rgba(176,24,24,0.22)' })}
      >
        <CloseIcon size={12} color="#cc3030" />
        End Game
      </button>

      {/* ── Phase help modal ────────────────────────────────────────────────── */}
      <Modal
        open={showPhaseHelp}
        onClose={() => setShowPhaseHelp(false)}
        title={currentPhase?.label}
        accentColor={phaseColor}
      >
        <div className="space-y-4">
          <div style={{ padding: 16, background: phaseColor + '13', border: `1px solid ${phaseColor}28`, borderRadius: 8 }}>
            <p style={{ color: '#e8e4d8', lineHeight: 1.6 }}>{currentPhase?.description}</p>
          </div>

          {/* VP scoring assistant — only shown during End of Turn */}
          {currentPhase?.id === 'end' && (
            <div style={{ padding: 14, background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.28)', borderRadius: 8 }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#818cf8', marginBottom: 8 }}>
                VP Scoring Checklist
              </div>
              {players.map((_, i) => {
                const col = playerVpColor(i)
                const count = objCounts[i]
                return (
                  <div key={i} style={{ marginBottom: i === 0 ? 8 : 0, padding: '8px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 6 }}>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, color: col, marginBottom: 4 }}>{players[i].name}</div>
                    <VpCheckRow label={`Controls 1+ objectives (has ${count})`} earned={count >= 1} />
                    <VpCheckRow label={`Controls 2+ objectives (has ${count})`} earned={count >= 2} />
                    <VpCheckRow label={`Controls more than opponent (${count} vs ${objCounts[1-i]})`} earned={count > objCounts[1-i]} />
                    <VpCheckRow label="Completed a Battle Tactic" earned={null} />
                  </div>
                )
              })}
              <p style={{ fontSize: 9, color: '#666', marginTop: 8, lineHeight: 1.4 }}>
                Remember to update objectives on the tracker before scoring.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: 8 }}>
              All Phases
            </div>
            {PHASES.map((p, i) => {
              const PIcon = PHASE_ICONS[p.id]
              const pc    = PHASE_COLORS[p.id]
              return (
                <div
                  key={p.id}
                  className="flex items-start gap-3 p-3"
                  style={{
                    background: i === currentPhaseIndex ? pc + '18' : '#ffffff05',
                    border:     i === currentPhaseIndex ? `1px solid ${pc}45` : '1px solid transparent',
                    borderRadius: 8,
                  }}
                >
                  <PIcon size={16} color={pc} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 12, color: pc }}>
                      {p.label}
                    </div>
                    <div style={{ fontSize: 11, color: '#888', marginTop: 2, lineHeight: 1.5 }}>
                      {p.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>

      {/* ── Twist card detail modal ──────────────────────────────────────────── */}
      <Modal
        open={showTwist}
        onClose={() => setShowTwist(false)}
        title={activeTwist?.name ?? 'Twist Card'}
        accentColor={activeTwist?.realm === 'aqshy' ? '#cc3030' : '#2a8a2a'}
      >
        {activeTwist && (
          <div className="space-y-4">
            <div className="flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: activeTwist.realm === 'aqshy' ? '#cc3030' : '#2a8a2a' }}>
              {activeTwist.realm === 'aqshy'
                ? <FlameIcon size={13} color="#cc3030" />
                : <LeafIcon  size={13} color="#2a8a2a" />}
              {activeTwist.realm === 'aqshy' ? 'Aqshy Twist' : 'Ghyran Twist'}
            </div>

            {/* Underdog callout */}
            {underdogIndex !== null && (
              <div style={{ padding: '8px 12px', background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8 }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  ⚑ Underdog:
                </span>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#a5b4fc', marginLeft: 6 }}>
                  {players[underdogIndex]?.name} ({vp[underdogIndex]} VP vs {vp[1-underdogIndex]} VP)
                </span>
              </div>
            )}

            <p style={{ color: '#e8e4d8', lineHeight: 1.6 }}>{activeTwist.effect}</p>
            {activeTwist.underdogBonus && (
              <div style={{ padding: 12, background: '#6366f115', border: '1px solid #6366f132', borderRadius: 8 }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
                  Underdog Bonus
                </div>
                <p style={{ color: '#ccc', fontSize: 13, lineHeight: 1.5 }}>{activeTwist.underdogBonus}</p>
              </div>
            )}
            {activeTwist.options && (
              <div className="space-y-2">
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Pick one:</div>
                {activeTwist.options.map(opt => (
                  <div key={opt.id} style={{ padding: 12, background: '#ffffff07', borderRadius: 8 }}>
                    <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 12, color: 'white', marginBottom: 4 }}>{opt.name}</div>
                    <p style={{ color: '#ccc', fontSize: 12, lineHeight: 1.5 }}>{opt.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* ── PDF modal ───────────────────────────────────────────────────────── */}
      <Modal
        open={showPdfs}
        onClose={() => setShowPdfs(false)}
        title="Rulebooks & References"
        accentColor={C.gold}
      >
        <div className="space-y-2">
          {PDF_FILES.map(pdf => (
            <button
              key={pdf.file}
              onClick={() => window.open(`/pdfs/${pdf.file}`, '_blank')}
              className="w-full flex items-center gap-3 p-4 text-left active:scale-98 transition-transform"
              style={{ background: '#ffffff07', border: '1px solid #ffffff12', borderRadius: 8 }}
            >
              <BookIcon size={18} color={C.gold} />
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'white', fontSize: 12 }}>{pdf.label}</div>
                <div style={{ fontSize: 10, color: '#666' }}>{pdf.file}</div>
              </div>
              <ChevronRightIcon size={14} color="#555" style={{ marginLeft: 'auto' }} />
            </button>
          ))}
          <p style={{ fontSize: 10, color: '#555', marginTop: 12, textAlign: 'center' }}>
            Place PDF files in /public/pdfs/
          </p>
        </div>
      </Modal>

      {/* ── Twist draw modal ────────────────────────────────────────────────── */}
      <TwistDrawModal
        open={showTwistDraw}
        onClose={() => setShowTwistDraw(false)}
      />
    </div>
  )
}

// ── Objective button — cycles Neutral → P1 → P2 → Neutral ────────────────────
function ObjButton({ obj, owner, players, onCycle }) {
  const FACTION_THEMES_local = require('../../themes/factionThemes').FACTION_THEMES
  const ownerColor = owner === null
    ? '#3a2a10'
    : FACTION_THEMES_local[players[owner]?.faction]?.primary ?? '#888'
  const ownerBg = owner === null ? 'rgba(255,255,255,0.03)' : ownerColor + '18'
  const ownerBorder = owner === null ? 'rgba(255,255,255,0.08)' : ownerColor + '50'
  const ownerLabel = owner === null ? '—' : `P${owner + 1}`

  return (
    <button
      onClick={onCycle}
      className="flex-1 active:scale-90 transition-transform"
      style={{
        padding: '3px 2px', borderRadius: 6,
        background: ownerBg,
        border: `1px solid ${ownerBorder}`,
        textAlign: 'center',
        minWidth: 0,
      }}
    >
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 7, fontWeight: 700, color: ownerColor, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>
        {obj.short}
      </div>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, fontWeight: 900, color: owner === null ? '#3a2a10' : ownerColor, lineHeight: 1 }}>
        {ownerLabel}
      </div>
    </button>
  )
}

// ── VP check row ──────────────────────────────────────────────────────────────
function VpCheckRow({ label, earned }) {
  const color = earned === null ? '#666' : earned ? '#10b981' : '#3a2a10'
  const icon  = earned === null ? '○' : earned ? '✓' : '✕'
  return (
    <div className="flex items-start gap-1.5" style={{ marginBottom: 3 }}>
      <span style={{ fontSize: 10, color, flexShrink: 0, lineHeight: 1.4 }}>{icon}</span>
      <span style={{ fontSize: 10, color, lineHeight: 1.4 }}>{label}{earned === null ? ' (check manually)' : earned ? ' → +1 VP' : ''}</span>
    </div>
  )
}
