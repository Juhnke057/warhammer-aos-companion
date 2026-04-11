import { useGameStore } from '../../store/gameStore'
import { FACTION_THEMES } from '../../themes/factionThemes'

export default function GameOverScreen() {
  const { players, vp, resetGame } = useGameStore()

  const [p0vp, p1vp] = vp
  const winner = p0vp > p1vp ? 0 : p1vp > p0vp ? 1 : null
  const isTie  = winner === null

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center p-8 gap-6 parchment-texture"
      style={{ background: 'linear-gradient(160deg, #e8d8b0 0%, #d4c090 50%, #e0cc9a 100%)' }}
    >
      {/* Title */}
      <div className="text-center">
        <div style={{ fontSize: 48, marginBottom: 8 }}>{isTie ? '🤝' : '🏆'}</div>
        <h1 style={{
          fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 900,
          color: '#2a1a06', textTransform: 'uppercase', letterSpacing: '0.12em',
          textShadow: '0 1px 0 rgba(255,255,255,0.4)',
        }}>
          {isTie ? "Honourable Draw" : `Victory!`}
        </h1>
        {!isTie && (
          <p style={{ fontFamily: 'IM Fell English, serif', fontSize: 15, fontStyle: 'italic', color: '#5a4a30', marginTop: 4 }}>
            {players[winner]?.name} claims glory for the {FACTION_THEMES[players[winner]?.faction]?.label}
          </p>
        )}
        {isTie && (
          <p style={{ fontFamily: 'IM Fell English, serif', fontSize: 14, fontStyle: 'italic', color: '#5a4a30', marginTop: 4 }}>
            Neither side could claim dominance — both armies fought with honour
          </p>
        )}
      </div>

      {/* Score cards */}
      <div className="flex gap-6 items-stretch">
        {players.map((p, i) => {
          const ft = FACTION_THEMES[p.faction]
          const isWinner = winner === i
          return (
            <div
              key={i}
              className="rounded-2xl overflow-hidden parchment-texture"
              style={{
                background: ft.parchmentPanel,
                border: `3px solid ${isWinner ? ft.primary : 'rgba(0,0,0,0.10)'}`,
                boxShadow: isWinner
                  ? `0 8px 32px rgba(${ft.edgeRgb},0.25), 0 2px 8px rgba(0,0,0,0.15)`
                  : '0 2px 8px rgba(0,0,0,0.10)',
                minWidth: 160,
                position: 'relative',
              }}
            >
              {isWinner && (
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: 3,
                  background: ft.primary,
                  boxShadow: `0 0 10px ${ft.primary}80`,
                  borderRadius: 2,
                }} />
              )}
              <div style={{
                padding: '16px 20px 12px',
                background: `linear-gradient(180deg, rgba(${ft.edgeRgb},0.12) 0%, transparent 100%)`,
                borderBottom: `1px solid rgba(${ft.edgeRgb},0.18)`,
                textAlign: 'center',
              }}>
                {isWinner && (
                  <div style={{ fontSize: 20, marginBottom: 4 }}>🏆</div>
                )}
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 900,
                  color: ft.inkColor, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontFamily: 'IM Fell English, serif', fontSize: 11, fontStyle: 'italic',
                  color: ft.subInkColor, marginTop: 2,
                }}>
                  {ft.label}
                </div>
              </div>
              <div style={{ padding: '16px 20px', textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 56, fontWeight: 900,
                  color: isWinner ? ft.primary : ft.subInkColor, lineHeight: 1,
                  textShadow: isWinner ? `0 0 20px ${ft.primary}40` : 'none',
                }}>
                  {vp[i]}
                </div>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 8, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.25em',
                  color: ft.archHeaderColor, marginTop: 4,
                }}>
                  Victory Points
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Play again */}
      <button
        onClick={resetGame}
        className="px-12 py-4 rounded-xl active:scale-95 transition-all"
        style={{
          background: 'linear-gradient(135deg, #c9a84c 0%, #a07820 100%)',
          color: '#1a0f02',
          fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '0.15em',
          boxShadow: '0 4px 20px rgba(180,130,20,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
          marginTop: 8,
        }}
      >
        ↩ Play Again
      </button>
    </div>
  )
}
