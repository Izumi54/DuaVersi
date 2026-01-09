import Link from 'next/link'
import Tombol from '@/components/ui/tombol'

/**
 * Component: Header
 * Navigation bar untuk seluruh website
 */
export default function Header() {
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

                    {/* CTA Button - Desktop */}
                    <div className="hidden md:block">
                        <Link href="/cari">
                            <Tombol variant="primary" ukuran="medium">
                                🔍 Cari Materi
                            </Tombol>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}
