/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3D52A0', // Deep Periwinkle
                    light: '#7091E6', // Cornflower Blue
                    dark: '#314175', // Midnight Blue
                },
                accent: {
                    DEFAULT: '#EA580C', // Burnt Orange
                    secondary: '#C2410C', // Rust
                },
                background: '#EDE8F5', // Lavender Mist
                surface: '#FFFFFF',
                text: {
                    main: '#1F2937', // Dark Gray
                    muted: '#6B7280',
                },
                border: '#E5E7EB',
                success: '#10B981',
                error: '#EF4444',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'], // Assuming serif usage based on 'font-serif' class seen in Layout
                sans: ['"Inter"', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
