/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white2: "#F3F5F7",
        white1: "#F4F7FE",
        yellow: "#FFBE00",
        green: "#1DAB87",
        gray2: "#596780",
        gray3: "#90A3BF",
        lightGray: "#A3AED0",
        smokeGray: "#F0F0F0",
        primary: "#FE9F00",
        soft: "#9F9F9F",
        darkSoft: "#6B6B6B",
      },
      fontFamily: {
        dm: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        xxs: "10px",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        "border-spin": "border-spin 5s linear infinite",
      },
      backgroundImage: {
        "card-background":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
