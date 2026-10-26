'use client'

import { ReactNode, useRef, useState } from 'react'
import { m as motion } from 'framer-motion'

interface SpotlightCardProps {
    children: ReactNode
    className?: string
}

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const handleMouseEnter = () => setOpacity(1)
    const handleMouseLeave = () => setOpacity(0)

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 62, 0, 0.08), transparent 40%)`,
                }}
            />
            {children}
        </div>
    )
}
