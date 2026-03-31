import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fc4612',
        background: '#0A0A0A',
        surface: '#111111',
        border: '#1e1e1e',
      },
      fontFamily: {
        title: ['North Bay Grotesk', 'Inter', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        signature: ['"The Nautigal"', 'cursive'],
      },
      screens: {
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} satisfies Config
