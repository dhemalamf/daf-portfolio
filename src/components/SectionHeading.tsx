interface SectionHeadingProps {
    eyebrow?: string
    title: string
    description?: string
    centered?: boolean
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    centered = false,
}: SectionHeadingProps) {
    return (
        <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            {eyebrow && (
                <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">
                    {eyebrow}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {title}
            </h2>
            {description && (
                <p
                    className={`text-muted-foreground text-lg max-w-2xl ${centered ? 'mx-auto' : ''
                        }`}
                >
                    {description}
                </p>
            )}
        </div>
    )
}
