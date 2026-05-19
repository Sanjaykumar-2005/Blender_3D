import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:   '#f5f0e8',
        paper:   '#ede8dc',
        ink:     '#1a1612',
        'ink-mid':'#4a3f35',
        accent:  '#c8401a',
        gold:    '#d4a843',
        'shelf-green': '#2d5a27',
        navy:    '#1c2e4a',
        purple:  '#4a2d6e',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      keyframes: {
        'badge-spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'ticker-scroll': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'badge-spin':    'badge-spin 8s linear infinite',
        'ticker-scroll': 'ticker-scroll 25s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
