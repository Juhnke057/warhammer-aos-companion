// ── Age of Sigmar companion icon set ─────────────────────────────────────────
// All icons are 24×24 viewBox, stroke-based line-art with sharp military/gothic
// aesthetic. Use `size` prop to scale. `color` defaults to CSS currentColor.

function Svg({ size, color, className, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

// ── Stat icons ────────────────────────────────────────────────────────────────

/** Move stat — diagonal speed arrow */
export function MoveIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M5 19L19 5M19 5h-6M19 5v6" />
    </Svg>
  )
}

/** Health / Wounds — blood drop */
export function HealthIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 4C10 4 6 8 6 13a6 6 0 0 0 12 0C18 8 14 4 12 4Z" />
    </Svg>
  )
}

/** Save — kite shield */
export function ShieldIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 3L4 7v5c0 5.3 4.3 8.7 8 10 3.7-1.3 8-4.7 8-10V7L12 3Z" />
    </Svg>
  )
}

/** Control — battle banner */
export function ControlIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M6 3v18M6 3l13 4.5-13 6" />
    </Svg>
  )
}

/** Ward save — shield with cross */
export function WardIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 3L4 7v5c0 5.3 4.3 8.7 8 10 3.7-1.3 8-4.7 8-10V7L12 3Z" />
      <path d="M12 9v6M9 12h6" />
    </Svg>
  )
}

// ── Combat / Ability icons ────────────────────────────────────────────────────

/** Sword — melee/combat */
export function SwordIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M6 18L18 6M18 6h-5.5M18 6v5.5" />
      <path d="M8.5 15.5L6 18l1.5 1.5 2.5-2.5M7.5 16.5l-1 1" />
    </Svg>
  )
}

/** Crossed swords — combat phase */
export function CrossedSwordsIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 4L20 20M20 4L4 20" />
      <path d="M4 4h4M4 4v4M20 4h-4M20 4v4" />
      <path d="M4 20h4M20 20h-4" />
    </Svg>
  )
}

/** Bow & arrow — shooting */
export function BowArrowIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M6 3C4 7 4 17 6 21M6 3c3 0 5.5 1 7 3M6 21c3 0 5.5-1 7-3" />
      <path d="M7 12H20M17 9l3 3-3 3" />
    </Svg>
  )
}

/** Lightning bolt — abilities / spells */
export function LightningIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M13 2L5 13h6L9 22l10-12h-6L13 2Z" />
    </Svg>
  )
}

/** Charge arrow with speed lines */
export function ChargeIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M3 12H18M13 7L18 12L13 17" />
      <path d="M3 7H9M3 17H9M3 12H6" />
    </Svg>
  )
}

// ── Status / State icons ──────────────────────────────────────────────────────

/** Skull — destroyed unit */
export function SkullIcon({ size = 16, color, className }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 11C4 6 7.6 2 12 2S20 6 20 11c0 3.5-1.8 6.3-4 7.3V21H8v-2.7C5.8 17.3 4 14.5 4 11Z"
        stroke={c} strokeWidth="1.75" strokeLinejoin="round"
      />
      <path d="M8 21h8" stroke={c} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9.5" cy="11" r="1.5" fill={c} />
      <circle cx="14.5" cy="11" r="1.5" fill={c} />
      <path d="M10 18v-1.5M12 19v-2.5M14 18v-1.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** Crown — Hero / general */
export function CrownIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M3 18h18" />
      <path d="M3 18V11L7.5 15.5 12 7 16.5 15.5 21 11V18" />
    </Svg>
  )
}

/** 4-pointed star — Victory Points */
export function StarIcon({ size = 16, color, className }) {
  const c = color || 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c} className={className}>
      <path d="M12 2L14 10.5L22 12L14 13.5L12 22L10 13.5L2 12L10 10.5Z" />
    </svg>
  )
}

/** Diamond gem — enhancement */
export function GemIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 2L2 9L12 22L22 9Z" />
      <path d="M2 9H22M7 2L2 9M17 2L22 9M7 2H17" />
    </Svg>
  )
}

/** Hourglass — timing / phases */
export function HourglassIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M5 3H19L12 12L19 21H5L12 12L5 3Z" />
      <path d="M5 3H19M5 21H19" />
    </Svg>
  )
}

// ── Phase icons ───────────────────────────────────────────────────────────────

/** Sun / Start of Round */
export function SunIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </Svg>
  )
}

/** Castle — Hero Phase */
export function CastleIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M3 20V13H2V8h3V5h2v3h2V5h2v3h2V5h2v3h2V8h3v5h-1v7H3Z" />
      <path d="M9 20v-5h6v5M12 8v5" />
    </Svg>
  )
}

/** Boot — Movement Phase */
export function BootIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M7 4v9l4.5 3.5H20V14h-6l-3-2V4H7Z" />
      <path d="M11 20H6v-3.5M6 16.5H3V20h18v-2" />
    </Svg>
  )
}

/** Moon — End of Turn */
export function MoonIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </Svg>
  )
}

// ── Realm icons ───────────────────────────────────────────────────────────────

/** Flame — Aqshy */
export function FlameIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 3C14 6 17 9 17 13.5a5 5 0 0 1-10 0C7 9 10 6 12 3Z" />
      <path d="M12 14c0 0 2 2 1.5 3.5A2 2 0 0 1 12 19a2 2 0 0 1-1.5-1.5C10 16 12 14 12 14Z" />
    </Svg>
  )
}

/** Leaf — Ghyran */
export function LeafIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M6 20C6 20 6 9 20 4c0 0-1 13-14 16Z" />
      <path d="M6 20L4 22M13 10L6 20" />
    </Svg>
  )
}

// ── UI icons ──────────────────────────────────────────────────────────────────

/** Open book — Rulebooks */
export function BookIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 19V5a2 2 0 0 1 2-2h13" />
      <path d="M4 19a2 2 0 0 0 2 2h14V7H6a2 2 0 0 0-2 2" />
      <path d="M12 7v12M8 10h4M8 14h4" />
    </Svg>
  )
}

/** Cards — Tactics hand */
export function CardIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="4" y="4" width="10" height="14" rx="1" />
      <rect x="10" y="6" width="10" height="14" rx="1" />
    </Svg>
  )
}

/** Scroll — Warscroll */
export function ScrollIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M8 4H17a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8" />
      <path d="M8 4C6 4 5 5 5 6.5S6 9 6 9H8V4Z" />
      <path d="M8 20C6 20 5 19 5 17.5S6 15 6 15H8V20Z" />
      <path d="M9 9h7M9 12h7M9 15h5" />
    </Svg>
  )
}

/** Gryph-crow bird */
export function BirdIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M22 5L12 13 2 9" />
      <path d="M12 13V21" />
      <path d="M5 11L2 19h8" />
      <path d="M19 11L22 19h-8" />
    </Svg>
  )
}

/** Down arrow — In Reserve */
export function ReserveIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 3v15M6 13l6 6 6-6" />
      <path d="M4 21H20" />
    </Svg>
  )
}

/** Twist/cycle — Twist Card */
export function TwistIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M21 12a9 9 0 0 0-9-9 9.5 9.5 0 0 0-6.5 2.5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.5 9.5 0 0 0 6.5-2.5" />
      <path d="M3 12L6 9M3 12L6 15" />
      <path d="M21 12L18 9M21 12L18 15" />
    </Svg>
  )
}

/** Dice — roll indicator */
export function DiceIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.2" fill={color || 'currentColor'} stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.2" fill={color || 'currentColor'} stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill={color || 'currentColor'} stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.2" fill={color || 'currentColor'} stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.2" fill={color || 'currentColor'} stroke="none" />
    </Svg>
  )
}

/** X / Close */
export function CloseIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </Svg>
  )
}

/** Chevron right */
export function ChevronRightIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M9 6l6 6-6 6" />
    </Svg>
  )
}

/** Chevron left */
export function ChevronLeftIcon({ size = 16, color, className }) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M15 6l-6 6 6 6" />
    </Svg>
  )
}

/** Map of phase ID → icon component */
export const PHASE_ICONS = {
  'round-start': SunIcon,
  'hero':        CastleIcon,
  'movement':    BootIcon,
  'shooting':    BowArrowIcon,
  'charge':      ChargeIcon,
  'combat':      CrossedSwordsIcon,
  'end':         MoonIcon,
}
