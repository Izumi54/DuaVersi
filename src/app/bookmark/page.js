'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Kartu, { KartuHeader, KartuBody } from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'
import { ambilSemuaTopik, ambilMataKuliahById } from '@/lib/data'

export default function BookmarkPage() {
    const [bookmarkedTopiks, setBookmarkedTopiks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load bookmarks dari localStorage
        const savedBookmarks = localStorage.getItem('duaversi_bookmarks')
        if (savedBookmarks) {
            const bookmarkIds = JSON.parse(savedBookmarks)
            const allTopiks = ambilSemuaTopik()

            // Filter topik yang di-bookmark
            const bookmarked = allTopiks.filter(topik => bookmarkIds.includes(topik.id))

            // Add mata kuliah info
            const withMatkul = bookmarked.map(topik => ({
                ...topik,
                mataKuliah: ambilMataKuliahById(topik.mataKuliahId)
            }))

            setBookmarkedTopiks(withMatkul)
        }
        setLoading(false)
    }, [])

    const handleRemoveBookmark = (topikId) => {
        // Remove dari state
        setBookmarkedTopiks(prev => prev.filter(t => t.id !== topikId))

        // Remove dari localStorage
        const savedBookmarks = localStorage.getItem('duaversi_bookmarks')
        if (savedBookmarks) {
            const bookmarkIds = JSON.parse(savedBookmarks)
            const updated = bookmarkIds.filter(id => id !== topikId)
            localStorage.setItem('duaversi_bookmarks', JSON.stringify(updated))
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Loading bookmarks...</p>
                </div>
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: 'var(--color-bg-light)' }} className="min-h-screen py-12">
            <Kontainer>
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        Bookmark Saya
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                        Materi yang sudah kamu simpan untuk dipelajari nanti
                    </p>
                </div>

                {/* Stats */}
                {bookmarkedTopiks.length > 0 && (
                    <div className="mb-8 text-center">
                        <Badge variant="primary" ukuran="large">
                            {bookmarkedTopiks.length} Materi Tersimpan
                        </Badge>
                    </div>
                )}

                {/* Content */}
                {bookmarkedTopiks.length === 0 ? (
                    // Empty State
                    <Kartu padding="large" className="text-center max-w-2xl mx-auto">
                        <div className="text-8xl mb-6">📚</div>
                        <h2
                            className="text-2xl font-bold mb-3"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Belum Ada Bookmark
                        </h2>
                        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                            Kamu belum menyimpan materi apapun. Mulai jelajahi materi dan klik tombol bookmark
                            untuk menyimpan materi favoritmu!
                        </p>
                        <Link href="/">
                            <Tombol variant="primary" ukuran="large">
                                📚 Jelajahi Materi
                            </Tombol>
                        </Link>
                    </Kartu>
                ) : (
                    // Bookmark List
                    <div className="space-y-4">
                        {bookmarkedTopiks.map((topik) => (
                            <Kartu key={topik.id} padding="medium">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Content */}
                                    <div className="flex-1">
                                        <KartuHeader className="mb-3">
                                            {/* Mata Kuliah Badge */}
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <Badge variant="primary" ukuran="small">
                                                    {topik.mataKuliah.kode}
                                                </Badge>
                                                <Badge variant="default" ukuran="small">
                                                    Topik {topik.urutan}
                                                </Badge>
                                            </div>

                                            {/* Judul */}
                                            <h3
                                                className="text-xl font-bold mb-2"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                {topik.judul}
                                            </h3>

                                            {/* Mata Kuliah */}
                                            <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                                📖 {topik.mataKuliah.nama}
                                            </p>
                                        </KartuHeader>

                                        <KartuBody>
                                            {/* Deskripsi */}
                                            <p
                                                className="text-sm mb-3"
                                                style={{ color: 'var(--color-text-secondary)' }}
                                            >
                                                {topik.deskripsi}
                                            </p>

                                            {/* Available Materials */}
                                            <div className="flex flex-wrap gap-2">
                                                {topik.materi.mentah.tersedia && (
                                                    <Badge variant="default" ukuran="small">
                                                        📄 Mentah
                                                    </Badge>
                                                )}
                                                {topik.materi.simplified.tersedia && (
                                                    <Badge variant="secondary" ukuran="small">
                                                        ✨ Simplified
                                                    </Badge>
                                                )}

                                                {/* Tags */}
                                                {topik.tags && topik.tags.slice(0, 3).map((tag, idx) => (
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
                                        </KartuBody>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex md:flex-col gap-2 justify-end">
                                        <Link href={`/materi/${topik.id}`} className="flex-1 md:flex-initial">
                                            <Tombol variant="primary" ukuran="medium" className="w-full">
                                                📖 Buka
                                            </Tombol>
                                        </Link>
                                        <Tombol
                                            variant="outline"
                                            ukuran="medium"
                                            onClick={() => handleRemoveBookmark(topik.id)}
                                            className="flex-1 md:flex-initial"
                                        >
                                            🗑️ Hapus
                                        </Tombol>
                                    </div>
                                </div>
                            </Kartu>
                        ))}
                    </div>
                )}

                {/* Tips */}
                {bookmarkedTopiks.length > 0 && (
                    <Kartu padding="medium" className="mt-8 max-w-2xl mx-auto">
                        <div className="flex items-start gap-3">
                            <div className="text-3xl">💡</div>
                            <div>
                                <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    Tips Belajar
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Bookmark disimpan di browser kamu. Untuk akses dari device lain,
                                    fitur cloud sync akan hadir di update berikutnya!
                                </p>
                            </div>
                        </div>
                    </Kartu>
                )}

                {/* Back Button */}
                <div className="mt-8 text-center">
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
