import type { OperatingStance } from '@/data/types'

/**
 * The three operating stances, each carried by two named proofs. Stacked rows
 * rather than a three-column grid: the stance text and the evidence need room
 * to be read, and three equal columns turn the copy into a wall.
 */
export default function HowIOperate({ stances }: { stances: OperatingStance[] }) {
    if (stances.length === 0) return null
    return (
        <div className="border-t border-foreground/20">
            {stances.map((stance) => (
                <article
                    key={stance.title}
                    className="grid grid-cols-12 gap-x-6 gap-y-5 py-10 md:py-14 border-b border-foreground/10"
                >
                    <div className="col-span-12 md:col-span-4">
                        <h3 className="font-sans font-semibold text-xl md:text-2xl leading-tight tracking-tight">
                            {stance.title}
                        </h3>
                    </div>

                    <div className="col-span-12 md:col-span-8">
                        <p className="text-foreground/80 text-base leading-relaxed text-pretty">
                            {stance.stance}
                        </p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {stance.examples.map((example) => (
                                <p
                                    key={example}
                                    className="pt-3 border-t border-foreground/15 text-foreground/70 text-sm leading-relaxed text-pretty"
                                >
                                    {example}
                                </p>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
