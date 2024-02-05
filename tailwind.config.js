const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: { 
      'sm': { 'min': '0px', 'max': '639px' },
      'md': { 'min': '640px', 'max': '767px' },
      'lg': { 'min': '768px', 'max': '1023px' }
    }, 
  },
  plugins: [],
  theme: {
    screens: Object.fromEntries(
      Object.entries(defaultTheme.screens).filter(([key, value]) => ['sm', 'md', 'lg'].includes(key))
    )
  }
}

