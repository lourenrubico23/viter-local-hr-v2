/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color) / <alpha-value>)",
        secondary: "rgb(var(--secondary-color) / <alpha-value>)",
        accent: "rgb(var(--accent-color) / <alpha-value>)",
        dark: "rgb(var(--dark-color) / <alpha-value>)",
        lightWarning: "rgb(var(--lightWarning-color) / <alpha-value>)",
        warning: "rgb(var(--warning-color) / <alpha-value>)",
        alert: "rgb(var(--alert-color) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
