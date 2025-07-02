/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "Roboto", "sans-serif"],
      },
      colors: {
        "deep-navy": {
          800: "#2C3E50", 
          900: "#1A2332", 
        },
        gold: {
          500: "#FFD700",
          600: "#DAA520", 
        },
        "dark-gray": {
          700: "#2F3640", 
        },
        "light-gray": {
          50: "#F8F9FA", 
        },
        "accent-orange": {
          500: "#FF6B35", 
        },
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow-gold': '0 0 15px rgba(255, 215, 0, 0.3)', 
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
