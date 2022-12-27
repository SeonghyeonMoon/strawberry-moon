/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['border-b-black', 'border-b-red-600', 'border-b-blue-600'],
  theme: {
    extend: {},
  },
  plugins: [],
};
