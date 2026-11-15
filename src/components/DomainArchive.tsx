import type { DomainGroup } from '@/data/types'

/**
 * Domain Specialization Archive, shared by /about and /work.
 *
 * Static SSR on purpose: four practice areas, each with the work that backs it,
 * so a reader looking for a specific industry can scan instead of hunting
 * through a tag cloud.
 */
export default function DomainArchive({ domains }: { domains: DomainGroup[] }) {
    if (domains.length === 0) return null
    return (
        <div className="border-t border-foreground/20 grid grid-cols-1 md:grid-cols-2">
            {domains.map((domain, index) => (
                <article
                    key={domain.title}
                    className={`p-6 md:p-8 border-b border-foreground/10 ${
                        index % 2 === 0 ? 'md:border-r' : ''
                    }`}
                >
                    <h3 className="font-sans font-semibold text-xl md:text-2xl leading-tight tracking-tight mb-4">
                        {domain.title}
                    </h3>

                    <ul>
                        {domain.items.map((item) => (
                            <li
                                key={item}
                                className="py-2 border-b border-foreground/5 last:border-0 text-sm text-foreground/75 leading-relaxed"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </article>
            ))}
        </div>
    )
}
