import { useGameStore } from '../../store/gameStore'
import { FACTION_THEMES } from '../../themes/factionThemes'

const STEPS = [
  { n: 1, text: 'Roll off — winner chooses who is Attacker and who is Defender.' },
  { n: 2, text: 'Attacker picks regiment ability and enhancement. Then Defender does the same.' },
  { n: 3, text: 'Defender chooses realm side: Aqshy (fire) or Ghyran (life).' },
  { n: 4, text: 'Defender picks deployment map (horizontal or diagonal) and which territory is theirs.' },
  { n: 5, text: 'Defender sets up 1 large + 1 small terrain feature in their territory. Then Attacker does the same. Each terrain feature must be: wholly within friendly territory · more than 6" from all other terrain features · more than 3" from both long battlefield edges and enemy territory. Terrain features cannot be set up on objectives.' },
  { n: 6, text: 'Attacker deploys their full army first — all units wholly within friendly territory and more than 6" from enemy territory. Then Defender deploys.' },
  { n: 7, text: 'First battle round: Attacker chooses who takes the first turn.' },
]

// Parchment card block
function ParchCard({ title, children }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.28)',
        border: '1px solid rgba(0,0,0,0.10)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          background: 'rgba(0,0,0,0.04)',
        }}
      >
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5a4a30' }}>
          {title}
        </h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export default function PreBattleScreen() {
  const {
    players, realm, setRealm, deploymentMap, setDeploymentMap,
    attackerIndex, setAttacker, startGame, goBackToSetup,
  } = useGameStore()

  return (
    <div
      className="h-full w-full overflow-y-auto panel-scroll p-4 space-y-4 parchment-texture"
      style={{
        background: 'linear-gradient(160deg, #e8d8b0 0%, #d4c090 50%, #e0cc9a 100%)',
        color: '#2a1a06',
      }}
    >
      {/* Title */}
      <div className="text-center">
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 900, color: '#2a1a06', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          ⚔ Pre-Battle Setup
        </h1>
        <p style={{ fontFamily: 'IM Fell English, serif', fontSize: 12, fontStyle: 'italic', color: '#5a4a30', marginTop: 3 }}>
          Follow these steps in order before starting the game
        </p>
      </div>

      {/* Attacker / Defender */}
      <ParchCard title="Step 1 — Attacker &amp; Defender">
        <div className="grid grid-cols-2 gap-3">
          {players.map((p, i) => {
            const ft         = FACTION_THEMES[p.faction]
            const isAttacker = attackerIndex === i
            return (
              <button
                key={i}
                onClick={() => setAttacker(i)}
                className="rounded-xl p-4 text-left active:scale-95 transition-all"
                style={{
                  background: isAttacker ? ft.heroCardTint : 'rgba(255,255,255,0.35)',
                  border: `2px solid ${isAttacker ? ft.primary : 'rgba(0,0,0,0.08)'}`,
                  boxShadow: isAttacker ? `0 2px 8px rgba(${ft.edgeRgb},0.2)` : 'none',
                }}
              >
                <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 900, fontSize: 13, color: isAttacker ? ft.inkColor : '#2a1a06' }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: 'IM Fell English, serif', fontSize: 11, fontStyle: 'italic', color: ft.subInkColor, marginTop: 2 }}>
                  {ft.label}
                </div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 6, color: isAttacker ? ft.archHeaderColor : '#8a7050' }}>
                  {isAttacker ? '⚔ Attacker' : '🛡 Defender'}
                </div>
              </button>
            )
          })}
        </div>
      </ParchCard>

      {/* Realm */}
      <ParchCard title="Step 3 — Realm Battlefield">
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'aqshy',  label: 'Aqshy',  sub: 'Realm of Fire', color: '#aa2222' },
            { id: 'ghyran', label: 'Ghyran', sub: 'Realm of Life', color: '#1a7a1a' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setRealm(r.id)}
              className="rounded-xl p-4 text-center active:scale-95 transition-all"
              style={{
                background: realm === r.id ? `rgba(${r.id === 'aqshy' ? '176,30,30' : '30,120,30'},0.10)` : 'rgba(255,255,255,0.35)',
                border: `2px solid ${realm === r.id ? r.color : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>
                {r.id === 'aqshy' ? '🔥' : '🌿'}
              </div>
              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 13, color: realm === r.id ? r.color : '#2a1a06' }}>
                {r.label}
              </div>
              <div style={{ fontFamily: 'IM Fell English, serif', fontSize: 11, fontStyle: 'italic', color: '#5a4a30', marginTop: 2 }}>
                {r.sub}
              </div>
            </button>
          ))}
        </div>
      </ParchCard>

      {/* Deployment map */}
      <ParchCard title="Step 4 — Deployment Map">
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'horizontal', label: 'Horizontal', sub: 'Territories split top/bottom' },
            { id: 'diagonal',   label: 'Diagonal',   sub: 'Territories split corner to corner' },
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setDeploymentMap(d.id)}
              className="rounded-xl p-4 text-center active:scale-95 transition-all"
              style={{
                background: deploymentMap === d.id ? 'rgba(120,90,20,0.10)' : 'rgba(255,255,255,0.35)',
                border: `2px solid ${deploymentMap === d.id ? '#c9a84c' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 13, color: deploymentMap === d.id ? '#8a6010' : '#2a1a06' }}>
                {d.label}
              </div>
              <div style={{ fontFamily: 'IM Fell English, serif', fontSize: 11, fontStyle: 'italic', color: '#5a4a30', marginTop: 3 }}>
                {d.sub}
              </div>
            </button>
          ))}
        </div>
      </ParchCard>

      {/* Physical setup checklist */}
      <ParchCard title="Physical Setup Checklist">
        <div className="space-y-3">
          {STEPS.slice(4).map(step => (
            <div key={step.n} className="flex gap-3 items-start">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 24, height: 24, borderRadius: '50%', marginTop: 1,
                  background: 'rgba(120,90,20,0.15)',
                  border: '1px solid rgba(180,140,30,0.3)',
                  fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700,
                  color: '#8a6010',
                }}
              >
                {step.n}
              </div>
              <p style={{ fontFamily: 'IM Fell English, serif', fontSize: 12, lineHeight: 1.55, color: '#3a2a10' }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </ParchCard>

      {/* Terrain reminder */}
      <div
        className="rounded-xl p-4"
        style={{
          background: 'rgba(180,140,20,0.08)',
          border: '1.5px solid rgba(180,140,20,0.28)',
        }}
      >
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a6010', marginBottom: 8 }}>
          📋 Terrain Rules
        </h3>
        <div className="space-y-1" style={{ fontFamily: 'IM Fell English, serif', fontSize: 12, color: '#3a2a10' }}>
          <p><strong>Large terrain:</strong> Cover · Obscuring · Unstable</p>
          <p><strong>Small terrain:</strong> Cover · Unstable</p>
          <p style={{ fontSize: 11, color: '#5a4a30', marginTop: 6, lineHeight: 1.5 }}>
            Cover: −1 to hit rolls vs units behind/on terrain (unless charged or Fly)
            · Obscuring: blocks shooting (unless Fly)
            · Unstable: can't end moves on parts taller than 1"
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pb-4">
        <button
          onClick={goBackToSetup}
          className="flex-1 py-3 rounded-xl active:scale-95 transition-all"
          style={{
            fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700,
            background: 'rgba(255,255,255,0.3)',
            color: '#5a4a30',
            border: '1.5px solid rgba(0,0,0,0.12)',
          }}
        >
          ← Back
        </button>
        <button
          onClick={startGame}
          className="flex-3 py-4 rounded-xl active:scale-98 transition-all"
          style={{
            flex: 3,
            background: 'linear-gradient(135deg, #c9a84c 0%, #a07820 100%)',
            color: '#1a0f02',
            fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.12em',
            boxShadow: '0 4px 16px rgba(180,130,20,0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          ⚔ Start Battle!
        </button>
      </div>
    </div>
  )
}
