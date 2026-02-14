/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#050a09',
          900: '#1b4332',
          800: '#2d6a4f',
          700: '#40916c',
          600: '#52b788',
          500: '#74c69d',
          400: '#95d5b2',
          300: '#b7e4c7',
          200: '#d8f3dc',
        },
        ocean: {
          600: '#0077b6',
          500: '#0096c7',
          400: '#48cae4',
        }
      },
    },
  },
  plugins: [],
}
