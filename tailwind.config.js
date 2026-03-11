/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gaming: {
          bg: '#000000',
          gold: '#FFD700',
          darkGold: '#B8860B',
          gray: '#1a1a1a',
          lightGray: '#333333',
          neon: '#00FF41',
          neonBlue: '#00D9FF',
        }
      },
      fontFamily: {
        gaming: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700',
        'neon-blue': '0 0 10px #00D9FF, 0 0 20px #00D9FF',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700' },
          '100%': { boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700' },
        }
      }
    },
  },
  plugins: [],
}
