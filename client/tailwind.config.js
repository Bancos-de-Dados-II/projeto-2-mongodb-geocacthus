/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/index.html", 
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
