import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                surface: 'hsl(var(--surface))',
                ink: 'hsl(var(--ink))',
                paper: 'hsl(var(--paper))',
                cobalt: {
                    DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                    800: '#1E40AF',
                    900: '#1E3A8A',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            letterSpacing: {
                'tightest': '-0.04em',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'blink': 'blink 1.2s steps(2, end) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            // Blog article typography is driven by the editorial tokens so prose
            // inherits light/dark theming automatically.
            typography: (theme: (path: string) => string) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': 'hsl(var(--foreground) / 0.82)',
                        '--tw-prose-headings': 'hsl(var(--foreground))',
                        '--tw-prose-lead': 'hsl(var(--foreground) / 0.75)',
                        '--tw-prose-links': 'hsl(var(--primary))',
                        '--tw-prose-bold': 'hsl(var(--foreground))',
                        '--tw-prose-counters': 'hsl(var(--foreground) / 0.55)',
                        '--tw-prose-bullets': 'hsl(var(--foreground) / 0.35)',
                        '--tw-prose-hr': 'hsl(var(--border))',
                        '--tw-prose-quotes': 'hsl(var(--foreground) / 0.8)',
                        '--tw-prose-quote-borders': 'hsl(var(--primary))',
                        '--tw-prose-captions': 'hsl(var(--foreground) / 0.55)',
                        '--tw-prose-code': 'hsl(var(--foreground))',
                        '--tw-prose-pre-code': 'hsl(var(--background))',
                        '--tw-prose-pre-bg': 'hsl(var(--foreground))',
                        '--tw-prose-th-borders': 'hsl(var(--border))',
                        '--tw-prose-td-borders': 'hsl(var(--border))',
                        maxWidth: 'none',
                    },
                },
                'lg': {
                    css: {
                        fontSize: '1.0625rem',
                        lineHeight: '1.85',
                    },
                },
            }),
        },
    },
    plugins: [typography],
}

export default config
