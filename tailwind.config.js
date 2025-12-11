/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playball: ['Playball', 'cursive'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // plugin ditambahkan di sini
  ],
}