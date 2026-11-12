/** @type {import('tailwindcss').Config} */
export default {
  // src/data is content, not UI — keep it out of the class scan
  content: ["./index.html", "./src/**/*.tsx", "./src/lib/**/*.ts"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Hind Siliguri", "system-ui", "sans-serif"],
        bn: ["Hind Siliguri", "Noto Sans Bengali", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "Hind Siliguri", "monospace"],
      },
    },
  },
  plugins: [],
};
