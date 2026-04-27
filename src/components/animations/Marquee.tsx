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
    const speedClass = {
        slow: 'animate-marquee [animation-duration:40s]',
        normal: 'animate-marquee [animation-duration:25s]',
        fast: 'animate-marquee [animation-duration:15s]',
    }

    const reverseSpeedClass = {
        slow: 'animate-marquee-reverse [animation-duration:40s]',
        normal: 'animate-marquee-reverse [animation-duration:25s]',
        fast: 'animate-marquee-reverse [animation-duration:15s]',
    }

    return (
        <div className={`flex overflow-hidden ${pauseOnHover ? 'group' : ''} ${className}`}>
            <div
                className={`flex shrink-0 items-center justify-around gap-4 ${reverse ? reverseSpeedClass[speed] : speedClass[speed]} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
            >
                {children}
            </div>
            <div
                className={`flex shrink-0 items-center justify-around gap-4 ${reverse ? reverseSpeedClass[speed] : speedClass[speed]} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    )
}
