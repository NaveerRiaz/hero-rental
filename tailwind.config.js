/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'spin-slow-reverse': 'spin-reverse 10s linear infinite',
        'scroll-right': 'scroll-right 10s linear infinite',
        'scroll-left': 'scroll-left 10s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
