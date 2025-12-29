'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function GoogleAnalytics() {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Only load GA in production
    const isProduction = process.env.NODE_ENV === 'production'

    useEffect(() => {
        if (!measurementId || !isProduction) return

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

        // @ts-ignore
        if (typeof window.gtag === 'function') {
            // @ts-ignore
            window.gtag('config', measurementId, {
                page_path: url,
            })
        }
    }, [pathname, searchParams, measurementId, isProduction])

    if (!measurementId || !isProduction) {
        return null
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${measurementId}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}
