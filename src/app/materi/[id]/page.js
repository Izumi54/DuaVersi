'use client'

import { useState, use, useEffect } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Kartu from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'
import Breadcrumb from '@/components/layout/breadcrumb'
import { ambilTopikById, ambilMataKuliahById, ambilSemesterById, ambilTopikNavigation } from '@/lib/data'
import { useProgress } from '@/hooks/useProgress'

export default function MateriDetailPage({ params }) {
    // Unwrap params dengan React.use() di client component
    const resolvedParams = use(params)
    const [versiAktif, setVersiAktif] = useState('mentah') // 'mentah' atau 'simplified'
    const [isBookmarked, setIsBookmarked] = useState(false)

    // Progress tracking
    const { isTopicCompleted, toggleTopicCompletion } = useProgress()
    const [isCompleted, setIsCompleted] = useState(false)

    // Get data (harus sinkron karena client component)
    const topik = ambilTopikById(resolvedParams.id)

    // Check bookmark status on mount
    useEffect(() => {
        if (topik) {
            const savedBookmarks = localStorage.getItem('duaversi_bookmarks')
            if (savedBookmarks) {
                const bookmarkIds = JSON.parse(savedBookmarks)
                setIsBookmarked(bookmarkIds.includes(topik.id))
            }

            // Check completion status
            setIsCompleted(isTopicCompleted(topik.id))
        }
    }, [topik, isTopicCompleted])

    // Toggle bookmark
    const handleToggleBookmark = () => {
        const savedBookmarks = localStorage.getItem('duaversi_bookmarks')
        let bookmarkIds = savedBookmarks ? JSON.parse(savedBookmarks) : []

        if (isBookmarked) {
            // Remove bookmark
            bookmarkIds = bookmarkIds.filter(id => id !== topik.id)
            setIsBookmarked(false)
        } else {
            // Add bookmark
            bookmarkIds.push(topik.id)
            setIsBookmarked(true)
        }

        localStorage.setItem('duaversi_bookmarks', JSON.stringify(bookmarkIds))
    }

    // Toggle completion
    const handleToggleCompletion = () => {
        const newStatus = toggleTopicCompletion(topik.id)
        setIsCompleted(newStatus)
    }

    if (!topik) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                <div className="text-center">
                    <div className="text-8xl mb-4">📚</div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                        Materi Tidak Ditemukan
                    </h1>
                    <Link href="/">
                        <Tombol variant="primary">← Kembali ke Beranda</Tombol>
                    </Link>
                </div>
            </div>
        )
    }

    const matkul = ambilMataKuliahById(topik.mataKuliahId)
    const semester = ambilSemesterById(matkul.semesterId)
    const { prev, next } = ambilTopikNavigation(topik.id)

    // Breadcrumb
    const breadcrumbItems = [
        { label: semester.nama, href: `/semester/${semester.nomor}` },
        { label: matkul.nama, href: `/mata-kuliah/${matkul.id}` },
        { label: topik.judul, href: `/materi/${topik.id}` }
    ]

    // Get materi berdasarkan versi aktif
    const materiAktif = topik.materi[versiAktif]

    // Toggle handler
    const handleToggle = (versi) => {
        // Cek apakah versi tersedia
        if (topik.materi[versi].tersedia) {
            setVersiAktif(versi)
        }
    }

    return (
        <div className="min-h-screen py-12">
            <Kontainer>
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div className="flex-1">
                            <Badge variant="primary" className="mb-2">
                                {matkul.kode} - Topik {topik.urutan}
                            </Badge>
                            <h1
                                className="text-3xl md:text-4xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                            >
                                {topik.judul}
                            </h1>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                {topik.deskripsi}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {/* Bookmark Button */}
                            <Tombol
                                variant={isBookmarked ? "primary" : "outline"}
                                ukuran="large"
                                onClick={handleToggleBookmark}
                            >
                                {isBookmarked ? '❤️ Tersimpan' : '🤍 Bookmark'}
                            </Tombol>

                            {/* Completion Button */}
                            <Tombol
                                variant={isCompleted ? "secondary" : "outline"}
                                ukuran="large"
                                onClick={handleToggleCompletion}
                            >
                                {isCompleted ? '✅ Selesai' : '☑️ Tandai Selesai'}
                            </Tombol>
                        </div>
                    </div>

                    {/* Tags */}
                    {topik.tags && topik.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {topik.tags.map((tag, idx) => (
                                <Badge key={idx} variant="default" ukuran="small">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Toggle Versi - CORE FEATURE! */}
                <Kartu padding="medium" className="mb-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                🔄 Pilih Versi Materi
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Pilih antara versi original atau yang mudah dipahami
                            </p>
                        </div>

                        {/* Toggle Buttons */}
                        <div className="flex gap-3">
                            {/* Button Mentah */}
                            <button
                                onClick={() => handleToggle('mentah')}
                                disabled={!topik.materi.mentah.tersedia}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${!topik.materi.mentah.tersedia ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    } ${versiAktif === 'mentah' ? 'ring-2 ring-offset-2' : ''
                                    }`}
                                style={{
                                    backgroundColor: versiAktif === 'mentah' ? 'var(--color-primary)' : 'rgba(79, 70, 229, 0.1)',
                                    color: versiAktif === 'mentah' ? 'white' : 'var(--color-primary)',
                                    ringColor: 'var(--color-primary)'
                                }}
                            >
                                Original
                                {topik.materi.mentah.tersedia && (
                                    <div className="text-xs mt-1 opacity-80">
                                        {topik.materi.mentah.ukuran}
                                    </div>
                                )}
                            </button>

                            {/* Button Simplified */}
                            <button
                                onClick={() => handleToggle('simplified')}
                                disabled={!topik.materi.simplified.tersedia}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${!topik.materi.simplified.tersedia ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    } ${versiAktif === 'simplified' ? 'ring-2 ring-offset-2' : ''
                                    }`}
                                style={{
                                    backgroundColor: versiAktif === 'simplified' ? 'var(--color-secondary)' : 'rgba(5, 150, 105, 0.1)',
                                    color: versiAktif === 'simplified' ? 'white' : 'var(--color-secondary)',
                                    ringColor: 'var(--color-secondary)'
                                }}
                            >
                                Simplified
                                {topik.materi.simplified.tersedia && (
                                    <div className="text-xs mt-1 opacity-80">
                                        {topik.materi.simplified.ukuran}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </Kartu>

                {/* File Viewer */}
                <Kartu padding="none" className="mb-8">
                    {materiAktif.tersedia ? (
                        <div>
                            {/* Info Bar */}
                            <div
                                className="px-6 py-3 flex justify-between items-center"
                                style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
                            >
                                <div className="flex items-center gap-4">
                                    <Badge variant={versiAktif === 'mentah' ? 'primary' : 'secondary'}>
                                        {versiAktif === 'mentah' ? '📄 Versi Mentah' : '✨ Versi Simplified'}
                                    </Badge>
                                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                        {materiAktif.tipe.toUpperCase()} • {materiAktif.ukuran} • {materiAktif.jumlahHalaman} halaman
                                    </span>
                                </div>

                                <a
                                    href={materiAktif.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Tombol variant="outline" ukuran="small">
                                        🔗 Buka di Drive
                                    </Tombol>
                                </a>
                            </div>

                            {/* PDF Viewer */}
                            <div className="w-full" style={{ height: '600px', backgroundColor: '#f5f5f5' }}>
                                <iframe
                                    src={`${materiAktif.url}/preview`}
                                    className="w-full h-full border-0"
                                    title={`${topik.judul} - ${versiAktif}`}
                                    allow="autoplay"
                                />
                            </div>

                            {/* Download Bar */}
                            <div className="px-6 py-4 flex justify-center gap-4" style={{ borderTop: '1px solid var(--color-bg-light)' }}>
                                <a href={materiAktif.url} target="_blank" rel="noopener noreferrer">
                                    <Tombol variant="primary" ukuran="medium">
                                        📥 Download File
                                    </Tombol>
                                </a>
                            </div>
                        </div>
                    ) : (
                        // Not Available
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">😕</div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Materi {versiAktif === 'mentah' ? 'Mentah' : 'Simplified'} Belum Tersedia
                            </h3>
                            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                                Materi untuk versi ini sedang dalam proses pembuatan
                            </p>
                            {(versiAktif === 'simplified' && topik.materi.mentah.tersedia) && (
                                <Tombol variant="primary" onClick={() => handleToggle('mentah')}>
                                    Lihat Versi Mentah Saja
                                </Tombol>
                            )}
                        </div>
                    )}
                </Kartu>

                {/* Navigation Prev/Next */}
                <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8 mt-8">
                    {/* Previous */}
                    {prev ? (
                        <Link href={`/materi/${prev.id}`} className="flex-1">
                            <Kartu hover={true} padding="medium" className="h-full">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">←</div>
                                    <div className="flex-1">
                                        <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                                            Topik Sebelumnya
                                        </div>
                                        <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            {prev.judul}
                                        </div>
                                    </div>
                                </div>
                            </Kartu>
                        </Link>
                    ) : (
                        <div className="flex-1"></div>
                    )}

                    {/* Next */}
                    {next ? (
                        <Link href={`/materi/${next.id}`} className="flex-1">
                            <Kartu hover={true} padding="medium" className="h-full text-right">
                                <div className="flex items-center gap-3 justify-end">
                                    <div className="flex-1">
                                        <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                                            Topik Selanjutnya
                                        </div>
                                        <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            {next.judul}
                                        </div>
                                    </div>
                                    <div className="text-3xl">→</div>
                                </div>
                            </Kartu>
                        </Link>
                    ) : (
                        <div className="flex-1"></div>
                    )}
                </div>

                {/* Back Button */}
                <div>
                    <Link href={`/mata-kuliah/${matkul.id}`}>
                        <Tombol variant="outline" ukuran="medium">
                            ← Kembali ke {matkul.nama}
                        </Tombol>
                    </Link>
                </div>
            </Kontainer>
        </div>
    )
}
