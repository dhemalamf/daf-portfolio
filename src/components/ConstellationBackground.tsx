'use client'

import { useEffect, useRef } from 'react'

interface Point {
    x: number
    y: number
    vx: number
    vy: number
}

export default function ConstellationBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -1000, y: -1000 })
    const pointsRef = useRef<Point[]>([])
    const rafRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const isMobile = window.innerWidth < 768
        const pointCount = isMobile ? 30 : 60
        const connectionDistance = 120
        const mouseDistance = 150

        function resize() {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        function initPoints() {
            const points: Point[] = []
            for (let i = 0; i < pointCount; i++) {
                points.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                })
            }
            pointsRef.current = points
        }

        function draw() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const points = pointsRef.current
            const mouse = mouseRef.current

            // Update positions
            for (let i = 0; i < points.length; i++) {
                const p = points[i]
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1

                // Mouse repulsion
                const dx = p.x - mouse.x
                const dy = p.y - mouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < mouseDistance && dist > 0) {
                    const force = (mouseDistance - dist) / mouseDistance
                    p.vx += (dx / dist) * force * 0.02
                    p.vy += (dy / dist) * force * 0.02
                }

                // Damping
                p.vx *= 0.99
                p.vy *= 0.99
            }

            // Draw connections
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x
                    const dy = points[i].y - points[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * 0.15
                        ctx.beginPath()
                        ctx.moveTo(points[i].x, points[i].y)
                        ctx.lineTo(points[j].x, points[j].y)
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            // Draw points
            for (let i = 0; i < points.length; i++) {
                const p = points[i]
                ctx.beginPath()
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(167, 139, 250, 0.4)'
                ctx.fill()
            }

            rafRef.current = requestAnimationFrame(draw)
        }

        resize()
        initPoints()
        draw()

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }

        const handleResize = () => {
            resize()
            initPoints()
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    )
}
