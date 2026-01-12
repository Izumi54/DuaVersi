'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Kontainer from '@/components/layout/kontainer'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'
import MatkulProgress from '@/components/features/matkul-progress'
import { ambilMataKuliahById, ambilTopikByMataKuliah, ambilSemesterById } from '@/lib/data'

export default function MataKuliahDetailPage({ params }) {
    // React.use() untuk unwrap params di Client Component (Next.js 16)
    const resolvedParams = use(params)
    const matkul = ambilMataKuliahById(resolvedParams.id)
    const daftarTopik = ambilTopikByMataKuliah(matkul?.id)
    const semester = matkul ? ambilSemesterById(matkul.semesterId) : null

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!matkul) {
            notFound()
        }
        setIsVisible(true)
    }, [matkul])

    if (!matkul || !semester) return null

    return (
        <div className="min-h-screen py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
                    style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
                    style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
                />
            </div>

            <Kontainer>
                {/* Hero Header Card */}
                <div
                    className={`relative mb-12 p-8 md:p-12 rounded-[2.5rem] overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-2xl`}
                >
                    <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                        {/* Left: Main Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                    {matkul.kode}
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                    {matkul.sks} SKS
                                </span>
                                <Link href={`/semester/${semester.nomor}`}>
                                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                                        Semester {semester.nomor} ➜
                                    </span>
                                </Link>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                {matkul.nama}
                            </h1>
                            <p className="text-xl text-gray-400 dark:text-gray-500 italic font-serif mb-6">
                                {matkul.namaInggris}
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                {matkul.deskripsi}
                            </p>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/50 w-fit">
                                <span className="text-3xl">👨‍🏫</span>
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-0.5">Dosen Pengampu</div>
                                    <div className="font-semibold text-gray-800 dark:text-gray-200">{matkul.dosen}</div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats Card */}
                        <div className="lg:w-72">
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20">
                                <div className="text-center mb-6">
                                    <div className="text-6xl font-bold mb-2 tracking-tight">{daftarTopik.length}</div>
                                    <div className="text-sm font-medium text-indigo-100 uppercase tracking-wider">Total Topik</div>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-indigo-100">Versi Akademik</span>
                                        <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">
                                            {daftarTopik.filter(t => t.materi.mentah.tersedia).length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-indigo-100">Versi Simple</span>
                                        <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">
                                            {daftarTopik.filter(t => t.materi.simplified.tersedia).length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar (Component) */}
                <div className="mb-12 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards_0.5s]">
                    <MatkulProgress daftarTopik={daftarTopik} />
                </div>

                {/* Timeline Topic List */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 hidden md:block" />

                    {daftarTopik.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <div className="text-6xl mb-4">🚧</div>
                            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300">Materi Sedang Disusun</h3>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {daftarTopik.map((topik, index) => (
                                <Link key={topik.id} href={`/materi/${topik.id}`} className="block group">
                                    <div
                                        className={`relative md:flex items-center gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                        style={{
                                            opacity: 0,
                                            animation: `fadeInUp 0.6s ease-out forwards ${0.5 + index * 0.1}s`
                                        }}
                                    >
                                        {/* Timeline Dot (Center) */}
                                        <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-700 border-4 border-indigo-500 shadow-lg transform -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-150 hidden md:block" />

                                        {/* Card Side */}
                                        <div className="flex-1 ml-20 md:ml-0 md:w-1/2">
                                            <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-indigo-200 dark:group-hover:border-indigo-500">
                                                {/* Number Badge */}
                                                <div className="absolute -left-12 md:-left-4 md:-top-4 w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30 text-lg md:text-base">
                                                    {topik.urutan}
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {topik.judul}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                                                    {topik.deskripsi}
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {topik.materi.mentah.tersedia && (
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-slate-600 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900 group-hover:border-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                                            📄 {topik.materi.mentah.ukuran}
                                                        </span>
                                                    )}
                                                    {topik.materi.simplified.tersedia && (
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 text-xs font-medium border border-teal-100 dark:border-teal-800 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                                                            ✨ Simplified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Empty Side (Spacer) */}
                                        <div className="flex-1 hidden md:block" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-20 text-center">
                    <Link href={`/semester/${semester.nomor}`}>
                        <button className="px-8 py-3 rounded-full font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                            ← Kembali ke Semester {semester.nomor}
                        </button>
                    </Link>
                </div>

            </Kontainer>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
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
