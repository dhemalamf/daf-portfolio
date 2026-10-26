import Link from 'next/link'

interface JournalUnavailableProps {
    /** Shown under the title — page-specific context. */
    detail?: string
}

/**
 * Rendered instead of a 500 when the CMS cannot be reached. Keeps the rest of
 * the site usable and tells the visitor what happened.
 */
export default function JournalUnavailable({
    detail = 'The journal is temporarily unavailable.',
}: JournalUnavailableProps) {
    return (
        <div className="border border-foreground/15 p-8 md:p-12">
            <div className="mono-label text-vermillion mb-3">Notice</div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mb-3">
                {detail}
            </h2>
            <p className="text-foreground/70 leading-relaxed max-w-xl mb-6">
                The writing is hosted in Sanity and the connection failed. It is usually
                back within a minute. Meanwhile, the case studies are on this site and
                always available.
            </p>
            <div className="flex flex-wrap gap-3">
                <Link href="/work" className="btn-ink">
                    Read case studies <span aria-hidden>→</span>
                </Link>
                <Link href="/" className="btn-outline">
                    Back home
                </Link>
            </div>
        </div>
    )
}
