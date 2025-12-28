'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
]

export default function Navigation() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
                : 'bg-transparent'
                }`}
        >
            <div className="section-container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-lg md:text-xl font-bold tracking-tight hover:text-accent transition-colors"
                    >
                        <span className="text-accent">D</span>hema
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href)

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors animated-underline ${isActive
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}

                        {/* Theme Toggle Switch */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`relative w-14 h-7 rounded-full p-1 transition-all duration-500 ease-in-out ${theme === 'dark' ? 'bg-muted hover:bg-muted/80' : 'bg-slate-300 hover:bg-slate-400'
                                }`}
                            aria-label="Toggle theme"
                        >
                            {/* Toggle track icons */}
                            <span className={`absolute left-1.5 top-1/2 -translate-y-1/2 text-amber-500 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-30' : 'opacity-100'}`}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className={`absolute right-1.5 top-1/2 -translate-y-1/2 text-indigo-400 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-30'}`}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            </span>
                            {/* Toggle knob */}
                            <span
                                className={`block w-5 h-5 bg-background rounded-full shadow-lg transform transition-all duration-500 ease-in-out ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                                    }`}
                            />
                        </button>

                        <Link
                            href="/contact"
                            className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium rounded-lg transition-colors"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        {/* Mobile Theme Toggle Switch */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`relative w-12 h-6 rounded-full p-0.5 transition-all duration-500 ease-in-out ${theme === 'dark' ? 'bg-muted' : 'bg-slate-300'
                                }`}
                            aria-label="Toggle theme"
                        >
                            <span className={`absolute left-1 top-1/2 -translate-y-1/2 text-amber-500 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-30' : 'opacity-100'}`}>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className={`absolute right-1 top-1/2 -translate-y-1/2 text-indigo-400 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-30'}`}>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            </span>
                            <span
                                className={`block w-5 h-5 bg-background rounded-full shadow-lg transform transition-all duration-500 ease-in-out ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
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
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border/50">
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => {
                                const isActive = item.href === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(item.href)

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`transition-colors ${isActive
                                            ? 'text-foreground font-semibold'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="inline-block px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium rounded-lg transition-colors text-center"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
