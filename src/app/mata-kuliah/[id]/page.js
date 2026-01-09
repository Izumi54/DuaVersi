import Link from 'next/link'
import { notFound } from 'next/navigation'
import Kontainer from '@/components/layout/kontainer'
import Kartu, { KartuHeader, KartuBody } from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'
import Breadcrumb from '@/components/layout/breadcrumb'
import { ambilMataKuliahById, ambilTopikByMataKuliah, ambilSemesterById } from '@/lib/data'

export default async function MataKuliahDetailPage({ params }) {
    // Await params di Next.js 16+
    const resolvedParams = await params
    const matkul = ambilMataKuliahById(resolvedParams.id)

    // Jika mata kuliah tidak ditemukan, tampilkan 404
    if (!matkul) {
        notFound()
    }

    const daftarTopik = ambilTopikByMataKuliah(matkul.id)
    const semester = ambilSemesterById(matkul.semesterId)

    // Breadcrumb items
    const breadcrumbItems = [
        { label: semester.nama, href: `/semester/${semester.nomor}` },
        { label: matkul.nama, href: `/mata-kuliah/${matkul.id}` }
    ]

    return (
        <div style={{ backgroundColor: 'var(--color-bg-light)' }} className="min-h-screen py-8">
            <Kontainer>
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Header Section */}
                <div className="mb-8">
                    <Kartu padding="large">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            {/* Left: Info Mata Kuliah */}
                            <div className="flex-1">
                                <Badge variant="primary" className="mb-3">
                                    {matkul.kode}
                                </Badge>

                                <h1
                                    className="text-3xl md:text-4xl font-bold mb-2"
                                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                                >
                                    {matkul.nama}
                                </h1>

                                <p
                                    className="text-lg italic mb-4"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {matkul.namaInggris}
                                </p>

                                <p
                                    className="text-base mb-4"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {matkul.deskripsi}
                                </p>

                                {/* Dosen */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">👨‍🏫</span>
                                    <div>
                                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            Dosen Pengampu
                                        </div>
                                        <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            {matkul.dosen}
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">
                                        {matkul.sks} SKS
                                    </Badge>
                                    <Badge variant="default">
                                        {semester.nama}
                                    </Badge>
                                    <Badge variant="primary">
                                        {daftarTopik.length} Topik
                                    </Badge>
                                    {matkul.prasyarat && (
                                        <Badge variant="warning">
                                            ⚠️ Prasyarat: {matkul.prasyarat}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Right: Quick Stats */}
                            <div className="md:w-48">
                                <div
                                    className="p-6 rounded-lg text-center"
                                    style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)' }}
                                >
                                    <div
                                        className="text-5xl font-bold mb-2"
                                        style={{ color: 'var(--color-primary)' }}
                                    >
                                        {daftarTopik.length}
                                    </div>
                                    <div className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                                        Total Topik
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span style={{ color: 'var(--color-text-secondary)' }}>Mentah:</span>
                                            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                {daftarTopik.filter(t => t.materi.mentah.tersedia).length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span style={{ color: 'var(--color-text-secondary)' }}>Simplified:</span>
                                            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                {daftarTopik.filter(t => t.materi.simplified.tersedia).length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Kartu>
                </div>

                {/* Daftar Topik */}
                <div>
                    <h2
                        className="text-2xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        📚 Daftar Materi & Topik
                    </h2>

                    {daftarTopik.length === 0 ? (
                        // Empty State
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">📝</div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Belum Ada Topik
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Topik untuk mata kuliah ini akan segera ditambahkan
                            </p>
                        </Kartu>
                    ) : (
                        // Topik List
                        <div className="space-y-4">
                            {daftarTopik.map((topik, index) => (
                                <Link key={topik.id} href={`/materi/${topik.id}`}>
                                    <Kartu
                                        hover={true}
                                        padding="medium"
                                        className="transition-all hover:scale-[1.01]"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Nomor Urut */}
                                            <div
                                                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                                                style={{
                                                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                                    color: 'var(--color-primary)'
                                                }}
                                            >
                                                {topik.urutan}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <KartuHeader className="mb-2">
                                                    <h3
                                                        className="text-lg font-bold mb-1"
                                                        style={{ color: 'var(--color-text-primary)' }}
                                                    >
                                                        {topik.judul}
                                                    </h3>
                                                    <p
                                                        className="text-sm"
                                                        style={{ color: 'var(--color-text-secondary)' }}
                                                    >
                                                        {topik.deskripsi}
                                                    </p>
                                                </KartuHeader>

                                                <KartuBody>
                                                    {/* Available Materials */}
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {topik.materi.mentah.tersedia && (
                                                            <Badge variant="default" ukuran="small">
                                                                📄 Mentah ({topik.materi.mentah.ukuran})
                                                            </Badge>
                                                        )}
                                                        {topik.materi.simplified.tersedia && (
                                                            <Badge variant="secondary" ukuran="small">
                                                                ✨ Simplified ({topik.materi.simplified.ukuran})
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    {/* Tags */}
                                                    {topik.tags && topik.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1">
                                                            {topik.tags.map((tag, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-xs px-2 py-0.5 rounded"
                                                                    style={{
                                                                        backgroundColor: 'rgba(107, 114, 128, 0.1)',
                                                                        color: 'var(--color-text-secondary)'
                                                                    }}
                                                                >
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </KartuBody>
                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="flex-shrink-0 text-2xl" style={{ color: 'var(--color-primary)' }}>
                                                →
                                            </div>
                                        </div>
                                    </Kartu>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link href={`/semester/${semester.nomor}`}>
                        <Tombol variant="outline" ukuran="medium">
                            ← Kembali ke {semester.nama}
                        </Tombol>
                    </Link>
                </div>
            </Kontainer>
        </div>
    )
}
