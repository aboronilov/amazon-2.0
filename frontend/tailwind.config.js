/** @type {import('tailwindcss').Config} */

const twColors = require("tailwindcss/colors") 

const colors = {
  transparent: twColors.transparent,
  black: twColors.black,
  white: twColors.white
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
}

