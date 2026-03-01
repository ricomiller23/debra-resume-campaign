import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                serif: ["Georgia", "serif"],
            },
            colors: {
                navy: {
                    900: "#060d1f",
                    800: "#0a1628",
                    700: "#0f2040",
                    600: "#152a54",
                },
                violet: {
                    400: "#a78bfa",
                    500: "#8b5cf6",
                    600: "#7c3aed",
                },
                rose: {
                    400: "#e879a0",
                    500: "#ec4899",
                },
            },
        },
    },
    plugins: [],
};

export default config;
