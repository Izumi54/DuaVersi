'use client'

import { useState, useEffect, useRef } from 'react'
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
    const resultsRef = useRef(null)

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
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [keyword])

    return (
        <div className="min-h-screen py-20 relative overflow-x-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
                    style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[80px]"
                    style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)' }}
                />
            </div>

            <Kontainer>
                {/* Header Section */}
                <div className="text-center mb-12 relative z-10">
                    <div
                        className="inline-block p-4 rounded-3xl bg-white/50 backdrop-blur-md shadow-lg mb-6 border border-white/50 animate-bounce"
                    >
                        <span className="text-4xl">🔍</span>
                    </div>
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
                            <span className="pl-4 text-2xl text-gray-400">✨</span>
                            <Input
                                type="text"
                                placeholder="Coba cari 'Algoritma', 'Basis Data', atau 'Struktur Data'..."
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

                    {/* Quick Suggestions Tags */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {['Algoritma', 'Database', 'Python', 'Jaringan', 'AI', 'Web Design', 'React'].map((tag, idx) => (
                            <button
                                key={tag}
                                onClick={() => setKeyword(tag)}
                                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-1 hover:shadow-md bg-white/60 hover:bg-white border border-gray-100"
                                style={{
                                    animation: `fadeInUp 0.5s ease-out forwards ${idx * 0.1}s`,
                                    opacity: 0
                                }}
                            >
                                🔍 {tag}
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
                                    Hasil Pencarian: <span className="text-indigo-600">"{keyword}"</span>
                                </h2>
                                <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-bold">
                                    {hasil.length} Ditemukan
                                </span>
                            </div>

                            {/* No Results State */}
                            {hasil.length === 0 && (
                                <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300">
                                    <div className="text-6xl mb-4 grayscale opacity-50">🤔</div>
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">Belum ketemu nih...</h3>
                                    <p className="text-gray-500">Coba pakai kata kunci lain yang lebih umum ya!</p>
                                </div>
                            )}

                            {/* Results Grid */}
                            <div className="grid gap-4">
                                {hasil.map((item, index) => (
                                    <Link key={item.id} href={`/materi/${item.id}`}>
                                        <div
                                            className="group relative bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                            style={{
                                                animation: `slideInLeft 0.5s ease-out forwards ${index * 0.1}s`,
                                                opacity: 0,
                                                transform: 'translateX(-20px)'
                                            }}
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                    📄
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                                                            {item.mataKuliah.kode}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
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

                                                <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                                                    👉
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Initial Placeholder */}
                    {!sudahCari && (
                        <div className="text-center py-20 opacity-50">
                            <div className="text-8xl mb-6">📚</div>
                            <h2 className="text-2xl font-bold text-gray-400">Siap menjelajah ilmu?</h2>
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
