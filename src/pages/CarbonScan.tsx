import { useState, useMemo } from 'react';
import { Car, Utensils, Zap, Trash2, RefreshCw, ChevronDown, Download } from 'lucide-react';
import { Lang, CarbonData } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import HudPanel from '../components/HudPanel';

interface Props { lang: Lang; }

const GRADES = {
  A: { label: 'OPTIMAL',   color: 'var(--green)',  status: 'ON TRACK — PARIS TARGET',   pColor: 'green'  as const },
  B: { label: 'GOOD',      color: '#88ff44',       status: 'BELOW BENCHMARK',            pColor: 'green'  as const },
  C: { label: 'AVERAGE',   color: '#ffdd00',       status: 'AT GLOBAL AVERAGE',          pColor: 'cyan'   as const },
  D: { label: 'HIGH',      color: 'var(--orange)', status: 'ABOVE GLOBAL BENCHMARK',     pColor: 'orange' as const },
  F: { label: 'CRITICAL',  color: '#ff3344',       status: 'CRITICAL — ACTION REQUIRED', pColor: 'orange' as const },
};

function getGrade(score: number): keyof typeof GRADES {
  if (score <= 3) return 'A';
  if (score <= 6) return 'B';
  if (score <= 10) return 'C';
  if (score <= 15) return 'D';
  return 'F';
}

const AI_RECS: Record<keyof typeof GRADES, string[]> = {
  A: ['> MAINTAIN GREEN HABITS — INSPIRE COMMUNITY', '> CONSIDER SOLAR FOR NET-ZERO', '> SHARE IMPACT REPORT'],
  B: ['> CYCLE/TRANSIT 2 MORE DAYS/WEEK', '> PLANT-BASED DIET 3 DAYS/WEEK → GRADE A', '> SMART PLUGS CUT STANDBY POWER 15%'],
  C: ['> TRANSPORT IS PRIMARY VECTOR — REDUCE', '> EV REDUCES FOOTPRINT 40–60%', '> GREEN ENERGY TARIFF AVAILABLE'],
  D: ['> URGENT: REDUCE FLIGHT/VEHICLE USAGE', '> MEAT REDUCTION SAVES 1.2T CO₂/YEAR', '> LED + SMART THERMOSTAT: 25% SAVED'],
  F: ['> CRITICAL: FOOTPRINT 3× GLOBAL TARGET', '> VEGAN DIET SAVES 1.5T CO₂/YEAR', '> SWITCH RENEWABLE PROVIDER NOW', '> WFH 3 DAYS/WEEK CUTS TRANSPORT 60%'],
};

const CATS = [
  { id: 'transport', en: 'Transport',   ta: 'போக்குவரத்து' },
  { id: 'food',      en: 'Food & Diet', ta: 'உணவு'          },
  { id: 'energy',    en: 'Home Energy', ta: 'ஆற்றல்'        },
  { id: 'waste',     en: 'Waste',       ta: 'கழிவு'         },
];

const ACTIVITY_MAP: Record<string, { en: string; ta: string }[]> = {
  transport: [
    { en: 'Car (km/day)',           ta: 'கார் (km/நாள்)'              },
    { en: 'Bus (km/day)',           ta: 'பேருந்து (km/நாள்)'          },
    { en: 'Motorcycle (km/day)',    ta: 'மோட்டார்சைக்கிள் (km/நாள்)' },
    { en: 'Flight (hrs/month)',     ta: 'விமானம் (hrs/மாதம்)'         },
  ],
  food: [
    { en: 'Meat (days/week)',       ta: 'இறைச்சி (நாட்கள்/வாரம்)'    },
    { en: 'Dairy (servings/day)',   ta: 'பால் (நாளைக்கு)'             },
    { en: 'Local produce (%)',      ta: 'உள்ளூர் உணவு (%)'            },
  ],
  energy: [
    { en: 'Electricity (kWh/month)',ta: 'மின்சாரம் (kWh/மாதம்)'      },
    { en: 'LPG (cylinders/month)',  ta: 'LPG (சிலிண்டர்/மாதம்)'      },
    { en: 'Solar % of total',       ta: 'சூரிய % மொத்தம்'            },
  ],
  waste: [
    { en: 'General waste (kg/week)',ta: 'பொது கழிவு (kg/வாரம்)'      },
    { en: 'Recycling rate (%)',     ta: 'மறுசுழற்சி விகிதம் (%)'     },
    { en: 'Composting (0=No,1=Yes)',ta: 'உரமாக்கல் (0=இல்லை,1=ஆம்)'  },
  ],
};

const SLIDERS = [
  { key: 'transport' as keyof CarbonData, en: 'Transport', ta: 'போக்குவரத்து', Icon: Car,      color: 'var(--cyan)'   },
  { key: 'food'      as keyof CarbonData, en: 'Food',      ta: 'உணவு',          Icon: Utensils, color: 'var(--green)'  },
  { key: 'energy'    as keyof CarbonData, en: 'Energy',    ta: 'ஆற்றல்',        Icon: Zap,      color: '#ffdd00'       },
  { key: 'waste'     as keyof CarbonData, en: 'Waste',     ta: 'கழிவு',         Icon: Trash2,   color: 'var(--orange)' },
];

/* ── Reactor Core SVG component ─────────────────────────── */
function ReactorCore({ score, grade }: { score: number; grade: keyof typeof GRADES }) {
  const g = GRADES[grade];
  const maxScore = 22;
  const pct = Math.min(score / maxScore, 1);
  const r = 82, cx = 110, cy = 110;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Status line */}
      <div className="w-full flex items-center gap-2 mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: g.color }} />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: g.color }} />
        </span>
        <span className="font-mono text-xs" style={{ color: g.color, letterSpacing: '0.12em' }}>
          REACTOR CORE &nbsp;&nbsp; STATUS: {g.status}
        </span>
      </div>

      {/* SVG gauge */}
      <div className="reactor-display">
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Outer tick marks */}
          {Array.from({ length: 40 }, (_, i) => {
            const a = (i / 40) * 2 * Math.PI - Math.PI / 2;
            const r1 = 107, r2 = i % 5 === 0 ? 96 : 102;
            return (
              <line key={i}
                x1={110 + r1 * Math.cos(a)} y1={110 + r1 * Math.sin(a)}
                x2={110 + r2 * Math.cos(a)} y2={110 + r2 * Math.sin(a)}
                stroke={g.color} strokeWidth={i % 5 === 0 ? 2.5 : 1} opacity={0.3}
              />
            );
          })}

          {/* Track arc */}
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke={`${g.color}18`} strokeWidth={12} />

          {/* Progress arc */}
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke={g.color} strokeWidth={12}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{
              transformOrigin: '110px 110px', transform: 'rotate(-90deg)',
              filter: `drop-shadow(0 0 10px ${g.color}) drop-shadow(0 0 20px ${g.color}66)`,
              transition: 'stroke-dasharray 0.8s ease',
            }}
          />

          {/* Inner rings */}
          <circle cx={cx} cy={cy} r={70} fill="none" stroke={g.color} strokeWidth={1} opacity={0.15} />
          <circle cx={cx} cy={cy} r={56} fill="none" stroke={g.color} strokeWidth={1} opacity={0.1}  />
          <circle cx={cx} cy={cy} r={40} fill="none" stroke={g.color} strokeWidth={0.5} opacity={0.08} />

          {/* Center fill (dark) */}
          <circle cx={cx} cy={cy} r={54} fill="rgba(2,12,22,0.85)" />
        </svg>

        {/* Center numeric display — overlaid */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="font-orb font-black"
            style={{
              fontSize: '2.8rem',
              color: g.color,
              textShadow: `0 0 12px ${g.color}, 0 0 30px ${g.color}99, 0 0 60px ${g.color}44`,
              lineHeight: 1,
              transition: 'all 0.5s ease',
            }}
          >
            {score.toFixed(2)}
          </div>
          <div className="font-mono mt-1" style={{ color: 'var(--text-dim)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>
            CO₂ TONS / YEAR DETECTED
          </div>
        </div>
      </div>

      {/* Grade badge */}
      <div className="mt-3 px-4 py-1.5 font-mono text-xs font-bold" style={{ border: `1px solid ${g.color}60`, background: `${g.color}12`, color: g.color, letterSpacing: '0.15em' }}>
        GRADE: {grade} — {g.label}
      </div>
    </div>
  );
}

export default function CarbonScan({ lang }: Props) {
  const [data, setData]         = useState<CarbonData>({ transport: 50, food: 40, energy: 45, waste: 20 });
  const [category, setCategory] = useState('transport');
  const [activity, setActivity] = useState(0);
  const [amount, setAmount]     = useState(50);

  const score = useMemo(() => {
    const { transport, food, energy, waste } = data;
    return Math.round(((transport/100)*8 + (food/100)*5 + (energy/100)*6 + (waste/100)*3) * 100) / 100;
  }, [data]);

  const grade   = getGrade(score);
  const g       = GRADES[grade];
  const monthly = (score * 83.3).toFixed(0);
  const benchPct = Math.max(0, 100 - (score / 4.7) * 100).toFixed(2);

  const submitField = () => {
    const pct = Math.min(100, Math.round((amount / 100) * 100));
    setData(d => ({ ...d, [category]: pct }));
  };

  return (
    <div style={{ background: 'var(--bg)', paddingTop: 96 }} className="min-h-screen pb-16 px-4">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Page header ── */}
        <ScrollReveal>
          <div className="mb-7">
            <div className="hud-label mb-2">[ ENVIRONMENTAL COMMAND CENTER — CARBONSCAN MODULE ]</div>
            <h1 className="font-orb font-black text-4xl anim-glitch" style={{ color: 'var(--cyan)', letterSpacing: '0.06em' }}>
              CARBONSCAN
            </h1>
            <div className="font-mono text-sm mt-1" style={{ color: 'var(--text-dim)' }}>
              {lang === 'en' ? 'Real-time carbon footprint analysis & AI recommendations' : 'நிகழ்நேர கார்பன் பகுப்பாய்வு'}
              <span className="anim-blink ml-1">_</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── TOP ROW: Mission Streak + Benchmark (exact reference layout) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <ScrollReveal>
            <HudPanel color="orange" className="p-5 flex items-center gap-5">
              <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center"
                style={{ border: '1px solid rgba(255,136,0,0.55)', background: 'rgba(30,12,0,0.7)', boxShadow: '0 0 16px rgba(255,136,0,0.25)' }}
              >
                <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 8px var(--orange))' }}>🔥</span>
              </div>
              <div>
                <div className="hud-label mb-1" style={{ color: 'rgba(255,136,0,0.6)' }}>MISSION STREAK</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-orb font-black text-5xl" style={{ color: 'var(--orange)', textShadow: 'var(--glow-text-orange)', lineHeight: 1 }}>12</span>
                  <span className="font-mono text-sm" style={{ color: 'rgba(255,136,0,0.6)' }}>DAYS</span>
                </div>
              </div>
              <div className="flex-1 ml-2">
                <div className="hud-track">
                  <div className="hud-fill hud-fill-orange" style={{ width: '40%' }} />
                </div>
              </div>
            </HudPanel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <HudPanel color="cyan" className="p-5 flex items-center gap-5">
              <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center"
                style={{ border: '1px solid rgba(0,245,255,0.45)', background: 'rgba(0,20,40,0.7)', boxShadow: '0 0 16px rgba(0,245,255,0.2)' }}
              >
                <span className="text-2xl" style={{ filter: 'drop-shadow(0 0 8px var(--cyan))' }}>📉</span>
              </div>
              <div className="flex-1">
                <div className="hud-label mb-1" style={{ color: 'var(--text-label)' }}>EMISSIONS VS GLOBAL BENCHMARK</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-orb font-black" style={{ fontSize: '2.5rem', color: 'var(--cyan)', textShadow: 'var(--glow-text-cyan)', lineHeight: 1 }}>
                    {benchPct}%
                  </span>
                  <span className="font-mono text-sm" style={{ color: 'var(--green)', textShadow: 'var(--glow-text-green)' }}>BELOW ↓</span>
                </div>
              </div>
            </HudPanel>
          </ScrollReveal>
        </div>

        {/* ── MAIN AREA: Report Field Data (left) + Reactor Core (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* LEFT — Report Field Data */}
          <ScrollReveal>
            <HudPanel color="green" className="p-6 h-full">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 flex-shrink-0" style={{ background: 'var(--green)', boxShadow: '0 0 6px var(--green)' }} />
                <span className="font-orb font-bold text-lg" style={{ color: 'var(--text-bright)', letterSpacing: '0.08em' }}>
                  {lang === 'en' ? 'REPORT FIELD DATA' : 'தரவு அறிக்கை'}
                </span>
              </div>

              {/* Category */}
              <div className="mb-4">
                <div className="hud-label mb-2">{lang === 'en' ? 'CATEGORY' : 'வகை'}</div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={e => { setCategory(e.target.value); setActivity(0); }}
                    className="hud-select"
                    style={{ borderColor: 'rgba(0,255,136,0.32)' }}
                  >
                    {CATS.map(c => (
                      <option key={c.id} value={c.id}>{lang === 'en' ? c.en : c.ta}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--green)' }} />
                </div>
              </div>

              {/* Activity */}
              <div className="mb-4">
                <div className="hud-label mb-2">{lang === 'en' ? 'ACTIVITY TYPE' : 'செயல் வகை'}</div>
                <div className="relative">
                  <select
                    value={activity}
                    onChange={e => setActivity(+e.target.value)}
                    className="hud-select"
                    style={{ borderColor: 'rgba(0,255,136,0.32)' }}
                  >
                    {(ACTIVITY_MAP[category] || []).map((a, i) => (
                      <option key={i} value={i}>{lang === 'en' ? a.en : a.ta}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--green)' }} />
                </div>
              </div>

              {/* Amount */}
              <div className="mb-5">
                <div className="hud-label mb-2 flex justify-between">
                  <span>{lang === 'en' ? 'AMOUNT' : 'அளவு'}</span>
                  <span style={{ color: 'var(--green)' }}>{amount}</span>
                </div>
                <input
                  type="range" min={0} max={200} value={amount}
                  onChange={e => setAmount(+e.target.value)}
                  className="w-full mb-2"
                  style={{ accentColor: 'var(--green)' }}
                />
                <div className="hud-track">
                  <div className="hud-fill hud-fill-green" style={{ width: `${Math.min((amount / 200) * 100, 100)}%` }} />
                </div>
              </div>

              <button onClick={submitField} className="btn-hud btn-hud-green w-full flex items-center justify-center gap-2 mb-5">
                ▶ {lang === 'en' ? 'SUBMIT FIELD DATA' : 'தரவு சமர்ப்பி'}
              </button>

              <hr className="hud-hr-green mb-5" />

              {/* Manual sliders */}
              <div className="hud-label mb-3">{lang === 'en' ? 'MANUAL OVERRIDE — EMISSION LEVELS' : 'கைமுறை கட்டுப்பாடு'}</div>
              <div className="space-y-3.5">
                {SLIDERS.map(({ key, en, ta, Icon, color }) => (
                  <div key={key} className="flex items-center gap-3">
                    <Icon size={13} style={{ color, flexShrink: 0 }} />
                    <span className="font-mono text-xs w-20 flex-shrink-0" style={{ color: 'var(--text-mid)' }}>
                      {lang === 'en' ? en : ta}
                    </span>
                    <div className="flex-1 hud-track">
                      <div className="hud-fill" style={{ width: `${data[key]}%`, background: color, boxShadow: `0 0 6px ${color}80` }} />
                    </div>
                    <input
                      type="range" min={0} max={100} value={data[key]}
                      onChange={e => setData(d => ({ ...d, [key]: +e.target.value }))}
                      className="w-16 flex-shrink-0"
                      style={{ accentColor: color }}
                    />
                    <span className="font-mono text-xs w-7 text-right flex-shrink-0" style={{ color }}>{data[key]}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setData({ transport: 50, food: 40, energy: 45, waste: 20 })}
                className="btn-hud mt-5 w-full flex items-center justify-center gap-2 text-xs"
              >
                <RefreshCw size={12} /> {lang === 'en' ? 'RESET TO DEFAULT' : 'மீட்டமை'}
              </button>
            </HudPanel>
          </ScrollReveal>

          {/* RIGHT — Reactor Core */}
          <ScrollReveal delay={100}>
            <HudPanel color="cyan" className="p-6 flex flex-col h-full" scanLine>
              <ReactorCore score={score} grade={grade} />

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="p-4 text-center" style={{ border: '1px solid rgba(0,245,255,0.18)', background: 'rgba(0,245,255,0.03)' }}>
                  <div className="hud-label mb-1">{lang === 'en' ? 'MONTHLY' : 'மாதாந்திர'}</div>
                  <div className="font-orb font-bold text-xl" style={{ color: 'var(--cyan)' }}>
                    {monthly} <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>kg</span>
                  </div>
                </div>
                <div className="p-4 text-center" style={{ border: '1px solid rgba(0,245,255,0.18)', background: 'rgba(0,245,255,0.03)' }}>
                  <div className="hud-label mb-1">{lang === 'en' ? 'YEARLY' : 'ஆண்டு'}</div>
                  <div className="font-orb font-bold text-xl" style={{ color: 'var(--orange)' }}>
                    {score.toFixed(1)} <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>t CO₂</span>
                  </div>
                </div>
              </div>

              {/* Breakdown bar */}
              <div className="mt-4">
                <div className="hud-label mb-2">{lang === 'en' ? 'EMISSION BREAKDOWN' : 'வெளியீட்டு பகுப்பாய்வு'}</div>
                <div className="flex h-3.5 gap-0.5" style={{ border: '1px solid rgba(0,200,240,0.12)' }}>
                  {SLIDERS.map(({ key, color }) => {
                    const total = SLIDERS.reduce((s, sl) => s + data[sl.key], 0) || 1;
                    return (
                      <div key={key} style={{ flex: data[key] / total, background: color, boxShadow: `0 0 6px ${color}70`, transition: 'flex 0.4s ease' }} />
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                  {SLIDERS.map(({ key, en, ta, color }) => (
                    <div key={key} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 flex-shrink-0" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
                      <span className="font-mono flex-1" style={{ color: 'var(--text-dim)', fontSize: '0.62rem' }}>{lang === 'en' ? en : ta}</span>
                      <span className="font-mono" style={{ color, fontSize: '0.62rem' }}>{data[key]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </HudPanel>
          </ScrollReveal>
        </div>

        {/* ── AI Recommendations ── */}
        <ScrollReveal>
          <HudPanel color="green" className="p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: '1.1rem' }}>🤖</span>
              <span className="font-mono text-xs" style={{ color: 'var(--green)', letterSpacing: '0.15em' }}>
                GAIA AI — TACTICAL RECOMMENDATIONS — GRADE {grade}: {g.label}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {AI_RECS[grade].map((rec, i) => (
                <div key={i} className="flex items-start gap-2 font-mono text-sm" style={{ color: 'var(--green)' }}>
                  <span className="font-mono text-xs flex-shrink-0 mt-0.5" style={{ color: 'var(--text-dim)' }}>{String(i+1).padStart(2,'0')}.</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </HudPanel>
        </ScrollReveal>

        <ScrollReveal>
          <button className="btn-hud btn-hud-green w-full flex items-center justify-center gap-2 py-3">
            <Download size={14} />
            {lang === 'en' ? 'DOWNLOAD ENVIRONMENTAL HEALTH REPORT' : 'சுற்றுச்சூழல் ஆரோக்கிய அறிக்கை பதிவிறக்கு'}
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
