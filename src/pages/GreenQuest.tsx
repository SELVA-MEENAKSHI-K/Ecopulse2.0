import { useState } from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import { Lang } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import HudPanel from '../components/HudPanel';

interface Props { lang: Lang; }

const RANKS = [
  { id: 'seedling',  label: 'SEEDLING',        icon: '🌱', minXP: 0,    color: 'var(--green)'  },
  { id: 'warrior',   label: 'GREEN WARRIOR',   icon: '🍃', minXP: 500,  color: '#44ff88'       },
  { id: 'guardian',  label: 'EARTH GUARDIAN',  icon: '🌎', minXP: 1500, color: 'var(--cyan)'   },
  { id: 'champion',  label: 'CLIMATE CHAMPION',icon: '🏆', minXP: 3000, color: '#ffdd00'       },
  { id: 'legend',    label: 'ECO LEGEND',      icon: '👑', minXP: 6000, color: 'var(--orange)' },
];

const DAILY = [
  { id: 1, en: 'Walk or Cycle Today',           ta: 'இன்று நடக்கவும் அல்லது சைக்கிள்',    xp: 50, icon: '🚲' },
  { id: 2, en: 'Eat One Plant-Based Meal',       ta: 'ஒரு தாவர-அடிப்படையிலான உணவு',         xp: 40, icon: '🥗' },
  { id: 3, en: 'Turn Off Unused Lights',         ta: 'பயன்படுத்தாத விளக்குகளை அணைக்கவும்', xp: 20, icon: '💡' },
  { id: 4, en: 'Use a Reusable Bag',             ta: 'மீண்டும் பயன்படுத்தக்கூடிய பை',       xp: 30, icon: '🛍️' },
  { id: 5, en: 'Compost Food Scraps',            ta: 'உணவு கழிவுகளை உரமாக்குங்கள்',         xp: 45, icon: '🌱' },
];

const WEEKLY = [
  { id: 1, en: '7-Day No Meat Challenge',        ta: '7 நாள் இறைச்சியற்ற சவால்', prog: 4, target: 7,  xp: 300, icon: '🥦', cat: 'DIET'      },
  { id: 2, en: 'Carbon Free Commute Week',       ta: 'கார்பன் இல்லாத பயண வாரம்', prog: 3, target: 5,  xp: 250, icon: '🚌', cat: 'TRANSPORT' },
  { id: 3, en: 'Energy Audit & Reduce 10%',      ta: 'ஆற்றல் தணிக்கை 10% குறைக்கவும்', prog: 1, target: 1, xp: 200, icon: '⚡', cat: 'ENERGY'    },
];

const ACHIEVEMENTS = [
  { title: 'FIRST STEP',    icon: '👣', desc: 'Complete first daily mission', xp: 50,  unlocked: true  },
  { title: 'PLANT POWERED', icon: '🌿', desc: '7 consecutive plant-based meals', xp: 150, unlocked: true  },
  { title: 'SOLAR BELIEVER',icon: '☀️', desc: 'Learn all renewable sources',  xp: 100, unlocked: true  },
  { title: 'CARBON CUTTER', icon: '✂️', desc: 'Reduce grade from D to C',     xp: 300, unlocked: false },
  { title: 'STREAK MASTER', icon: '🔥', desc: '30-day streak achieved',       xp: 500, unlocked: false },
  { title: 'COMMUNITY HERO',icon: '🤝', desc: 'Inspire 10 members',           xp: 400, unlocked: false },
  { title: 'ECO LEGEND',    icon: '👑', desc: 'Reach 6000 XP',               xp: 1000,unlocked: false },
  { title: 'REPORTER',      icon: '📊', desc: 'Share 5 impact reports',       xp: 200, unlocked: false },
];

const CURRENT_XP    = 920;
const CURRENT_RANK  = 1;
const STREAK        = 12;

function RankRing({ pct, color, xp }: { pct: number; color: string; xp: number }) {
  const r = 50, cx = 60, cy = 60;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${color}18`} strokeWidth={8} />
      <circle
        cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={`${circ * pct} ${circ}`} strokeLinecap="round"
        className="-rotate-90 origin-center"
        style={{ transformOrigin: '60px 60px', filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dasharray 1s ease' }}
      />
      <text x={cx} y={cy - 6} textAnchor="middle" fill={color} fontSize="16" fontFamily="Orbitron" fontWeight="700">{CURRENT_XP}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--text-dim)" fontSize="8" fontFamily="Share Tech Mono">XP</text>
    </svg>
  );
}

export default function GreenQuest({ lang }: Props) {
  const [done, setDone] = useState(new Set([1, 2]));

  const curRank  = RANKS[CURRENT_RANK];
  const nextRank = RANKS[CURRENT_RANK + 1];
  const pct = nextRank
    ? (CURRENT_XP - curRank.minXP) / (nextRank.minXP - curRank.minXP)
    : 1;

  const toggle = (id: number) =>
    setDone(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="font-mono text-xs mb-2" style={{ color: 'var(--text-dim)', letterSpacing: '0.2em' }}>
              [ GAMIFICATION MODULE — ECO MISSION CONTROL ]
            </div>
            <h1 className="font-orb font-bold text-4xl" style={{ color: 'var(--green)', textShadow: 'var(--glow-green)' }}>
              GREENQUEST
            </h1>
            <div className="font-mono text-sm mt-1" style={{ color: 'var(--text-dim)' }}>
              {lang === 'en' ? 'Complete missions, earn XP, protect the planet' : 'பணிகளை நிறைவு செய்யுங்கள், XP சம்பாதியுங்கள்'}
              <span className="blink ml-1">_</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Rank / XP / Streak row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Rank */}
          <ScrollReveal>
            <HudPanel color="green" className="p-5 text-center">
              <div className="font-mono text-xs mb-2" style={{ color: 'var(--text-dim)', letterSpacing: '0.15em' }}>ECO RANK</div>
              <span className="text-5xl block mb-2" style={{ filter: `drop-shadow(0 0 12px ${curRank.color})` }}>{curRank.icon}</span>
              <div className="font-orb font-bold text-lg" style={{ color: curRank.color }}>{curRank.label}</div>
              {nextRank && (
                <>
                  <div className="hud-bar-track mt-3 mb-1">
                    <div className="hud-bar-fill" style={{ width: `${pct * 100}%`, background: curRank.color, boxShadow: `0 0 8px ${curRank.color}80` }} />
                  </div>
                  <div className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                    {nextRank.minXP - CURRENT_XP} XP → {nextRank.icon} {nextRank.label}
                  </div>
                </>
              )}
            </HudPanel>
          </ScrollReveal>

          {/* XP Ring */}
          <ScrollReveal delay={80}>
            <HudPanel color="cyan" className="p-5 flex flex-col items-center">
              <div className="font-mono text-xs mb-2" style={{ color: 'var(--text-dim)', letterSpacing: '0.15em' }}>TOTAL XP</div>
              <RankRing pct={pct} color={curRank.color} xp={CURRENT_XP} />
              <div className="font-mono text-xs mt-1" style={{ color: 'var(--text-dim)' }}>LVL 4 — {done.size}/{DAILY.length} TODAY</div>
            </HudPanel>
          </ScrollReveal>

          {/* Streak */}
          <ScrollReveal delay={160}>
            <HudPanel color="orange" className="p-5 text-center">
              <div className="font-mono text-xs mb-2" style={{ color: 'var(--text-dim)', letterSpacing: '0.15em' }}>MISSION STREAK</div>
              <div className="text-5xl mb-1" style={{ filter: 'drop-shadow(0 0 12px var(--orange))' }}>🔥</div>
              <div className="font-orb font-bold text-4xl" style={{ color: 'var(--orange)', textShadow: 'var(--glow-orange)' }}>{STREAK}</div>
              <div className="font-mono text-xs mt-1" style={{ color: 'var(--text-dim)' }}>CONSECUTIVE DAYS</div>
              <div className="flex gap-1 mt-3 justify-center">
                {['M','T','W','T','F','S','S'].map((d, i) => (
                  <div key={i} className="w-7 h-7 font-mono text-xs flex items-center justify-center" style={{
                    background: i < 5 ? 'rgba(255,107,0,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${i < 5 ? 'rgba(255,107,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: i < 5 ? 'var(--orange)' : 'var(--text-dim)',
                  }}>{d}</div>
                ))}
              </div>
            </HudPanel>
          </ScrollReveal>
        </div>

        {/* Rank progression bar */}
        <ScrollReveal>
          <HudPanel color="cyan" className="p-5 mb-5">
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
              [ RANK PROGRESSION TIMELINE ]
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {RANKS.map((rank, i) => (
                <div key={rank.id} className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-center">
                    <div
                      className="w-12 h-12 flex items-center justify-center text-2xl mb-1"
                      style={{
                        border: `1px solid ${i <= CURRENT_RANK ? rank.color : 'rgba(255,255,255,0.06)'}`,
                        background: i <= CURRENT_RANK ? `${rank.color}12` : 'rgba(255,255,255,0.02)',
                        boxShadow: i === CURRENT_RANK ? `0 0 16px ${rank.color}50` : 'none',
                        opacity: i <= CURRENT_RANK ? 1 : 0.3,
                      }}
                    >
                      {rank.icon}
                    </div>
                    <div className="font-mono text-xs" style={{ color: i <= CURRENT_RANK ? rank.color : 'var(--text-dim)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
                      {rank.label}
                    </div>
                    <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.5rem' }}>{rank.minXP} XP</div>
                  </div>
                  {i < RANKS.length - 1 && (
                    <div className="w-10 h-px flex-shrink-0" style={{ background: i < CURRENT_RANK ? 'var(--cyan)' : 'rgba(255,255,255,0.08)' }} />
                  )}
                </div>
              ))}
            </div>
          </HudPanel>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Daily Missions */}
          <ScrollReveal>
            <HudPanel color="green" className="p-5">
              <div className="font-mono text-xs mb-4 flex items-center justify-between" style={{ color: 'var(--green)', letterSpacing: '0.15em' }}>
                <span>[ DAILY MISSIONS ]</span>
                <span style={{ color: 'var(--text-dim)' }}>{done.size}/{DAILY.length} COMPLETE</span>
              </div>
              <div className="space-y-2.5">
                {DAILY.map(m => {
                  const d = done.has(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggle(m.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200"
                      style={{
                        background: d ? 'rgba(0,255,136,0.06)' : 'rgba(0,255,136,0.02)',
                        border: `1px solid ${d ? 'rgba(0,255,136,0.35)' : 'rgba(0,255,136,0.1)'}`,
                      }}
                    >
                      <span className="text-xl">{m.icon}</span>
                      <span className="flex-1 font-mono text-xs" style={{ color: d ? 'var(--green)' : 'var(--text-mid)', textDecoration: d ? 'line-through' : 'none' }}>
                        {lang === 'en' ? m.en : m.ta}
                      </span>
                      <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--green)' }}>+{m.xp} XP</span>
                      {d
                        ? <CheckCircle size={14} style={{ color: 'var(--green)', flexShrink: 0 }} />
                        : <div className="w-3.5 h-3.5 flex-shrink-0" style={{ border: '1px solid rgba(0,255,136,0.3)' }} />
                      }
                    </button>
                  );
                })}
              </div>
            </HudPanel>
          </ScrollReveal>

          {/* Weekly Challenges */}
          <ScrollReveal delay={100}>
            <HudPanel color="cyan" className="p-5">
              <div className="font-mono text-xs mb-4" style={{ color: 'var(--cyan)', letterSpacing: '0.15em' }}>
                [ WEEKLY CHALLENGES ]
              </div>
              <div className="space-y-4">
                {WEEKLY.map(ch => {
                  const pct = ch.prog / ch.target;
                  return (
                    <div key={ch.id} className="p-3" style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.12)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{ch.icon}</span>
                        <div className="flex-1">
                          <div className="font-mono text-xs" style={{ color: 'var(--text-bright)' }}>{lang === 'en' ? ch.en : ch.ta}</div>
                          <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>{ch.cat}</div>
                        </div>
                        <span className="font-mono text-xs font-bold" style={{ color: '#ffdd00' }}>+{ch.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 hud-bar-track">
                          <div className="hud-bar-fill" style={{ width: `${pct * 100}%`, background: pct >= 1 ? 'var(--green)' : 'var(--cyan)', boxShadow: `0 0 6px ${pct >= 1 ? 'var(--green)' : 'var(--cyan)'}80` }} />
                        </div>
                        <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--text-dim)' }}>{ch.prog}/{ch.target}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </HudPanel>
          </ScrollReveal>
        </div>

        {/* Achievement Badges */}
        <ScrollReveal>
          <HudPanel color="orange" className="p-5">
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--orange)', letterSpacing: '0.15em' }}>
              [ ACHIEVEMENT BADGES — CLASSIFIED INTEL ]
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <div
                  key={i}
                  className="p-4 text-center transition-all duration-200"
                  style={{
                    background: a.unlocked ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${a.unlocked ? 'rgba(0,255,136,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    opacity: a.unlocked ? 1 : 0.45,
                  }}
                >
                  <span className="text-2xl block mb-1.5 relative">
                    {a.icon}
                    {!a.unlocked && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Lock size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
                      </span>
                    )}
                  </span>
                  <div className="font-mono text-xs font-bold mb-0.5" style={{ color: a.unlocked ? 'var(--green)' : 'var(--text-dim)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                    {a.title}
                  </div>
                  <div className="font-mono text-xs" style={{ color: 'var(--text-dim)', fontSize: '0.6rem', lineHeight: 1.4 }}>{a.desc}</div>
                  <div className="font-mono text-xs mt-1.5 font-bold" style={{ color: a.unlocked ? 'var(--green)' : 'var(--text-dim)' }}>
                    +{a.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </HudPanel>
        </ScrollReveal>
      </div>
    </div>
  );
}
