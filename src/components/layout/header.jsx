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
            className="sticky top-0 z-50 shadow-sm"
            style={{ backgroundColor: 'var(--color-surface-light)' }}
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
                            className="hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/tentang"
                            className="hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Tentang
                        </Link>
                        <Link
                            href="/bookmark"
                            className="hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            📚 Bookmark
                        </Link>
                    </div>

                    {/* Action Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg transition-all hover:opacity-70"
                            style={{
                                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                                color: 'var(--color-text-primary)'
                            }}
                            title={isDark ? 'Light Mode' : 'Dark Mode'}
                        >
                            <span className="text-2xl">
                                {isDark ? '☀️' : '🌙'}
                            </span>
                        </button>

                        {/* Search Button */}
                        <Link href="/cari">
                            <Tombol variant="primary" ukuran="medium">
                                🔍 Cari Materi
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
                            🏠 Beranda
                        </Link>
                        <Link
                            href="/tentang"
                            className="block py-2 px-4 rounded-lg hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ℹ️ Tentang
                        </Link>
                        <Link
                            href="/bookmark"
                            className="block py-2 px-4 rounded-lg hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            📚 Bookmark
                        </Link>
                        <Link
                            href="/cari"
                            className="block py-2 px-4 rounded-lg hover:opacity-70 transition"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            🔍 Cari Materi
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
                            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}
