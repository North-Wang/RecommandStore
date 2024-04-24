/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        //@media (max-width: ...){}
        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "1536px",
      },
      colors: {
        blue: "#4baaf5",
        secondBlue: "#87D4FF",
        lightBlue: "#c1e4ff",
      },
    },
  },
  plugins: [require("tailwindcss")],
};
