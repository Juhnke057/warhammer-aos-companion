import { useGameStore } from '../../store/gameStore'

export default function NobleDeedsTracker({ army, playerIndex, isDark, theme }) {
  const { nobleDeedsPoints, addNobleDeedsPoints, spendNobleDeedsPoints, removeDamage } = useGameStore()

  const armyHeroes = [army.general, ...(army.units ?? [])].filter(u => u?.keywords?.includes('Hero'))
  const anyFrenzy  = armyHeroes.some(h => (nobleDeedsPoints[`${playerIndex}-${h.id}`] ?? 0) >= 6)
  const frenzyHeroes = armyHeroes.filter(h => (nobleDeedsPoints[`${playerIndex}-${h.id}`] ?? 0) >= 6)

  return (
    <div className="flex-shrink-0" style={{ borderBottom: `1px solid ${theme.primary}30` }}>

      {/* ── Feeding Frenzy banner — shown when any hero has 6 Noble Deeds ── */}
      {anyFrenzy && (
        <div
          className="px-3 py-2.5 animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #ef444425 0%, #dc262620 100%)',
            borderBottom: '2px solid #ef4444',
            boxShadow: '0 0 20px #ef444430',
          }}
        >
          <div className="font-display font-bold text-base uppercase tracking-wide text-center" style={{ color: '#ef4444' }}>
            ⚡ FEEDING FRENZY ACTIVE ⚡
          </div>
          <div className="text-xs text-center mt-0.5" style={{ color: '#fca5a5' }}>
            +1 Attacks for ALL friendly units within 12" of{' '}
            {frenzyHeroes.map(h => h.name.split(' ')[0]).join(' & ')}
          </div>
        </div>
      )}

      {/* ── Noble Deeds tracker ──────────────────────────────────────────── */}
      <div className="px-3 py-2" style={{ background: isDark ? '#ffffff08' : '#00000008' }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.primary }}>
          Noble Deeds
        </div>

        <div className="space-y-2 mb-2">
          {armyHeroes.map(hero => {
            const pts    = nobleDeedsPoints[`${playerIndex}-${hero.id}`] ?? 0
            const isFull = pts >= 6
            return (
              <div key={hero.id} className="flex items-center gap-2">
                <div
                  className="flex-1 text-xs font-bold truncate"
                  style={{ color: isFull ? '#ef4444' : (isDark ? theme.textDark : theme.textLight) }}
                >
                  {hero.name.split(' ')[0]}
                  {isFull && <span className="ml-1 text-red-400">★ FRENZY</span>}
                </div>

                {/* Pip display — 6 pips */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-sm"
                      style={{
                        background: i < pts
                          ? (isFull ? '#ef4444' : theme.primary)
                          : (isDark ? '#ffffff15' : '#00000015'),
                        boxShadow: i < pts && isFull ? '0 0 4px #ef444460' : 'none',
                      }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <button
                  onClick={() => addNobleDeedsPoints(playerIndex, hero.id, -1)}
                  className="w-8 h-8 rounded flex items-center justify-center font-bold active:scale-90 transition-transform"
                  style={{ background: '#ef444420', color: '#ef4444' }}
                >
                  −
                </button>
                <span className="text-sm font-bold w-4 text-center"
                      style={{ color: isDark ? theme.textDark : theme.textLight }}>{pts}</span>
                <button
                  onClick={() => addNobleDeedsPoints(playerIndex, hero.id, 1)}
                  disabled={isFull}
                  className="w-8 h-8 rounded flex items-center justify-center font-bold active:scale-90 transition-transform disabled:opacity-30"
                  style={{ background: theme.primary + '30', color: theme.primary }}
                >
                  +
                </button>
              </div>
            )
          })}
        </div>

        {/* Summon Loyal Subjects */}
        <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: isDark ? '#888' : '#666' }}>
          Summon Loyal Subjects (Movement Phase)
        </div>
        <div className="flex gap-1.5">
          {armyHeroes.map(hero => {
            const pts       = nobleDeedsPoints[`${playerIndex}-${hero.id}`] ?? 0
            const heroShort = hero.name.split(' ')[0]
            return (
              <div key={hero.id} className="flex-1 space-y-1">
                <button
                  onClick={() => {
                    spendNobleDeedsPoints(playerIndex, hero.id, 1)
                    removeDamage(playerIndex, 'cryptguard', 1)
                  }}
                  disabled={pts < 1}
                  className="w-full rounded px-1.5 py-1.5 text-xs text-left disabled:opacity-30 active:scale-95 transition-transform"
                  style={{ background: '#10b98115', border: '1px solid #10b98130', color: '#10b981' }}
                >
                  <div className="font-bold">1pt → Cryptguard</div>
                  <div className="opacity-70 text-xs">{heroShort}</div>
                </button>
                <button
                  onClick={() => {
                    spendNobleDeedsPoints(playerIndex, hero.id, 2)
                    removeDamage(playerIndex, 'morbheg-knights', 1)
                  }}
                  disabled={pts < 2}
                  className="w-full rounded px-1.5 py-1.5 text-xs text-left disabled:opacity-30 active:scale-95 transition-transform"
                  style={{ background: '#f59e0b15', border: '1px solid #f59e0b30', color: '#f59e0b' }}
                >
                  <div className="font-bold">2pts → Morbheg</div>
                  <div className="opacity-70 text-xs">{heroShort}</div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
