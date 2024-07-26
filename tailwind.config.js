/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#af791f',
        light: '#c68a22',
        dark: '#996a19',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('flowbite/plugin')],
  darkMode: 'false',
};
