/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0A2E63',
        'leaf-green': '#4CAF50',
        'white': '#FFFFFF',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        maxWidth: {
          'custom': '1200px',
        },
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1440px',
      },
    },
  },
  plugins: [],
}