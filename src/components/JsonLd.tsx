import type { ReactNode } from 'react'

interface JsonLdProps {
    data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Structured data for search engines. The payload is built server-side from
 * typed data, never from user input.
 */
export default function JsonLd({ data }: JsonLdProps): ReactNode {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
