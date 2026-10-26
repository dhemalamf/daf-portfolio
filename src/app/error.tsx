'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function GlobalRouteError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="pt-32 md:pt-40 pb-24">
            <div className="section-container max-w-2xl">
                <div className="mono-label text-vermillion mb-4">Error</div>
                <h1 className="heading-2 text-balance mb-4">
                    Something went <span className="ital text-vermillion">wrong</span>.
                </h1>
                <p className="text-foreground/70 leading-relaxed mb-8">
                    This page could not be rendered. It may be a temporary problem —
                    retrying usually helps.
                </p>
                <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={reset} className="btn-ink">
                        Try again
                    </button>
                    <Link href="/" className="btn-outline">
                        Back home
                    </Link>
                </div>
                {error.digest && (
                    <p className="mono-label text-foreground/40 mt-8">
                        Reference: {error.digest}
                    </p>
                )}
            </div>
        </div>
    )
}
