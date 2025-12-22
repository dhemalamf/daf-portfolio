import Image from 'next/image'

interface ExperienceCardProps {
    company: string
    logo?: string
    role: string
    period: string
    type: string
    description: string
    highlights: string[]
    industries: string[]
}

export default function ExperienceCard({
    company,
    logo,
    role,
    period,
    type,
    description,
    highlights,
    industries,
}: ExperienceCardProps) {
    return (
        <article className="glass-card p-6 md:p-8 hover-lift">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    {logo && (
                        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <Image
                                src={logo}
                                alt={`${company} logo`}
                                width={56}
                                height={56}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-bold mb-1">{role}</h3>
                        <p className="text-accent-400 font-medium">{company}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full">
                        {period}
                    </span>
                    <span className="text-neutral-500 text-sm">{type}</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-neutral-400 mb-6 leading-relaxed">{description}</p>

            {/* Highlights */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-3">
                    Key Achievements
                </h4>
                <ul className="space-y-2">
                    {highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-neutral-300">{highlight}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Industries */}
            <div className="flex flex-wrap gap-2">
                {industries.map((industry, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-accent-500/10 text-accent-400 text-xs font-medium rounded-full"
                    >
                        {industry}
                    </span>
                ))}
            </div>
        </article>
    )
}
