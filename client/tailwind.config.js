/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      textWhiteH: "#E7E9EA",
      textWhite: "#C4C5C6",
      black: "#000000",
      gray100: "#2F3336",
      twitterBlue: "#1D9BF0"
    }
  },
  plugins: [],
};
