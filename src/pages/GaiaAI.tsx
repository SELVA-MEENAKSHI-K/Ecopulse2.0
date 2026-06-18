import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, RotateCcw } from 'lucide-react';
import { Lang, ChatMessage } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import HudPanel from '../components/HudPanel';

interface Props { lang: Lang; }

const SUGGESTIONS = [
  { en: 'How can I reduce my carbon footprint?',         ta: 'என் கார்பன் அடிச்சுவட்டை எவ்வாறு குறைக்கலாம்?' },
  { en: 'Best renewable energy options for homes?',      ta: 'வீட்டிற்கான சிறந்த புதுப்பிக்கத்தக்க ஆற்றல்?' },
  { en: 'Tell me about Tamil Nadu climate initiatives',  ta: 'தமிழ்நாடு காலநிலை முன்முயற்சிகள்' },
  { en: 'How do I start composting at home?',            ta: 'வீட்டில் உரமாக்கலை எவ்வாறு தொடங்குவது?' },
];

const RESPONSES: Record<string, string> = {
  default:   '> GAIA ONLINE. I am your Environmental Intelligence Assistant.\n> Query carbon reduction, climate science, eco habits, or Tamil Nadu data.\n> TYPE YOUR MISSION BRIEFING BELOW.',
  carbon:    '> CARBON REDUCTION — TOP 5 PROTOCOLS:\n01. TRANSPORT: Switch to EV/transit — 38% of personal emissions\n02. DIET: Meatless day saves 2.5kg CO₂/week\n03. ENERGY: LED + smart thermostat = 30% reduction\n04. WASTE: Compost food scraps — diverts 30% from landfill\n05. PURCHASE: Buy local, secondhand, seasonal\n> ESTIMATED ANNUAL REDUCTION: 2–4 TONNES CO₂',
  renewable: '> RENEWABLE ENERGY — HOME DEPLOYMENT:\n☀ SOLAR PV: 300+ sunny days in TN — ROI 4–5 years\n💨 SMALL WIND: Effective in coastal zones (Chennai, Rameswaram)\n🔋 BATTERY: Pair solar + lithium for 24/7 green power\n🌡 SOLAR HEATER: 60–80% reduction in water heating\n> TN SUBSIDY: 40% on rooftop solar installations\n> APPLY AT: TEDA.IN',
  tamilnadu: '> TAMIL NADU INTEL REPORT:\n☀ SOLAR: 14,000+ MW installed — India rank 1\n🌊 COAST: 1,076 km shoreline at risk — mangrove drive active\n🌳 MISSION GREEN TN: 1.5M trees planted (2024)\n🚌 ELECTRIC BUSES: 500+ in Chennai metro\n♻ WASTE: 100+ cities with segregated collection\n⚠ ALERT: 23/38 districts face high water stress',
  compost:   '> COMPOSTING — HOME PROTOCOL:\nSTEP 1: Acquire 20L container\nSTEP 2: Layer GREENS (scraps) + BROWNS (leaves)\nSTEP 3: Maintain moisture — not saturated\nSTEP 4: Aerate weekly\nSTEP 5: Ready in 6–8 weeks\n✅ ADD: Fruit/veggie peels, coffee, eggshells\n❌ AVOID: Meat, dairy, oils\n> IMPACT: 30% household waste diverted from landfill',
};

function getReply(msg: string): string {
  const l = msg.toLowerCase();
  if (l.includes('carbon') || l.includes('footprint') || l.includes('reduce') || l.includes('குறை')) return RESPONSES.carbon;
  if (l.includes('renewable') || l.includes('solar') || l.includes('energy') || l.includes('ஆற்றல்')) return RESPONSES.renewable;
  if (l.includes('tamil') || l.includes('tn') || l.includes('தமிழ்')) return RESPONSES.tamilnadu;
  if (l.includes('compost') || l.includes('waste') || l.includes('உரம்')) return RESPONSES.compost;
  return RESPONSES.default;
}

export default function GaiaAI({ lang }: Props) {
  const [msgs, setMsgs]     = useState<ChatMessage[]>([{
    id: '0', role: 'assistant',
    content: lang === 'en'
      ? '> GAIA v2.0 ONLINE — ENVIRONMENTAL INTELLIGENCE ACTIVE\n> SYSTEMS NOMINAL. READY FOR INPUT.\n> ASK ME ABOUT CARBON REDUCTION, CLIMATE DATA, OR ECO HABITS.'
      : '> கயா v2.0 செயலில் உள்ளது\n> கார்பன் குறைப்பு, காலநிலை தரவு, சுற்றுச்சூழல் பற்றி கேளுங்கள்.',
    timestamp: new Date(),
  }]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef            = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, loading]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMsgs(m => [...m, { id: Date.now().toString(), role: 'user', content: msg, timestamp: new Date() }]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setMsgs(m => [...m, { id: (Date.now()+1).toString(), role: 'assistant', content: getReply(msg), timestamp: new Date() }]);
    setLoading(false);
  };

  const reset = () => setMsgs([{
    id: '0', role: 'assistant',
    content: '> GAIA v2.0 REINITIALIZED. SESSION CLEARED.\n> READY FOR NEW MISSION INPUT.',
    timestamp: new Date(),
  }]);

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <div className="font-mono text-xs mb-3" style={{ color: 'var(--text-dim)', letterSpacing: '0.2em' }}>
              [ AI SUBSYSTEM — ENVIRONMENTAL INTELLIGENCE CORE ]
            </div>

            {/* Robot mascot */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div
                  className="w-20 h-20 flex items-center justify-center text-5xl"
                  style={{ border: '2px solid rgba(0,245,255,0.4)', background: 'rgba(0,245,255,0.06)', boxShadow: '0 0 30px rgba(0,245,255,0.3)' }}
                >
                  🤖
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--green)', boxShadow: 'var(--glow-green)' }}>
                  <span className="font-mono text-black font-bold" style={{ fontSize: '0.45rem' }}>ON</span>
                </div>
                {/* Scan lines on robot */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="scan-sweep" />
                </div>
              </div>
            </div>

            <h1 className="font-orb font-bold text-4xl mb-1" style={{ color: 'var(--cyan)', textShadow: 'var(--glow-cyan)' }}>
              GAIA AI
            </h1>
            <div className="font-mono text-sm" style={{ color: 'var(--green)' }}>
              [ SMART ECO ASSISTANT — SUSTAINABILITY ADVISOR ]
              <span className="blink ml-1">_</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Chat terminal */}
        <HudPanel color="cyan" className="mb-5">
          <div className="font-mono text-xs p-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,245,255,0.12)', color: 'var(--text-dim)' }}>
            <span>GAIA-AI TERMINAL v2.0 // SESSION ACTIVE</span>
            <button onClick={reset} className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
              <RotateCcw size={10} /> RESET
            </button>
          </div>

          {/* Messages */}
          <div className="overflow-y-auto p-4 space-y-4" style={{ height: '42vh', minHeight: 320 }}>
            {msgs.map(m => (
              <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-mono"
                  style={{
                    border: `1px solid ${m.role === 'assistant' ? 'rgba(0,245,255,0.4)' : 'rgba(0,255,136,0.4)'}`,
                    background: m.role === 'assistant' ? 'rgba(0,245,255,0.08)' : 'rgba(0,255,136,0.08)',
                    color: m.role === 'assistant' ? 'var(--cyan)' : 'var(--green)',
                    fontSize: '1rem',
                  }}
                >
                  {m.role === 'assistant' ? '🤖' : '▶'}
                </div>

                {/* Bubble */}
                <div
                  className="max-w-[82%] p-3"
                  style={{
                    background: m.role === 'assistant' ? 'rgba(0,245,255,0.04)' : 'rgba(0,255,136,0.04)',
                    border: `1px solid ${m.role === 'assistant' ? 'rgba(0,245,255,0.18)' : 'rgba(0,255,136,0.18)'}`,
                  }}
                >
                  <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed" style={{ color: m.role === 'assistant' ? 'var(--cyan)' : 'var(--green)' }}>
                    {m.content}
                  </pre>
                  <div className="font-mono mt-1.5" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>
                    {m.timestamp.toLocaleTimeString('en-GB', { hour12: false })}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-sm" style={{ border: '1px solid rgba(0,245,255,0.4)', background: 'rgba(0,245,255,0.08)' }}>🤖</div>
                <div className="p-3 flex items-center gap-2" style={{ border: '1px solid rgba(0,245,255,0.18)', background: 'rgba(0,245,255,0.04)' }}>
                  <Loader2 size={12} className="animate-spin" style={{ color: 'var(--cyan)' }} />
                  <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>PROCESSING QUERY<span className="blink">_</span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3" style={{ borderTop: '1px solid rgba(0,245,255,0.12)' }}>
            <div className="flex gap-2 items-center">
              <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--green)' }}>&gt;</span>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder={lang === 'en' ? 'ENTER MISSION QUERY...' : 'கேள்வி உள்ளிடுக...'}
                className="hud-input flex-1 px-3 py-2 text-xs"
                style={{ border: 'none', borderBottom: '1px solid rgba(0,245,255,0.25)', background: 'transparent' }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="btn-hud p-2 disabled:opacity-30"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </HudPanel>

        {/* Suggestions */}
        <ScrollReveal>
          <div className="font-mono text-xs mb-3" style={{ color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
            [ SUGGESTED QUERIES ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(lang === 'en' ? s.en : s.ta)}
                className="flex items-start gap-2 p-3 text-left transition-all duration-200 font-mono text-xs"
                style={{ border: '1px solid rgba(0,245,255,0.12)', background: 'rgba(0,245,255,0.02)', color: 'var(--text-mid)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)', e.currentTarget.style.color = 'var(--cyan)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,245,255,0.12)', e.currentTarget.style.color = 'var(--text-mid)')}
              >
                <span style={{ color: 'var(--green)' }}>▶</span>
                {lang === 'en' ? s.en : s.ta}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Capabilities */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { icon: '🌡️', label: 'CLIMATE SCIENCE'   },
              { icon: '📊', label: 'CARBON ANALYSIS'   },
              { icon: '🌱', label: 'ECO HABITS'        },
              { icon: '🌍', label: 'LOCAL INTEL'       },
            ].map((c, i) => (
              <div key={i} className="p-4 text-center" style={{ border: '1px solid rgba(0,245,255,0.1)', background: 'rgba(0,245,255,0.02)' }}>
                <span className="text-2xl block mb-1.5" style={{ filter: 'drop-shadow(0 0 4px rgba(0,245,255,0.4))' }}>{c.icon}</span>
                <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem', letterSpacing: '0.12em' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
