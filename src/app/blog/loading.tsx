export default function BlogLoading() {
    return (
        <div className="pt-32 md:pt-40 pb-20" aria-busy="true" aria-live="polite">
            <div className="section-container">
                <div className="mono-label text-foreground/40 mb-6">03 — Journal</div>
                <div className="h-16 md:h-24 w-3/4 bg-foreground/[0.05] animate-pulse" />
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[0, 1, 2].map((item) => (
                        <div
                            key={item}
                            className="border border-foreground/10 h-72 animate-pulse bg-foreground/[0.03]"
                        />
                    ))}
                </div>
                <span className="sr-only">Loading journal entries…</span>
            </div>
        </div>
    )
}
