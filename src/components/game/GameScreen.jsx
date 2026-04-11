import { useGameStore } from '../../store/gameStore'
import PlayerPanel from './PlayerPanel'
import CenterStrip from './CenterStrip'

export default function GameScreen() {
  const { players } = useGameStore()

  return (
    <div className="h-full w-full flex overflow-hidden">
      {/* Player 1 — left, normal orientation */}
      <PlayerPanel playerIndex={0} />

      {/* Center strip — phase, VP, twist, next */}
      <CenterStrip />

      {/* Player 2 — right, same orientation */}
      <PlayerPanel playerIndex={1} />
    </div>
  )
}
