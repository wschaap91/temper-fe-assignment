/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lavender: {
                    200: '#E0DDEF',
                    500: '#6357B1'
                },
                mint: {
                    500: '#25FF90',
                    600: '#21E682'
                }
            }
        },
    },
    plugins: [],
}
