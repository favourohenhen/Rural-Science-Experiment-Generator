/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        warm: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f5dbb0',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
      },
    },
  },
  plugins: [],
}
