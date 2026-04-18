import { useState } from 'react'
import Modal from './Modal'
import {
  MoveIcon, HealthIcon, ShieldIcon, ControlIcon, WardIcon,
  SwordIcon, CrossedSwordsIcon, BowArrowIcon, ChargeIcon,
  StarIcon, CrownIcon, CardIcon, TwistIcon, BookIcon,
  LightningIcon, DiceIcon, ScrollIcon,
} from './AosIcons'

// ── Shared colours ────────────────────────────────────────────────────────────
const GOLD   = '#d4a017'
const DIM    = '#888'
const TEXT   = '#ccc'
const BRIGHT = '#e8e4d8'

// ── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  { id: 'flow',      label: 'Game Flow',      color: '#c9a84c', Icon: StarIcon     },
  { id: 'stats',     label: 'Unit Stats',     color: '#5a8ac0', Icon: ScrollIcon   },
  { id: 'vp',        label: 'Objectives & VP',color: '#10b981', Icon: ControlIcon  },
  { id: 'combat',    label: 'Combat',         color: '#c06010', Icon: CrossedSwordsIcon },
  { id: 'abilities', label: 'Abilities',      color: '#9d7adb', Icon: LightningIcon },
  { id: 'weapons',   label: 'Weapon Rules',   color: '#e05050', Icon: SwordIcon    },
  { id: 'cards',     label: 'Cards',          color: '#4a9fc0', Icon: CardIcon     },
  { id: 'terrain',   label: 'Terrain',        color: '#7ab050', Icon: BookIcon     },
]

// ── Entry components ──────────────────────────────────────────────────────────

function Section({ title }) {
  return (
    <div style={{
      fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.18em',
      color: DIM, marginTop: 24, marginBottom: 10, paddingBottom: 5,
      borderBottom: '1px solid #ffffff12',
    }}>
      {title}
    </div>
  )
}

function Entry({ term, Icon, iconColor, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 5 }}>
        {Icon && <Icon size={17} color={iconColor ?? GOLD} />}
        <span style={{
          fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 15,
          color: BRIGHT,
        }}>
          {term}
        </span>
      </div>
      <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.7, paddingLeft: Icon ? 23 : 0 }}>
        {children}
      </p>
    </div>
  )
}

function Callout({ color = GOLD, children }) {
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 8, marginBottom: 18,
      background: color + '12',
      border: `1px solid ${color}30`,
      fontSize: 15, color: TEXT, lineHeight: 1.7,
    }}>
      {children}
    </div>
  )
}

// ── Tab content ───────────────────────────────────────────────────────────────

function TabGameFlow() {
  return (
    <div>
      <Callout color={GOLD}>
        A Spearhead game lasts <strong style={{ color: BRIGHT }}>4 battle rounds</strong>. Each round both players take a turn. The player with the most Victory Points at the end wins.
      </Callout>

      <Section title="Battle Structure" />
      <Entry term="Battle Round" Icon={StarIcon} iconColor="#c9a84c">
        The main unit of time in a game. A round starts with a <em>Start of Battle Round</em> sequence, then each player takes their full turn. There are 4 battle rounds in total.
      </Entry>
      <Entry term="Turn" Icon={StarIcon} iconColor="#c9a84c">
        Each player takes one turn per battle round. Your turn flows through a fixed sequence of phases: Hero → Movement → Shooting → Charge → Combat → End of Turn.
      </Entry>
      <Entry term="Priority Roll" Icon={DiceIcon} iconColor="#c9a84c">
        At the start of rounds 2, 3, and 4, both players roll a dice. The winner decides who goes first that round. In the first round, the Attacker chooses.
      </Entry>
      <Entry term="Seizing the Initiative" Icon={DiceIcon} iconColor="#c9a84c">
        If you win the Priority Roll and choose to go first when you went second last round, you <strong style={{ color: BRIGHT }}>do not draw Battle Tactic cards</strong> for that round — unless you're the Underdog and the VP gap is 5 or more.
      </Entry>
      <Entry term="Underdog" Icon={StarIcon} iconColor="#6366f1">
        The player with fewer Victory Points. The Underdog gets advantages from Twist cards. If VP are tied, there is no Underdog.
      </Entry>

      <Section title="Phases (in order)" />
      <Entry term="Start of Battle Round">
        Both players resolve any Start of Battle Round abilities. The Twist card is drawn here.
      </Entry>
      <Entry term="Hero Phase" Icon={CrownIcon} iconColor="#c9a84c">
        Use Hero abilities, cast spells, use prayers. Most special actions happen here.
      </Entry>
      <Entry term="Movement Phase" Icon={MoveIcon} iconColor="#5a8ac0">
        Move your units. You can Normal Move, Run (D6 bonus inches but can't shoot/charge), or Retreat (take D3 mortal damage to leave combat).
      </Entry>
      <Entry term="Shooting Phase" Icon={BowArrowIcon} iconColor="#4a8a4a">
        Fire ranged weapons at enemy units. You can't shoot if you ran or retreated this turn. Most ranged units can't shoot while in combat.
      </Entry>
      <Entry term="Charge Phase" Icon={ChargeIcon} iconColor="#aa2222">
        Declare a charge and roll 2D6. If the result is ≥ the distance to the target, you move up to that distance and must end within ½" of an enemy — you've charged!
      </Entry>
      <Entry term="Combat Phase" Icon={CrossedSwordsIcon} iconColor="#c06010">
        Players alternate picking units to Fight. Each fighting unit can Pile In (move up to 3" toward enemies) then makes its attacks. Both players fight — not just the one whose turn it is.
      </Entry>
      <Entry term="End of Turn">
        Score Victory Points, check Battle Tactics, then pass the turn to your opponent.
      </Entry>
    </div>
  )
}

function TabUnitStats() {
  return (
    <div>
      <Callout color="#5a8ac0">
        Every unit has a <strong style={{ color: BRIGHT }}>Warscroll</strong> — a rules card listing all its stats, weapons, and abilities. Here's what each number means.
      </Callout>

      <Section title="Profile Stats" />
      <Entry term="Move" Icon={MoveIcon} iconColor="#5a8ac0">
        How many inches the unit can travel in a Normal Move. A unit with Move 5" can move up to 5" per turn. Running adds D6 to this but restricts other actions.
      </Entry>
      <Entry term="Health" Icon={HealthIcon} iconColor="#e05050">
        How many damage points a model can absorb before it's slain. When a model accumulates damage equal to its Health value, it is removed. Multi-model units lose models one at a time.
      </Entry>
      <Entry term="Save" Icon={ShieldIcon} iconColor="#5a8ac0">
        The dice roll needed (on a D6) to deflect an attack after it wounds. Lower is better — a Save of 3+ means you need a 3, 4, 5, or 6. If the attack has Rend, subtract that from your roll.
      </Entry>
      <Entry term="Control" Icon={ControlIcon} iconColor="#10b981">
        How effectively this unit fights for objectives. When both sides contest an objective, the side with the higher total Control score controls it. Heroes usually have higher Control.
      </Entry>

      <Section title="Weapon Stats" />
      <Entry term="Attacks" Icon={DiceIcon} iconColor={GOLD}>
        The number of dice rolled for that weapon each time it attacks. "D6" means roll a dice and use the result. "2D6" means roll two dice and add them together.
      </Entry>
      <Entry term="Hit" Icon={SwordIcon} iconColor={GOLD}>
        The roll needed on each attack dice to score a hit. A Hit of 3+ means 3, 4, 5, or 6 register as hits. Misses are discarded.
      </Entry>
      <Entry term="Wound" Icon={HealthIcon} iconColor="#e05050">
        For each hit, roll again — this is the Wound roll. You need to equal or beat this number. Successful wounds pass through to the Save roll.
      </Entry>
      <Entry term="Rend" Icon={ShieldIcon} iconColor="#888">
        Rend reduces the enemy's Save roll. Rend 1 means the target rolls their save at -1. Rend 0 means no penalty. Higher Rend punches through heavier armour.
      </Entry>
      <Entry term="Damage" Icon={HealthIcon} iconColor="#e05050">
        How many damage points are inflicted for each wound that gets past the save. "D3" means roll a dice and halve the result (rounding up): so 1–2 = 1, 3–4 = 2, 5–6 = 3.
      </Entry>

      <Section title="Critical Hits" />
      <Entry term="Critical Hit" Icon={DiceIcon} iconColor={GOLD}>
        An <strong style={{ color: BRIGHT }}>unmodified roll of 6</strong> on a Hit roll is always a critical hit. Modifiers (like +1 to hit) do not make lower numbers critical. Critical hits may trigger special weapon abilities (see Weapon Rules tab).
      </Entry>
    </div>
  )
}

function TabVP() {
  return (
    <div>
      <Callout color="#10b981">
        You score Victory Points at the <strong style={{ color: BRIGHT }}>end of each of your turns</strong>. The player with the most VP after 4 battle rounds wins.
      </Callout>

      <Section title="Objectives" />
      <Entry term="Objective" Icon={ControlIcon} iconColor="#10b981">
        A marker on the battlefield. There are 5 named objectives: Dracothion (centre), Ignax and Behemat (Attacker's side), Vulcatrix and Nagendra (Defender's side). Controlling objectives is the main way to score VP.
      </Entry>
      <Entry term="Contesting an Objective" Icon={ControlIcon} iconColor="#10b981">
        A unit is contesting an objective if any of its models are within 3" of it. Both players can contest the same objective at the same time.
      </Entry>
      <Entry term="Controlling an Objective" Icon={ControlIcon} iconColor="#10b981">
        You control an objective if the total <strong style={{ color: BRIGHT }}>Control</strong> score of your contesting units is higher than your opponent's. If tied, no one controls it. If you're the only one contesting, you automatically control it.
      </Entry>
      <Entry term="Territory" Icon={ControlIcon} iconColor="#7ab050">
        Your half of the battlefield (your deployment zone). Some abilities and scoring rules reference "friendly territory" — this means your half.
      </Entry>

      <Section title="VP Scoring (end of your turn)" />
      <Callout color="#10b981">
        You can score up to <strong style={{ color: BRIGHT }}>3 standard VP</strong> per turn from objectives, plus bonus VP from Battle Tactics.
      </Callout>
      <Entry term="+1 VP — Control 1+ Objectives">
        Score 1 VP if you control at least one objective at the end of your turn.
      </Entry>
      <Entry term="+1 VP — Control 2+ Objectives">
        Score an additional VP if you control two or more objectives.
      </Entry>
      <Entry term="+1 VP — Control More Than Opponent">
        Score 1 VP if you control more objectives than your opponent.
      </Entry>
      <Entry term="+1 VP per completed Battle Tactic" Icon={CardIcon} iconColor="#4a9fc0">
        Each Battle Tactic card you complete earns 1 bonus VP. You can complete one per turn (see Cards tab).
      </Entry>

      <Section title="Underdog VP" />
      <Entry term="Twist Card Bonus VP" Icon={TwistIcon} iconColor="#cc3030">
        Some Twist cards give both players opportunities to score extra VP that round — such as destroying a Bloodmarked unit, or controlling specific objectives. Check the active Twist card each round.
      </Entry>
    </div>
  )
}

function TabCombat() {
  return (
    <div>
      <Section title="Being in Combat" />
      <Entry term="Combat Range" Icon={CrossedSwordsIcon} iconColor="#c06010">
        Every model has a combat range extending 3" horizontally in all directions. If an enemy model is within 3" of your model <em>and visible</em>, you are <strong style={{ color: BRIGHT }}>in combat</strong>.
      </Entry>
      <Entry term="In Combat" Icon={CrossedSwordsIcon} iconColor="#c06010">
        When a unit is in combat it cannot make Normal Moves or Run. It can Retreat (taking D3 mortal damage), and cannot use most Shooting abilities (unless the weapon has Shoot in Combat).
      </Entry>
      <Entry term="Visibility" Icon={BowArrowIcon} iconColor="#4a8a4a">
        A model is visible if you can draw a straight line through the air from any point on it to any point on the target without hitting terrain or other models. Friendly models never block each other's visibility.
      </Entry>

      <Section title="Fighting" />
      <Entry term="Pile-In Move" Icon={CrossedSwordsIcon} iconColor="#c06010">
        When you declare Fight, the unit may first move up to 3" toward the nearest enemy model. This is the pile-in — it's free and happens before attacks are made.
      </Entry>
      <Entry term="Attack Sequence" Icon={DiceIcon} iconColor={GOLD}>
        For each attack: roll to Hit → for each hit, roll to Wound → for each wound, opponent rolls Save → for each failed save, deal Damage. Simple!
      </Entry>
      <Entry term="Strike-First" Icon={CrossedSwordsIcon} iconColor="#e8c060">
        Some abilities grant Strike-First. Units with Strike-First fight at the start of the Combat Phase, before normal units. Very powerful — they may kill enemies before they can attack back.
      </Entry>
      <Entry term="Strike-Last" Icon={CrossedSwordsIcon} iconColor="#888">
        The opposite — units with Strike-Last fight after all other units. A penalty, usually applied by opponent reactions.
      </Entry>

      <Section title="Damage Types" />
      <Entry term="Normal Damage" Icon={HealthIcon} iconColor="#e05050">
        Damage from a successful attack. The target rolls their Save; if they fail, damage is allocated. When a model accumulates damage equal to its Health, it's slain.
      </Entry>
      <Entry term="Mortal Damage" Icon={SkullMiniIcon} iconColor="#e05050">
        Damage that <strong style={{ color: BRIGHT }}>bypasses the Save roll entirely</strong>. It is still reduced by Ward saves (see below), but armour provides no protection. Mortal damage is often written as "inflict D3 mortal damage."
      </Entry>
      <Entry term="Ward Save" Icon={WardIcon} iconColor="#818cf8">
        Some units have Ward (X+) on their warscroll. After any damage is allocated to the unit, roll a dice for each damage point. On the Ward value or higher, that damage is ignored. For example Ward (6+) means a 6 ignores a damage point.
      </Entry>
      <Entry term="Heal (X)" Icon={HealthIcon} iconColor="#10b981">
        Removes X damage points from a unit (roll if X is a dice value). This can bring slain models back if enough damage is healed off the last model that died.
      </Entry>
    </div>
  )
}

// Tiny inline skull icon for mortal damage
function SkullMiniIcon({ size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 11C4 6 7.6 2 12 2S20 6 20 11c0 3.5-1.8 6.3-4 7.3V21H8v-2.7C5.8 17.3 4 14.5 4 11Z"
        stroke={color} strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M8 21h8" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9.5" cy="11" r="1.5" fill={color} />
      <circle cx="14.5" cy="11" r="1.5" fill={color} />
    </svg>
  )
}

function TabAbilities() {
  return (
    <div>
      <Callout color="#9d7adb">
        <strong style={{ color: BRIGHT }}>Abilities</strong> are almost everything a unit or player can do — move, shoot, fight, use a special power. Every ability has Timing, Declare instructions, and an Effect.
      </Callout>

      <Section title="How Abilities Work" />
      <Entry term="Timing" Icon={LightningIcon} iconColor="#9d7adb">
        Each ability lists when it can be used: "Your Movement Phase", "Any Combat Phase", "Reaction", etc. You can only use it during that window.
      </Entry>
      <Entry term="Declare" Icon={LightningIcon} iconColor="#9d7adb">
        Before resolving an ability, you announce it and follow any Declare instructions (e.g. pick a target unit). This gives your opponent a chance to react.
      </Entry>
      <Entry term="Reactions" Icon={LightningIcon} iconColor="#9d7adb">
        After declaring an ability, both players can use Reaction abilities before the effect resolves. Starting with the active player, players alternate — once both pass consecutively, the window closes.
      </Entry>
      <Entry term="Passive Abilities" Icon={LightningIcon} iconColor="#888">
        Abilities with Passive timing are <strong style={{ color: BRIGHT }}>always active</strong> — they're never declared. Their effects apply automatically whenever their conditions are met.
      </Entry>

      <Section title="Keywords" />
      <Entry term="Keywords" Icon={ScrollIcon} iconColor="#9d7adb">
        Tags at the bottom of each ability (e.g. Core, Attack, Move). Keywords let abilities interact with each other — for example the Charge ability can't be used if you already used an ability with the Run keyword this turn.
      </Entry>
      <Entry term="Rules of One" Icon={LightningIcon} iconColor="#888">
        A unit can only use <strong style={{ color: BRIGHT }}>1 Core ability per phase</strong>. It also can't use the same ability more than once per phase, and can't be affected by the same passive ability twice simultaneously.
      </Entry>

      <Section title="Special Keywords" />
      <Entry term="Hero" Icon={CrownIcon} iconColor="#c9a84c">
        The Hero keyword marks a unit as a leader — usually a single powerful model. Many abilities specifically target or benefit Heroes. Your General is always a Hero.
      </Entry>
      <Entry term="Fly" Icon={BowArrowIcon} iconColor="#818cf8">
        Units with Fly can move over other units and terrain features freely. They are also unaffected by Cover and Obscuring terrain when being targeted.
      </Entry>
      <Entry term="Cavalry" Icon={ChargeIcon} iconColor="#c06010">
        Cavalry units are mounted on beasts or creatures. Some abilities reference this keyword.
      </Entry>
      <Entry term="Reinforcements" Icon={MoveIcon} iconColor="#10b981">
        Some units have the Reinforcements keyword. Once per game, if such a unit is destroyed, it can be brought back: place the replacement unit wholly within friendly territory, within 6" of the board edge, not in combat. The replacement can never itself be replaced.
      </Entry>
    </div>
  )
}

function TabWeapons() {
  return (
    <div>
      <Callout color="#e05050">
        These are the <strong style={{ color: BRIGHT }}>special rules</strong> listed in the Ability column of a weapon's stat line. Many units only have one or two, but they can dramatically change how the weapon performs.
      </Callout>

      <Section title="Critical Hit Abilities" />
      <Entry term="Crit (2 Hits)" Icon={SwordIcon} iconColor="#e05050">
        When this weapon scores a critical hit (unmodified 6 to hit), it counts as <strong style={{ color: BRIGHT }}>2 hits</strong> instead of 1. Make a Wound roll for each hit as normal.
      </Entry>
      <Entry term="Crit (Auto-wound)" Icon={SwordIcon} iconColor="#e05050">
        When this weapon scores a critical hit, the attack <strong style={{ color: BRIGHT }}>automatically wounds</strong> — skip the Wound roll. The opponent still rolls their Save.
      </Entry>
      <Entry term="Crit (Mortal)" Icon={SwordIcon} iconColor="#e05050">
        When this weapon scores a critical hit, it deals <strong style={{ color: BRIGHT }}>mortal damage</strong> equal to its Damage characteristic and the attack ends — no Wound or Save roll. This bypasses all armour.
      </Entry>

      <Section title="Conditional Bonuses" />
      <Entry term="Anti-X (+1 Rend)" Icon={ShieldIcon} iconColor="#888">
        Adds 1 to this weapon's Rend if the target has the specified keyword (e.g. Anti-Monster, Anti-Hero) or meets the condition. Multiple Anti- abilities stack — e.g. Anti-charge AND Anti-Hero gives +2 Rend against a Hero that charged.
      </Entry>
      <Entry term="Charge (+1 Damage)" Icon={ChargeIcon} iconColor="#aa2222">
        Adds 1 to this weapon's Damage if the <strong style={{ color: BRIGHT }}>attacking unit charged this turn</strong>. Encourages aggressive play.
      </Entry>

      <Section title="Other Weapon Rules" />
      <Entry term="Companion" Icon={SwordIcon} iconColor="#888">
        This weapon is <strong style={{ color: BRIGHT }}>not affected</strong> by friendly abilities that modify the Attacks characteristic or attack sequence. Usually applies to a mount's natural weapons — the mount fights independently of its rider's buffs.
      </Entry>
      <Entry term="Shoot in Combat" Icon={BowArrowIcon} iconColor="#4a8a4a">
        This ranged weapon can be used during the Shooting Phase even if the unit is <strong style={{ color: BRIGHT }}>in combat</strong>. Normally, being in combat prevents shooting.
      </Entry>
    </div>
  )
}

function TabCards() {
  return (
    <div>
      <Section title="Twist Cards" />
      <Entry term="Twist Card" Icon={TwistIcon} iconColor="#cc3030">
        Drawn at the start of each Battle Round. One card applies to the <strong style={{ color: BRIGHT }}>whole round</strong> for both players. Twists add unique scoring opportunities, buffs, or penalties. The realm you chose (Aqshy or Ghyran) determines which deck is used.
      </Entry>
      <Entry term="Aqshy Twists" Icon={TwistIcon} iconColor="#cc3030">
        Fire-themed twists — often involve destroying units, contested objectives, or aggressive play. Examples: Bloodmarked (hunt a specific unit), Ring of Fire (objective becomes dangerous), Let the Blood Flow (bonus VP for kills).
      </Entry>
      <Entry term="Ghyran Twists" Icon={TwistIcon} iconColor="#2a8a2a">
        Life-themed twists — often involve healing, control, and terrain. Examples: Grasping Vines (slow an enemy), Alarielle's Blessing (Ward or Heal), Take the Land (bonus VP for holding terrain).
      </Entry>

      <Section title="Battle Tactic Cards" />
      <Entry term="Battle Tactic Card" Icon={CardIcon} iconColor="#4a9fc0">
        At the start of each round, draw until you have 3 tactic cards in hand (you may discard any first). Each card has a <strong style={{ color: BRIGHT }}>scoring condition</strong>: complete it by the end of your turn to earn +1 VP. You can only complete one tactic per turn.
      </Entry>
      <Entry term="Drawing Tactics" Icon={CardIcon} iconColor="#4a9fc0">
        Round 1: Draw 3 cards. Rounds 2+: Optionally discard any cards, then draw back up to 3. <em>Exception:</em> if you Seized the Initiative, you draw no tactics that round (unless you're the Underdog with a 5+ VP gap).
      </Entry>
      <Entry term="Examples of Battle Tactics">
        <span style={{ color: TEXT }}>Hold Ground — more models on the large terrain feature in your territory than the enemy. | Raid — have a unit wholly in enemy territory, not in combat. | Cut Off the Head — slay the enemy general. | War of Attrition — destroy more enemy units than they destroy yours.</span>
      </Entry>

      <Section title="Command Cards (reverse of Battle Tactics)" />
      <Entry term="Command Card" Icon={CardIcon} iconColor="#4a9fc0">
        Each Battle Tactic card also has a <strong style={{ color: BRIGHT }}>Command ability</strong> on its back. Instead of scoring the tactic, you can use the Command ability when its timing window opens. You can't do both — use a card for its tactic OR its command.
      </Entry>
      <Entry term="Examples of Commands">
        <span style={{ color: TEXT }}>Forward to Victory — re-roll a charge roll (reaction to declaring a Charge). | Steel Defense — ignore Rend this phase (reaction to an attack). | Stand Guard — give a unit Strike-First (enemy Hero Phase). | Rise to the Challenge — Heal (D6) a friendly Hero.</span>
      </Entry>
    </div>
  )
}

function TabTerrain() {
  return (
    <div>
      <Callout color="#7ab050">
        Terrain features are placed during Pre-Battle setup. Each feature has keyword rules that affect units near or on them.
      </Callout>

      <Section title="Terrain Feature Types" />
      <Entry term="Large Terrain Feature" Icon={BookIcon} iconColor="#7ab050">
        Has three rules: <strong style={{ color: BRIGHT }}>Cover, Obscuring, and Unstable</strong>. Each player places 1 large feature in their territory during setup. Large terrain is often an imposing centrepiece that affects shooting across the board.
      </Entry>
      <Entry term="Small Terrain Feature" Icon={BookIcon} iconColor="#7ab050">
        Has two rules: <strong style={{ color: BRIGHT }}>Cover and Unstable</strong>. Each player places 1 small feature in their territory during setup.
      </Entry>

      <Section title="Terrain Rules" />
      <Entry term="Cover" Icon={ShieldIcon} iconColor="#7ab050">
        Subtract 1 from Hit rolls for ranged attacks targeting a unit that is <strong style={{ color: BRIGHT }}>behind or wholly on</strong> this terrain feature. <em>Exceptions:</em> the targeted unit charged this turn, or the unit has the Fly keyword.
      </Entry>
      <Entry term="Obscuring" Icon={BowArrowIcon} iconColor="#7ab050">
        A unit <strong style={{ color: BRIGHT }}>cannot be targeted by shooting attacks</strong> if it is behind or wholly on this terrain feature. <em>Exception:</em> the unit has the Fly keyword. Only large terrain features have Obscuring.
      </Entry>
      <Entry term="Unstable" Icon={BookIcon} iconColor="#888">
        Models can <em>move across</em> this terrain feature, but <strong style={{ color: BRIGHT }}>cannot be set up on or end any move</strong> on a part of the feature that is more than 1" tall. Units can still stand on low parts.
      </Entry>

      <Section title="Terrain Placement Rules" />
      <Entry term="Placement Restrictions">
        Terrain must be: wholly within friendly territory · more than 6" from all other terrain features · more than 3" from both long battlefield edges and enemy territory · not on top of an objective marker.
      </Entry>
      <Entry term="Defender Deploys First" Icon={BookIcon} iconColor="#7ab050">
        During Pre-Battle setup the Defender places their terrain first (1 large + 1 small), then the Attacker does the same.
      </Entry>
    </div>
  )
}

const TAB_CONTENT = {
  flow:      TabGameFlow,
  stats:     TabUnitStats,
  vp:        TabVP,
  combat:    TabCombat,
  abilities: TabAbilities,
  weapons:   TabWeapons,
  cards:     TabCards,
  terrain:   TabTerrain,
}

// ── Main HelpModal ────────────────────────────────────────────────────────────

export default function HelpModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState('flow')
  const tab   = TABS.find(t => t.id === activeTab)
  const Content = TAB_CONTENT[activeTab]

  return (
    <Modal open={open} onClose={onClose} title="Rules Glossary" accentColor={GOLD}>
      {/* Tab strip */}
      <div
        className="flex flex-wrap gap-1.5 mb-5"
        style={{
          paddingBottom: 14,
          borderBottom: '1px solid #ffffff12',
          marginTop: -4,
        }}
      >
        {TABS.map(t => {
          const active = t.id === activeTab
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-1.5 active:scale-95 transition-all"
              style={{
                padding: '7px 13px', borderRadius: 8,
                background: active ? t.color + '25' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${active ? t.color + '60' : 'rgba(255,255,255,0.08)'}`,
                color: active ? t.color : '#888',
                fontFamily: 'Cinzel, serif', fontWeight: 700,
                fontSize: 13, whiteSpace: 'nowrap',
              }}
            >
              <t.Icon size={14} color={active ? t.color : '#666'} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Active tab heading */}
      <div
        className="flex items-center gap-2 mb-4"
        style={{
          padding: '8px 12px', borderRadius: 8,
          background: tab.color + '15',
          border: `1px solid ${tab.color}30`,
        }}
      >
        <tab.Icon size={20} color={tab.color} />
        <span style={{
          fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 17,
          color: tab.color,
        }}>
          {tab.label}
        </span>
      </div>

      {/* Content */}
      <Content />
    </Modal>
  )
}
