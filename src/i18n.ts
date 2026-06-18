import { Lang } from './types';

type Translations = Record<string, Record<Lang, string>>;

export const t: Translations = {
  // Nav
  'nav.earthlens': { en: 'EarthLens', ta: 'பூமி நோக்கி' },
  'nav.ecoverse': { en: 'EcoVerse', ta: 'சுற்றுச்சூழல் உலகம்' },
  'nav.carbonscan': { en: 'CarbonScan', ta: 'கார்பன் ஸ்கேன்' },
  'nav.greenquest': { en: 'GreenQuest', ta: 'பசுமை பயணம்' },
  'nav.impactsphere': { en: 'ImpactSphere', ta: 'தாக்க வட்டம்' },
  'nav.gaiaai': { en: 'Gaia AI', ta: 'கயா AI' },
  'nav.connect': { en: 'Connect', ta: 'தொடர்பு' },

  // Hero
  'hero.tagline': { en: 'Environmental Intelligence Platform', ta: 'சுற்றுச்சூழல் நுண்ணறிவு தளம்' },
  'hero.title': { en: 'Monitor, Analyze &\nProtect Our Planet', ta: 'கண்காணி, பகுப்பாய் &\nநம் பூமியை காப்பாற்று' },
  'hero.subtitle': { en: 'Real-time carbon tracking, AI-powered insights, and community-driven sustainability actions.', ta: 'நிகழ்நேர கார்பன் கண்காணிப்பு, AI உந்துதல் மற்றும் சமூக நிலைத்தன்மை செயல்கள்.' },
  'hero.cta1': { en: 'Scan Your Carbon', ta: 'கார்பன் ஸ்கேன்' },
  'hero.cta2': { en: 'Explore Platform', ta: 'தளத்தை ஆராய' },

  // Stats
  'stats.co2': { en: 'Global CO₂ ppm', ta: 'உலக CO₂ ppm' },
  'stats.temp': { en: '°C Above Pre-industrial', ta: '°C முன் தொழில்துறை அளவுக்கு மேல்' },
  'stats.ice': { en: 'Arctic Ice Loss (km²)', ta: 'ஆர்க்டிக் பனி இழப்பு (km²)' },
  'stats.species': { en: 'Species at Risk', ta: 'அச்சுறுத்தலில் உள்ள இனங்கள்' },

  // Carbon Scan
  'scan.title': { en: 'CarbonScan', ta: 'கார்பன் ஸ்கேன்' },
  'scan.subtitle': { en: 'Environmental Command Center', ta: 'சுற்றுச்சூழல் கட்டளை மையம்' },
  'scan.transport': { en: 'Transport', ta: 'போக்குவரத்து' },
  'scan.food': { en: 'Food', ta: 'உணவு' },
  'scan.energy': { en: 'Energy', ta: 'ஆற்றல்' },
  'scan.waste': { en: 'Waste', ta: 'கழிவு' },
  'scan.score': { en: 'Carbon Score', ta: 'கார்பன் மதிப்பெண்' },
  'scan.grade': { en: 'Environmental Grade', ta: 'சுற்றுச்சூழல் தர அளவு' },
  'scan.monthly': { en: 'Monthly Impact', ta: 'மாதாந்திர தாக்கம்' },
  'scan.yearly': { en: 'Yearly Projection', ta: 'ஆண்டு திட்டம்' },
  'scan.ai_rec': { en: 'AI Recommendations', ta: 'AI பரிந்துரைகள்' },

  // GreenQuest
  'quest.title': { en: 'GreenQuest', ta: 'பசுமை பயணம்' },
  'quest.daily': { en: 'Daily Missions', ta: 'தினசரி பணிகள்' },
  'quest.challenges': { en: 'Weekly Challenges', ta: 'வாராந்திர சவால்கள்' },
  'quest.rank': { en: 'Eco Rank', ta: 'சுற்றுச்சூழல் தரம்' },

  // Common
  'common.learn_more': { en: 'Learn More', ta: 'மேலும் அறிக' },
  'common.view_all': { en: 'View All', ta: 'அனைத்தையும் காண்க' },
  'common.start': { en: 'Get Started', ta: 'தொடங்கு' },
};

export function translate(key: string, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.['en'] ?? key;
}
