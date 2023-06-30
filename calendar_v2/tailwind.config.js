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
          //indigo-100 indigo 500
          'accentLight' : '#f3e8ff',
          'dark-accentLight' : '#6366f1',
          //purple-300 indigo-600
          'accentMedium' : '#d8b4fe',
          'dark-accentMedium' : '#4f46e5',
          //purple-400 indigo 700
          'accentMediumStrong' : '#c084fc',
          'dark-accentMediumStrong' : '#4338ca',
          //purple-700 indigo-
          'accentStrong' : '#7e22ce',
          'dark-accentStrong' : '#1e1b4b',
          //purple-600
          'accentStrongHover' : '#9333ea',
          'dark-accentStrongHover' : '#312e81',

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