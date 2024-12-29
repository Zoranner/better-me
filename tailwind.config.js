/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/flyonui/dist/js/*.js',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flyonui'), require('flyonui/plugin')],
};
