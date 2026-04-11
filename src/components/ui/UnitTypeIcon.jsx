/**
 * Unit type icons — small SVG silhouettes that tell a noob what a unit physically is.
 * Priority: War Machine > Fly > Cavalry > Infantry
 * Secondary badges: Hero (crown), Wizard (arcane star), Priest (chalice)
 */

function IconInfantry({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 22" fill="none">
      {/* Kite shield */}
      <path d="M10 1L18 5V12L10 21L2 12V5Z"
            fill={color} fillOpacity="0.9"
            stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
      {/* Cross emblem */}
      <line x1="10" y1="5" x2="10" y2="15" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="9" x2="14" y2="9" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconCavalry({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 20" fill="none">
      {/* Simplified horse in profile */}
      <path d="M3 18V12L5 8L6 6C7 3 11 2 13 4L14 3L15.5 5.5L14 8L16 12V18H13V13H9V18H3Z"
            fill={color} fillOpacity="0.9" />
      {/* Eye */}
      <circle cx="13.5" cy="5.5" r="0.8" fill="rgba(0,0,0,0.4)" />
    </svg>
  )
}

function IconWarMachine({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 16" fill="none">
      {/* Barrel */}
      <rect x="1" y="4" width="14" height="5" rx="2" fill={color} fillOpacity="0.9" />
      {/* Muzzle flash / taper */}
      <path d="M15 3.5L22 7L15 10.5Z" fill={color} fillOpacity="0.7" />
      {/* Wheels */}
      <circle cx="5" cy="12" r="3" fill={color} fillOpacity="0.9" />
      <circle cx="5" cy="12" r="1.2" fill="rgba(0,0,0,0.35)" />
      <circle cx="11" cy="12" r="3" fill={color} fillOpacity="0.9" />
      <circle cx="11" cy="12" r="1.2" fill="rgba(0,0,0,0.35)" />
    </svg>
  )
}

function IconFly({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 16" fill="none">
      {/* Wings spread */}
      <path d="M12 8C10 5.5 6.5 3 2 5C4.5 7.5 7 9.5 9 8.5C10 10 11 11.5 12 12C13 11.5 14 10 15 8.5C17 9.5 19.5 7.5 22 5C17.5 3 14 5.5 12 8Z"
            fill={color} fillOpacity="0.9" />
      {/* Body */}
      <ellipse cx="12" cy="9" rx="1.5" ry="3" fill={color} />
    </svg>
  )
}

function IconHero({ color, size }) {
  // Small crown used as an overlay badge
  return (
    <svg width={size} height={size} viewBox="0 0 16 12" fill="none">
      <path d="M1 10V7L4 3L8 7L12 3L15 7V10Z"
            fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round" />
      <rect x="1" y="10" width="14" height="1.5" rx="0.5" fill={color} />
    </svg>
  )
}

function IconWizard({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      {/* 4-pointed arcane star */}
      <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8Z"
            fill={color} fillOpacity="0.9" />
    </svg>
  )
}

function IconPriest({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 18" fill="none">
      {/* Chalice cup */}
      <path d="M3 2H11L10 7C10 9.5 9 10.5 7 10.5C5 10.5 4 9.5 4 7Z" fill={color} fillOpacity="0.9" />
      {/* Stem */}
      <rect x="6" y="10.5" width="2" height="4" fill={color} fillOpacity="0.9" />
      {/* Base */}
      <rect x="3" y="14.5" width="8" height="2" rx="1" fill={color} fillOpacity="0.9" />
    </svg>
  )
}

// Derive the primary display type from unit keywords
export function getPrimaryType(keywords = []) {
  if (keywords.includes('War Machine')) return 'warmachine'
  if (keywords.includes('Fly'))         return 'fly'
  if (keywords.includes('Cavalry'))     return 'cavalry'
  return 'infantry'
}

export default function UnitTypeIcon({ keywords = [], color = '#888', size = 18 }) {
  const type = getPrimaryType(keywords)
  const isHero   = keywords.includes('Hero')
  const isWizard = keywords.includes('Wizard')
  const isPriest = keywords.includes('Priest')

  const typeIconSize = size
  const badgeSize = Math.round(size * 0.6)

  return (
    <div className="flex flex-col items-center gap-0.5" style={{ minWidth: typeIconSize }}>
      {/* Primary type icon */}
      {type === 'infantry'  && <IconInfantry   color={color} size={typeIconSize} />}
      {type === 'cavalry'   && <IconCavalry    color={color} size={typeIconSize} />}
      {type === 'warmachine'&& <IconWarMachine color={color} size={typeIconSize} />}
      {type === 'fly'       && <IconFly        color={color} size={typeIconSize} />}

      {/* Secondary modifier badges */}
      <div className="flex gap-0.5">
        {isHero   && <IconHero   color={color} size={badgeSize} />}
        {isWizard && <IconWizard color={color} size={badgeSize} />}
        {isPriest && <IconPriest color={color} size={badgeSize} />}
      </div>
    </div>
  )
}
