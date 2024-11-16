/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: ' #292C61',
                primaryText: '#6A6D7C',
            },
        },
    },
    plugins: [],
};
