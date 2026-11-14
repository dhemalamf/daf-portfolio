import type { OperatingStance } from '@/data/types'

export default function HowIOperate({ stances }: { stances: OperatingStance[] }) {
    if (stances.length === 0) return null
    return (
        <div className="border-t border-foreground/20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/10">
            {stances.map((stance) => (
                <article key={stance.title} className="p-6 md:p-8">
                    <h3 className="font-sans font-semibold text-xl md:text-2xl leading-tight tracking-tight mb-4">
                        {stance.title}
                    </h3>
                    <p className="text-foreground/70 text-sm md:text-base leading-relaxed text-pretty mb-6">
                        {stance.stance}
                    </p>
                    <div className="mono-label text-foreground/60 mb-2">Example</div>
                    <p className="text-foreground/80 text-sm leading-relaxed text-pretty">
                        {stance.example}
                    </p>
                </article>
            ))}
        </div>
    )
}
