/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'electric-purple': '#BF00FF',
                'gold': '#FFD700',
                'slate-950': '#020617', // Ensuring deep dark base
            },
            fontFamily: {
                sans: ['"Happy Monkey"', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
