/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /p-.+/,  // This will preserve all PrimeNG classes that start with 'p-'
    }
  ],
}

