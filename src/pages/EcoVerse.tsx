import { useState } from 'react';
import { ChevronDown, ChevronRight, PlayCircle } from 'lucide-react';
import { Lang } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import HudPanel from '../components/HudPanel';

interface Props { lang: Lang; }

const CATEGORIES = [
  { id: 'all',    en: 'ALL', ta: 'அனைத்தும்' },
  { id: 'climate',en: 'CLIMATE', ta: 'காலநிலை' },
  { id: 'energy', en: 'ENERGY', ta: 'ஆற்றல்' },
  { id: 'waste',  en: 'WASTE', ta: 'கழிவு' },
  { id: 'heroes', en: 'HEROES', ta: 'வீரர்கள்' },
];

const CARDS = [
  { cat: 'climate', icon: '🌡️', color: 'orange', en: 'The Greenhouse Effect Explained', ta: 'கிரீன்ஹவுஸ் விளைவு', desc: 'How CO₂ traps heat in Earth\'s atmosphere, driving global temperature rise.', level: 'BEGINNER', time: '5 MIN', tag: 'CLIMATE' },
  { cat: 'energy',  icon: '☀️', color: 'cyan',   en: 'Solar Energy Revolution in India', ta: 'இந்தியாவில் சூரிய ஆற்றல் புரட்சி', desc: 'How Tamil Nadu and Rajasthan lead India\'s renewable energy transition.', level: 'INTERMEDIATE', time: '7 MIN', tag: 'RENEWABLE' },
  { cat: 'waste',   icon: '♻️', color: 'green',  en: 'Zero Waste Living Guide',          ta: 'பூஜ்ஜிய கழிவு வாழ்க்கை', desc: 'Reduce household waste by 80% using simple, proven daily habits.', level: 'BEGINNER', time: '8 MIN', tag: 'WASTE' },
  { cat: 'climate', icon: '🌊', color: 'cyan',   en: 'Ocean Acidification Crisis',       ta: 'கடல் அமிலமயமாதல் நெருக்கடி', desc: 'Rising CO₂ dissolves into oceans, threatening marine ecosystems worldwide.', level: 'ADVANCED', time: '6 MIN', tag: 'OCEAN' },
  { cat: 'energy',  icon: '💨', color: 'green',  en: 'Wind Energy & Grid Integration',   ta: 'காற்று ஆற்றல் & கட்டம்', desc: 'How turbines work and how renewable power integrates into national grids.', level: 'INTERMEDIATE', time: '9 MIN', tag: 'WIND' },
  { cat: 'waste',   icon: '🌱', color: 'green',  en: 'Composting & Soil Health',         ta: 'உரமாக்கல் & மண் ஆரோக்கியம்', desc: 'Turn kitchen waste into garden gold — composting reduces landfill methane.', level: 'BEGINNER', time: '5 MIN', tag: 'SOIL' },
];

const colorMap: Record<string, string> = {
  cyan: 'var(--cyan)', green: 'var(--green)', orange: 'var(--orange)',
};

const HEROES = [
  { name: 'Vandana Shiva',    role: 'Environmental Activist', country: '🇮🇳 India',  impact: 'Founded Navdanya — 30+ years promoting seed sovereignty & organic farming.', icon: '🌱' },
  { name: 'Wangari Maathai',  role: 'Nobel Peace Prize Winner', country: '🇰🇪 Kenya', impact: 'Founded Green Belt Movement — planted 51 million trees across Africa.', icon: '🌳' },
  { name: 'Jadav Payeng',     role: 'Forest Man of India',    country: '🇮🇳 India',  impact: 'Single-handedly planted a 550-hectare forest on a sandbar in Assam.', icon: '🌲' },
];

const VIDEOS = [
  { title: 'Climate Change: The Science Behind the Crisis', dur: '12:34', views: '2.4M' },
  { title: 'Tamil Nadu\'s Solar Energy Revolution', dur: '8:22', views: '890K' },
  { title: 'Zero Waste Home — Full Tour', dur: '15:11', views: '1.1M' },
];

export default function EcoVerse({ lang }: Props) {
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? CARDS : CARDS.filter(c => c.cat === cat);

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="font-mono text-xs mb-2" style={{ color: 'var(--text-dim)', letterSpacing: '0.2em' }}>
              [ KNOWLEDGE MODULE — ECO INTELLIGENCE DATABASE ]
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-orb font-bold text-4xl" style={{ color: 'var(--green)', textShadow: 'var(--glow-green)' }}>
                  ECOVERSE
                </h1>
                <div className="font-mono text-sm mt-1" style={{ color: 'var(--text-dim)' }}>
                  {lang === 'en' ? 'Climate science, renewable energy, and sustainability' : 'காலநிலை அறிவியல் மற்றும் நிலைத்தன்மை'}
                  <span className="blink ml-1">_</span>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className="btn-hud py-1.5 px-3 text-xs"
                    style={cat === c.id ? { borderColor: 'var(--green)', color: 'var(--green)', background: 'rgba(0,255,136,0.08)' } : {}}
                  >
                    {lang === 'en' ? c.en : c.ta}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filtered.map((card, i) => {
            const c = colorMap[card.color];
            return (
              <ScrollReveal key={i} delay={i * 60}>
                <div
                  className="p-5 relative group cursor-pointer transition-all duration-200 h-full flex flex-col"
                  style={{ background: `${c}06`, border: `1px solid ${c}25` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${c}55`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${c}25`)}
                >
                  {/* Corner brackets */}
                  <span className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: `2px solid ${c}`, borderLeft: `2px solid ${c}` }} />
                  <span className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: `2px solid ${c}`, borderRight: `2px solid ${c}` }} />

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform" style={{ filter: `drop-shadow(0 0 8px ${c})` }}>{card.icon}</span>
                    <div className="flex gap-2">
                      <span className="font-mono text-xs px-2 py-0.5" style={{ color: c, border: `1px solid ${c}40`, background: `${c}10`, fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                        {card.level}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-orb font-semibold text-sm mb-2 leading-snug" style={{ color: 'var(--text-bright)' }}>
                    {lang === 'en' ? card.en : card.ta}
                  </h3>
                  <p className="font-mono text-xs leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-dim)' }}>
                    {card.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs" style={{ color: c, fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                      [{card.tag}] · {card.time}
                    </span>
                    <button className="flex items-center gap-1 font-mono text-xs transition-opacity hover:opacity-70" style={{ color: c }}>
                      {lang === 'en' ? 'ACCESS' : 'படி'} <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Videos */}
        <ScrollReveal>
          <HudPanel color="cyan" className="p-5 mb-8">
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--cyan)', letterSpacing: '0.15em' }}>
              [ VIDEO INTELLIGENCE — FIELD RECORDINGS ]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map((v, i) => (
                <div
                  key={i}
                  className="group cursor-pointer"
                  style={{ border: '1px solid rgba(0,245,255,0.15)', background: 'rgba(0,245,255,0.03)' }}
                >
                  <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 120, background: 'rgba(0,0,0,0.4)' }}>
                    <span className="text-6xl opacity-10 select-none">{['🌍', '☀️', '♻️'][i]}</span>
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-all"
                      style={{ background: 'rgba(0,245,255,0.03)' }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center transition-all group-hover:scale-110" style={{ border: '1px solid rgba(0,245,255,0.5)', background: 'rgba(0,245,255,0.08)' }}>
                        <PlayCircle size={22} style={{ color: 'var(--cyan)' }} />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 font-mono text-xs px-1.5 py-0.5" style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--text-mid)', fontSize: '0.6rem' }}>{v.dur}</span>
                    <div className="scan-sweep" />
                  </div>
                  <div className="p-3">
                    <p className="font-mono text-xs leading-snug mb-1" style={{ color: 'var(--text-bright)' }}>{v.title}</p>
                    <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>👁 {v.views} VIEWS</span>
                  </div>
                </div>
              ))}
            </div>
          </HudPanel>
        </ScrollReveal>

        {/* Green Heroes */}
        <ScrollReveal>
          <HudPanel color="green" className="p-5">
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--green)', letterSpacing: '0.15em' }}>
              [ GREEN HEROES — ECO OPERATIVES DATABASE ]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HEROES.map((h, i) => (
                <div key={i} className="p-4 group" style={{ border: '1px solid rgba(0,255,136,0.15)', background: 'rgba(0,255,136,0.03)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center text-2xl" style={{ border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.08)' }}>
                      {h.icon}
                    </div>
                    <div>
                      <div className="font-orb font-semibold text-sm" style={{ color: 'var(--green)' }}>{h.name}</div>
                      <div className="font-mono text-xs" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{h.role}</div>
                      <div className="font-mono text-xs" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{h.country}</div>
                    </div>
                  </div>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-mid)' }}>{h.impact}</p>
                </div>
              ))}
            </div>
          </HudPanel>
        </ScrollReveal>
      </div>
    </div>
  );
}
