/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        //要超過此寬度才會套用
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },

    // colors: {
    // "hover-blue": "#4baaf5", //button hover background-color
    // },
  },
  plugins: [require("tailwindcss")],
};
// export default {
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       screens: {
//         //要超過此寬度才會套用
//         sm: "640px",
//         // => @media (min-width: 640px) { ... }

//         md: "768px",
//         // => @media (min-width: 768px) { ... }

//         lg: "1024px",
//         // => @media (min-width: 1024px) { ... }

//         xl: "1280px",
//         // => @media (min-width: 1280px) { ... }

//         "2xl": "1536px",
//         // => @media (min-width: 1536px) { ... }
//       },
//     },
//   },
//   plugins: [require("tailwindcss")],
// };
