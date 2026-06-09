/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        portal: '#97ce4c',
        space: '#0b1120',
      },
      fontFamily: {
        display: ['"Trebuchet MS"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
