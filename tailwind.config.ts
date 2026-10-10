import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#080909',
        'bg-header': '#050606',
        'bg-secondary': '#111211',
        ivory: '#F2EEE7',
        muted: '#B5AAA0',
        gold: '#C8A66B',
        subtle: '#262522',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
