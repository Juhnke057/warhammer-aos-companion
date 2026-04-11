import { useGameStore } from '../../store/gameStore'
import { FACTION_THEMES } from '../../themes/factionThemes'

export default function GameOverScreen() {
  const { players, vp, resetGame, theme } = useGameStore()
  const isDark = theme === 'dark'

  const [p0vp, p1vp] = vp
  const winner = p0vp > p1vp ? 0 : p1vp > p0vp ? 1 : null
  const isTie = winner === null

  const winnerPlayer = winner !== null ? players[winner] : null
  const winnerTheme = winnerPlayer ? FACTION_THEMES[winnerPlayer.faction] : null

  const bg = isDark ? '#0a0a0a' : '#f0f0f0'
  const textColor = isDark ? '#e8e8e8' : '#1a1a1a'

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 gap-8"
         style={{ background: bg, color: textColor }}>
      <div className="text-5xl">{isTie ? '🤝' : '🏆'}</div>

      <div className="text-center">
        <h1 className="text-3xl font-bold font-display mb-2">
          {isTie ? "It's a Draw!" : `${winnerPlayer?.name} Wins!`}
        </h1>
        {!isTie && (
          <p className="text-lg" style={{ color: winnerTheme?.primary }}>
            {FACTION_THEMES[winnerPlayer?.faction]?.label}
          </p>
        )}
      </div>

      {/* Score breakdown */}
      <div className="flex gap-8 items-center">
        {players.map((p, i) => {
          const ft = FACTION_THEMES[p.faction]
          const isWinner = winner === i
          return (
            <div key={i} className="text-center rounded-xl p-6"
                 style={{
                   background: isDark ? ft.panelDark : ft.panelLight,
                   border: `3px solid ${isWinner ? ft.primary : 'transparent'}`,
                   minWidth: '140px',
                 }}>
              <div className="text-sm font-bold mb-1" style={{ color: ft.primary }}>
                {isWinner ? '🏆 ' : ''}{p.name}
              </div>
              <div className="text-xs mb-3" style={{ color: isDark ? ft.subtextDark : ft.subtextLight }}>
                {ft.label}
              </div>
              <div className="text-5xl font-bold" style={{ color: isWinner ? ft.primary : textColor }}>
                {vp[i]}
              </div>
              <div className="text-xs mt-1" style={{ color: isDark ? ft.subtextDark : ft.subtextLight }}>
                Victory Points
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={resetGame}
        className="px-10 py-4 rounded-xl font-bold text-xl bg-yellow-500 text-gray-900 active:scale-98 transition-all shadow-lg"
      >
        Play Again ↩
      </button>
    </div>
  )
}
