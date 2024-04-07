/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        btnbg:"#011e9f",
        mainColoe: "#032098",
        loginBg:"#f4e101",
        cardBg: "#2F3967",
        cardHoverBg: "#2750a4",
        textCardColor: "#cedcf5"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}