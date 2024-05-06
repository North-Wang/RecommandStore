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
        blue: "#87D4FF",
        lightBlue: "#c1e4ff",
        darkBlue: "#c1e4ff",
        yellow: "#FFDA7B",
        darkYellow: "#E09A30",
        red: "#FF6B6B",
        lightGray: "#ededed",
      },
    },
  },
  plugins: [require("tailwindcss")],
};
