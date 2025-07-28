/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F4F2FF',
          100: '#E9E5FF',
          200: '#D4CCFF',
          300: '#BEB2FF',
          400: '#A399FF',
          500: '#5B47E0',
          600: '#5B47E0',
          700: '#4A38B8',
          800: '#3B2A8F',
          900: '#2C1D66',
        },
        secondary: {
          50: '#F4F2FF',
          100: '#E9E5FF',
          200: '#D4CCFF',
          300: '#BEB2FF',
          400: '#A399FF',
          500: '#8B7FE8',
          600: '#7B6FE5',
          700: '#6B5FE2',
          800: '#5B4FDF',
          900: '#4B3FDC',
        },
        accent: {
          50: '#FFF8ED',
          100: '#FFF0DB',
          200: '#FFE1B7',
          300: '#FFD293',
          400: '#FFC36F',
          500: '#FFB547',
          600: '#E69A3D',
          700: '#CC7F33',
          800: '#B36429',
          900: '#99491F',
        },
        background: '#F8F7FE',
        surface: '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        'confetti': 'confetti 0.8s ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '60%': { transform: 'translateY(-4px)' },
        },
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}