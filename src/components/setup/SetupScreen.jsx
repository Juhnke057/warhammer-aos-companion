import { useState } from 'react'
import { useGameStore, getArmyData } from '../../store/gameStore'
import { FACTION_THEMES } from '../../themes/factionThemes'
import { STORMCAST_ARMIES } from '../../data/stormcast'
import { SKAVEN_ARMIES } from '../../data/skaven'
import { FEC_ARMIES } from '../../data/fec'

const FACTIONS = [
  { id: 'stormcast', label: 'Stormcast Eternals', sub: 'Order' },
  { id: 'skaven',    label: 'Skaven',             sub: 'Chaos' },
  { id: 'fec',       label: 'Flesh-eater Courts', sub: 'Death' },
]

const ARMY_VARIANTS = {
  stormcast: Object.values(STORMCAST_ARMIES).map(a => ({ id: a.id, name: a.name })),
  skaven:    Object.values(SKAVEN_ARMIES).map(a => ({ id: a.id, name: a.name })),
  fec:       Object.values(FEC_ARMIES).map(a => ({ id: a.id, name: a.name })),
}

// Parchment palette per faction
function getParchment(faction) {
  const ft = FACTION_THEMES[faction]
  return {
    panel:   ft.parchmentPanel,
    header:  `linear-gradient(180deg, rgba(${ft.edgeRgb},0.12) 0%, transparent 100%)`,
    card:    ft.cardTint,
    ink:     ft.inkColor,
    sub:     ft.subInkColor,
    arch:    ft.archHeaderColor,
    edge:    ft.edgeRgb,
    primary: ft.primary,
  }
}

function PlayerSetupPanel({ playerIndex }) {
  const {
    players, setPlayerName, setPlayerFaction, setPlayerVariant,
    setPlayerRegimentAbility, setPlayerEnhancement,
  } = useGameStore()

  const player = players[playerIndex]
  const p      = getParchment(player.faction)
  const army   = getArmyData(player.faction, player.armyVariant)

  return (
    <div
      className="flex-1 overflow-hidden flex flex-col panel-scroll parchment-texture"
      style={{
        background: p.panel,
        borderRadius: 16,
        borderTop: `4px solid ${p.primary}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: '12px 16px',
          background: p.header,
          borderBottom: `1px solid rgba(${p.edge},0.18)`,
        }}
      >
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: p.arch, marginBottom: 3 }}>
          Player {playerIndex + 1}
        </div>
        <input
          className="bg-transparent outline-none w-full border-b"
          style={{
            fontFamily: 'Cinzel, serif', fontSize: 17, fontWeight: 900,
            color: p.ink, letterSpacing: '0.06em',
            borderColor: `rgba(${p.edge},0.25)`,
            paddingBottom: 2,
          }}
          value={player.name}
          onChange={e => setPlayerName(playerIndex, e.target.value)}
          placeholder={`Player ${playerIndex + 1}`}
        />
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto panel-scroll">

        {/* Faction select */}
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: p.ink, marginBottom: 8 }}>
            Faction
          </div>
          <div className="grid grid-cols-3 gap-2">
            {FACTIONS.map(f => {
              const ft  = FACTION_THEMES[f.id]
              const sel = player.faction === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setPlayerFaction(playerIndex, f.id)}
                  className="rounded-xl p-3 text-center active:scale-95 transition-all"
                  style={{
                    background: sel ? ft.heroCardTint : 'rgba(255,255,255,0.35)',
                    border: `2px solid ${sel ? ft.primary : 'rgba(0,0,0,0.10)'}`,
                    boxShadow: sel ? `0 2px 8px rgba(${ft.edgeRgb},0.2)` : 'none',
                  }}
                >
                  <div style={{
                    fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700,
                    color: sel ? ft.inkColor : '#3a2a10', lineHeight: 1.3,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>
                    {f.label}
                  </div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 600, color: sel ? ft.archHeaderColor : '#5a4a30', marginTop: 3, letterSpacing: '0.06em' }}>
                    {f.sub}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Army variant */}
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: p.ink, marginBottom: 8 }}>
            Army
          </div>
          <div className="space-y-2">
            {ARMY_VARIANTS[player.faction].map(v => {
              const sel = player.armyVariant === v.id
              return (
                <button
                  key={v.id}
                  onClick={() => setPlayerVariant(playerIndex, v.id)}
                  className="w-full text-left rounded-xl px-4 py-3 active:scale-95 transition-all"
                  style={{
                    background: sel ? `rgba(${p.edge},0.12)` : 'rgba(255,255,255,0.35)',
                    border: `2px solid ${sel ? p.primary : 'rgba(0,0,0,0.08)'}`,
                  }}
                >
                  <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 12, color: sel ? p.arch : p.ink }}>
                    {v.name}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {army && (
          <>
            {/* Regiment ability */}
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: p.ink, marginBottom: 8 }}>
                Regiment Ability
              </div>
              <div className="space-y-2">
                {army.regimentAbilities.map((ra, i) => {
                  const sel = player.regimentAbilityIndex === i
                  return (
                    <button
                      key={ra.id}
                      onClick={() => setPlayerRegimentAbility(playerIndex, i)}
                      className="w-full text-left rounded-xl px-4 py-3 active:scale-95 transition-all"
                      style={{
                        background: sel ? `rgba(${p.edge},0.10)` : 'rgba(255,255,255,0.35)',
                        border: `2px solid ${sel ? p.primary : 'rgba(0,0,0,0.08)'}`,
                      }}
                    >
                      <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 12, color: sel ? p.arch : p.ink }}>
                        {ra.name}
                      </div>
                      <div style={{ fontSize: 12, fontFamily: 'Georgia, serif', marginTop: 4, lineHeight: 1.5, color: p.ink, opacity: 0.75 }}>
                        {ra.effect}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Enhancement */}
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: p.ink, marginBottom: 8 }}>
                General Enhancement
              </div>
              <div className="space-y-2">
                {army.enhancements.map((en, i) => {
                  const sel = player.enhancementIndex === i
                  return (
                    <button
                      key={en.id}
                      onClick={() => setPlayerEnhancement(playerIndex, i)}
                      className="w-full text-left rounded-xl px-4 py-3 active:scale-95 transition-all"
                      style={{
                        background: sel ? `rgba(${p.edge},0.10)` : 'rgba(255,255,255,0.35)',
                        border: `2px solid ${sel ? p.primary : 'rgba(0,0,0,0.08)'}`,
                      }}
                    >
                      <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 12, color: sel ? p.arch : p.ink }}>
                        {en.name}
                      </div>
                      <div style={{ fontSize: 12, fontFamily: 'Georgia, serif', marginTop: 4, lineHeight: 1.5, color: p.ink, opacity: 0.75 }}>
                        {en.timing} — {en.effect}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function SetupScreen() {
  const { goToPreBattle } = useGameStore()

  return (
    <div
      className="h-full w-full flex flex-col p-4 gap-4 parchment-texture"
      style={{ background: 'linear-gradient(160deg, #e8d8b0 0%, #d4c090 50%, #e0cc9a 100%)' }}
    >
      {/* Title */}
      <div className="text-center flex-shrink-0">
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 900, color: '#2a1a06', textTransform: 'uppercase', letterSpacing: '0.15em', textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}>
          ✦ AoS Spearhead ✦
        </h1>
        <p style={{ fontFamily: 'IM Fell English, serif', fontSize: 13, fontStyle: 'italic', color: '#5a4a30', marginTop: 3 }}>
          Configure your armies before battle
        </p>
      </div>

      {/* Player panels side by side */}
      <div className="flex gap-4 flex-1 min-h-0">
        <PlayerSetupPanel playerIndex={0} />
        <PlayerSetupPanel playerIndex={1} />
      </div>

      {/* Continue button */}
      <button
        onClick={goToPreBattle}
        className="flex-shrink-0 w-full py-4 rounded-xl active:scale-98 transition-all"
        style={{
          background: 'linear-gradient(135deg, #c9a84c 0%, #a07820 100%)',
          color: '#1a0f02',
          fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '0.15em',
          boxShadow: '0 4px 16px rgba(180,130,20,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        Continue to Pre-Battle Setup →
      </button>
    </div>
  )
}
