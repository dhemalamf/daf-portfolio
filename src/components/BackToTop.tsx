'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    if (!visible) return null

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-testid="back-to-top"
            className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-foreground text-background flex items-center justify-center border border-foreground hover:bg-vermillion hover:border-vermillion transition-colors"
            aria-label="Back to top"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    )
}
