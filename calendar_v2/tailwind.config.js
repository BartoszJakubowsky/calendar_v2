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
          //white
          'baseColor' : '#ffffff',

          'dark-baseColor' : '#000000',
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
      },
      boxShadow: {
        'bottom-right' : '10px 10px 0px 0px'
      }
    },
    },
  plugins: [],
  darkMode: 'class',
}