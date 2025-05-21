import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["app/**/*.{tsx,jsx,ts,js}", "components/**/*.{tsx,jsx,ts,js}", "screens/**/*.{tsx,jsx,ts,js}"],
  presets: [require("nativewind/preset")],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: "var(--color-primary-0)",
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
        },
        neutral: {
          white: "var(--color-neutral-white)",
          black: "var(--color-neutral-black)",
          "gray.0": "var(--color-neutral-gray-0)",
          "gray.50": "var(--color-neutral-gray-50)",
          "gray.100": "var(--color-neutral-gray-100)",
        },
        typography: {
          primary: "var(--color-typo-primary)",
          secondary: "var(--color-typo-secondary)",
          disabled: "var(--color-typo-disabled)",
        },
        error: "var(--color-error)",
        backrgound: "var(--color-background)",
      },

      fontFamily: {
        regular: "poppinsRegular",
        medium: "poppinsMedium",
        semiBold: "poppinsSemiBold",
        bold: "poppinsBold",
      },
      fontSize: {
        heading2XL: "40px",
        headingXL: "32px",
        heading: "24px",
        bodyL: "20px",
        body: "16px",
        bodyS: "14px",
        bodyXS: "12px",
        caption: "10px",
      },
      boxShadow: {
        "hard-1": "-2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-2": "0px 3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-3": "2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-4": "0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-5": "0px 2px 10px 0px rgba(38, 38, 38, 0.10)",
        "soft-1": "0px 0px 10px rgba(38, 38, 38, 0.1)",
        "soft-2": "0px 0px 20px rgba(38, 38, 38, 0.2)",
        "soft-3": "0px 0px 30px rgba(38, 38, 38, 0.1)",
        "soft-4": "0px 0px 40px rgba(38, 38, 38, 0.1)",
      },
      // define sizes
      width: {
        icon_default: "30px",
        icon_input: "18px",
      },
      height: {
        icon_default: "30px",
        icon_input: "18px",
      },
    },
  },
  plugins: [gluestackPlugin],
};
