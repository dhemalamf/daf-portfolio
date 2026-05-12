'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator({ targetId = 'featured-work' }: { targetId?: string }) {
    const handleClick = () => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.button
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            data-testid="scroll-indicator"
            className="group inline-flex items-center gap-3 mono-label text-foreground/60 hover:text-vermillion transition-colors"
            aria-label="Scroll to explore"
        >
            <span>Scroll to explore</span>
            <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </motion.svg>
        </motion.button>
    )
}
