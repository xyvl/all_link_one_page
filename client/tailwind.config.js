/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      "main-color": "var(--main_color)",
      "text-color": "var(--text_color)",
      "text-active-color": "var(--text_active_color)",
    },
    transitionDuration: {
      "100ms": "0.1s",
      "200ms": "0.2s",
      "400ms": "0.4s",
    },
  },
  plugins: [],
};
