import Link from 'next/link'
import { notFound } from 'next/navigation'
import Kontainer from '@/components/layout/kontainer'
import Kartu, { KartuHeader, KartuBody, KartuFooter } from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'
import Breadcrumb from '@/components/layout/breadcrumb'
import { ambilSemesterById, ambilMataKuliahBySemester } from '@/lib/data'

export default async function SemesterDetailPage({ params }) {
    // Await params di Next.js 16+
    const resolvedParams = await params
    const semesterId = `sem-${resolvedParams.id}`
    const semester = ambilSemesterById(semesterId)

    // Jika semester tidak ditemukan, tampilkan 404
    if (!semester) {
        notFound()
    }

    const daftarMataKuliah = ambilMataKuliahBySemester(semesterId)

    // Breadcrumb items
    const breadcrumbItems = [
        { label: semester.nama, href: `/semester/${resolvedParams.id}` }
    ]

    return (
        <div style={{ backgroundColor: 'var(--color-bg-light)' }} className="min-h-screen py-8">
            <Kontainer>
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="text-5xl font-bold"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            {semester.nomor}
                        </div>
                        <div>
                            <h1
                                className="text-3xl md:text-4xl font-bold"
                                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                            >
                                {semester.nama}
                            </h1>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                {semester.deskripsi}
                            </p>
                        </div>
                    </div>

                    {/* Info Tags */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                            {semester.jumlahMataKuliah} Mata Kuliah
                        </Badge>
                        <Badge variant="default">
                            {semester.tahunAkademik}
                        </Badge>
                        <Badge variant="primary">
                            Teknik Informatika
                        </Badge>
                    </div>
                </div>

                {/* Daftar Mata Kuliah */}
                <div>
                    <h2
                        className="text-2xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        Daftar Mata Kuliah
                    </h2>

                    {daftarMataKuliah.length === 0 ? (
                        // Empty State
                        <Kartu padding="large" className="text-center">
                            <div className="text-5xl mb-4">📚</div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Belum Ada Mata Kuliah
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Mata kuliah untuk semester ini akan segera ditambahkan
                            </p>
                        </Kartu>
                    ) : (
                        // Mata Kuliah Grid
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {daftarMataKuliah.map((matkul) => (
                                <Link key={matkul.id} href={`/mata-kuliah/${matkul.id}`}>
                                    <Kartu
                                        hover={true}
                                        padding="medium"
                                        className="h-full transition-all hover:scale-[1.02]"
                                    >
                                        <KartuHeader>
                                            {/* Kode & Nama */}
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div className="flex-1">
                                                    <Badge variant="primary" ukuran="small" className="mb-2">
                                                        {matkul.kode}
                                                    </Badge>
                                                    <h3
                                                        className="text-xl font-bold mb-1"
                                                        style={{ color: 'var(--color-text-primary)' }}
                                                    >
                                                        {matkul.nama}
                                                    </h3>
                                                    <p
                                                        className="text-sm italic mb-2"
                                                        style={{ color: 'var(--color-text-secondary)' }}
                                                    >
                                                        {matkul.namaInggris}
                                                    </p>
                                                </div>

                                                {/* SKS Badge */}
                                                <div
                                                    className="text-center px-3 py-2 rounded-lg"
                                                    style={{
                                                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                                        color: 'var(--color-primary)'
                                                    }}
                                                >
                                                    <div className="text-2xl font-bold">{matkul.sks}</div>
                                                    <div className="text-xs">SKS</div>
                                                </div>
                                            </div>
                                        </KartuHeader>

                                        <KartuBody>
                                            {/* Deskripsi */}
                                            <p
                                                className="text-sm mb-3 line-clamp-2"
                                                style={{ color: 'var(--color-text-secondary)' }}
                                            >
                                                {matkul.deskripsi}
                                            </p>

                                            {/* Dosen */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-lg">👨‍🏫</span>
                                                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                                                    {matkul.dosen}
                                                </span>
                                            </div>

                                            {/* Info Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary" ukuran="small">
                                                    📄 {matkul.jumlahTopik} Topik
                                                </Badge>

                                                {matkul.prasyarat && (
                                                    <Badge variant="warning" ukuran="small">
                                                        ⚠️ Prasyarat: {matkul.prasyarat}
                                                    </Badge>
                                                )}
                                            </div>
                                        </KartuBody>

                                        <KartuFooter>
                                            <div className="flex justify-end">
                                                <Tombol variant="primary" ukuran="small">
                                                    Lihat Materi →
                                                </Tombol>
                                            </div>
                                        </KartuFooter>
                                    </Kartu>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link href="/">
                        <Tombol variant="outline" ukuran="medium">
                            ← Kembali ke Beranda
                        </Tombol>
                    </Link>
                </div>
            </Kontainer>
        </div>
    )
}
