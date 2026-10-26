'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, m as motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
    value: string
    className?: string
    duration?: number
}

function parseValue(val: string): { numeric: number; prefix: string; suffix: string } {
    const match = val.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/)
    if (!match) return { numeric: 0, prefix: '', suffix: '' }
    return {
        prefix: match[1],
        numeric: parseFloat(match[2].replace(/,/g, '')),
        suffix: match[3],
    }
}

export default function AnimatedCounter({ value, className = '', duration = 2 }: AnimatedCounterProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const shouldReduceMotion = useReducedMotion()
    const { prefix, numeric, suffix } = parseValue(value)
    const isInteger = Number.isInteger(numeric)

    const springValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    })

    const display = useTransform(springValue, (latest) => {
        // Integer metrics (5+, 3, 55%) must never tween through decimals.
        if (isInteger) {
            return prefix + Math.round(latest).toString() + suffix
        }
        if (suffix.includes('T') || suffix.includes('B') || suffix.includes('M')) {
            return prefix + latest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix
        }
        if (latest % 1 !== 0) {
            return prefix + latest.toFixed(1) + suffix
        }
        return prefix + latest.toFixed(0) + suffix
    })

    const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix)

    useEffect(() => {
        if (!isInView) return
        if (shouldReduceMotion) {
            setDisplayValue(prefix + numeric.toLocaleString('en-US') + suffix)
            return
        }
        springValue.set(numeric)
    }, [isInView, numeric, prefix, suffix, springValue, shouldReduceMotion])

    useEffect(() => {
        const unsubscribe = display.on('change', (latest) => {
            setDisplayValue(String(latest))
        })
        return unsubscribe
    }, [display])

    return (
        <motion.span ref={ref} className={className}>
            {displayValue}
        </motion.span>
    )
}
