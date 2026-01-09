export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-light)' }}>
            <div className="text-center">
                <div className="text-8xl mb-4">😕</div>
                <h1
                    className="text-4xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                >
                    404 - Tidak Ditemukan
                </h1>
                <p className="text-lg mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    Halaman yang kamu cari tidak ditemukan
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 rounded-lg font-semibold transition"
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white'
                    }}
                >
                    ← Kembali ke Beranda
                </a>
            </div>
        </div>
    )
}
