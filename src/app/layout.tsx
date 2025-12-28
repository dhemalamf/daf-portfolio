import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
    title: "Dhema'alam Fajrianto | Product Manager",
    description: 'Product Manager with 4+ years of experience across fintech, edtech, government/BUMN, and AI-enabled web platforms. Delivering measurable business impact through strategic product leadership.',
    keywords: ['Product Manager', 'Fintech', 'Edtech', 'AI', 'Indonesia', 'Dhema'],
    authors: [{ name: "Dhema'alam Fajrianto" }],
    openGraph: {
        title: "Dhema'alam Fajrianto | Product Manager",
        description: 'Product Manager with 4+ years of experience delivering measurable business impact.',
        type: 'website',
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
