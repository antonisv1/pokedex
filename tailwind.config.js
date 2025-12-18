/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Press Start 2P"', '"Pixelade"', 'monospace'],
      },
      colors: {
        pokedex: {
          red: '#ff0000',
          dark: '#222',
          light: '#f5f5f5',
        }
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}
