import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      colors: {
        industrial: {
          950: '#0F1A26',
          900: '#1A2B3C',
          800: '#253649',
          700: '#344863',
          600: '#44577A',
        },
        alert: {
          400: '#F5B041',
          500: '#F39C12',
          600: '#D98706',
          700: '#B36F04',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          cyan: '#22D3EE',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'ui-monospace',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        elev: '0 10px 30px -12px rgba(15, 26, 38, 0.35)',
        card: '0 1px 2px rgba(15,26,38,0.06), 0 8px 24px -12px rgba(15,26,38,0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(243, 156, 18, 0.55)' },
          '70%': { boxShadow: '0 0 0 12px rgba(243, 156, 18, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(243, 156, 18, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-ring': 'pulse-ring 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
