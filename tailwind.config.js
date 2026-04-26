/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./node_modules/flowbite/**/*.js"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#dc8215",
        dark: "#1d155b",
        light: "#fff6ec",
        accent: "#ffb347"
      }
    }
  },

  plugins: [
    require("flowbite/plugin")
  ]
}
