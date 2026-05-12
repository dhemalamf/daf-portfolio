'use client'

import { ReactNode } from 'react'

interface MarqueeProps {
    children: ReactNode
    className?: string
    reverse?: boolean
    pauseOnHover?: boolean
    speed?: 'slow' | 'normal' | 'fast'
}

export default function Marquee({
    children,
    className = '',
    reverse = false,
    pauseOnHover = false,
    speed = 'normal',
}: MarqueeProps) {
    const duration =
        speed === 'slow' ? '50s' : speed === 'fast' ? '18s' : '32s'

    const anim = reverse ? 'animate-marquee-reverse' : 'animate-marquee'

    return (
        <div className={`flex overflow-hidden ${pauseOnHover ? 'group' : ''} ${className}`}>
            <div
                className={`flex shrink-0 items-center gap-4 ${anim} ${
                    pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
                }`}
                style={{ animationDuration: duration }}
            >
                {children}
            </div>
            <div
                aria-hidden
                className={`flex shrink-0 items-center gap-4 ${anim} ${
                    pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
                }`}
                style={{ animationDuration: duration }}
            >
                {children}
            </div>
        </div>
    )
}
