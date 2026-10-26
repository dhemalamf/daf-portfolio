import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="pt-32 md:pt-40 pb-24">
            <div className="section-container max-w-3xl">
                <div className="mono-label text-vermillion mb-4">404</div>
                <h1 className="h-display text-balance mb-6">
                    Page <span className="ital text-vermillion">not found</span>.
                </h1>
                <p className="text-foreground/70 text-lg leading-relaxed max-w-xl mb-10">
                    This URL does not exist — it may have moved, or never did. The work
                    and the journal are still where you left them.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Link href="/" className="btn-ink">
                        Back home
                    </Link>
                    <Link href="/work" className="btn-outline">
                        Case studies
                    </Link>
                    <Link href="/blog" className="btn-outline">
                        Journal
                    </Link>
                </div>
            </div>
        </div>
    )
}
