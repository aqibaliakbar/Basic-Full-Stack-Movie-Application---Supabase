/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2BD17E", // Replace with your desired color for primary
        error: "#EB5757", // Replace with your desired color for error
        input: "#224957", // Replace with your desired color for input background
        background: "#093545", // Replace with your desired color for background
        card: "#092C39", // Replace with your desired color for card background
      },
    },
  },
  plugins: [],
};

