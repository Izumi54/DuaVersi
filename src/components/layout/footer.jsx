import Link from 'next/link'

/**
 * Component: Footer
 * Footer untuk seluruh website
 */
export default function Footer() {
    const tahunSekarang = new Date().getFullYear()

    return (
        <footer
            className="mt-auto border-t"
            style={{
                backgroundColor: 'var(--color-surface-light)',
                borderColor: 'var(--color-bg-light)'
            }}
        >
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                            DuaVersi
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Platform materi kuliah dengan dual-content system untuk pembelajaran yang lebih efektif.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                            Navigasi Cepat
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm hover:opacity-70 transition" style={{ color: 'var(--color-text-secondary)' }}>
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang" className="text-sm hover:opacity-70 transition" style={{ color: 'var(--color-text-secondary)' }}>
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/bookmark" className="text-sm hover:opacity-70 transition" style={{ color: 'var(--color-text-secondary)' }}>
                                    Bookmark Saya
                                </Link>
                            </li>
                            <li>
                                <Link href="/cari" className="text-sm hover:opacity-70 transition" style={{ color: 'var(--color-text-secondary)' }}>
                                    Cari Materi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                            Informasi
                        </h4>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                            📧 Email: duaversi01@gmail.com
                        </p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Made with ❤️ for Indonesian Students
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'var(--color-bg-light)' }}>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        © {tahunSekarang} DuaVersi. All rights reserved.
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Dibuat dengan Next.js 16 + Tailwind CSS v4
                    </p>
                </div>
            </div>
        </footer>
    )
}
