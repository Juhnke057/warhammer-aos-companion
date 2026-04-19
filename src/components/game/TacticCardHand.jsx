import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { BATTLE_TACTICS } from '../../data/cards'
import Modal from '../ui/Modal'

export default function TacticCardHand({ playerIndex, isDark }) {
  const { playerHands, discardTactic, addVP, usedTacticCommands, toggleTacticCommandUsed } = useGameStore()
  const [selectedCard, setSelectedCard] = useState(null)
  const [confirmComplete, setConfirmComplete] = useState(false)

  const hand  = playerHands[playerIndex] ?? []
  const cards = hand.map(id => BATTLE_TACTICS.find(t => t.id === id)).filter(Boolean)

  if (cards.length === 0) {
    return (
      <div className="px-3 py-2 text-xs text-center" style={{ color: isDark ? '#555' : '#aaa' }}>
        No battle tactic cards in hand
      </div>
    )
  }

  function handleComplete() {
    if (!selectedCard) return
    addVP(playerIndex, 1)
    discardTactic(playerIndex, selectedCard.id)
    setSelectedCard(null)
    setConfirmComplete(false)
  }

  return (
    <>
      <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className="flex-shrink-0 rounded-lg px-3 py-2.5 text-left active:scale-95 transition-transform"
            style={{
              background: isDark ? '#6366f120' : '#6366f115',
              border: '1px solid #6366f140',
              minWidth: '120px',
              maxWidth: '160px',
            }}
          >
            <div className="text-xs font-bold leading-tight" style={{ color: '#818cf8' }}>
              {card.name}
            </div>
            <div className="text-xs mt-1 opacity-60 leading-tight" style={{ color: isDark ? '#aaa' : '#555' }}>
              Tap to view
            </div>
          </button>
        ))}
      </div>

      {selectedCard && (
        <Modal
          open={!!selectedCard}
          onClose={() => { setSelectedCard(null); setConfirmComplete(false) }}
          title={selectedCard.name}
          accentColor="#6366f1"
        >
          <div className="space-y-4">
            {/* Battle Tactic condition */}
            <div className="rounded-lg p-4" style={{ background: '#6366f115', border: '1px solid #6366f140' }}>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                🎯 Battle Tactic — Complete for 1 VP
              </div>
              <p className="text-gray-200 leading-relaxed">{selectedCard.tactic}</p>
            </div>

            {/* Command ability */}
            {(() => {
              const cmdUsed = !!usedTacticCommands[`${playerIndex}-${selectedCard.id}`]
              return (
                <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${cmdUsed ? 'rgba(255,255,255,0.08)' : '#f59e0b40'}`, opacity: cmdUsed ? 0.6 : 1 }}>
                  <div className="px-4 py-2 flex items-center justify-between gap-2" style={{ background: cmdUsed ? 'rgba(255,255,255,0.04)' : '#f59e0b15' }}>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: cmdUsed ? '#555' : '#f59e0b' }}>
                        ⚡ Command — {selectedCard.command.timing}
                      </div>
                      <div className="font-bold" style={{ color: cmdUsed ? '#555' : 'white' }}>{selectedCard.command.name}</div>
                    </div>
                    <button
                      onClick={() => toggleTacticCommandUsed(playerIndex, selectedCard.id)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                      style={{
                        background: cmdUsed ? 'rgba(255,255,255,0.06)' : '#f59e0b25',
                        color: cmdUsed ? '#555' : '#f59e0b',
                        border: `1px solid ${cmdUsed ? 'rgba(255,255,255,0.08)' : '#f59e0b40'}`,
                      }}
                    >
                      {cmdUsed ? 'Mark Unused' : 'Mark Used'}
                    </button>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-sm leading-relaxed" style={{ color: cmdUsed ? '#555' : '#d1d5db' }}>{selectedCard.command.effect}</p>
                  </div>
                </div>
              )
            })()}

            {/* Confirm complete */}
            {confirmComplete ? (
              <div className="rounded-lg p-4 space-y-3" style={{ background: '#10b98115', border: '1px solid #10b98140' }}>
                <div className="text-sm font-bold text-green-400 text-center">
                  Complete "{selectedCard.name}"?
                </div>
                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  This will award +1 VP and discard the card.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmComplete(false)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-bold active:scale-95 transition-transform"
                    style={{ background: 'rgba(255,255,255,0.08)', color: '#888' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleComplete}
                    className="flex-[2] py-2.5 rounded-lg text-sm font-bold active:scale-95 transition-transform"
                    style={{ background: '#10b981', color: 'white' }}
                  >
                    ✓ Complete! +1 VP
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    discardTactic(playerIndex, selectedCard.id)
                    setSelectedCard(null)
                  }}
                  className="flex-1 py-3 rounded-lg font-bold text-sm active:scale-95 transition-transform"
                  style={{ background: '#ef444420', color: '#ef4444', border: '1px solid #ef444435' }}
                >
                  Discard
                </button>
                <button
                  onClick={() => setConfirmComplete(true)}
                  className="flex-[2] py-3 rounded-lg font-bold text-sm active:scale-95 transition-transform"
                  style={{ background: '#10b981', color: 'white' }}
                >
                  ✓ Completed! +1 VP
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
