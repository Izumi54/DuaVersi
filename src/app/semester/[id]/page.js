'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Kontainer from '@/components/layout/kontainer'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'
import { ambilSemesterById, ambilMataKuliahBySemester } from '@/lib/data'

export default function SemesterDetailPage({ params }) {
    // React.use() untuk unwrap params di Client Component (Next.js 16)
    const resolvedParams = use(params)
    const semesterId = `sem-${resolvedParams.id}`

    // Data fetching (simulated since data is static lib)
    const semester = ambilSemesterById(semesterId)
    const daftarMataKuliah = ambilMataKuliahBySemester(semesterId)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!semester) {
            notFound()
        }
        setIsVisible(true)
    }, [semester])

    if (!semester) return null

    // Warna dinamis berdasarkan semester (looping colors)
    const colors = [
        { bg: 'from-indigo-500 to-purple-600', text: 'text-indigo-600', border: 'border-indigo-200' },
        { bg: 'from-emerald-500 to-teal-600', text: 'text-emerald-600', border: 'border-emerald-200' },
        { bg: 'from-sky-500 to-blue-600', text: 'text-sky-600', border: 'border-sky-200' },
        { bg: 'from-orange-500 to-red-600', text: 'text-orange-600', border: 'border-orange-200' },
        { bg: 'from-pink-500 to-rose-600', text: 'text-pink-600', border: 'border-pink-200' },
        { bg: 'from-violet-500 to-indigo-600', text: 'text-violet-600', border: 'border-violet-200' },
        { bg: 'from-teal-500 to-emerald-600', text: 'text-teal-600', border: 'border-teal-200' },
        { bg: 'from-red-500 to-orange-600', text: 'text-red-600', border: 'border-red-200' },
    ]
    const theme = colors[(semester.nomor - 1) % colors.length]

    return (
        <div className="min-h-screen py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px]"
                    style={{ background: `linear-gradient(135deg, var(--color-primary), transparent)` }}
                />
            </div>

            <Kontainer>
                {/* Header Section */}
                <div
                    className={`relative mb-16 p-8 md:p-12 rounded-[2.5rem] overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-2xl`}
                >
                    {/* Background Gradient Mesh */}
                    <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${theme.bg} opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2`} />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className={`w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-3xl bg-gradient-to-br ${theme.bg} flex items-center justify-center text-white text-6xl md:text-7xl font-bold shadow-lg shadow-indigo-500/20`}>
                            {semester.nomor}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold bg-white dark:bg-slate-800 border ${theme.border} dark:border-slate-600 ${theme.text}`}>
                                    Semester {semester.nomor}
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                    {semester.tahunAkademik}
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                    {semester.jumlahMataKuliah} Mata Kuliah
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50" style={{ fontFamily: 'var(--font-heading)' }}>
                                {semester.nama}
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                                {semester.deskripsi}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mata Kuliah Grid */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Daftar Mata Kuliah</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{daftarMataKuliah.length} mata kuliah tersedia</span>
                    </div>

                    {daftarMataKuliah.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700">
                            <div className="text-6xl mb-4 grayscale opacity-50">📚</div>
                            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300">Belum ada mata kuliah</h3>
                            <p className="text-gray-500 dark:text-gray-400">Materi sedang disiapkan oleh tim kurikulum.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {daftarMataKuliah.map((matkul, index) => (
                                <Link
                                    key={matkul.id}
                                    href={`/mata-kuliah/${matkul.id}`}
                                    className="group"
                                >
                                    <div
                                        className="relative h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-8 rounded-3xl border border-white/60 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                                        style={{
                                            animation: `fadeInUp 0.6s ease-out forwards ${index * 0.1 + 0.3}s`,
                                            opacity: 0,
                                            transform: 'translateY(20px)'
                                        }}
                                    >
                                        <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${theme.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />

                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors`}>
                                                        {matkul.kode}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{matkul.sks} SKS</span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors mb-1">
                                                    {matkul.nama}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 italic font-medium">
                                                    {matkul.namaInggris}
                                                </p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                                ➜
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                                            {matkul.deskripsi}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700/50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">👨‍🏫</span>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{matkul.dosen}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-800">
                                                    <span>📄</span>
                                                    {matkul.jumlahTopik} Topik
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-16 text-center">
                    <Link href="/">
                        <button className="px-8 py-3 rounded-full font-medium text-gray-500 hover:text-indigo-600 hover:bg-white/50 transition-all border border-transparent hover:border-indigo-100">
                            ← Kembali ke Beranda
                        </button>
                    </Link>
                </div>
            </Kontainer>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
