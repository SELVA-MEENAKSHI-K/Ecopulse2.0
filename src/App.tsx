import { useState } from 'react';
import { Page, Lang } from './types';
import Navigation from './components/Navigation';
import ParticleSystem from './components/ParticleSystem';
import EarthLens from './pages/EarthLens';
import EcoVerse from './pages/EcoVerse';
import CarbonScan from './pages/CarbonScan';
import GreenQuest from './pages/GreenQuest';
import ImpactSphere from './pages/ImpactSphere';
import GaiaAI from './pages/GaiaAI';
import Connect from './pages/Connect';

export default function App() {
  const [page, setPage] = useState<Page>('earthlens');
  const [lang, setLang] = useState<Lang>('en');

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (page) {
      case 'earthlens':    return <EarthLens    lang={lang} onNavigate={navigate} />;
      case 'ecoverse':     return <EcoVerse     lang={lang} />;
      case 'carbonscan':   return <CarbonScan   lang={lang} />;
      case 'greenquest':   return <GreenQuest   lang={lang} />;
      case 'impactsphere': return <ImpactSphere lang={lang} />;
      case 'gaiaai':       return <GaiaAI       lang={lang} />;
      case 'connect':      return <Connect      lang={lang} />;
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', isolation: 'isolate' }}>

      {/* ── Background layers ── */}
      {/* 1. Grid */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,200,240,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,240,0.022) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
      }} />

      {/* 2. Ambient glow — reference has a subtle central blue-teal bloom */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 500,
          background: 'radial-gradient(ellipse, rgba(0,100,180,0.07) 0%, rgba(0,50,100,0.04) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '20%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(0,255,136,0.03) 0%, transparent 65%)',
          filter: 'blur(25px)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '10%',
          width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 65%)',
          filter: 'blur(25px)',
        }} />
      </div>

      {/* 3. Particles */}
      <ParticleSystem />

      {/* Navigation */}
      <Navigation
        page={page}
        onNavigate={navigate}
        lang={lang}
        onLangToggle={() => setLang(l => l === 'en' ? 'ta' : 'en')}
      />

      {/* Page */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(0,200,240,0.1)', padding: '20px 16px' }}>
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-orb font-bold text-sm" style={{ color: 'var(--cyan)' }}>
            ECOPULSE <span className="font-mono font-normal text-xs ml-1" style={{ color: 'var(--text-dim)' }}>v2.0</span>
          </span>
          <div className="flex items-center gap-4">
            {(['earthlens', 'carbonscan', 'greenquest', 'gaiaai'] as Page[]).map((p, i) => (
              <button key={p} onClick={() => navigate(p)}
                className="font-mono text-xs transition-colors hover:text-cyan-300"
                style={{ color: 'var(--text-dim)', letterSpacing: '0.08em' }}
              >
                {['EARTHLENS','CARBONSCAN','GREENQUEST','GAIA AI'][i]}
              </button>
            ))}
          </div>
          <div className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
            <span className="status-dot online" style={{ width: 6, height: 6 }} />
            {lang === 'en' ? 'SYSTEMS NOMINAL — PLANET TRAJECTORY: STABLE' : 'அமைப்புகள் சரியாக உள்ளன'}
          </div>
        </div>
      </footer>
    </div>
  );
}
