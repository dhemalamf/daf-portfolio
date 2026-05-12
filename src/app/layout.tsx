import type { Metadata } from 'next'
import { Instrument_Serif, Geist, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import StudioShortcut from '@/components/StudioShortcut'
import SmoothScroll from '@/components/SmoothScroll'

const serif = Instrument_Serif({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
    variable: '--font-serif',
    display: 'swap',
})

const sans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

const mono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://dhema.me'),
    title: "Dhema'alam Fajrianto — Product Manager",
    description:
        'Product Manager with 4+ years of experience across fintech, edtech, government/BUMN, and AI-enabled web platforms.',
    keywords: ['Product Manager', 'Fintech', 'Edtech', 'AI', 'Indonesia', 'Dhema'],
    authors: [{ name: "Dhema'alam Fajrianto" }],
    openGraph: {
        title: "Dhema'alam Fajrianto — Product Manager",
        description:
            'Product Manager with 4+ years of experience delivering measurable business impact.',
        url: 'https://dhema.me',
        siteName: 'Dhema Portfolio',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dhema Portfolio' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Dhema'alam Fajrianto — Product Manager",
        description:
            'Product Manager with 4+ years of experience delivering measurable business impact.',
        images: ['/og-image.png'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={`${serif.variable} ${sans.variable} ${mono.variable}`}
            suppressHydrationWarning
        >
            <body className="min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
                <Suspense fallback={null}>
                    <GoogleAnalytics />
                </Suspense>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <SmoothScroll>
                        <StudioShortcut />
                        <Navigation />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    )
}
