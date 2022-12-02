// { import('tailwindcss').Config }
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f58614',
        'primary-100': '#F3AD65',
        'secondary': '#f1471f'
      },
      gridTemplateColumns: {
        'panel': '1fr 7fr',
        'search': '5fr 1fr'
      }
    }
  },
  plugins: [],
}