import { useState } from 'react'
import { SvgDefs } from './components/ui/UnitIcons'
import { useGameStore } from './store/gameStore'
import SetupScreen from './components/setup/SetupScreen'
import PreBattleScreen from './components/setup/PreBattleScreen'
import GameScreen from './components/game/GameScreen'
import GameOverScreen from './components/game/GameOverScreen'
import HelpModal from './components/ui/HelpModal'

export default function App() {
  const { screen } = useGameStore()
  const [showHelp, setShowHelp] = useState(false)

  // On the game screen the center strip is dark; on all others the bg is parchment.
  const onGameScreen = screen === 'game'

  return (
    <div className="h-full w-full overflow-hidden" style={{ background: '#c8aa78' }}>
      {/* Hidden SVG defs for unit icons — must render once at root */}
      <SvgDefs />
      {screen === 'setup'     && <SetupScreen />}
      {screen === 'prebattle' && <PreBattleScreen />}
      {screen === 'game'      && <GameScreen />}
      {screen === 'gameover'  && <GameOverScreen />}

      {/* ── Floating help button — always visible ─────────────────────────── */}
      <button
        onClick={() => setShowHelp(true)}
        aria-label="Open rules glossary"
        className="fixed z-40 flex items-center justify-center active:scale-90 transition-all"
        style={{
          bottom: 16,
          right: 16,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: onGameScreen
            ? 'linear-gradient(135deg, #2a1a06 0%, #1a0f02 100%)'
            : 'linear-gradient(135deg, #c9a84c 0%, #a07820 100%)',
          border: onGameScreen
            ? '2px solid #3a2800'
            : '2px solid rgba(255,255,255,0.25)',
          boxShadow: onGameScreen
            ? '0 2px 12px rgba(0,0,0,0.6), 0 0 0 1px #d4a01740'
            : '0 4px 16px rgba(140,100,10,0.45)',
          color: onGameScreen ? '#d4a017' : '#1a0f02',
          fontFamily: 'Cinzel, serif',
          fontSize: 20,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        ?
      </button>

      {/* ── Help glossary modal ────────────────────────────────────────────── */}
      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  )
}
