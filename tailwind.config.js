/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  purge: {
    enabled: false,
    content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          "01": "#639D87",
          "02": "#38415A",
          "03": "#A2BE95",
          "04": "#AE9F2E",
          "05": "#734705",
          "06": "#E6E4D9",
        },
        gray: {
          "01": "#1E1E1E",
          "02": "#8A8B8A",
          "03": "#BEC2BD",
          "04": "#FAFAFA",
        },
        line: "#DFDCC5",
      },
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"],
        GenRyuMin: ["GenRyuMin JP"],
      },
      backgroundImage: {
        bgImage: "url(./src/assets/Background.png)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
