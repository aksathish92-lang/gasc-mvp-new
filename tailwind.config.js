/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#6f8aa8',
          500: '#486581',
          600: '#324e6b',
          700: '#243b53',
          800: '#16263b',
          900: '#0d1b2a',
          950: '#08111c',
        },
        maroon: {
          50: '#fdf2f4',
          100: '#fce4e8',
          200: '#f9ccd5',
          300: '#f3a6b5',
          400: '#ea7491',
          500: '#db4c6f',
          600: '#c42e54',
          700: '#a32044',
          800: '#7a1c38',
          900: '#5c1830',
          950: '#3d0f1f',
        },
        gold: {
          50: '#fdfaf3',
          100: '#faf3e3',
          200: '#f4e5c2',
          300: '#ecd091',
          400: '#e2b658',
          500: '#d4a042',
          600: '#bf8534',
          700: '#9c662c',
          800: '#7e5128',
          900: '#6a4426',
          950: '#3d2412',
        },
        cream: {
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f2ebe0',
          300: '#e8ddca',
          400: '#d6c4a6',
          500: '#c2a882',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
