/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // HistoricMe Brand Colors
        'historic-burgundy': '#7B1E1E',
        'historic-navy': '#1E2A78',
        'historic-gold': '#D4AF37',
        'historic-cream': '#F5F0E6',
        'historic-black': '#000000',
        
        // Extended palette for variations
        'burgundy-light': '#9A2A2A',
        'burgundy-dark': '#5C1515',
        'navy-light': '#2A3A8A',
        'navy-dark': '#141E5C',
        'gold-light': '#E6C547',
        'gold-dark': '#B8941F',
        'cream-light': '#FAF8F3',
        'cream-dark': '#E8E0D3',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'historic': '0 4px 20px rgba(30, 42, 120, 0.15)',
        'historic-lg': '0 8px 32px rgba(30, 42, 120, 0.2)',
      }
    },
  },
  plugins: [],
}
