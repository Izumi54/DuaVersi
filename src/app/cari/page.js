'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Kartu, { KartuHeader, KartuBody } from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { cariMateri, saranPencarian } from '@/lib/data'

export default function CariPage() {
    const [keyword, setKeyword] = useState('')
    const [debouncedKeyword, setDebouncedKeyword] = useState('')
    const resultsRef = useRef(null)

    // Debounce: state diturunkan dari keyword yang sudah berhenti berubah.
    // setState hanya dipanggil dari callback timer — bukan sinkron di effect —
    // dan hasil pencarian dihitung saat render (Fase 2, pola react-hooks baru).
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedKeyword(keyword)
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [keyword])

    const sudahCari = debouncedKeyword.trim() !== ''
    const isSearching = keyword !== debouncedKeyword && keyword.trim() !== ''
    // Hasil dikelompokkan (Fase 3): Topik + Mata Kuliah — bukan satu daftar topik.
    const hasil = sudahCari ? cariMateri(debouncedKeyword) : { topik: [], mataKuliah: [] }
    const jumlahHasil = hasil.topik.length + hasil.mataKuliah.length
    // Saran cepat + placeholder dibangkitkan dari data nyata (Fase 3):
    // setiap saran dijamin menghasilkan ≥1 hasil.
    const saran = saranPencarian()
    const placeholder = saran.length >= 3
        ? `Coba cari '${saran[0]}', '${saran[1]}', atau '${saran[2]}'...`
        : 'Coba cari topik atau mata kuliah...'

    return (
        <div className="min-h-screen py-20 relative overflow-x-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            <Kontainer>
                {/* Header Section */}
                <div className="text-center mb-12 relative z-10">
                    <h1
                        className="text-4xl md:text-6xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                        Cari Materi Kuliah
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                        Ketik topik, mata kuliah, atau kata kunci apa saja. Kami akan menemukannya untukmu.
                    </p>
                </div>

                {/* Search Box Area */}
                <div className="max-w-3xl mx-auto mb-16 relative z-10">
                    <div className="relative group">
                        <div
                            className="absolute -inset-1 rounded-2xl opacity-50 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200 pointer-events-none"
                            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
                        />
                        <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-2">
                            
                            <Input
                                type="text"
                                placeholder={placeholder}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full text-lg border-none focus:ring-0 px-4 py-4 bg-transparent"
                                autoFocus
                            />
                            {isSearching && (
                                <div className="pr-4">
                                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Suggestions Tags — dari data nyata (Fase 3) */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {saran.map((tag, idx) => (
                            <button
                                key={tag}
                                onClick={() => setKeyword(tag)}
                                className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 cursor-pointer"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Results Area */}
                <div ref={resultsRef} className="max-w-4xl mx-auto relative z-10 min-h-[400px]">
                    {sudahCari && (
                        <div className="animate-fadeIn">
                            {/* Stats Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/50">
                                <h2 className="text-lg font-semibold text-gray-600">
                                    Hasil Pencarian: <span className="text-indigo-600">&quot;{keyword}&quot;</span>
                                </h2>
                                <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-bold">
                                    {jumlahHasil} Ditemukan
                                </span>
                            </div>

                            {/* No Results State */}
                            {jumlahHasil === 0 && (
                                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300">
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">Belum ketemu nih...</h3>
                                    <p className="text-gray-500">Coba pakai kata kunci lain yang lebih umum ya!</p>
                                </div>
                            )}

                            {/* Hasil dikelompokkan: Mata Kuliah dulu, lalu Topik (Fase 3) */}
                            {hasil.mataKuliah.length > 0 && (
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                                        Mata Kuliah ({hasil.mataKuliah.length})
                                    </h3>
                                    <div className="grid gap-4">
                                        {hasil.mataKuliah.map((mk, index) => (
                                            <Link key={mk.id} href={`/mata-kuliah/${mk.id}`}>
                                                <div
                                                    className="group relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 transition-colors hover:border-indigo-300 dark:hover:border-indigo-700 overflow-hidden"
                                                    style={{
                                                        animation: `slideInLeft 0.5s ease-out forwards ${index * 0.1}s`,
                                                        opacity: 0,
                                                        transform: 'translateX(-20px)'
                                                    }}
                                                >

                                                    <div className="flex items-start gap-4">

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                                                                    {mk.kode}
                                                                </span>
                                                                <span className="text-xs text-gray-500">•</span>
                                                                <span className="text-xs font-medium text-gray-500 truncate">
                                                                    {mk.semester ? mk.semester.nama : ''}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-emerald-600 transition-colors">
                                                                {mk.nama}
                                                            </h3>

                                                            <p className="text-sm text-gray-600">
                                                                {mk.jumlahTopik} Topik
                                                                {mk.jumlahTopik === 0 && ' (Belum tersedia)'}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Results Grid — Topik */}
                            {hasil.topik.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                                        Topik ({hasil.topik.length})
                                    </h3>
                                    <div className="grid gap-4">
                                        {hasil.topik.map((item, index) => (
                                    <Link key={item.id} href={`/materi/${item.id}`}>
                                        <div
                                            className="group relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 transition-colors hover:border-indigo-300 dark:hover:border-indigo-700 overflow-hidden"
                                            style={{
                                                animation: `slideInLeft 0.5s ease-out forwards ${index * 0.1}s`,
                                                opacity: 0,
                                                transform: 'translateX(-20px)'
                                            }}
                                        >

                                            <div className="flex items-start gap-4">

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                                                            {item.mataKuliah.kode}
                                                        </span>
                                                        <span className="text-xs text-gray-500">•</span>
                                                        <span className="text-xs font-medium text-gray-500 truncate">
                                                            {item.mataKuliah.nama}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-indigo-600 transition-colors">
                                                        {item.judul}
                                                    </h3>

                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                        {item.deskripsi}
                                                    </p>

                                                    <div className="flex items-center gap-2 mt-2">
                                                        {item.tags && item.tags.slice(0, 3).map((tag, i) => (
                                                            <span key={i} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        </Link>
                                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Initial Placeholder */}
                    {!sudahCari && (
                        <div className="text-center py-20 opacity-50">
                            <h2 className="text-2xl font-bold text-gray-500">Siap menjelajah ilmu?</h2>
                        </div>
                    )}
                </div>
            </Kontainer>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    )
}
