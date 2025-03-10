/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        circularScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Moves by half, then loops
        },
        circularScrolll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-50%)' }, // Moves by half, then loops
        },
      },
      animation: {
        circularLoop: 'circularScroll 10s infinite', // Steps create the circular effect
        circularLooop: 'circularScrolll 10s infinite', // Steps create the circular effect
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}

