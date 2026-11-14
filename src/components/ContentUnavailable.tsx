import Link from 'next/link'

interface ContentUnavailableProps {
    /** What could not be loaded, in plain words. */
    detail?: string
}

/**
 * Rendered on a detail page when the CMS is unreachable and the document is
 * not in the static fallback. A 404 would be a lie — the page may well exist.
 */
export default function ContentUnavailable({
    detail = 'This case study is temporarily unavailable.',
}: ContentUnavailableProps) {
    return (
        <div className="pt-32 md:pt-40 pb-24">
            <div className="section-container max-w-3xl">
                <div className="border border-foreground/15 p-8 md:p-12">
                    <div className="mono-label text-foreground/60 mb-3">Notice</div>
                    <h1 className="font-sans font-semibold text-3xl md:text-4xl tracking-tight leading-tight mb-3">
                        {detail}
                    </h1>
                    <p className="text-foreground/70 leading-relaxed max-w-xl mb-6">
                        Case studies are hosted in Sanity and the connection failed. It
                        usually recovers within a minute.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/work" className="btn-ink">
                            All case studies <span aria-hidden>→</span>
                        </Link>
                        <Link href="/contact" className="btn-outline">
                            Get in touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
