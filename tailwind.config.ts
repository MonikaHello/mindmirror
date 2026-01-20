import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // MindMirror brand colors
        brand: {
          navy: '#0f0f1a',
          slate: '#1a1a2e',
          blue: '#4a6fa5',
          'blue-light': '#a8c5da',
          copper: '#d4a574',
          'copper-dark': '#a56f4a',
        },
        feeling: {
          anxious: '#E8B4B8',
          sad: '#A8C5DA',
          angry: '#D4A5A5',
          frustrated: '#C9B1D4',
          overwhelmed: '#B8C5B8',
          hopeless: '#C4B8A8',
          ashamed: '#D4C5B8',
          lonely: '#A8B8C8',
          calm: '#B8D4C8',
          happy: '#D4D8A8',
          irritable: '#D4B8B8',
          numb: '#B0B0B0',
          guilty: '#C8B8D4',
          jealous: '#B8D4B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
export default config
