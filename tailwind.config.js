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
  plugins: [],
}