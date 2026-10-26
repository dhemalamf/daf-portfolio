'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)
    const frameRef = useRef<number | null>(null)

    useEffect(() => {
        // Native scrolling is the accessible default; only opt in to smooth
        // wheel scrolling when the visitor has not asked for reduced motion.
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        if (prefersReducedMotion) return

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })
        lenisRef.current = lenis

        const raf = (time: number) => {
            lenis.raf(time)
            frameRef.current = requestAnimationFrame(raf)
        }
        frameRef.current = requestAnimationFrame(raf)

        return () => {
            if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
            frameRef.current = null
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return <>{children}</>
}
