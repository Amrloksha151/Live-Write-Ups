import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        space: '#2B2D42',
        slate: '#8D99AE',
        snow: '#EDF2F4',
        crimson: '#EF233C',
        scarlet: '#D90429',
      },
      fontFamily: {
        syne: ['Syne', ...defaultTheme.fontFamily.sans],
        dm: ['DM Sans', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
