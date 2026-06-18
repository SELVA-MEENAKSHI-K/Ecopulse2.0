import { useState } from 'react';
import { Send, CheckCircle, ChevronDown } from 'lucide-react';
import { Lang } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import HudPanel from '../components/HudPanel';

interface Props { lang: Lang; }

const FAQS = [
  { q: 'How is the Carbon Score calculated?', qTa: 'கார்பன் மதிப்பெண் எவ்வாறு கணக்கிடப்படுகிறது?', a: 'CarbonScan uses IPCC-aligned emission factors across transport, food, energy, and waste. Score = annual CO₂-equivalent in tonnes.' },
  { q: 'Is my personal data stored securely?', qTa: 'என் தரவு பாதுகாப்பாக சேமிக்கப்படுகிறதா?', a: 'Yes. All data is AES-256 encrypted and stored in compliance with India\'s PDPB data protection framework.' },
  { q: 'How does the GreenQuest XP system work?', qTa: 'GreenQuest XP அமைப்பு எவ்வாறு செயல்படுகிறது?', a: 'Earn XP by completing daily missions, weekly challenges, and educational content. XP unlocks eco ranks from Seedling to Eco Legend.' },
  { q: 'Are certificates officially recognized?', qTa: 'சான்றிதழ்கள் அதிகாரப்பூர்வமாக அங்கீகரிக்கப்படுகிறதா?', a: 'EcoPulse certificates include QR verification. Recognized by partner NGOs and educational institutions across Tamil Nadu.' },
  { q: 'How do I switch to Tamil language?', qTa: 'தமிழ் மொழிக்கு எவ்வாறு மாறுவது?', a: 'Click the language toggle (EN/தமிழ்) in the navigation bar\'s top strip at any time.' },
];

export default function Connect({ lang }: Props) {
  const [form, setForm] = useState({ name: '', email: '', type: 'feedback', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="font-mono text-xs mb-2" style={{ color: 'var(--text-dim)', letterSpacing: '0.2em' }}>
              [ COMMUNICATION MODULE — CONNECT ]
            </div>
            <h1 className="font-orb font-bold text-4xl" style={{ color: 'var(--cyan)', textShadow: 'var(--glow-cyan)' }}>CONNECT</h1>
            <div className="font-mono text-sm mt-1" style={{ color: 'var(--text-dim)' }}>
              {lang === 'en' ? 'Questions, feedback, partnerships — transmission channel open' : 'கேள்விகள், கருத்துக்கள், கூட்டாண்மைகள்'}
              <span className="blink ml-1">_</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              {submitted ? (
                <HudPanel color="green" className="p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center" style={{ border: '2px solid var(--green)', background: 'rgba(0,255,136,0.08)' }}>
                      <CheckCircle size={28} style={{ color: 'var(--green)' }} />
                    </div>
                  </div>
                  <div className="font-orb font-bold text-2xl mb-2" style={{ color: 'var(--green)' }}>
                    {lang === 'en' ? 'TRANSMISSION SENT' : 'செய்தி அனுப்பப்பட்டது'}
                  </div>
                  <div className="font-mono text-sm mb-6" style={{ color: 'var(--text-dim)' }}>
                    {lang === 'en' ? '> Response ETA: 24 hours. Thank you, operative.' : '> 24 மணி நேரத்தில் பதில் வரும்.'}
                  </div>
                  <button onClick={() => setSubmitted(false)} className="btn-hud btn-hud-green">
                    {lang === 'en' ? 'SEND ANOTHER' : 'மற்றொன்று அனுப்பு'}
                  </button>
                </HudPanel>
              ) : (
                <HudPanel color="cyan" className="p-6">
                  <div className="font-mono text-xs mb-5 flex items-center gap-2" style={{ color: 'var(--cyan)', letterSpacing: '0.15em' }}>
                    <span className="w-2 h-2" style={{ background: 'var(--cyan)', boxShadow: 'var(--glow-cyan)' }} />
                    OPEN TRANSMISSION CHANNEL
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="font-mono text-xs mb-1.5" style={{ color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                          {lang === 'en' ? 'OPERATIVE NAME' : 'பெயர்'}
                        </div>
                        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Arjun Kumar" className="hud-input" />
                      </div>
                      <div>
                        <div className="font-mono text-xs mb-1.5" style={{ color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                          {lang === 'en' ? 'COMMS ADDRESS' : 'மின்னஞ்சல்'}
                        </div>
                        <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="arjun@example.com" className="hud-input" />
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs mb-1.5" style={{ color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                        {lang === 'en' ? 'TRANSMISSION TYPE' : 'செய்தி வகை'}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          { v: 'feedback',    en: 'FEEDBACK',     ta: 'கருத்து'       },
                          { v: 'bug',         en: 'BUG REPORT',   ta: 'பிழை'          },
                          { v: 'partnership', en: 'PARTNERSHIP',  ta: 'கூட்டாண்மை'   },
                          { v: 'other',       en: 'OTHER',        ta: 'மற்றவை'        },
                        ].map(t => (
                          <button
                            key={t.v}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, type: t.v }))}
                            className="btn-hud py-1.5 px-3 text-xs"
                            style={form.type === t.v ? { borderColor: 'var(--cyan)', color: 'var(--cyan)', background: 'rgba(0,245,255,0.1)' } : {}}
                          >
                            {lang === 'en' ? t.en : t.ta}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs mb-1.5" style={{ color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                        {lang === 'en' ? 'MESSAGE PAYLOAD' : 'செய்தி'}
                      </div>
                      <textarea
                        required
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder={lang === 'en' ? '> ENTER TRANSMISSION...' : '> உங்கள் கருத்தை உள்ளிடுக...'}
                        rows={5}
                        className="hud-input resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-hud btn-hud-green w-full flex items-center justify-center gap-2">
                      <Send size={13} /> {lang === 'en' ? 'TRANSMIT MESSAGE' : 'செய்தி அனுப்பு'}
                    </button>
                  </form>
                </HudPanel>
              )}
            </ScrollReveal>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            <ScrollReveal>
              {[
                { label: 'COMMS ADDRESS', value: 'hello@ecopulse.earth', icon: '📡' },
                { label: 'LOCATION',      value: 'Chennai, Tamil Nadu, India', icon: '📍' },
                { label: 'RESPONSE ETA',  value: 'Within 24 hours', icon: '⏱' },
              ].map((info, i) => (
                <HudPanel key={i} color="cyan" className="p-4 flex items-center gap-4 mb-3">
                  <span className="text-xl flex-shrink-0" style={{ filter: 'drop-shadow(0 0 6px var(--cyan))' }}>{info.icon}</span>
                  <div>
                    <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem', letterSpacing: '0.12em' }}>{info.label}</div>
                    <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-bright)' }}>{info.value}</div>
                  </div>
                </HudPanel>
              ))}
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <HudPanel color="green" className="p-5">
                <span className="text-2xl block mb-2" style={{ filter: 'drop-shadow(0 0 8px var(--green))' }}>🎖️</span>
                <div className="font-orb font-semibold text-sm mb-1" style={{ color: 'var(--green)' }}>
                  {lang === 'en' ? 'ECO CERTIFICATES' : 'சுற்றுச்சூழல் சான்றிதழ்கள்'}
                </div>
                <p className="font-mono text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                  {lang === 'en' ? 'QR-verified sustainability certificates for completed missions.' : 'பணிகள் நிறைவில் QR-சரிபார்க்கப்பட்ட சான்றிதழ்கள்.'}
                </p>
                <button className="btn-hud btn-hud-green w-full text-xs">
                  {lang === 'en' ? 'VIEW CERTIFICATES' : 'சான்றிதழ்கள் காண்க'}
                </button>
              </HudPanel>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ */}
        <ScrollReveal>
          <HudPanel color="orange" className="p-5">
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--orange)', letterSpacing: '0.15em' }}>
              [ FAQ — CLASSIFIED INTELLIGENCE ARCHIVE ]
            </div>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} style={{ border: `1px solid ${openFaq === i ? 'rgba(255,107,0,0.35)' : 'rgba(255,107,0,0.12)'}`, background: openFaq === i ? 'rgba(255,107,0,0.04)' : 'transparent' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-mono text-xs" style={{ color: openFaq === i ? 'var(--orange)' : 'var(--text-bright)' }}>
                      <span style={{ color: 'var(--text-dim)' }}>{String(i + 1).padStart(2, '0')}.</span> {lang === 'en' ? faq.q : faq.qTa}
                    </span>
                    <ChevronDown size={14} style={{ color: 'var(--orange)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 font-mono text-xs leading-relaxed" style={{ borderTop: '1px solid rgba(255,107,0,0.12)', paddingTop: 12, color: 'var(--text-mid)' }}>
                      &gt; {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </HudPanel>
        </ScrollReveal>
      </div>
    </div>
  );
}
