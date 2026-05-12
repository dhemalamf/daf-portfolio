'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackButtonClick } from '@/lib/analytics'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
    { label: 'Index', href: '/', short: '00' },
    { label: 'About', href: '/about', short: '01' },
    { label: 'Work', href: '/work', short: '02' },
    { label: 'Journal', href: '/blog', short: '03' },
    { label: 'Contact', href: '/contact', short: '04' },
]

export default function Navigation() {
    const pathname = usePathname()
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 16)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    if (!mounted) return null

    const isDark = (resolvedTheme || theme) === 'dark'

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen
                    ? 'bg-background/85 backdrop-blur-xl border-b border-foreground/10'
                    : 'bg-transparent'
            }`}
            data-testid="primary-navigation"
        >
            <div className="section-container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo / wordmark */}
                    <Link
                        href="/"
                        data-testid="nav-logo"
                        className="group flex items-baseline gap-2"
                    >
                        <span className="font-serif text-2xl md:text-3xl leading-none tracking-tightest">
                            Dhema<span className="text-vermillion">.</span>
                        </span>
                        <span className="hidden sm:inline mono-label text-foreground/40 group-hover:text-foreground transition-colors">
                            Product Manager
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-7">
                            {navItems.map((item) => {
                                const isActive =
                                    item.href === '/'
                                        ? pathname === '/'
                                        : pathname.startsWith(item.href)
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        data-testid={`nav-link-${item.label.toLowerCase()}`}
                                        onClick={() => trackButtonClick(`nav_${item.label.toLowerCase()}`)}
                                        className="group flex items-baseline gap-1.5"
                                    >
                                        <span className="mono-label text-foreground/35">{item.short}</span>
                                        <span
                                            className={`text-sm tracking-tight link-underline transition-colors ${
                                                isActive
                                                    ? 'text-foreground link-underline-active'
                                                    : 'text-foreground/70 group-hover:text-foreground'
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="h-5 w-px bg-foreground/15" />

                        {/* Theme toggle */}
                        <button
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            data-testid="theme-toggle-desktop"
                            className="w-9 h-9 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors border border-foreground/15 hover:border-foreground/40"
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.svg
                                        key="sun"
                                        initial={{ rotate: -45, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 45, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="4" />
                                        <path strokeLinecap="round" d="M12 2v2m0 16v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="moon"
                                        initial={{ rotate: 45, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -45, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>

                        <Link
                            href="/contact"
                            data-testid="nav-cta-contact"
                            className="btn-ink"
                        >
                            Let&apos;s talk
                            <span className="inline-block">↗</span>
                        </Link>
                    </div>

                    {/* Mobile */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            data-testid="theme-toggle-mobile"
                            className="w-9 h-9 flex items-center justify-center text-foreground/60 border border-foreground/15"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀' : '☾'}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            data-testid="mobile-menu-toggle"
                            className="w-9 h-9 flex items-center justify-center text-foreground border border-foreground/15"
                            aria-label="Toggle menu"
                        >
                            <span className="font-mono text-xs">{isMobileMenuOpen ? '×' : '≡'}</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="md:hidden overflow-hidden"
                            data-testid="mobile-menu"
                        >
                            <div className="py-4 border-t border-foreground/10 space-y-1">
                                {navItems.map((item) => {
                                    const isActive =
                                        item.href === '/'
                                            ? pathname === '/'
                                            : pathname.startsWith(item.href)
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            data-testid={`nav-mobile-link-${item.label.toLowerCase()}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-baseline gap-3 py-3 border-b border-foreground/5 ${
                                                isActive ? 'text-foreground' : 'text-foreground/70'
                                            }`}
                                        >
                                            <span className="mono-label text-foreground/30">{item.short}</span>
                                            <span className="font-serif text-2xl tracking-tight">{item.label}</span>
                                        </Link>
                                    )
                                })}
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-4 btn-ink w-full justify-center"
                                    data-testid="nav-mobile-cta-contact"
                                >
                                    Let&apos;s talk ↗
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
