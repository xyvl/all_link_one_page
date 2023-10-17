/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px'
      },
      borderRadius: {
        "1/2": "50%",
      },
      width: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%'
      }
    },
    colors: {
      "main-color": "var(--main_color)",
      "main-color-50": "var(--main_color_50)",
      "text-color": "var(--text_color)",
      "text-active-color": "var(--text_active_color)",
      "text-error": "var(--text_error)",
    },
    transitionDuration: {
      "100ms": "0.1s",
      "200ms": "0.2s",
      "400ms": "0.4s",
    },
  },
  plugins: [],
};
