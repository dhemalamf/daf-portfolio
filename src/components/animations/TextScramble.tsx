'use client'

import { useEffect, useState, useCallback } from 'react'

const chars = '!<>-_\\/[]{}—=+*^?#________'

interface TextScrambleProps {
    text: string
    className?: string
    delay?: number
    duration?: number
}

export default function TextScramble({ text, className = '', delay = 0, duration = 1200 }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text)
    const [started, setStarted] = useState(false)

    const scramble = useCallback(() => {
        const length = text.length
        const queue: { from: string; to: string; start: number; end: number; char?: string }[] = []

        for (let i = 0; i < length; i++) {
            const from = text[i]
            const to = text[i]
            const start = Math.floor(Math.random() * (duration / 3))
            const end = start + Math.floor(Math.random() * (duration / 3))
            queue.push({ from, to, start, end })
        }

        let frame = 0
        const frameRate = 1000 / 30
        const totalFrames = Math.ceil(duration / frameRate)

        const update = () => {
            let output = ''
            let complete = 0

            for (let i = 0; i < queue.length; i++) {
                const { from, to, start, end } = queue[i]
                let char = queue[i].char

                if (frame >= end) {
                    complete++
                    output += to
                } else if (frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = chars[Math.floor(Math.random() * chars.length)]
                        queue[i].char = char
                    }
                    output += char
                } else {
                    output += from
                }
            }

            setDisplayText(output)

            if (complete === queue.length) {
                setDisplayText(text)
                return
            }

            frame++
            if (frame < totalFrames) {
                requestAnimationFrame(update)
            } else {
                setDisplayText(text)
            }
        }

        requestAnimationFrame(update)
    }, [text, duration])

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true)
            scramble()
        }, delay)
        return () => clearTimeout(timer)
    }, [delay, scramble])

    if (!started) {
        return <span className={className}>{text}</span>
    }

    return <span className={className}>{displayText}</span>
}
