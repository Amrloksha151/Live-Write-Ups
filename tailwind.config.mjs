import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Legacy colors (kept for backwards compatibility)
        space: '#2B2D42',
        slate: '#8D99AE',
        snow: '#EDF2F4',
        crimson: '#EF233C',
        scarlet: '#D90429',
        // New dark theme colors
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'frost': '#E2E8F0',
        'neon-cyan': '#00FFFF',
        'neon-green': '#00FF00',
        'neon-magenta': '#FF00FF',
        'neon-orange': '#FF6600',
      },
      fontFamily: {
        // Legacy fonts (kept for backwards compatibility)
        syne: ['Syne', ...defaultTheme.fontFamily.sans],
        dm: ['DM Sans', ...defaultTheme.fontFamily.sans],
        // New fonts
        display: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        'space-mono': ['Space Mono', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'reveal': 'reveal 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { 'text-shadow': '0 0 10px currentColor' },
          '50%': { 'text-shadow': '0 0 20px currentColor' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
