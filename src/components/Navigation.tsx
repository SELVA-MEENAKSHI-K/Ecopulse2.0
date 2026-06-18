import { useState, useEffect } from 'react';
import { Globe, BookOpen, ScanLine, Leaf, BarChart2, Bot, Mail, Menu, X, Languages } from 'lucide-react';
import { Page, Lang } from '../types';

interface NavProps {
  page: Page;
  onNavigate: (p: Page) => void;
  lang: Lang;
  onLangToggle: () => void;
}

const NAV_ITEMS = [
  { id: 'earthlens'    as Page, label: 'EarthLens',    ta: 'பூமி நோக்கி',    Icon: Globe    },
  { id: 'ecoverse'     as Page, label: 'EcoVerse',     ta: 'சுற்றுச்சூழல்',  Icon: BookOpen },
  { id: 'carbonscan'   as Page, label: 'CarbonScan',   ta: 'கார்பன் ஸ்கேன்', Icon: ScanLine },
  { id: 'greenquest'   as Page, label: 'GreenQuest',   ta: 'பசுமை பயணம்',    Icon: Leaf     },
  { id: 'impactsphere' as Page, label: 'ImpactSphere', ta: 'தாக்க வட்டம்',   Icon: BarChart2},
  { id: 'gaiaai'       as Page, label: 'Gaia AI',      ta: 'கயா AI',          Icon: Bot      },
  { id: 'connect'      as Page, label: 'Connect',      ta: 'தொடர்பு',         Icon: Mail     },
];

export default function Navigation({ page, onNavigate, lang, onLangToggle }: NavProps) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime]             = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    tick();
    const tid = setInterval(tick, 1000);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => { clearInterval(tid); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(3,10,20,0.97)' : 'rgba(5,14,26,0.90)',
          borderBottom: '1px solid rgba(0,200,240,0.18)',
          backdropFilter: 'blur(18px)',
        }}
      >
        {/* ── Top ticker strip ── */}
        <div style={{ borderBottom: '1px solid rgba(0,200,240,0.08)', padding: '3px 0', overflow: 'hidden', background: 'rgba(0,10,25,0.6)' }}>
          <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <span className="ticker-text font-mono text-xs" style={{ color: 'var(--text-dim)', letterSpacing: '0.18em', fontSize: '0.6rem' }}>
                ● SYSTEMS NOMINAL &nbsp;|&nbsp; PLANET TRAJECTORY: STABLE &nbsp;|&nbsp; CO₂: 421 PPM &nbsp;|&nbsp; TEMP RISE: +1.21°C &nbsp;|&nbsp; TN SOLAR: 14,000+ MW &nbsp;|&nbsp; ECOPULSE v2.0 ONLINE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>{time}</span>
              <button onClick={onLangToggle} className="flex items-center gap-1 font-mono" style={{ color: 'var(--cyan-dim)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>
                <Languages size={10} />
                {lang === 'en' ? 'தமிழ்' : 'EN'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Main nav bar ── */}
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center gap-4 py-2.5">

          {/* Robot mascot — exact reference: left of title */}
          <button onClick={() => onNavigate('earthlens')} className="flex items-center gap-3 flex-shrink-0">
            <div className="robot-mascot flex-shrink-0" style={{ width: 48, height: 48 }}>
              {/* Robot head */}
              <div style={{ position: 'relative', width: 32, height: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Head box */}
                <div style={{ width: 26, height: 18, border: '1px solid rgba(0,245,255,0.7)', background: 'rgba(0,20,40,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, boxShadow: '0 0 8px rgba(0,245,255,0.3)' }}>
                  <div style={{ width: 5, height: 5, background: 'var(--cyan)', borderRadius: 1, boxShadow: '0 0 4px var(--cyan)' }} />
                  <div style={{ width: 5, height: 5, background: 'var(--cyan)', borderRadius: 1, boxShadow: '0 0 4px var(--cyan)' }} />
                </div>
                {/* Mouth / status bar */}
                <div style={{ width: 20, height: 4, border: '1px solid rgba(0,255,136,0.5)', marginTop: 2, background: 'rgba(0,10,20,0.8)', display: 'flex', alignItems: 'center', padding: '0 2px', gap: 2 }}>
                  {[1,1,0,1,1].map((on, i) => (
                    <div key={i} style={{ flex: 1, height: 2, background: on ? 'var(--green)' : 'transparent', boxShadow: on ? '0 0 3px var(--green)' : 'none' }} />
                  ))}
                </div>
                {/* Antenna */}
                <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 1, height: 7, background: 'var(--cyan)', boxShadow: '0 0 3px var(--cyan)' }}>
                  <div style={{ position: 'absolute', top: -3, left: -2, width: 5, height: 3, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 5px var(--cyan)' }} />
                </div>
              </div>
              {/* Status label */}
              <div className="font-mono" style={{ fontSize: '0.45rem', color: 'var(--green)', letterSpacing: '0.1em', marginTop: 2 }}>● ONLINE</div>
            </div>

            {/* System status text (visible on larger screens) */}
            <div className="hidden md:flex flex-col" style={{ minWidth: 110 }}>
              <span className="font-mono" style={{ color: 'var(--green)', fontSize: '0.62rem', letterSpacing: '0.15em', lineHeight: 1.3 }}>
                SYSTEMS NOMINAL
              </span>
              <span className="font-mono" style={{ color: 'var(--green)', fontSize: '0.62rem', letterSpacing: '0.15em', lineHeight: 1.3 }}>
                PLANET TRAJECTORY: STABLE
                <span className="anim-blink" style={{ color: 'var(--cyan)' }}>_</span>
              </span>
            </div>
          </button>

          {/* Title — center */}
          <div className="flex-1 text-center">
            <h1
              className="font-orb font-black anim-title-glow hidden sm:block"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', color: 'var(--cyan)', letterSpacing: '0.08em', lineHeight: 1 }}
            >
              ECOPULSE 2.0
            </h1>
            <div className="font-mono hidden sm:block" style={{ color: 'var(--text-dim)', fontSize: '0.58rem', letterSpacing: '0.2em', marginTop: 2 }}>
              [ AI CLIMATE COMMAND CENTER — SYSTEM ONLINE ]
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5 flex-shrink-0">
            {NAV_ITEMS.map(({ id, label, ta, Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`nav-hud-item flex items-center gap-1.5 ${page === id ? 'active' : ''}`}
              >
                <Icon size={11} />
                {lang === 'en' ? label : ta}
              </button>
            ))}
          </div>

          {/* Status + mobile */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-2">
            <div className="hidden lg:flex items-center gap-2">
              <span className="status-dot online" />
              <span className="font-mono" style={{ color: 'var(--green)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>LIVE</span>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden btn-hud p-2"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* ── Large screen nav (below title on medium screens) ── */}
        <div
          className="hidden lg:flex xl:hidden items-center justify-center gap-1 pb-2 px-4 flex-wrap"
          style={{ borderTop: '1px solid rgba(0,200,240,0.07)' }}
        >
          {NAV_ITEMS.map(({ id, label, ta, Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`nav-hud-item flex items-center gap-1.5 ${page === id ? 'active' : ''}`}
            >
              <Icon size={11} />
              {lang === 'en' ? label : ta}
            </button>
          ))}
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-64 overflow-y-auto p-5"
            style={{ background: 'rgba(3,10,22,0.98)', borderLeft: '1px solid rgba(0,200,240,0.2)' }}
          >
            <div className="flex justify-between items-center mb-5">
              <span className="font-orb text-sm" style={{ color: 'var(--cyan)' }}>[ MENU ]</span>
              <button onClick={() => setMobileOpen(false)} className="btn-hud p-1.5"><X size={13} /></button>
            </div>
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map(({ id, label, ta, Icon }) => (
                <button
                  key={id}
                  onClick={() => { onNavigate(id); setMobileOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all ${
                    page === id ? '' : 'hover:text-cyan-300'
                  }`}
                  style={{
                    color: page === id ? 'var(--cyan)' : 'var(--text-dim)',
                    borderLeft: `2px solid ${page === id ? 'var(--cyan)' : 'transparent'}`,
                    background: page === id ? 'rgba(0,245,255,0.05)' : 'transparent',
                    letterSpacing: '0.1em',
                  }}
                >
                  <Icon size={13} />
                  {lang === 'en' ? label : ta}
                </button>
              ))}
              <hr className="hud-hr my-3" />
              <button onClick={onLangToggle} className="btn-hud text-xs flex items-center justify-center gap-2">
                <Languages size={12} /> {lang === 'en' ? 'தமிழ்' : 'ENGLISH'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
