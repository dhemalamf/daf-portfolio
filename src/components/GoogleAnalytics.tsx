'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Measurement ID - using hardcoded fallback to ensure it works in production
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-CN20Z12C8C'

export default function GoogleAnalytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Track page views on route change
    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

        // Send pageview to GA
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: url,
            })
        }
    }, [pathname, searchParams])

    // Don't render if no measurement ID (but with fallback, this shouldn't happen)
    if (!GA_MEASUREMENT_ID) {
        return null
    }

    return (
        <>
            {/* Google Analytics Script */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            send_page_view: true
                        });
                    `,
                }}
            />
        </>
    )
}

// Declare gtag on window for TypeScript
declare global {
    interface Window {
        gtag: (...args: any[]) => void
        dataLayer: any[]
    }
}
