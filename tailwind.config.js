/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        orb:   ['Orbitron', 'sans-serif'],
        mono:  ['"Share Tech Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        hud: {
          bg:     '#050e1a',
          bg2:    '#071422',
          cyan:   '#00f5ff',
          green:  '#00ff88',
          orange: '#ff8800',
        },
      },
      boxShadow: {
        'hud-cyan':   '0 0 12px rgba(0,245,255,0.6), 0 0 30px rgba(0,245,255,0.25)',
        'hud-green':  '0 0 12px rgba(0,255,136,0.6), 0 0 30px rgba(0,255,136,0.25)',
        'hud-orange': '0 0 12px rgba(255,136,0,0.7), 0 0 30px rgba(255,136,0,0.3)',
      },
    },
  },
  plugins: [],
};
