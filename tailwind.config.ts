import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050813',
          900: '#080d1c',
          850: '#0a1124',
          800: '#0d1530',
          700: '#121b3d',
          600: '#1a254f',
        },
        neon: {
          DEFAULT: '#00f5a0',
          50: '#ccffe8',
          100: '#99ffce',
          200: '#66ffb3',
          300: '#33ff9d',
          400: '#00f5a0',
          500: '#00d488',
          600: '#00b373',
          700: '#008c5a',
        },
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'sans-serif'],
      },
      backgroundImage: {
        'glass': 'rgba(10, 17, 36, 0.65)',
        'glass-light': 'rgba(18, 27, 61, 0.5)',
        'hero-overlay': 'linear-gradient(to top, rgba(5,8,19,0.95) 0%, rgba(5,8,19,0.4) 50%, rgba(5,8,19,0.2) 100%)',
      },
      keyframes: {
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ticker': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'ticker': 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
