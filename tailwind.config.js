import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],
    darkTheme: false,
    base: true,
    styled: true,
    utils: true,
    logs: true,
    themeRoot: ":root",
  },
};
