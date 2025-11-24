/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#CCFF00',
          hover: '#b3e600',
        },
        dark: {
          bg: '#0f1014',
          card: '#1a1c23',
          border: '#2a2d3a',
        }
      }
    },
  },
  plugins: [],
}