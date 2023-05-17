/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT( {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    // "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        swipeLeft:{
          '0%, 10%':{transform: ' translate(-400px)'},
          '80%, 100%':{transform: ' translate(0px)'},
        },
        swipeRight:{
          '0%, 10%':{transform: ' translate(400px)'},
          '80%, 100%':{transform: ' translate(0px)'},
        },
      },
      animation:{
        'swipeInLeft': 'swipeLeft 1s',
        'swipeInRight': 'swipeRight 1s'
      }
    },
  },
  plugins: [],
})