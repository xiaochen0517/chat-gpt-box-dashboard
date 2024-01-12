/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      lineHeight: {
        "11": "2.75rem",
        "12": "3rem",
        "13": "3.25rem",
        "14": "3.5rem",
        "15": "3.75rem",
        "16": "4rem",
      },
      boxShadow: {
        "right": "4px 0px 6px -1px rgb(0 0 0 / 0.1), 2px 0px 4px -2px rgb(0 0 0 / 0.1)",
      }
    },
  },
  plugins: [],
};

