/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fdfbf7',
        foreground: '#3b3733',
        primary: {
          DEFAULT: '#d4a574',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f5ede4',
          foreground: '#3b3733',
        },
        accent: {
          DEFAULT: '#e8c4a8',
        },
        muted: {
          DEFAULT: '#f5ede4',
          foreground: '#857b76',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#3b3733',
        },
        border: '#e8ded3',
        input: '#ffffff',
        destructive: '#d4183d',
      },
      fontFamily: {
        serif: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
