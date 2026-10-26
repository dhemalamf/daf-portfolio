'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { gaMeasurementId } from '@/lib/config'

export default function GoogleAnalytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const isInitialRoute = useRef(true)

    // The inline config below sends the first page view (send_page_view: true).
    // This effect reports only client-side navigations, so the landing page is
    // never counted twice.
    useEffect(() => {
        if (isInitialRoute.current) {
            isInitialRoute.current = false
            return
        }

        if (typeof window.gtag !== 'function') return

        const query = searchParams?.toString()
        const pagePath = pathname + (query ? `?${query}` : '')

        window.gtag('event', 'page_view', {
            page_path: pagePath,
            page_location: window.location.href,
            page_title: document.title,
        })
    }, [pathname, searchParams])

    if (!gaMeasurementId) return null

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
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
                        gtag('config', ${JSON.stringify(gaMeasurementId)}, {
                            send_page_view: true
                        });
                    `,
                }}
            />
        </>
    )
}
