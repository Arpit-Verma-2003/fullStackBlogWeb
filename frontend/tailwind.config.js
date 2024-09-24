/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '300': '300px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

