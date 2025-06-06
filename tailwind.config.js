/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6a00', // specific orange as primary
          dark: '#e55a00',
          light: '#ff7a1a',
        },
        secondary: {
          DEFAULT: '#000000', // pure black secondary
          dark: '#000000',
          light: '#1a1a1a',
        },
        accent: {
          DEFAULT: '#ff6a00', // specific orange accent
          dark: '#e55a00',
          light: '#ff7a1a',
        },
        background: {
          DEFAULT: '#121212', // dark gray background
          light: '#121212',
          dark: '#121212',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(255, 106, 0, 0.5)',
        'accent-glow': '0 0 15px rgba(249, 115, 22, 0.5)',
      },
    },
  },
  plugins: [],
}