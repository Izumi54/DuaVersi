import Link from 'next/link'
import { notFound } from 'next/navigation'
import Kontainer from '@/components/layout/kontainer'
import Badge from '@/components/ui/badge'
import Tombol from '@/components/ui/tombol'
import { ambilSemuaSemester, ambilSemesterById, ambilMataKuliahBySemester } from '@/lib/data'

export function generateStaticParams() {
    return ambilSemuaSemester().map((s) => ({ id: String(s.nomor) }))
}

export async function generateMetadata({ params }) {
    const { id } = await params
    const semester = ambilSemesterById(`sem-${id}`)
    if (!semester) return { title: 'Semester Tidak Ditemukan · DuaVersi' }
    return {
        title: `${semester.nama} · DuaVersi`,
        description: `Materi kuliah ${semester.nama}: ${semester.jumlahMataKuliah} mata kuliah tersedia di DuaVersi.`,
    }
}

export default async function SemesterDetailPage({ params }) {
    const { id } = await params
    const semesterId = `sem-${id}`

    // Server Component: data statis dibaca saat render; notFound() langsung
    // di sini (bukan di useEffect) agar rute invalid membalas 404 beneran.
    const semester = ambilSemesterById(semesterId)
    if (!semester) {
        notFound()
    }
    const daftarMataKuliah = ambilMataKuliahBySemester(semesterId)

    // Skema warna tunggal indigo (audit anti-slop #001 no. 17: palet tidak
    // lagi berganti warna per semester; identitas dari DESIGN.md).

    return (
        <div className="min-h-screen py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            <Kontainer>
                {/* Header Section */}
                <div
                    className="relative mb-16 p-8 md:p-12 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-6xl md:text-7xl font-bold">
                            {semester.nomor}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300">
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
                        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
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
                                        className="relative h-full bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors overflow-hidden"
                                    >

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
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                                ›
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                                            {matkul.deskripsi}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700/50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{matkul.dosen}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-800">
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

                {/* Back Button (Fase 3: Link bergaya tombol, tanpa <button> di dalam) */}
                <div className="mt-16 text-center">
                    <Link href="/" className="inline-block px-8 py-3 rounded-full font-medium text-gray-500 hover:text-indigo-600 hover:bg-white/50 transition-all border border-transparent hover:border-indigo-100">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </Kontainer>
        </div>
    )
}
