import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#0B192C',
        'slate-dark': '#0F172A',
        'aero-blue': '#0284C7',
        'electric-cyan': '#00D2FE',
        'titanium-gray': '#1E293B',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['clamp(2.25rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-sm': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.005em' }],
        'body-base': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em', textTransform: 'uppercase' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      // Opacity steps actually used by the design tokens in src/styles/global.css
      // and in the components. Tailwind ships 0,5,10,20,25,30,40,50,60,70,75,80,
      // 90,95,100; without these steps border-electric-cyan/18, bg-slate-dark/85,
      // bg-aero-blue/15 and text-pure-white/45 resolve to nothing and @apply throws.
      opacity: {
        15: '0.15',
        18: '0.18',
        22: '0.22',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
      },

      backdropBlur: {
        'glass': '12px',
        'glass-lg': '20px',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 210, 254, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 254, 0.03) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(2, 132, 199, 0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid-64': '64px 64px',
      },
      boxShadow: {
        'glass': '0 4px 24px -4px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 210, 254, 0.1) inset',
        'glass-lg': '0 8px 48px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 210, 254, 0.12) inset',
        'glow-cyan': '0 0 32px -4px rgba(0, 210, 254, 0.25)',
        'glow-blue': '0 0 24px -4px rgba(2, 132, 199, 0.3)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-in': 'fadeIn 600ms ease-out forwards',
        'slide-up': 'slideUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
};
