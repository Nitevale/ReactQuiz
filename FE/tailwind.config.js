/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/assets/Quizernia.png')",
        'wallpaper': "url('/src/assets/BGQUIZ.png')",
      },
      colors: {
        theme: {
          lightest: '#fff',
          lighter: '#FFF8F3',
          light: '#F7E7DC',
          base: '#758694',
          dark: '#405D72',
          ERNI: '#073779',
        },
      },
    },
  },
  plugins: [],
}

