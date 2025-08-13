/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {      
      colors: {
        pear: {
            50: '#fdffe6',
            100: '#fafec9',
            150: '#f6fdc1',
            200: '#f2fc9a',
            250: '#ebf97d',
            300: '#e4f660',
            350: '#def255',
            400: '#d8ee4a',
            450: '#c6e02d',
            500: '#b4d210',
            550: '#a0bd0c',
            600: '#8da808',
            650: '#7b930a',
            700: '#697f0c',
            750: '#5e710e',
            800: '#546410',
            850: '#4d5c11',
            900: '#465512',
            950: '#252f04'
        }
      },
      fontFamily: {
        heading: ['Montserrat Variable'],
        body: ['Inter Variable']
      }
    }
  },
  plugins: [],
}
