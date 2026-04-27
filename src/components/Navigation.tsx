'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackButtonClick } from '@/lib/analytics'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Blog', href: '/blog' },
]

export default function Navigation() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const navRef = useRef<HTMLDivElement>(null)
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 })

    const updatePill = useCallback(() => {
        if (!navRef.current) return
        const activeLink = navRef.current.querySelector('[data-active="true"]') as HTMLElement
        if (activeLink) {
            setPillStyle({
                left: activeLink.offsetLeft,
                width: activeLink.offsetWidth,
                opacity: 1,
            })
        } else {
            setPillStyle(prev => ({ ...prev, opacity: 0 }))
        }
    }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsScrolled(currentScrollY > 20)
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    useEffect(() => {
        // Update pill position after render and on resize
        updatePill()
        const handleResize = () => updatePill()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [pathname, mounted, updatePill])

    if (!mounted) {
        return null
    }

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-background/80 backdrop-blur-xl border-b border-border/40'
                : 'bg-transparent'
                }`}
        >
            <div className="section-container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-lg md:text-xl font-display font-bold tracking-tight hover:text-violet-400 transition-colors"
                    >
                        <span className="text-violet-500">D</span>hema
                    </Link>

                    {/* Desktop Navigation */}
                    <div ref={navRef} className="hidden md:flex items-center gap-1 relative">
                        {/* Sliding Pill Background */}
                        <motion.div
                            className="absolute top-0 bottom-0 bg-muted rounded-lg -z-0 pointer-events-none"
                            animate={{
                                left: pillStyle.left,
                                width: pillStyle.width,
                                opacity: pillStyle.opacity,
                            }}
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                        />

                        {navItems.map((item) => {
                            const isActive = item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href)

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    data-active={isActive}
                                    onClick={() => trackButtonClick(`nav_${item.label.toLowerCase()}`)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg z-10 ${isActive
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="ml-2 relative w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all z-10"
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.svg
                                        key="sun"
                                        initial={{ scale: 0, rotate: -90 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="moon"
                                        initial={{ scale: 0, rotate: 90 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: -90 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>

                        <Link
                            href="/contact"
                            className="ml-4 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/20 z-10"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-muted-foreground hover:text-foreground"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 border-t border-border/40 space-y-1 bg-background/95 backdrop-blur-xl rounded-b-2xl -mx-4 px-4 mt-2">
                                {navItems.map((item) => {
                                    const isActive = item.href === '/'
                                        ? pathname === '/'
                                        : pathname.startsWith(item.href)

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => {
                                                trackButtonClick(`nav_mobile_${item.label.toLowerCase()}`)
                                                setIsMobileMenuOpen(false)
                                            }}
                                            className={`block px-4 py-3 rounded-xl transition-colors ${isActive
                                                ? 'bg-violet-500/10 text-foreground font-semibold border border-violet-500/20'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                                <Link
                                    href="/contact"
                                    onClick={() => {
                                        trackButtonClick('nav_mobile_get_in_touch')
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="block px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-colors text-center mt-2"
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
