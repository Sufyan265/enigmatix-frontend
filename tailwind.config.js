/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#556ee6',
        secondary: '#d4dbf9',
      },
    },
  },
  plugins: [],
}