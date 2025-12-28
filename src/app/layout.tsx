import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
    metadataBase: new URL('https://dhema.me'),
    title: "Dhema'alam Fajrianto | Product Manager",
    description: 'Product Manager with 4+ years of experience across fintech, edtech, government/BUMN, and AI-enabled web platforms.',
    keywords: ['Product Manager', 'Fintech', 'Edtech', 'AI', 'Indonesia', 'Dhema'],
    authors: [{ name: "Dhema'alam Fajrianto" }],
    openGraph: {
        title: "Dhema'alam Fajrianto | Product Manager",
        description: 'Product Manager with 4+ years of experience delivering measurable business impact.',
        url: 'https://dhema.me',
        siteName: 'Dhema Portfolio',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: "Dhema'alam Fajrianto | Product Manager Portfolio",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Dhema'alam Fajrianto | Product Manager",
        description: 'Product Manager with 4+ years of experience delivering measurable business impact.',
        images: ['/og-image.png'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="min-h-screen flex flex-col">
                <GoogleAnalytics />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <Navigation />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
