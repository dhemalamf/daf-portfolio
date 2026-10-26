'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackButtonClick } from '@/lib/analytics'

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    event: string
    children: ReactNode
}

/** Anchor that reports a GA button_click event, so pages can stay server components. */
export default function TrackedLink({
    event,
    children,
    onClick,
    ...props
}: TrackedLinkProps) {
    return (
        <a
            {...props}
            onClick={(clickEvent) => {
                trackButtonClick(event)
                onClick?.(clickEvent)
            }}
        >
            {children}
        </a>
    )
}
