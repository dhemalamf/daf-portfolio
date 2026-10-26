'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Loads framer-motion's DOM animation features lazily and exposes the small
 * `m` components used across the site. Layout/drag features are intentionally
 * excluded: the UI only uses opacity/transform transitions.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
    return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
