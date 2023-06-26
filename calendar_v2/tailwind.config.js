/** @type {import('tailwindcss').Config} */


function color(color) {
  return ({opacityValue}) =>
  {
    return opacityValue !== undefined ? `rgba(var(${color}), ${opacityValue})` : `rgba(var(${color}))`
  }
}


export default {
  mode: 'JIT',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          'base' : '#ffffff',
          //indigo-100
          'accentLight' : '#f3e8ff',
          //purple-300
          'accentMedium' : '#d8b4fe',
          //purple-400
          'accentMediumStrong' : '#c084fc',
          //purple-700
          'accentStrong' : '#7e22ce',
          //purple-600
          'accentStrongHover' : '#9333ea'
      },
      dark :{
        'accentMedium' : '#881337',
      }
    },
    },
  plugins: [],
  darkMode: 'class',
}