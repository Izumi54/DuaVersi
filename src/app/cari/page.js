'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Kartu, { KartuHeader, KartuBody } from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { cariMateri } from '@/lib/data'

export default function CariPage() {
    const [keyword, setKeyword] = useState('')
    const [hasil, setHasil] = useState([])
    const [sudahCari, setSudahCari] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    // Debounced search - auto search saat user berhenti mengetik
    useEffect(() => {
        if (keyword.trim() === '') {
            setHasil([])
            setSudahCari(false)
            setIsSearching(false)
            return
        }

        setIsSearching(true)
        const debounceTimer = setTimeout(() => {
            const results = cariMateri(keyword)
            setHasil(results)
            setSudahCari(true)
            setIsSearching(false)
        }, 300) // 300ms delay untuk debounce

        return () => clearTimeout(debounceTimer)
    }, [keyword])

    return (
        <div style={{ backgroundColor: 'var(--color-bg-light)' }} className="min-h-screen py-12">
            <Kontainer>
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        Cari Materi
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                        Temukan materi kuliah berdasarkan keyword, topik, atau mata kuliah
                    </p>
                </div>

                {/* Search Form */}
                <Kartu padding="large" className="max-w-3xl mx-auto mb-8">
                    <div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Cari materi... (contoh: algoritma, database, array)"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    icon={<span>🔍</span>}
                                    className="text-base"
                                />
                            </div>
                            {isSearching && (
                                <div className="flex items-center px-4">
                                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                        Mencari...
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Quick Search Suggestions */}
                        <div className="mt-4">
                            <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                Coba cari:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['algoritma', 'array', 'pointer', 'database', 'loop', 'fungsi'].map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setKeyword(tag)}
                                        className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                                        style={{
                                            backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                            color: 'var(--color-primary)'
                                        }}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Kartu>

                {/* Results */}
                {sudahCari && (
                    <div>
                        {/* Stats */}
                        <div className="mb-6 text-center">
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                {hasil.length === 0 ? (
                                    <>Tidak ada hasil untuk "<strong>{keyword}</strong>"</>
                                ) : (
                                    <>
                                        Ditemukan <strong>{hasil.length}</strong> materi untuk "<strong>{keyword}</strong>"
                                    </>
                                )}
                            </p>
                        </div>

                        {hasil.length === 0 ? (
                            // No Results
                            <Kartu padding="large" className="text-center max-w-2xl mx-auto">
                                <div className="text-8xl mb-4">😕</div>
                                <h2
                                    className="text-2xl font-bold mb-3"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    Tidak Ada Hasil
                                </h2>
                                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                                    Materi yang kamu cari tidak ditemukan. Coba dengan keyword lain!
                                </p>
                                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <p className="mb-2">💡 <strong>Tips pencarian:</strong></p>
                                    <ul className="text-left max-w-md mx-auto space-y-1">
                                        <li>• Gunakan keyword yang lebih umum</li>
                                        <li>• Cek ejaan keyword</li>
                                        <li>• Coba gunakan sinonim atau istilah terkait</li>
                                    </ul>
                                </div>
                            </Kartu>
                        ) : (
                            // Results List
                            <div className="space-y-4">
                                {hasil.map((item) => (
                                    <Link key={item.id} href={`/materi/${item.id}`}>
                                        <Kartu hover={true} padding="medium" className="transition-all hover:scale-[1.01]">
                                            <div className="flex items-start gap-4">
                                                {/* Icon */}
                                                <div
                                                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                                                    style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)' }}
                                                >
                                                    📄
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <KartuHeader className="mb-2">
                                                        {/* Badges */}
                                                        <div className="flex flex-wrap gap-2 mb-2">
                                                            <Badge variant="primary" ukuran="small">
                                                                {item.mataKuliah.kode}
                                                            </Badge>
                                                            <Badge variant="default" ukuran="small">
                                                                Topik {item.urutan}
                                                            </Badge>
                                                        </div>

                                                        {/* Judul */}
                                                        <h3
                                                            className="text-lg font-bold mb-1"
                                                            style={{ color: 'var(--color-text-primary)' }}
                                                        >
                                                            {item.judul}
                                                        </h3>

                                                        {/* Mata Kuliah */}
                                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                                            📖 {item.mataKuliah.nama}
                                                        </p>
                                                    </KartuHeader>

                                                    <KartuBody>
                                                        {/* Deskripsi */}
                                                        <p
                                                            className="text-sm mb-3 line-clamp-2"
                                                            style={{ color: 'var(--color-text-secondary)' }}
                                                        >
                                                            {item.deskripsi}
                                                        </p>

                                                        {/* Tags & Availability */}
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.materi.mentah.tersedia && (
                                                                <Badge variant="default" ukuran="small">
                                                                    📄 Mentah
                                                                </Badge>
                                                            )}
                                                            {item.materi.simplified.tersedia && (
                                                                <Badge variant="secondary" ukuran="small">
                                                                    ✨ Simplified
                                                                </Badge>
                                                            )}

                                                            {/* Tags (max 3) */}
                                                            {item.tags && item.tags.slice(0, 3).map((tag, idx) => (
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

                                                {/* Arrow */}
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
                )}

                {/* Initial State (before search) */}
                {!sudahCari && (
                    <Kartu padding="large" className="text-center max-w-2xl mx-auto">
                        <div className="text-8xl mb-4">📚</div>
                        <h2
                            className="text-2xl font-bold mb-3"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Mulai Pencarian
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Ketik keyword di atas atau klik salah satu tag untuk mulai mencari materi
                        </p>
                    </Kartu>
                )}

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <button
                            className="px-6 py-3 rounded-lg font-semibold transition-all"
                            style={{
                                backgroundColor: 'transparent',
                                border: '2px solid var(--color-primary)',
                                color: 'var(--color-primary)'
                            }}
                        >
                            ← Kembali ke Beranda
                        </button>
                    </Link>
                </div>
            </Kontainer>
        </div>
    )
}
