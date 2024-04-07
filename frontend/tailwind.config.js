/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        modal: {
          '0%': { width: '0%' },
          '100%': { width: '100%'},
        }
      },
      animation: {
        modal: 'modal 20s ease-in',
      }
    },
  },
  plugins: [],
}

