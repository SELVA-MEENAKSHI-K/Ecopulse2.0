export type Page = 'earthlens' | 'ecoverse' | 'carbonscan' | 'greenquest' | 'impactsphere' | 'gaiaai' | 'connect';

export type Lang = 'en' | 'ta';

export type Theme = 'dark' | 'light';

export interface NavItem {
  id: Page;
  label: string;
  icon: string;
  labelTa: string;
}

export interface CarbonData {
  transport: number;
  food: number;
  energy: number;
  waste: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  xp: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xp: number;
  progress: number;
  target: number;
  category: string;
  completed: boolean;
}

export interface HabitEntry {
  date: string;
  completed: boolean;
  habit: string;
}
