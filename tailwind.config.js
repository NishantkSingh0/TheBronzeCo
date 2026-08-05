/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50:  '#fdf6ee',
          100: '#f5e8d0',
          200: '#e9cfa0',
          300: '#d4a847',
          400: '#c5922a',
          500: '#a3751f',
          600: '#7a5418',
          700: '#4a2000',
          800: '#3d1a00',
          900: '#2a1000',
        },
        cream: {
          50:  '#ffffff',
          100: '#fdfaf4',
          200: '#f5ecd7',
          300: '#ede0c4',
          400: '#e0cfaa',
          500: '#cdb98a',
        },
      },
      fontFamily: {
        serif:  ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease both',
        'fade-in':    'fadeIn 1s ease both',
        'line-grow':  'lineGrow 1.2s ease both',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: 0, transform: 'translateY(32px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        lineGrow: { '0%': { scaleX: 0 }, '100%': { scaleX: 1 } },
        shimmer:  { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
      },
    },
  },
  plugins: [],
};
