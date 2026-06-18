import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Zap, Thermometer, Wind, Droplets } from 'lucide-react';
import { Lang, Page } from '../types';
import CountUp from '../components/CountUp';
import ScrollReveal from '../components/ScrollReveal';
import HudPanel from '../components/HudPanel';

interface Props { lang: Lang; onNavigate: (p: Page) => void; }

const STATS = [
  { key: 'co2',  label: 'CO₂ PPM',        value: 421,  dec: 0, sfx: '',    color: 'orange' as const, icon: Wind,        max: 500  },
  { key: 'tmp',  label: 'TEMP RISE °C',    value: 1.21, dec: 2, sfx: '°',   color: 'orange' as const, icon: Thermometer, max: 2    },
  { key: 'sea',  label: 'SEA RISE MM/YR',  value: 3.7,  dec: 1, sfx: '',    color: 'cyan'   as const, icon: Droplets,    max: 6    },
  { key: 'ren',  label: 'RENEWABLE %',     value: 30,   dec: 0, sfx: '%',   color: 'green'  as const, icon: Zap,         max: 100  },
];

const TIPS = [
  { icon: '🚲', en: 'Cycle instead of drive — cut transport CO₂ by 67%.', ta: 'சைக்கிள் ஓட்டுங்கள் — CO₂ 67% குறையும்.' },
  { icon: '🥗', en: 'One meatless day/week saves 2.5 kg CO₂.', ta: 'ஒரு நாள் சாகாரம் 2.5 கிலோ CO₂ குறைக்கும்.' },
  { icon: '☀️', en: 'TN solar capacity: 14,000+ MW — India\'s highest.', ta: 'TN சூரிய திறன்: 14,000+ MW.' },
  { icon: '💧', en: 'Rainwater harvesting reduces municipal demand 40%.', ta: 'மழைநீர் சேகரிப்பு தேவையை 40% குறைக்கும்.' },
  { icon: '⚡', en: '500+ electric buses now operating in Chennai metro.', ta: 'சென்னையில் 500+ மின் பேருந்துகள்.' },
  { icon: '🌳', en: 'Green TN Mission planted 1.5M trees in 2024.', ta: 'பசுமை TN பணியில் 2024 இல் 15 லட்சம் மரங்கள்.' },
];

const colorText: Record<string, string> = {
  cyan: 'var(--cyan)', green: 'var(--green)', orange: 'var(--orange)',
};

export default function EarthLens({ lang, onNavigate }: Props) {
  const [angle, setAngle]   = useState(0);
  const [tipIdx, setTipIdx] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const step = (now: number) => {
      if (now - lastRef.current > 40) { setAngle(a => (a + 0.4) % 360); lastRef.current = now; }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const tip = TIPS[tipIdx];

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
        style={{ paddingTop: 120 }}>

        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(0,200,240,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,240,0.03) 1px,transparent 1px)`,
          backgroundSize: '70px 70px',
        }} />
        {/* Radial vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 35%, rgba(5,14,26,0.85) 100%)',
        }} />

        {/* Ambient top glow — reference has a subtle cyan/teal bloom at top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }} />

        {/* Hero label */}
        <div className="relative z-10 text-center mb-6">
          <div className="font-mono text-xs mb-5" style={{ color: 'var(--text-dim)', letterSpacing: '0.22em' }}>
            [ AI CLIMATE COMMAND CENTER — SYSTEM ONLINE ]
          </div>
          <h1
            className="font-orb font-black anim-title-glow mb-2"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 6.5rem)', color: 'var(--cyan)', letterSpacing: '0.07em', lineHeight: 1 }}
          >
            ECOPULSE 2.0
          </h1>
          <div className="font-mono text-lg mb-8" style={{ color: 'var(--green)', letterSpacing: '0.18em', textShadow: 'var(--glow-text-green)' }}>
            [ ENVIRONMENTAL INTELLIGENCE PLATFORM ]
            <span className="anim-blink ml-1">_</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onNavigate('carbonscan')} className="btn-hud btn-hud-green flex items-center gap-2 px-8 py-3 text-sm">
              ▶ {lang === 'en' ? 'SCAN CARBON' : 'கார்பன் ஸ்கேன்'}
            </button>
            <button onClick={() => onNavigate('gaiaai')} className="btn-hud flex items-center gap-2 px-8 py-3 text-sm">
              🤖 {lang === 'en' ? 'ASK GAIA AI' : 'கயா AI கேளுங்கள்'}
            </button>
          </div>
        </div>

        {/* Earth */}
        <div className="relative z-10 flex items-center justify-center mb-8" style={{ width: 300, height: 300 }}>
          {/* Outer rings */}
          <div className="absolute rounded-full anim-spin-fwd" style={{ inset: 0, border: '1px dashed rgba(0,245,255,0.12)' }} />
          <div className="absolute rounded-full anim-spin-rev" style={{ inset: 20, border: '1px dashed rgba(0,255,136,0.1)' }} />
          <div className="absolute rounded-full" style={{ inset: 40, border: '1px solid rgba(0,245,255,0.06)' }} />

          {/* Earth SVG */}
          <div className="anim-reactor">
            <svg viewBox="0 0 200 200" width="200" height="200">
              <defs>
                <radialGradient id="eg" cx="32%" cy="30%">
                  <stop offset="0%"   stopColor="#22ff88" />
                  <stop offset="50%"  stopColor="#008833" />
                  <stop offset="100%" stopColor="#002210" />
                </radialGradient>
                <radialGradient id="atm" cx="50%" cy="50%">
                  <stop offset="85%" stopColor="transparent" />
                  <stop offset="100%" stopColor="rgba(0,245,255,0.12)" />
                </radialGradient>
              </defs>
              {/* Ocean */}
              <circle cx="100" cy="100" r="96" fill="#041828" />
              {/* Continents */}
              <ellipse cx="76"  cy="70"  rx="30" ry="24" fill="url(#eg)"  opacity="0.92" />
              <ellipse cx="120" cy="86"  rx="23" ry="16" fill="#00bb55"   opacity="0.87" />
              <ellipse cx="86"  cy="126" rx="19" ry="13" fill="#009944"   opacity="0.82" />
              <ellipse cx="132" cy="62"  rx="15" ry="10" fill="#00cc66"   opacity="0.78" />
              <ellipse cx="54"  cy="114" rx="12" ry="8"  fill="#00aa44"   opacity="0.72" />
              <ellipse cx="148" cy="120" rx="10" ry="8"  fill="#008833"   opacity="0.65" />
              {/* Ice caps */}
              <ellipse cx="100" cy="10"  rx="26" ry="7"  fill="rgba(200,240,255,0.75)" />
              <ellipse cx="100" cy="190" rx="20" ry="6"  fill="rgba(200,240,255,0.65)" />
              {/* Atmosphere ring */}
              <circle cx="100" cy="100" r="96" fill="url(#atm)" />
              <circle cx="100" cy="100" r="97" fill="none" stroke="rgba(0,245,255,0.18)" strokeWidth="2" />
            </svg>
          </div>

          {/* Orbiting dots */}
          {[{ r: 106, speed: 8, color: 'var(--cyan)', size: 7 }, { r: 124, speed: 13, revs: true, color: 'var(--green)', size: 5 }].map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: dot.size, height: dot.size,
                background: dot.color,
                boxShadow: `0 0 8px ${dot.color}`,
                top: '50%', left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${dot.revs ? 360 - angle * 0.7 : angle}deg) translateX(${dot.r / 2}px) rotate(-${dot.revs ? 360 - angle * 0.7 : angle}deg) translate(-50%,-50%)`,
              }}
            />
          ))}
        </div>

        {/* Live tip */}
        <HudPanel color="green" className="w-full max-w-lg px-5 py-3 relative z-10">
          <div className="hud-label mb-1">[ ECO INTELLIGENCE FEED ]</div>
          <div className="font-mono text-sm" style={{ color: 'var(--green)' }}>
            <span className="mr-2">{tip.icon}</span>
            {lang === 'en' ? tip.en : tip.ta}
          </div>
        </HudPanel>
      </section>

      {/* ══ CLIMATE STATS ═══════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal>
            <div className="hud-label text-center mb-6">[ LIVE PLANETARY STATUS — DATA FEED ACTIVE ]</div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <ScrollReveal key={s.key} delay={i * 100}>
                <HudPanel color={s.color} className="p-5">
                  <div className="hud-label mb-3">{s.label}</div>
                  <div className="font-orb font-bold text-3xl mb-2 stat-value" style={{ color: colorText[s.color] }}>
                    <CountUp end={s.value} decimals={s.dec} suffix={s.sfx} duration={2000} />
                  </div>
                  <div className="hud-track">
                    <div
                      className="hud-fill"
                      style={{
                        width: `${Math.min((s.value / s.max) * 100, 100)}%`,
                        background: colorText[s.color],
                        boxShadow: `0 0 8px ${colorText[s.color]}90`,
                      }}
                    />
                  </div>
                </HudPanel>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ECO TIPS ════════════════════════════════════════════════ */}
      <section className="py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal>
            <div className="hud-label mb-6">[ ECO INTELLIGENCE TIPS — FIELD DATA ]</div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIPS.map((tip, i) => (
              <ScrollReveal key={i} delay={i * 70}>
                <HudPanel color="cyan" className="p-5 group cursor-pointer hover:border-[rgba(0,245,255,0.65)] transition-all">
                  <span className="block text-3xl mb-3 group-hover:scale-110 transition-transform" style={{ filter: 'drop-shadow(0 0 6px rgba(0,245,255,0.4))' }}>{tip.icon}</span>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                    {lang === 'en' ? tip.en : tip.ta}
                  </p>
                </HudPanel>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TAMIL NADU ══════════════════════════════════════════════ */}
      <section className="py-10 px-4">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal>
            <HudPanel color="green" className="p-8" scanLine>
              <div className="hud-label mb-6" style={{ color: 'var(--green)' }}>
                [ TAMIL NADU ENVIRONMENTAL INTELLIGENCE — LOCAL DATA ]
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {[
                  { icon: '☀️', label: 'SOLAR CAPACITY', v: '14,000+', u: 'MW' },
                  { icon: '🌊', label: 'COASTLINE RISK',  v: '1,076',  u: 'KM' },
                  { icon: '🌳', label: 'TREES PLANTED',   v: '1.5M+',  u: '2024' },
                  { icon: '⚡', label: 'EV ADOPTION',     v: '+340%',  u: '2023–24' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="block text-3xl mb-2" style={{ filter: 'drop-shadow(0 0 8px var(--green))' }}>{s.icon}</span>
                    <div className="font-orb font-bold text-xl mb-0.5" style={{ color: 'var(--green)', textShadow: 'var(--glow-text-green)' }}>{s.v}</div>
                    <div className="hud-label" style={{ color: 'var(--text-dim)', fontSize: '0.58rem' }}>{s.u} · {s.label}</div>
                  </div>
                ))}
              </div>
              <hr className="hud-hr-green mb-5" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { en: 'Tamil Nadu hits 20 GW Renewable Energy milestone', ta: 'தமிழ்நாடு 20 GW மைல்கல்', t: '2h ago', c: 'var(--green)'  },
                  { en: 'Global CO₂ hits record 421 ppm in May 2025',        ta: 'CO₂ 421 ppm பதிவு',      t: '6h ago', c: 'var(--orange)' },
                  { en: 'India pledges 500 GW clean energy by 2030',         ta: '500 GW சுத்தமான ஆற்றல்', t: '1d ago', c: 'var(--cyan)'   },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-mono px-1.5 py-0.5 flex-shrink-0 mt-0.5" style={{ background: `${n.c}18`, border: `1px solid ${n.c}50`, color: n.c, fontSize: '0.58rem' }}>{n.t}</span>
                    <span className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                      {lang === 'en' ? n.en : n.ta}
                    </span>
                  </div>
                ))}
              </div>
            </HudPanel>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <HudPanel color="cyan" className="p-10 text-center" scanLine>
              <div className="hud-label mb-3">[ MISSION BRIEFING ]</div>
              <h2 className="font-orb font-bold text-2xl mb-3" style={{ color: 'var(--cyan)', textShadow: 'var(--glow-text-cyan)' }}>
                {lang === 'en' ? 'BEGIN YOUR ECO MISSION' : 'உங்கள் சுற்றுச்சூழல் பணியை தொடங்குங்கள்'}
              </h2>
              <p className="font-mono text-sm mb-7" style={{ color: 'var(--text-mid)', letterSpacing: '0.06em' }}>
                {lang === 'en'
                  ? 'Calculate your carbon footprint, earn XP, and protect the planet — one mission at a time.'
                  : 'கார்பன் அடிச்சுவட்டை கணக்கிடுங்கள், XP சம்பாதியுங்கள், பூமியை காப்பாற்றுங்கள்.'}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => onNavigate('carbonscan')} className="btn-hud btn-hud-green flex items-center gap-2 px-8">
                  ▶ {lang === 'en' ? 'CARBONSCAN' : 'கார்பன் ஸ்கேன்'}
                </button>
                <button onClick={() => onNavigate('greenquest')} className="btn-hud flex items-center gap-2 px-8">
                  🌱 {lang === 'en' ? 'GREENQUEST' : 'பசுமை பயணம்'}
                </button>
              </div>
            </HudPanel>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
