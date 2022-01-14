const plugin = require('tailwindcss/plugin')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': withOpacity('--color-deep-blue'),
        'dark-blue': withOpacity('--color-dark-blue'),
        'dark-purple': withOpacity('--color-dark-purple'),
        'red': withOpacity('--color-red'),
        'purple': withOpacity('--color-purple'),
        'green': withOpacity('--color-green'),
        'orange': withOpacity('--color-orange'),
        'paid': withOpacity('--color-paid'),
        'pending': withOpacity('--color-pending'),
        'draft': withOpacity('--color-draft'),
      },
      zIndex: {
        '99': '99'
      },
      screens: {
        dl: '900px'
      },
      minWidth: {
        '45': '90px'
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        }
      })
    })
  ],
}