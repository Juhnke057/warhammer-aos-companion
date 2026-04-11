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

        {/* Abhorrant Archregent — crowned vampire with bat wings spread */}
        <symbol id="unit-icon-abhorrant-archregent" viewBox="0 0 24 24">
          <path d="M12 7 C11 7 10 8 10 9.5 C10 11 11 12 12 12 C13 12 14 11 14 9.5 C14 8 13 7 12 7Z" fill="currentColor"/>
          <path d="M12 12 L10 18 L12 20 L14 18 Z" fill="currentColor"/>
          <path d="M10 13 L7 15 L5 14 L4 11 L6 9 L8 10Z" fill="currentColor" opacity="0.8"/>
          <path d="M14 13 L17 15 L19 14 L20 11 L18 9 L16 10Z" fill="currentColor" opacity="0.8"/>
          <path d="M9 7 L10 5 L12 4 L14 5 L15 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M10 5 L10 3 M12 4 L12 2 M14 5 L14 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </symbol>

        {/* Varghulf Courtier — bestial hunched bat-beast with claws */}
        <symbol id="unit-icon-varghulf-courtier" viewBox="0 0 24 24">
          <path d="M12 11 C9 11 7 13 7 15 C7 17 9 19 12 19 C15 19 17 17 17 15 C17 13 15 11 12 11Z" fill="currentColor"/>
          <path d="M7 15 L3 12 L2 9 L5 8 L7 11Z" fill="currentColor" opacity="0.75"/>
          <path d="M17 15 L21 12 L22 9 L19 8 L17 11Z" fill="currentColor" opacity="0.75"/>
          <path d="M9 11 L7 7 L9 5 L11 8Z" fill="currentColor" opacity="0.6"/>
          <path d="M15 11 L17 7 L15 5 L13 8Z" fill="currentColor" opacity="0.6"/>
          <circle cx="10" cy="14" r="1.2" fill="white" opacity="0.9"/>
          <circle cx="14" cy="14" r="1.2" fill="white" opacity="0.9"/>
          <path d="M6 19 L5 22 M10 20 L10 22 M14 20 L14 22 M18 19 L19 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </symbol>

        {/* Cryptguard — armored skeleton with spear and kite shield */}
        <symbol id="unit-icon-cryptguard" viewBox="0 0 24 24">
          <rect x="11" y="3" width="2" height="14" rx="1" fill="currentColor"/>
          <path d="M11 3 L12 1 L13 3Z" fill="currentColor"/>
          <path d="M5 8 L5 16 L8.5 20 L12 16 L12 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M5 12 L12 12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
          <path d="M8.5 8 L8.5 20" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
          <circle cx="17" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M15 7 L19 7 M17 5 L17 9" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        </symbol>

        {/* Morbheg Knights — undead cavalry with lance couched */}
        <symbol id="unit-icon-morbheg-knights" viewBox="0 0 24 24">
          <ellipse cx="11" cy="15" rx="7" ry="3.5" fill="currentColor" opacity="0.85"/>
          <path d="M4 15 L3 19 M7 17 L7 21 M15 17 L15 21 M18 15 L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="11" cy="9" r="3" fill="currentColor"/>
          <path d="M11 8 L9 6 L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 10 L20 6 L22 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M20 6 L21 8 L22 5 L19 5Z" fill="currentColor"/>
        </symbol>

        {/* ── Skaven ──────────────────────────────────────────────────────── */}

        {/* Clawlord on Gnaw-beast — rat lord atop fanged beast, halberd raised */}
        <symbol id="unit-icon-clawlord" viewBox="0 0 24 24">
          <path d="M5 14 C5 12 7 10 10 10 C13 10 15 12 15 14 C15 17 12 19 10 19 C7 19 5 17 5 14Z" fill="currentColor" opacity="0.85"/>
          <path d="M3 18 L5 15 M7 19 L7 22 M13 19 L13 22 M15 17 L17 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M15 14 L18 14 L20 12 L19 9 L17 10 L16 13Z" fill="currentColor" opacity="0.7"/>
          <circle cx="10" cy="7" r="2.5" fill="currentColor"/>
          <path d="M8 6 L6 4 M10 5 L10 3 M12 6 L14 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M12 9 L17 4 L18 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M16 3 L19 2 L18 5Z" fill="currentColor"/>
        </symbol>

        {/* Grey Seer — robed rat with tall pointed hat and warpstone staff */}
        <symbol id="unit-icon-grey-seer" viewBox="0 0 24 24">
          <path d="M12 3 L10 8 L14 8 Z" fill="currentColor"/>
          <path d="M10 8 L9 12 L15 12 L14 8Z" fill="currentColor" opacity="0.8"/>
          <circle cx="12" cy="5" r="1" fill="currentColor" opacity="0.5"/>
          <path d="M9 12 L8 20 L16 20 L15 12Z" fill="currentColor" opacity="0.75"/>
          <path d="M6 13 L8 12 M18 13 L16 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
          <path d="M5 11 L4 20 L6 20 L6 11Z" fill="currentColor" opacity="0.7"/>
          <path d="M4 10 L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="4" cy="9" r="1.5" fill="currentColor" opacity="0.9"/>
          <path d="M3 8 L5 8 M4 7 L4 9" stroke="white" strokeWidth="0.6" opacity="0.7"/>
        </symbol>

        {/* Warlock Engineer — rat with mechanical backpack and warplock musket */}
        <symbol id="unit-icon-warlock-engineer" viewBox="0 0 24 24">
          <circle cx="10" cy="7" r="2.5" fill="currentColor"/>
          <path d="M8 9 L7 20 L13 20 L12 9Z" fill="currentColor" opacity="0.8"/>
          <path d="M12 10 L18 10 L19 12 L17 13 L15 12 L13 11Z" fill="currentColor" opacity="0.9"/>
          <path d="M19 10 L22 9 L22 11 L19 12Z" fill="currentColor"/>
          <path d="M13 10 L14 7 L16 6 L17 8 L16 10" fill="none" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="15" cy="7" r="1.5" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M15 6 L15 3 M14 7 L12 5 M16 7 L18 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
          <path d="M7 13 L5 13 L5 17 L7 17" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        </symbol>

        {/* Clanrats (unit 1) — scrawny rat with rusty blade, hunched posture */}
        <symbol id="unit-icon-clanrats-1" viewBox="0 0 24 24">
          <circle cx="9" cy="7" r="2.5" fill="currentColor"/>
          <path d="M8 4 L7 2 M10 5 L12 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M7 9 L6 17 L9 17 L10 13 L11 17 L14 17 L12 9Z" fill="currentColor" opacity="0.8"/>
          <path d="M14 9 L18 5 L19 6 L16 10 L14 11Z" fill="currentColor" opacity="0.9"/>
          <path d="M18 5 L20 3 L21 4 L19 6Z" fill="currentColor"/>
          <path d="M6 17 L4 19 L3 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        </symbol>

        {/* Clanrats (unit 2) — rat with blade + round shield (distinct) */}
        <symbol id="unit-icon-clanrats-2" viewBox="0 0 24 24">
          <circle cx="10" cy="7" r="2.5" fill="currentColor"/>
          <path d="M9 4 L8 2 M11 5 L13 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M8 9 L7 17 L10 17 L11 13 L12 17 L15 17 L13 9Z" fill="currentColor" opacity="0.8"/>
          <path d="M6 10 L4 10 L4 15 L6 15 L7 14 L7 11Z" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5 12 L7 12" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
          <path d="M13 9 L17 7 L18 8 L15 11 L13 11Z" fill="currentColor" opacity="0.85"/>
          <path d="M17 7 L19 5 L20 6 L18 8Z" fill="currentColor"/>
        </symbol>

        {/* Rat Ogors — hulking mutant with gun-arm and blade-arm */}
        <symbol id="unit-icon-rat-ogors" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="3.5" fill="currentColor"/>
          <path d="M10 5 L8 3 M12 4 L12 2 M14 5 L16 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M8 9 L6 20 L10 20 L12 14 L14 20 L18 20 L16 9Z" fill="currentColor" opacity="0.9"/>
          <path d="M8 10 L4 8 L3 10 L4 14 L7 13Z" fill="currentColor" opacity="0.85"/>
          <path d="M3 10 L1 9 L1 11 L3 12Z" fill="currentColor"/>
          <path d="M16 10 L20 9 L21 11 L20 13 L17 12Z" fill="currentColor" opacity="0.9"/>
          <path d="M20 9 L23 9 L23 12 L21 11Z" fill="currentColor"/>
        </symbol>

        {/* ── Stormcast ───────────────────────────────────────────────────── */}

        {/* Yndrasta — angel-warrior descending with spear, large wings spread */}
        <symbol id="unit-icon-yndrasta" viewBox="0 0 24 24">
          <path d="M12 8 L3 13 L5 15 L12 11 L19 15 L21 13 Z" fill="currentColor" opacity="0.85"/>
          <path d="M12 11 L5 15 L4 18 L8 16 L12 14 L16 16 L20 18 L19 15Z" fill="currentColor" opacity="0.6"/>
          <circle cx="12" cy="6" r="2.5" fill="currentColor"/>
          <path d="M12 8 L12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 20 L13 20 L12 24" fill="currentColor"/>
          <path d="M12 3 L14 6 L12 8 L10 6Z" fill="currentColor" opacity="0.8"/>
        </symbol>

        {/* Knight-Vexillor — armored knight holding tall battle standard */}
        <symbol id="unit-icon-knight-vexillor" viewBox="0 0 24 24">
          <rect x="11" y="3" width="1.5" height="18" rx="0.75" fill="currentColor"/>
          <path d="M12.5 3 L12.5 10 L19 8 L12.5 6Z" fill="currentColor" opacity="0.85"/>
          <circle cx="9" cy="14" r="3" fill="currentColor" opacity="0.9"/>
          <path d="M6 17 L5 22 L9 21 L9 17Z" fill="currentColor" opacity="0.8"/>
          <path d="M12 17 L9 17 L8 21 L12 22Z" fill="currentColor" opacity="0.7"/>
          <path d="M7 13 L6 11 L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </symbol>

        {/* Annihilators — heavily armored warrior with massive hammer */}
        <symbol id="unit-icon-annihilators" viewBox="0 0 24 24">
          <rect x="9" y="3" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="8" y="5" width="8" height="4" rx="1" fill="currentColor" opacity="0.7"/>
          <path d="M12 9 L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <ellipse cx="12" cy="12" rx="5" ry="4" fill="currentColor" opacity="0.85"/>
          <path d="M7 17 L8 22 L16 22 L17 17Z" fill="currentColor" opacity="0.75"/>
          <path d="M8 13 L6 12 L5 14 L7 15Z" fill="currentColor" opacity="0.6"/>
          <path d="M16 13 L18 12 L19 14 L17 15Z" fill="currentColor" opacity="0.6"/>
        </symbol>

        {/* Vanquishers (unit 1) — warrior with two-handed greatsword raised */}
        <symbol id="unit-icon-vanquishers-1" viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="2.5" fill="currentColor"/>
          <path d="M10 9 L9 20 L15 20 L14 9Z" fill="currentColor" opacity="0.85"/>
          <path d="M9 12 L7 11 L7 15 L9 14Z" fill="currentColor" opacity="0.7"/>
          <path d="M15 12 L17 11 L17 15 L15 14Z" fill="currentColor" opacity="0.7"/>
          <path d="M14 8 L20 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 1 L22 2 L21 5 L18 3Z" fill="currentColor"/>
          <path d="M16 10 L18 8 L17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        </symbol>

        {/* Vanquishers (unit 2) — greatsword + kite shield combo */}
        <symbol id="unit-icon-vanquishers-2" viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="2.5" fill="currentColor"/>
          <path d="M10 9 L9 20 L15 20 L14 9Z" fill="currentColor" opacity="0.85"/>
          <path d="M6 10 L4 10 L4 16 L6 16 L8 14 L8 12Z" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5 13 L8 13" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
          <path d="M14 8 L19 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 2 L21 3 L20 6 L17 4Z" fill="currentColor"/>
        </symbol>

        {/* Stormstrike Chariot — gryph-charger bird pulling wheeled chariot */}
        <symbol id="unit-icon-stormstrike-chariot" viewBox="0 0 24 24">
          <path d="M3 13 C3 11 6 9 10 9 C13 9 15 11 15 13 C15 15 13 16 10 16 C7 16 3 15 3 13Z" fill="currentColor" opacity="0.85"/>
          <path d="M4 14 L2 17 M8 16 L8 19 M12 15 L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 9 L7 6 L9 4 L12 6 L14 9" fill="none" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M9 4 L8 2 L11 2 L12 4" fill="currentColor" opacity="0.7"/>
          <path d="M15 12 L18 12 L20 14 L20 18 L18 18 L16 16 L15 16Z" fill="currentColor" opacity="0.8"/>
          <circle cx="17" cy="19" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="20" cy="19" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
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
