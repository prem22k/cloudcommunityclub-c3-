const plugin = require('tailwindcss/plugin')
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        extend: {
            keyframes: {
                heartbeat: {
                    '0%': { transform: 'scale(1)' },
                    '14%': { transform: 'scale(1.1)' },
                    '28%': { transform: 'scale(1)' },
                    '42%': { transform: 'scale(1.1)' },
                    '70%': { transform: 'scale(1)' }
                }
            },
            animation: {
                heartbeat: 'heartbeat 2s ease-in-out infinite'
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 12px var(--tw-shadow-color)',
            },
            colors: {
                lightpall: '#fcd690',
                medpall: '#c9aa72',
                darkpall: '#493d29',
            },
            screens: {
                '3xl': '1600px',
                '4xl': '1800px',
                'wide': '2200px',
                'uwide': '3000px',
                'uuwide': '3600px',
            }
        },

        fontFamily: {
            sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
            display: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
            mono: ['var(--font-jetbrains)', ...defaultTheme.fontFamily.mono],
        },
    },

    variants: {
        extend: {
            visibility: ['group-hover'],
            animation: ['hover', 'focus'],
        },
    },

    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme('textShadow') }
            )
        }),
    ],
}