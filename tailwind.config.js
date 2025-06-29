/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Times New Roman", "Georgia", "serif"],
        sans: ["Inter", "Roboto", "sans-serif"],
      },
      colors: {
        amber: {
          500: "#D4A574",
          700: "#B8860B",
          600: "#B8860B",
        },
        "deep-brown": {
          700: "#8B4513",
          900: "#654321",
        },
        cream: {
          50: "#FFF8DC",
          100: "#F5F5DC",
        },
        copper: "#B87333",
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
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
