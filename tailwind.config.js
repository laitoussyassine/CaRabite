/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        btnbg:"#011e9f",
        mainColoe: "#032098",
        loginBg:"#f4e101"
      }
    },
  },
  plugins: [],
}