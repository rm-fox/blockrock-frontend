module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1200px'
  },
  theme: {
    extend: {
      colors: {
        'primary': '#1e1e1e',
        'secondary': '#ffe600',
        'secondary-low': '#ffe600cc'
      }
    },
  },
}
