import { useState } from 'react';
import { Lang } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import HudPanel from '../components/HudPanel';
import CountUp from '../components/CountUp';

interface Props { lang: Lang; }

const MONTHLY = [
  { month: 'JAN', v: 14.2, goal: 12 }, { month: 'FEB', v: 13.1, goal: 12 },
  { month: 'MAR', v: 12.8, goal: 12 }, { month: 'APR', v: 11.9, goal: 11 },
  { month: 'MAY', v: 11.2, goal: 11 }, { month: 'JUN', v: 10.8, goal: 10 },
  { month: 'JUL', v: 10.1, goal: 10 },
];

const BREAKDOWN = [
  { label: 'TRANSPORT', pct: 38, color: 'var(--cyan)',   icon: '🚗' },
  { label: 'ENERGY',    pct: 28, color: '#ffdd00',        icon: '⚡' },
  { label: 'FOOD',      pct: 22, color: 'var(--green)',   icon: '🥗' },
  { label: 'WASTE',     pct: 12, color: 'var(--orange)',  icon: '♻️' },
];

const WEEKLY_PF = [
  { d: 'MON', s: 85 },{ d: 'TUE', s: 72 },{ d: 'WED', s: 91 },
  { d: 'THU', s: 68 },{ d: 'FRI', s: 88 },{ d: 'SAT', s: 95 },{ d: 'SUN', s: 79 },
];

const LEADERBOARD = [
  { name: 'Priya Sharma',    city: 'Chennai',    xp: 8420, rank: '👑', grade: 'A' },
  { name: 'Arjun Kumar',     city: 'Coimbatore', xp: 7180, rank: '🏆', grade: 'A' },
  { name: 'Meena Devi',      city: 'Madurai',    xp: 6350, rank: '🌎', grade: 'A' },
  { name: 'Rahul Krishnan',  city: 'Salem',      xp: 5920, rank: '🌎', grade: 'B' },
  { name: 'Anjali Nair',     city: 'Trichy',     xp: 4840, rank: '🍃', grade: 'B' },
];

export default function ImpactSphere({ lang }: Props) {
  const [tab, setTab] = useState<'personal' | 'community'>('personal');
  const max = Math.max(...MONTHLY.map(d => d.v));

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="font-mono text-xs mb-2" style={{ color: 'var(--text-dim)', letterSpacing: '0.2em' }}>
              [ ANALYTICS MODULE — MISSION CONTROL ]
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="font-orb font-bold text-4xl" style={{ color: 'var(--cyan)', textShadow: 'var(--glow-cyan)' }}>
                IMPACTSPHERE
              </h1>
              <div className="flex items-center gap-1" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,245,255,0.15)' }}>
                {(['personal', 'community'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="px-5 py-2 font-mono text-xs uppercase transition-all"
                    style={{
                      color: tab === t ? 'var(--cyan)' : 'var(--text-dim)',
                      background: tab === t ? 'rgba(0,245,255,0.1)' : 'transparent',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {t === 'personal' ? (lang === 'en' ? 'PERSONAL' : 'தனிப்பட்ட') : (lang === 'en' ? 'COMMUNITY' : 'சமூகம்')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {tab === 'personal' ? (
          <>
            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {[
                { label: 'SUSTAINABILITY SCORE', v: 74,   suffix: '/100', color: 'var(--green)'  },
                { label: 'MONTHLY REDUCTION',    v: 28,   suffix: '%',    color: 'var(--cyan)'   },
                { label: 'GOALS COMPLETED',      v: 7,    suffix: '/10',  color: '#ffdd00'        },
                { label: 'DAY STREAK',           v: 12,   suffix: ' d',   color: 'var(--orange)' },
              ].map((s, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <HudPanel color={i === 0 ? 'green' : i === 1 ? 'cyan' : i === 3 ? 'orange' : 'cyan'} className="p-5 text-center">
                    <div className="font-orb font-bold text-2xl mb-1" style={{ color: s.color }}>
                      <CountUp end={s.v} suffix={s.suffix} duration={1500} />
                    </div>
                    <div className="font-mono text-xs" style={{ color: 'var(--text-dim)', letterSpacing: '0.1em', fontSize: '0.6rem' }}>{s.label}</div>
                  </HudPanel>
                </ScrollReveal>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              {/* Carbon Trend Chart */}
              <ScrollReveal>
                <HudPanel color="cyan" className="p-5">
                  <div className="font-mono text-xs mb-4" style={{ color: 'var(--cyan)', letterSpacing: '0.15em' }}>
                    [ CARBON TREND — MONTHLY ANALYSIS ]
                  </div>
                  <div className="flex items-end gap-1.5" style={{ height: 130 }}>
                    {MONTHLY.map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <div className="relative w-full flex items-end justify-center" style={{ height: 110 }}>
                          <div
                            className="absolute w-px"
                            style={{ bottom: `${(d.goal / max) * 110}px`, left: '50%', height: 2, width: '100%', background: 'rgba(0,255,136,0.3)' }}
                          />
                          <div
                            className="absolute bottom-0 w-full chart-bar"
                            style={{
                              height: `${(d.v / max) * 110}px`,
                              background: d.v <= d.goal
                                ? 'linear-gradient(to top, var(--green-dim), var(--green))'
                                : 'linear-gradient(to top, var(--orange-dim), var(--orange))',
                              boxShadow: `0 0 6px ${d.v <= d.goal ? 'rgba(0,255,136,0.5)' : 'rgba(255,107,0,0.5)'}`,
                              animationDelay: `${i * 0.08}s`,
                            }}
                          />
                        </div>
                        <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.5rem' }}>{d.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-3">
                    <span className="flex items-center gap-1.5 font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>
                      <span className="w-3 h-2 inline-block" style={{ background: 'var(--cyan)' }} /> ACTUAL
                    </span>
                    <span className="flex items-center gap-1.5 font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>
                      <span className="w-3 h-px inline-block border-t border-dashed" style={{ borderColor: 'var(--green)' }} /> TARGET
                    </span>
                  </div>
                </HudPanel>
              </ScrollReveal>

              {/* Breakdown */}
              <ScrollReveal delay={100}>
                <HudPanel color="green" className="p-5">
                  <div className="font-mono text-xs mb-4" style={{ color: 'var(--green)', letterSpacing: '0.15em' }}>
                    [ EMISSION BREAKDOWN — CATEGORY ANALYSIS ]
                  </div>
                  <div className="space-y-3">
                    {BREAKDOWN.map((b, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-lg w-6 text-center">{b.icon}</span>
                        <span className="font-mono text-xs w-24 flex-shrink-0" style={{ color: 'var(--text-mid)', letterSpacing: '0.08em' }}>{b.label}</span>
                        <div className="flex-1 hud-bar-track">
                          <div className="hud-bar-fill" style={{ width: `${b.pct}%`, background: b.color, boxShadow: `0 0 8px ${b.color}60` }} />
                        </div>
                        <span className="font-mono text-xs w-8 text-right flex-shrink-0" style={{ color: b.color }}>{b.pct}%</span>
                      </div>
                    ))}
                  </div>
                  <hr className="hud-divider mt-4" />
                  <div className="flex h-3 gap-0.5 mt-3">
                    {BREAKDOWN.map((b, i) => (
                      <div key={i} style={{ flex: b.pct, background: b.color, boxShadow: `0 0 4px ${b.color}60` }} />
                    ))}
                  </div>
                </HudPanel>
              </ScrollReveal>
            </div>

            {/* Weekly Heatmap */}
            <ScrollReveal>
              <HudPanel color="cyan" className="p-5 mb-5">
                <div className="font-mono text-xs mb-4" style={{ color: 'var(--cyan)', letterSpacing: '0.15em' }}>
                  [ THIS WEEK — ECO PERFORMANCE HEATMAP ]
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {WEEKLY_PF.map((d, i) => {
                    const c = d.s >= 80 ? 'var(--green)' : d.s >= 60 ? 'var(--cyan)' : 'var(--orange)';
                    return (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="relative flex items-end justify-center w-full" style={{ height: 70 }}>
                          <div
                            className="w-full chart-bar"
                            style={{
                              height: `${(d.s / 100) * 70}px`,
                              background: `linear-gradient(to top, ${c}60, ${c})`,
                              boxShadow: `0 0 8px ${c}50`,
                              animationDelay: `${i * 0.08}s`,
                            }}
                          />
                        </div>
                        <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>{d.d}</span>
                        <span className="font-mono text-xs" style={{ color: c }}>{d.s}</span>
                      </div>
                    );
                  })}
                </div>
              </HudPanel>
            </ScrollReveal>

            {/* Impact metrics */}
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🌳', label: 'TREES EQUIVALENT', value: '23', unit: 'saved this year'   },
                  { icon: '🚗', label: 'KM NOT DRIVEN',    value: '842', unit: 'via green choices' },
                  { icon: '💧', label: 'WATER SAVED',      value: '1,240', unit: 'liters vs avg'  },
                  { icon: '⚡', label: 'CLEAN ENERGY',     value: '340', unit: 'kWh renewable'    },
                ].map((s, i) => (
                  <HudPanel key={i} color="green" className="p-5 text-center">
                    <span className="text-3xl block mb-2" style={{ filter: 'drop-shadow(0 0 6px var(--green))' }}>{s.icon}</span>
                    <div className="font-orb font-bold text-xl" style={{ color: 'var(--green)' }}>{s.value}</div>
                    <div className="font-mono mt-1" style={{ color: 'var(--text-dim)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>{s.label}</div>
                    <div className="font-mono mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>{s.unit}</div>
                  </HudPanel>
                ))}
              </div>
            </ScrollReveal>
          </>
        ) : (
          /* Community */
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'ACTIVE MEMBERS',    value: 12847, suffix: '+', color: 'var(--cyan)'   },
                { label: 'CO₂ SAVED (T)',     value: 847,   suffix: 't', color: 'var(--green)'  },
                { label: 'CERTIFICATIONS',    value: 3241,  suffix: '',  color: '#ffdd00'        },
                { label: 'CHALLENGES DONE',   value: 28900, suffix: '+', color: 'var(--orange)' },
              ].map((s, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <HudPanel color={i === 0 ? 'cyan' : i === 1 ? 'green' : i === 3 ? 'orange' : 'cyan'} className="p-5 text-center">
                    <div className="font-orb font-bold text-2xl" style={{ color: s.color }}>
                      <CountUp end={s.value} suffix={s.suffix} duration={1800} />
                    </div>
                    <div className="font-mono mt-1" style={{ color: 'var(--text-dim)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>{s.label}</div>
                  </HudPanel>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <HudPanel color="cyan" className="p-5">
                <div className="font-mono text-xs mb-4" style={{ color: 'var(--cyan)', letterSpacing: '0.15em' }}>
                  [ TOP ECO OPERATIVES — LEADERBOARD ]
                </div>
                <div className="space-y-2">
                  {LEADERBOARD.map((u, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5" style={{ background: i === 0 ? 'rgba(0,245,255,0.05)' : 'rgba(0,245,255,0.02)', border: `1px solid ${i === 0 ? 'rgba(0,245,255,0.2)' : 'rgba(0,245,255,0.08)'}` }}>
                      <span className="font-orb font-bold text-lg w-6 text-center" style={{ color: 'var(--text-dim)' }}>{i + 1}</span>
                      <span className="text-xl">{u.rank}</span>
                      <div className="flex-1">
                        <div className="font-mono text-xs" style={{ color: 'var(--text-bright)' }}>{u.name}</div>
                        <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{u.city}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs font-bold" style={{ color: 'var(--green)' }}>{u.xp.toLocaleString()} XP</div>
                        <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>GRADE {u.grade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </HudPanel>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
