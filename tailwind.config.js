/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '4xl': '60px',
        '3.5xl': '45px'
      },
      screens: {
        'sm': {
          'max': '640px'
        }
      }
    },
  },
  plugins: [],
}