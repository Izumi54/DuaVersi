'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Badge from '@/components/ui/badge'
import { ambilSemuaTopik, ambilMataKuliahById } from '@/lib/data'

export default function BookmarkPage() {
    const [bookmarkedTopiks, setBookmarkedTopiks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedBookmarks = localStorage.getItem('duaversi_bookmarks')
        if (savedBookmarks) {
            const bookmarkIds = JSON.parse(savedBookmarks)
            const allTopiks = ambilSemuaTopik()
            const bookmarked = allTopiks.filter(topik => bookmarkIds.includes(topik.id))

            const withMatkul = bookmarked.map(topik => ({
                ...topik,
                mataKuliah: ambilMataKuliahById(topik.mataKuliahId)
            }))
            setBookmarkedTopiks(withMatkul)
        }
        setLoading(false)
    }, [])

    const handleRemoveBookmark = (e, topikId) => {
        e.preventDefault() // Prevent navigation trigger from parent Link
        e.stopPropagation()
        setBookmarkedTopiks(prev => prev.filter(t => t.id !== topikId))
        const savedBookmarks = localStorage.getItem('duaversi_bookmarks')
        if (savedBookmarks) {
            const bookmarkIds = JSON.parse(savedBookmarks)
            const updated = bookmarkIds.filter(id => id !== topikId)
            localStorage.setItem('duaversi_bookmarks', JSON.stringify(updated))
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Memuat perpustakaanmu...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }} />
            </div>

            <Kontainer>
                {/* Header Section */}
                <div className="text-center mb-16 relative z-10">
                    <div className="inline-block p-4 rounded-3xl bg-white/50 backdrop-blur-md shadow-lg mb-6 border border-white/50 animate-bounce">
                        <span className="text-4xl">❤️</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
                        Perpustakaan Saya
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                        Koleksi materi pilihanmu. Siap diakses kapan saja.
                    </p>
                </div>

                {/* Content Area */}
                <div className="relative z-10 min-h-[400px]">
                    {bookmarkedTopiks.length === 0 ? (
                        // Empty State
                        <div className="text-center bg-white/40 backdrop-blur-md rounded-[2.5rem] p-12 border border-dashed border-gray-300 max-w-3xl mx-auto opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                            <div className="text-8xl mb-6 grayscale opacity-40">📚</div>
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Belum ada koleksi</h2>
                            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                                Kamu belum menyimpan materi apapun tanda hati untuk menyimpannya di sini.
                            </p>
                            <Link href="/">
                                <button className="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1">
                                    Mulai Jelajahi Materi ➜
                                </button>
                            </Link>
                        </div>
                    ) : (
                        // Masonry Grid Layout
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookmarkedTopiks.map((topik, index) => (
                                <Link key={topik.id} href={`/materi/${topik.id}`}>
                                    <div
                                        className="group relative bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
                                        style={{
                                            opacity: 0,
                                            animation: `fadeInUp 0.5s ease-out forwards ${index * 0.1}s`
                                        }}
                                    >
                                        {/* Remove Button (Hover Only) */}
                                        <button
                                            onClick={(e) => handleRemoveBookmark(e, topik.id)}
                                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-10 hover:scale-110"
                                            title="Hapus dari koleksi"
                                        >
                                            ✕
                                        </button>

                                        {/* Header info */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">
                                                    {topik.mataKuliah.kode}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span className="text-xs text-gray-500 font-medium truncate flex-1">
                                                    {topik.mataKuliah.nama}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-800 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                                                {topik.judul}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1">
                                            {topik.deskripsi}
                                        </p>

                                        {/* Footer Tags */}
                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex gap-1.5 flex-wrap">
                                                {topik.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-gray-100 text-gray-500 font-medium group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                                ➜
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Tip */}
                {bookmarkedTopiks.length > 0 && (
                    <div className="mt-12 text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards_1s]">
                        <p className="text-sm text-gray-400 bg-white/30 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                            💡 Data tersimpan di browsermu. Login untuk cloud sync segera hadir.
                        </p>
                    </div>
                )}

            </Kontainer>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    )
}
