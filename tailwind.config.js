/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: ["Roboto Mono", "ui-monospace"],
      },
      colors: {
        primary: {
          50: "#eeedf0",
          100: "#dddbe0",
          200: "#bbb7c1",
          300: "#9a93a3",
          400: "#786f84",
          500: "#564b65",
          600: "#453c51",
          700: "#342d3d",
          800: "#221e28",
          900: "#110f14",
        },
        secondary: {
          50: "#e9eaea",
          100: "#d3d4d5",
          200: "#a7a9ab",
          300: "#7b7e80",
          400: "#4f5356",
          500: "#23282c",
          600: "#1c2023",
          700: "#15181a",
          800: "#0e1012",
          900: "#070809",
        },
      },
    },
  },
  plugins: [],
};
