'use client'

import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Badge from '@/components/ui/badge'
import { ambilTopikById, ambilMataKuliahById } from '@/lib/data'
import { useBookmarks } from '@/hooks/useBookmarks'

export default function BookmarkPage() {
    const { bookmarkIds, loading, removeBookmark } = useBookmarks()

    // Daftar diturunkan langsung dari bookmarkIds (state hook) — dulu disalin
    // lewat setState di effect, pola yang dilarang react-hooks (Fase 2).
    const bookmarkedTopiks = bookmarkIds
        .map(id => ambilTopikById(id))
        .filter(Boolean)
        .map(topik => ({
            ...topik,
            mataKuliah: ambilMataKuliahById(topik.mataKuliahId)
        }))

    const handleRemoveBookmark = (topikId) => {
        removeBookmark(topikId)
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

            <Kontainer>
                {/* Header Section */}
                <div className="text-center mb-16 relative z-10">
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
                        <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-12 border border-dashed border-gray-300 max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Belum ada koleksi</h2>
                            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                                Kamu belum menyimpan materi apa pun. Buka sebuah topik, lalu tekan tombol Bookmark untuk menyimpannya di sini.
                            </p>
                            <Link href="/" className="inline-block px-8 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">
                                Jelajahi Materi
                            </Link>
                        </div>
                    ) : (
                        // Masonry Grid Layout
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookmarkedTopiks.map((topik, index) => (
                                // Kartu bukan lagi <Link> yang membungkus tombol hapus (Fase 3):
                                // tombol hapus jadi saudara Link, bukan anaknya — HTML valid
                                // dan tombolnya tidak lagi tersembunyi sampai hover.
                                <div
                                    key={topik.id}
                                    className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 transition-colors hover:border-indigo-300 dark:hover:border-indigo-700"
                                >
                                    {/* Remove Button — selalu terlihat di sentuh & keyboard (Fase 3):
                                        tampil penuh di layar kecil, baru disembunyikan sampai
                                        hover/fokus di layar besar. */}
                                    <button
                                        onClick={() => handleRemoveBookmark(topik.id)}
                                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-red-500 transition-all hover:bg-red-500 hover:text-white z-10 hover:scale-110"
                                        title="Hapus dari koleksi"
                                        aria-label={`Hapus ${topik.judul} dari koleksi`}
                                    >
                                        ✕
                                    </button>

                                    <Link href={`/materi/${topik.id}`} className="block h-full">
                                        <div className="p-6 h-full flex flex-col">
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
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Tip */}
                {bookmarkedTopiks.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-600 bg-gray-100 dark:bg-slate-800 inline-block px-4 py-2 rounded-lg">
                            Data tersimpan di browsermu. Login untuk cloud sync segera hadir.
                        </p>
                    </div>
                )}

            </Kontainer>
        </div>
    )
}
