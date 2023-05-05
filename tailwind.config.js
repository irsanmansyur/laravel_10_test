const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    light: "#2BAE66FF",
                    DEFAULT: "#2C5F2D",
                    dark: "#408EC6",
                },
                secondary: { DEFAULT: "#97BC62FF" },
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
