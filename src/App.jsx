import { SvgDefs } from './components/ui/UnitIcons'
import { useGameStore } from './store/gameStore'
import SetupScreen from './components/setup/SetupScreen'
import PreBattleScreen from './components/setup/PreBattleScreen'
import GameScreen from './components/game/GameScreen'
import GameOverScreen from './components/game/GameOverScreen'

export default function App() {
  const { screen } = useGameStore()

  return (
    <div className="h-full w-full overflow-hidden" style={{ background: '#c8aa78' }}>
      {/* Hidden SVG defs for unit icons — must render once at root */}
      <SvgDefs />
      {screen === 'setup'     && <SetupScreen />}
      {screen === 'prebattle' && <PreBattleScreen />}
      {screen === 'game'      && <GameScreen />}
      {screen === 'gameover'  && <GameOverScreen />}
    </div>
  )
}
