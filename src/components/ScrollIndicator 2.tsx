'use client'

import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
    targetId?: string
}

export default function ScrollIndicator({ targetId = 'featured-work' }: ScrollIndicatorProps) {
    const handleClick = () => {
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <motion.button
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="inline-flex items-center gap-3 group cursor-pointer text-muted-foreground hover:text-violet-400 transition-colors duration-300"
            aria-label="Scroll to explore"
        >
            <span className="text-xs md:text-sm font-semibold tracking-[0.15em] uppercase">
                Scroll to explore
            </span>

            {/* Bouncing down arrow */}
            <motion.svg
                className="w-4 h-4 md:w-5 md:h-5 -mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                animate={{ y: [0, 5, 0] }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </motion.svg>
        </motion.button>
    )
}
