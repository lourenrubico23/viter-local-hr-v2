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

      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(2px)" },
          "50%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(10px)" },
        },
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      boxShadow: {
        custom: "0 3px 10px rgba(0,0,0,0.2)",
      },
      animation: {
        shake: "shake .2s ease-in-out",
        fadeIn: "fadeIn .2s ease-in-out",
        fadeOut: "fadeOut .2s ease-in-out",
        slideUp: "slideUp .2s ease-in-out",
        slideDown: "slideDown .2s ease-in-out",
        loading: "loading 1.5s ease-in infinite",
      },
    },
  },
  plugins: [],
};
