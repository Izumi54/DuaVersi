import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Kartu, { KartuHeader, KartuBody } from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'

export default function TentangPage() {
    return (
        <div style={{ backgroundColor: 'var(--color-bg-light)' }} className="min-h-screen py-12">
            <Kontainer>
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                    >
                        Tentang DuaVersi
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                        Platform materi kuliah dengan sistem dual-content untuk pembelajaran yang lebih efektif
                    </p>
                </div>

                {/* Visi & Misi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Visi */}
                    <Kartu padding="large">
                        <div className="text-5xl mb-4">🎯</div>
                        <h2
                            className="text-2xl font-bold mb-3"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                        >
                            Visi
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Menjadi platform pembelajaran terpercaya yang memudahkan mahasiswa Teknik Informatika
                            dalam memahami materi kuliah melalui pendekatan dual-content system, dan berkembang
                            menjadi solusi pembelajaran untuk seluruh kampus.
                        </p>
                    </Kartu>

                    {/* Misi */}
                    <Kartu padding="large">
                        <div className="text-5xl mb-4">🚀</div>
                        <h2
                            className="text-2xl font-bold mb-3"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                        >
                            Misi
                        </h2>
                        <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                            <li>• Menyediakan materi kuliah dalam dua versi berbeda</li>
                            <li>• Memfasilitasi pembelajaran yang adaptif</li>
                            <li>• Membangun komunitas belajar yang kolaboratif</li>
                            <li>• Terus berinovasi dalam penyampaian konten edukasi</li>
                        </ul>
                    </Kartu>
                </div>

                {/* Apa itu DuaVersi? */}
                <Kartu padding="large" className="mb-12">
                    <KartuHeader>
                        <h2
                            className="text-3xl font-bold mb-3"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                        >
                            🔄 Apa itu Sistem Dual-Content?
                        </h2>
                    </KartuHeader>
                    <KartuBody>
                        <p className="text-lg mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                            DuaVersi menghadirkan inovasi pembelajaran dengan menyediakan <strong>dua versi materi</strong> untuk setiap topik:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Versi Mentah */}
                            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-3xl">📄</div>
                                    <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                                        Versi Mentah
                                    </h3>
                                </div>
                                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                                    Materi original dari dosen, lengkap dengan detail teknis, teori mendalam, dan notasi formal.
                                </p>
                                <Badge variant="primary" ukuran="small">
                                    Untuk mahasiswa yang suka tantangan
                                </Badge>
                            </div>

                            {/* Versi Simplified */}
                            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(5, 150, 105, 0.05)' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-3xl">✨</div>
                                    <h3 className="text-xl font-bold" style={{ color: 'var(--color-secondary)' }}>
                                        Versi Simplified
                                    </h3>
                                </div>
                                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                                    Materi yang sudah disederhanakan dengan bahasa yang lebih mudah dipahami, visualisasi lebih banyak, dan contoh praktis.
                                </p>
                                <Badge variant="secondary" ukuran="small">
                                    Untuk pemahaman cepat
                                </Badge>
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-lg text-center"
                            style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)' }}
                        >
                            <p className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                                💡 Kamu bebas memilih versi sesuai gaya belajarmu!
                            </p>
                        </div>
                    </KartuBody>
                </Kartu>

                {/* Fitur Unggulan */}
                <div className="mb-12">
                    <h2
                        className="text-3xl font-bold mb-6 text-center"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        ✨ Fitur Unggulan
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">📚</div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Materi Lengkap
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                8 semester, 40+ mata kuliah dengan ratusan topik pembelajaran
                            </p>
                        </Kartu>

                        {/* Feature 2 */}
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">🔄</div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Toggle Instan
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Ganti antara versi mentah dan simplified dengan satu klik
                            </p>
                        </Kartu>

                        {/* Feature 3 */}
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Pencarian Cepat
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Cari materi berdasarkan keyword, mata kuliah, atau semester
                            </p>
                        </Kartu>

                        {/* Feature 4 */}
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">❤️</div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Bookmark
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Simpan materi favorit untuk akses cepat nanti
                            </p>
                        </Kartu>

                        {/* Feature 5 */}
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">⚡</div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Super Cepat
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Load time &lt; 2 detik dengan Next.js 16
                            </p>
                        </Kartu>

                        {/* Feature 6 */}
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">📱</div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Responsive
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Akses dari HP, tablet, atau laptop dengan tampilan optimal
                            </p>
                        </Kartu>
                    </div>
                </div>

                {/* Cara Menggunakan */}
                <Kartu padding="large" className="mb-12">
                    <h2
                        className="text-3xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        📖 Cara Menggunakan DuaVersi
                    </h2>

                    <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                1
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    Pilih Semester
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Dari homepage, pilih semester yang sedang kamu tempuh (1-8)
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                2
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    Pilih Mata Kuliah
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Klik mata kuliah yang ingin dipelajari (misal: Pengantar Ilmu Komputer)
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                3
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    Pilih Topik
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Lihat daftar topik dan klik topik yang ingin kamu pelajari
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-4">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: 'var(--color-secondary)' }}
                            >
                                4
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    Toggle Versi & Belajar!
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Gunakan toggle untuk beralih antara versi Mentah atau Simplified. Download jika perlu!
                                </p>
                            </div>
                        </div>
                    </div>
                </Kartu>

                {/* Pengembang */}
                <Kartu padding="large" className="mb-12">
                    <div className="text-center">
                        <div className="text-6xl mb-4">👨‍💻</div>
                        <h2
                            className="text-2xl font-bold mb-3"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                        >
                            Dibuat oleh Mahasiswa, untuk Mahasiswa
                        </h2>
                        <p className="max-w-2xl mx-auto mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                            DuaVersi adalah inisiatif mahasiswa Teknik Informatika yang peduli dengan kualitas
                            pembelajaran di kampus. Dimulai dari kebutuhan pribadi untuk memahami materi kuliah
                            yang kompleks, kini DuaVersi hadir untuk membantu sesama mahasiswa.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            <Badge variant="primary">Made with ❤️</Badge>
                            <Badge variant="secondary">Next.js 16</Badge>
                            <Badge variant="default">Tailwind CSS v4</Badge>
                            <Badge variant="primary">Open for Collaboration</Badge>
                        </div>
                    </div>
                </Kartu>

                {/* Roadmap */}
                <Kartu padding="large" className="mb-12">
                    <h2
                        className="text-3xl font-bold mb-6 text-center"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        🗺️ Roadmap
                    </h2>

                    <div className="space-y-4">
                        {/* Fase 1 */}
                        <div className="flex items-start gap-4">
                            <Badge variant="success">✅ Done</Badge>
                            <div>
                                <h3 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                    Fase 1: Teknik Informatika
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Platform untuk mahasiswa Teknik Informatika dengan materi lengkap 8 semester
                                </p>
                            </div>
                        </div>

                        {/* Fase 2 */}
                        <div className="flex items-start gap-4">
                            <Badge variant="warning">🚧 Progress</Badge>
                            <div>
                                <h3 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                    Fase 2: Fitur Lanjutan
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Login system, cloud bookmark, user upload, dan komentar per materi
                                </p>
                            </div>
                        </div>

                        {/* Fase 3 */}
                        <div className="flex items-start gap-4">
                            <Badge variant="info">🔮 Future</Badge>
                            <div>
                                <h3 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                    Fase 3: Multi-Prodi
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Ekspansi ke prodi lain dan kolaborasi dengan institusi kampus
                                </p>
                            </div>
                        </div>
                    </div>
                </Kartu>

                {/* CTA */}
                <div className="text-center">
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        Siap Mulai Belajar?
                    </h2>
                    <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                        Jelajahi ratusan materi kuliah dengan cara yang lebih mudah
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Tombol variant="primary" ukuran="large">
                                📚 Mulai Belajar
                            </Tombol>
                        </Link>
                        <Link href="/cari">
                            <Tombol variant="outline" ukuran="large">
                                🔍 Cari Materi
                            </Tombol>
                        </Link>
                    </div>
                </div>
            </Kontainer>
        </div>
    )
}
