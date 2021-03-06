module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['chiayifont', 'sans-serif'],
      },
      width: {
        '980p': '980px'
      }
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { min: '767px', max: '1022px' },
      // => @media (max-width: 767px) { ... }

      sm: { min: '0px', max: '766px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
