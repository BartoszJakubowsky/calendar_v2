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
      textColor :{
        form:{
          'accent': color(`--color-text-accent`),
          'base': color(`--color-text-base`),
          'input': color(`--color-text-input`),
        }
      },
      backgroundColor :{
        form :{
          'accent': color(`--color-background-accent`),
          'base': color(`--color-background-base`),
        }
      },
      borderColor: {
        form: {
          'accent-focus': color(`--color-border-focus`),
          
        }, 
        ringColor : {
          form:{
            'accent-focus': color(`--color-ring-focus`)
          }
        }

      }
    },
  },
  plugins: [],
  darkMode: 'class',
}