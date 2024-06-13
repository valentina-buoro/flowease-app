/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
      colors:{
        primaryBlue: "#15226C",
        primaryGreen: "#268D31",
        secondaryGrey: "#8E8E93",
        borderGrey:"#FAF2F2",
        secondaryBorderGrey:"#D9D9D9",
        textBlack: "#020202",
        secondaryTextBlack: "#1A1817",
        textGrey:"#979797",
      }
    },
    plugins: [],
  }
  