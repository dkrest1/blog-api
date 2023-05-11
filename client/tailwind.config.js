/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
}