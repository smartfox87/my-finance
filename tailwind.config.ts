import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/features/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      "3xs": "340px",
      "2xs": "380px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#121212",
        "dark-modal": "#1f1f1f",
        "primary-gray": "#9b9b9b",
        "dark-gray": "#424242",
        "darkest-gray": "#1f1f1f",
        "primary-blue-opacity": "rgba(22, 104, 220, 0.5)",
        "primary-blue": "#1668dc",
        "darkest-blue": "#111a2c",
      },
    },
  },
  plugins: [],
};
export default config;
