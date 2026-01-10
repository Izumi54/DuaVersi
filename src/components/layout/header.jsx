'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/hooks/useTheme'

/**
 * Component: Header
 * Navigation bar - Minimal & Professional (Wix Style)
 */
export default function Header() {
    const pathname = usePathname()
    const { isDark, toggleTheme } = useTheme()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <header
            className="sticky top-0 z-50"
            style={{
                backgroundColor: 'var(--color-bg-light)',
                borderBottom: '1px solid var(--color-border-light)',
            }}
        >
            <nav className="container mx-auto px-8 py-5">
                <div className="flex items-center justify-between">
                    {/* Logo - Left (Circle + Text) */}
                    <Link href="/" className="flex items-center gap-3">
                        {/* Circle with "D" */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                            style={{ backgroundColor: 'var(--color-text-primary)' }}
                        >
                            D
                        </div>
                        {/* Text Logo */}
                        <div
                            className="text-xl font-semibold"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-text-primary)'
                            }}
                        >
                            DuaVersi
                        </div>
                    </Link>

                    {/* Navigation Links + Actions - Right (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm font-normal transition-colors hover:opacity-70"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/tentang"
                            className="text-sm font-normal transition-colors hover:opacity-70"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Tentang
                        </Link>
                        <Link
                            href="/bookmark"
                            className="text-sm font-normal transition-colors hover:opacity-70"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Bookmark
                        </Link>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
                            style={{ color: 'var(--color-text-secondary)' }}
                            title={isDark ? 'Light Mode' : 'Dark Mode'}
                        >
                            {isDark ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* CTA Button - Dark (Wix Style) */}
                        <Link href="/cari">
                            <button
                                className="px-6 py-2.5 rounded-lg font-medium text-sm text-white transition-all hover:opacity-90"
                                style={{
                                    backgroundColor: 'var(--color-text-primary)',
                                }}
                            >
                                Cari Materi
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg"
                        onClick={toggleMobileMenu}
                        style={{ color: 'var(--color-text-primary)' }}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-6 pb-4 space-y-3">
                        <Link
                            href="/"
                            className="block py-2 px-4 rounded-lg text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/tentang"
                            className="block py-2 px-4 rounded-lg text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Tentang
                        </Link>
                        <Link
                            href="/bookmark"
                            className="block py-2 px-4 rounded-lg text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Bookmark
                        </Link>

                        <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                            <Link
                                href="/cari"
                                className="block py-2.5 px-4 rounded-lg text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Cari Materi
                            </Link>
                        </div>

                        {/* Dark Mode Toggle - Mobile */}
                        <button
                            onClick={() => {
                                toggleTheme()
                                setMobileMenuOpen(false)
                            }}
                            className="w-full text-left py-2 px-4 rounded-lg text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}
