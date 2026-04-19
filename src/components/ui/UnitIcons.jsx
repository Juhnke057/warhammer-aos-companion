// ── Unit-specific SVG icons ───────────────────────────────────────────────────
// Each unit has a unique silhouette icon reflecting its identity.
// SvgDefs must be rendered once in App.jsx (hidden).
// Use UnitIcon to render any unit's icon by its data ID.

// Hidden SVG definitions — render once at app root
export function SvgDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', overflow: 'hidden', pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>

        {/* ── FEC ────────────────────────────────────────────────────────── */}

        {/* Abhorrant Archregent — bat silhouette, wings spread */}
        <symbol id="unit-icon-abhorrant-archregent" viewBox="0 0 24 24">
          <ellipse cx="12" cy="14" rx="2.5" ry="3" fill="currentColor"/>
          <path d="M10 13L3 9L2 13L6 16L10 15Z" fill="currentColor"/>
          <path d="M14 13L21 9L22 13L18 16L14 15Z" fill="currentColor"/>
          <path d="M10.5 11.5L9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M13.5 11.5L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </symbol>

        {/* Varghulf Courtier — wolf profile, ears and tail */}
        <symbol id="unit-icon-varghulf-courtier" viewBox="0 0 24 24">
          <path d="M8 13C8 11 10 9 13 9C16 9 19 11 19 14C19 16 17 18 14 18L8 18C6 18 5 16 8 13Z" fill="currentColor" opacity="0.85"/>
          <circle cx="6" cy="13" r="3.5" fill="currentColor"/>
          <path d="M3 14.5L2 16.5L5 16Z" fill="currentColor"/>
          <path d="M5 10.5L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7.5 10L8.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 18L8 22M12 18.5L12 22M15 18L15 22M18 17.5L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M19 13C21 11 22 9 21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </symbol>

        {/* Cryptguard — ghoul, hunched body with claw arms */}
        <symbol id="unit-icon-cryptguard" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3.5" fill="currentColor"/>
          <path d="M8 11C6 13 5 17 6 20H18C19 17 18 13 16 11C15 10 13 11 12 11C11 11 9 10 8 11Z" fill="currentColor" opacity="0.85"/>
          <path d="M9.5 10.5L8 13L12 12L16 13L14.5 10.5" fill="currentColor" opacity="0.7"/>
          <path d="M7 12L3 16L4 17.5L7 14.5Z" fill="currentColor"/>
          <path d="M17 12L21 16L20 17.5L17 14.5Z" fill="currentColor"/>
          <path d="M3 16L2 19M4 17.5L3 20.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M21 16L22 19M20 17.5L21 20.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </symbol>

        {/* Morbheg Knights — knight riding a horse */}
        <symbol id="unit-icon-morbheg-knights" viewBox="0 0 24 24">
          <ellipse cx="12" cy="17" rx="7" ry="3" fill="currentColor" opacity="0.9"/>
          <path d="M5 16C4 13 6 11 8 12L9 15" fill="currentColor"/>
          <path d="M6 19L5 23M9 20L9 23M15 20L15 23M18 19L19 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="9.5" y="11" width="5" height="5" rx="1" fill="currentColor" opacity="0.85"/>
          <circle cx="12" cy="8.5" r="2.5" fill="currentColor"/>
          <path d="M14 10L22 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M21 6L23 7L22 9Z" fill="currentColor"/>
        </symbol>

        {/* ── Skaven ──────────────────────────────────────────────────────── */}

        {/* Clawlord — knight riding a rat */}
        <symbol id="unit-icon-clawlord" viewBox="0 0 24 24">
          <ellipse cx="12" cy="17" rx="7" ry="2.8" fill="currentColor" opacity="0.9"/>
          <ellipse cx="5" cy="16" rx="3" ry="2.5" fill="currentColor"/>
          <path d="M2.5 17L2 18.5L4.5 18Z" fill="currentColor"/>
          <path d="M4.5 13.5L4 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6.5 13L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 16L1.5 15M3 17L1.5 18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M19 15.5C21 13.5 22 11.5 21 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M7.5 19.5L6.5 23M11 20L11 23M14.5 20L14.5 23M17.5 19.5L18.5 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="8.5" y="11" width="5" height="5" rx="1" fill="currentColor" opacity="0.85"/>
          <circle cx="11" cy="8.5" r="2.5" fill="currentColor"/>
          <path d="M13 10L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 4L21 5L20 8Z" fill="currentColor"/>
        </symbol>

        {/* Grey Seer — wizard, pointed hat, staff with crystal */}
        <symbol id="unit-icon-grey-seer" viewBox="0 0 24 24">
          <path d="M12 2L9 10H15Z" fill="currentColor"/>
          <path d="M8 10H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="12" cy="13" r="2.5" fill="currentColor" opacity="0.9"/>
          <path d="M9.5 15L8 22H16L14.5 15Z" fill="currentColor" opacity="0.85"/>
          <path d="M18 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 9L20 9L18 6Z" fill="currentColor"/>
        </symbol>

        {/* Warlock Engineer — cog/gear wheel */}
        <symbol id="unit-icon-warlock-engineer" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" fill="currentColor"/>
          <circle cx="12" cy="12" r="2" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5"/>
          <rect x="10.5" y="3.5" width="3" height="3.5" rx="0.5" fill="currentColor"/>
          <rect x="10.5" y="17" width="3" height="3.5" rx="0.5" fill="currentColor"/>
          <rect x="3.5" y="10.5" width="3.5" height="3" rx="0.5" fill="currentColor"/>
          <rect x="17" y="10.5" width="3.5" height="3" rx="0.5" fill="currentColor"/>
          <path d="M7.5 5.5L6 7L7.5 8.5L9 7Z" fill="currentColor"/>
          <path d="M16.5 5.5L18 7L16.5 8.5L15 7Z" fill="currentColor"/>
          <path d="M7.5 18.5L6 17L7.5 15.5L9 17Z" fill="currentColor"/>
          <path d="M16.5 18.5L18 17L16.5 15.5L15 17Z" fill="currentColor"/>
        </symbol>

        {/* Clanrats (unit 1) — kite shield with center boss */}
        <symbol id="unit-icon-clanrats-1" viewBox="0 0 24 24">
          <path d="M12 3L5 7V13C5 17 8 20 12 22C16 20 19 17 19 13V7L12 3Z" fill="currentColor"/>
          <path d="M12 3V22" stroke="white" strokeWidth="0.8" opacity="0.25"/>
          <path d="M5 12H19" stroke="white" strokeWidth="0.8" opacity="0.25"/>
          <circle cx="12" cy="12" r="2.5" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
        </symbol>

        {/* Clanrats (unit 2) — kite shield with clan mark */}
        <symbol id="unit-icon-clanrats-2" viewBox="0 0 24 24">
          <path d="M12 3L5 7V13C5 17 8 20 12 22C16 20 19 17 19 13V7L12 3Z" fill="currentColor" opacity="0.9"/>
          <path d="M12 3V22" stroke="white" strokeWidth="0.8" opacity="0.25"/>
          <path d="M8.5 9L15.5 15M15.5 9L8.5 15" stroke="white" strokeWidth="1" opacity="0.35"/>
        </symbol>

        {/* Rat Ogors — massive ogor bulk, huge arms, small head */}
        <symbol id="unit-icon-rat-ogors" viewBox="0 0 24 24">
          <rect x="6" y="10" width="12" height="10" rx="2" fill="currentColor"/>
          <path d="M6 11L2 13L2 18L5.5 18L6 16Z" fill="currentColor"/>
          <path d="M18 11L22 13L22 18L18.5 18L18 16Z" fill="currentColor"/>
          <circle cx="12" cy="7" r="4" fill="currentColor"/>
          <path d="M9 4L8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 4L16 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="2.5" cy="18" r="1.5" fill="currentColor"/>
          <circle cx="21.5" cy="18" r="1.5" fill="currentColor"/>
          <path d="M9 20L8 23M15 20L16 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </symbol>

        {/* ── Stormcast ───────────────────────────────────────────────────── */}

        {/* Yndrasta — winged knight, wings spread, spear raised */}
        <symbol id="unit-icon-yndrasta" viewBox="0 0 24 24">
          <path d="M12 10L3 14L5 16L12 12L19 16L21 14Z" fill="currentColor" opacity="0.85"/>
          <path d="M12 12L4 16L3 20L8 18L12 15L16 18L21 20L20 16Z" fill="currentColor" opacity="0.55"/>
          <rect x="10" y="11" width="4" height="7" rx="1" fill="currentColor"/>
          <circle cx="12" cy="8.5" r="2.5" fill="currentColor"/>
          <path d="M10 7.5L12 5L14 7.5" fill="currentColor"/>
          <path d="M12 5L12 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M10.5 4L12 2L13.5 4Z" fill="currentColor"/>
        </symbol>

        {/* Vanquishers (unit 1) — knight holding two-hand sword raised diagonally */}
        <symbol id="unit-icon-vanquishers-1" viewBox="0 0 24 24">
          <rect x="9" y="13" width="6" height="7" rx="1" fill="currentColor" opacity="0.85"/>
          <circle cx="12" cy="10.5" r="2.5" fill="currentColor"/>
          <path d="M7 19L17 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M9.5 15.5L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="7.5" cy="18.5" r="1.5" fill="currentColor"/>
          <path d="M10 13L8.5 10.5M14 13L15.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        </symbol>

        {/* Vanquishers (unit 2) — greatsword held upright, slight angle variation */}
        <symbol id="unit-icon-vanquishers-2" viewBox="0 0 24 24">
          <rect x="9" y="13" width="6" height="7" rx="1" fill="currentColor" opacity="0.85"/>
          <circle cx="12" cy="10.5" r="2.5" fill="currentColor"/>
          <path d="M10.5 4L10.5 8" stroke="white" strokeWidth="0.7" opacity="0.35"/>
          <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M10.5 15L14 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="6.5" cy="17.5" r="1.5" fill="currentColor"/>
          <path d="M10 13L8 11M14 13L16 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        </symbol>

        {/* Knight-Vexillor — knight holding tall banner pole with flag */}
        <symbol id="unit-icon-knight-vexillor" viewBox="0 0 24 24">
          <rect x="11.5" y="3" width="2" height="19" rx="1" fill="currentColor"/>
          <path d="M13.5 3L13.5 12L21 9.5L13.5 7Z" fill="currentColor" opacity="0.85"/>
          <rect x="7" y="14" width="6.5" height="7" rx="1" fill="currentColor" opacity="0.85"/>
          <circle cx="10.5" cy="11.5" r="2.5" fill="currentColor"/>
          <path d="M12.5 14L12.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
        </symbol>

        {/* Annihilators — knight with hammer in one hand, shield on the other */}
        <symbol id="unit-icon-annihilators" viewBox="0 0 24 24">
          <rect x="9" y="12" width="6" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
          <circle cx="12" cy="9.5" r="2.5" fill="currentColor"/>
          <path d="M5 10L5 17L8 20L11 17L11 10L5 10Z" fill="currentColor" opacity="0.85"/>
          <path d="M5 14L11 14" stroke="white" strokeWidth="0.7" opacity="0.3"/>
          <path d="M15 12L15 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="13.5" y="4" width="5" height="4" rx="1" fill="currentColor"/>
          <path d="M10 20L9 23M14 20L15 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </symbol>

        {/* Stormstrike Chariot — wheeled chariot with creature pulling */}
        <symbol id="unit-icon-stormstrike-chariot" viewBox="0 0 24 24">
          <rect x="13" y="9" width="9" height="6" rx="1" fill="currentColor" opacity="0.85"/>
          <circle cx="14.5" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M14.5 15L14.5 21M11.5 18L17.5 18" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
          <circle cx="20.5" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M20.5 15L20.5 21M17.5 18L23 18" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
          <ellipse cx="7" cy="13" rx="5" ry="2.5" fill="currentColor" opacity="0.85"/>
          <circle cx="3" cy="12" r="1.8" fill="currentColor"/>
          <path d="M4 15L3 20M7 15.5L7 20M10 15L10.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M13 13H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </symbol>

        {/* Lord-Vigilant — mounted commander on gryph-stalker with greataxe */}
        <symbol id="unit-icon-lord-vigilant" viewBox="0 0 24 24">
          <path d="M4 14 C4 12 7 10 11 10 C15 10 17 12 17 14 C17 17 14 19 11 19 C7 19 4 17 4 14Z" fill="currentColor" opacity="0.8"/>
          <path d="M3 17 L2 20 M7 19 L7 22 M15 19 L15 22 M18 16 L19 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M17 14 L20 12 L22 13 L21 16 L18 16Z" fill="currentColor" opacity="0.75"/>
          <circle cx="11" cy="7.5" r="2.5" fill="currentColor"/>
          <path d="M13 8 L16 4 L17 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14.5 3 L17 2 L18 5 L15.5 6Z" fill="currentColor"/>
          <path d="M9 9 L7 9 L6 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        </symbol>

        {/* Lord-Veritant — Stormcast inquisitor with lantern staff and gryph-crow */}
        <symbol id="unit-icon-lord-veritant" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2.5" fill="currentColor"/>
          <path d="M11 4 L9 2 L12 1 L15 2 L13 4Z" fill="currentColor" opacity="0.8"/>
          <path d="M10 8 L9 20 L15 20 L14 8Z" fill="currentColor" opacity="0.85"/>
          <path d="M9 12 L7 11 L6 13 L8 14Z" fill="currentColor" opacity="0.7"/>
          <path d="M5 10 L5 5 L7 5 L7 10Z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="4" y="3" width="4" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="6" cy="5" r="0.8" fill="currentColor" opacity="0.7"/>
          <path d="M14 11 L17 9 L19 10 L18 13 L16 13Z" fill="currentColor" opacity="0.65"/>
          <path d="M18 8 L20 6 L21 7 L20 9Z" fill="currentColor" opacity="0.5"/>
        </symbol>

        {/* Prosecutors — flying Stormcast warrior with javelins */}
        <symbol id="unit-icon-prosecutors" viewBox="0 0 24 24">
          <path d="M12 8 L4 12 L6 14 L12 11 L18 14 L20 12 Z" fill="currentColor" opacity="0.8"/>
          <path d="M12 11 L5 14 L5 17 L9 15 L12 13 L15 15 L19 17 L19 14Z" fill="currentColor" opacity="0.55"/>
          <circle cx="12" cy="6" r="2.5" fill="currentColor"/>
          <path d="M12 4 L10 2 L12 1 L14 2Z" fill="currentColor" opacity="0.8"/>
          <path d="M16 8 L21 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M20 3 L22 4 L21 6 L19 4Z" fill="currentColor"/>
          <path d="M8 8 L3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 3 L2 4 L3 6 L5 4Z" fill="currentColor"/>
        </symbol>

        {/* Liberators — shielded heavy infantry with warhammer */}
        <symbol id="unit-icon-liberators" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2.5" fill="currentColor"/>
          <path d="M12 4 L10 2 L12 1 L14 2Z" fill="currentColor" opacity="0.7"/>
          <path d="M10 8 L9 20 L15 20 L14 8Z" fill="currentColor" opacity="0.9"/>
          <path d="M5 9 L5 16 L8 19 L11 16 L11 9Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M5 13 L11 13" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
          <path d="M8 9 L8 19" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
          <path d="M14 9 L18 7 L19 9 L17 11 L15 10Z" fill="currentColor" opacity="0.85"/>
          <path d="M18 7 L20 5 L21 6 L19 9Z" fill="currentColor"/>
        </symbol>

      </defs>
    </svg>
  )
}

// Render a specific unit icon by its data ID
export function UnitIcon({ unitId, size = 24, color = 'currentColor', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ color, display: 'block', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={`#unit-icon-${unitId}`} />
    </svg>
  )
}

// Check if we have a custom icon for this unit
export function hasUnitIcon(unitId) {
  const KNOWN_IDS = new Set([
    'abhorrant-archregent', 'varghulf-courtier', 'cryptguard', 'morbheg-knights',
    'clawlord', 'grey-seer', 'warlock-engineer', 'clanrats-1', 'clanrats-2', 'rat-ogors',
    'yndrasta', 'knight-vexillor', 'annihilators', 'vanquishers-1', 'vanquishers-2',
    'stormstrike-chariot', 'lord-vigilant', 'lord-veritant', 'prosecutors', 'liberators',
  ])
  return KNOWN_IDS.has(unitId)
}
