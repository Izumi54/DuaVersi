'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Kontainer from './kontainer'
import Tombol from '../ui/tombol'
import { useTheme } from '@/hooks/useTheme'

/**
 * Component: Header
 * Navigation bar untuk seluruh website
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
            className="sticky top-0 z-50 shadow-sm border-b"
            style={{
                backgroundColor: 'var(--color-surface-light)',
                borderColor: 'var(--color-border-light)'
            }}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                            DuaVersi
                        </div>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-sm font-medium hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Home
                        </Link>
                        <Link
                            href="/tentang"
                            className="text-sm font-medium hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            About
                        </Link>
                        <Link
                            href="/bookmark"
                            className="text-sm font-medium hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Bookmarks
                        </Link>
                    </div>

                    {/* Action Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
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

                        {/* Search Button */}
                        <Link href="/cari">
                            <Tombol variant="primary" ukuran="medium">
                                Search
                            </Tombol>
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
                    <div className="md:hidden mt-4 pb-4 space-y-3">
                        <Link
                            href="/"
                            className="block py-2 px-4 rounded-lg hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/tentang"
                            className="block py-2 px-4 rounded-lg hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/bookmark"
                            className="block py-2 px-4 rounded-lg hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Bookmarks
                        </Link>
                        <Link
                            href="/cari"
                            className="block py-2 px-4 rounded-lg hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Search
                        </Link>

                        {/* Dark Mode Toggle - Mobile */}
                        <button
                            onClick={() => {
                                toggleTheme()
                                setMobileMenuOpen(false)
                            }}
                            className="w-full text-left py-2 px-4 rounded-lg hover:opacity-70 transition"
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
