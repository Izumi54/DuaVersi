import Kontainer from '@/components/layout/kontainer'
import Tombol from '@/components/ui/tombol'

// Halaman Tentang direvisi 13 Nov 2026 (audit anti-slop #001 gelombang 2):
// tanpa parallax & orb gradien, tanpa glass, tanpa animasi masuk bertumpuk
// (halaman ini sekarang Server Component murni), tanpa emoji sebagai ikon,
// lencana status roadmap menjadi teks berwarna biasa (no. 20).
export default function TentangPage() {
    return (
        <div className="min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            {/* Hero Section */}
            <section className="relative py-24 flex items-center justify-center">
                <Kontainer>
                    <div className="text-center">
                        <h1
                            className="text-5xl md:text-7xl font-bold mb-8"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                        >
                            Merajut Masa Depan
                            <br />
                            <span className="text-indigo-600 dark:text-indigo-400">
                                Pendidikan Teknologi
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            Platform pembelajaran adaptif yang dirancang khusus untuk mahasiswa teknik informatika.
                            Satu materi, dua perspektif.
                        </p>
                    </div>
                </Kontainer>
            </section>

            {/* Visi Misi Section */}
            <section className="py-16 relative">
                <Kontainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Visi Card */}
                        <div className="relative p-10 rounded-2xl border bg-white dark:bg-slate-800" style={{ borderColor: 'var(--color-border-light)' }}>
                            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Visi Kami</h2>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                Menjadi katalisator transformasi pendidikan digital Indonesia dengan menyediakan akses materi berkualitas yang adaptif terhadap gaya belajar setiap individu.
                            </p>
                        </div>

                        {/* Misi Card */}
                        <div className="relative p-10 rounded-2xl border bg-white dark:bg-slate-800" style={{ borderColor: 'var(--color-border-light)' }}>
                            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Misi Kami</h2>
                            <ul className="space-y-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    Demokratisasi akses materi berkualitas tinggi
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    Inovasi metode pembelajaran dual-content
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    Membangun ekosistem belajar kolaboratif
                                </li>
                            </ul>
                        </div>
                    </div>
                </Kontainer>
            </section>

            {/* Core Features / Apa Itu */}
            <section className="py-20 relative">
                <Kontainer>
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
                                Konsep Dual-Content
                            </h2>
                            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
                                Satu topik, dua pendekatan. Pilih metode yang paling efektif untukmu.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Raw Version */}
                            <div className="p-8 rounded-2xl border border-indigo-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                                <h3 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">Versi Akademik</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    Materi original standar universitas. Ideal untuk mendalami teori dasar, notasi formal, dan referensi akademik yang presisi.
                                </p>
                                <div className="text-xs font-bold tracking-wider text-indigo-500 uppercase">Perdalam Teori</div>
                            </div>

                            {/* Simplified Version */}
                            <div className="p-8 rounded-2xl border border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                                <h3 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-emerald-300">Versi Simplified</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    Penjelasan dengan bahasa manusia. Analogi dunia nyata, studi kasus praktis, dan contoh yang dekat dengan keseharian.
                                </p>
                                <div className="text-xs font-bold tracking-wider text-emerald-500 uppercase">Bahasa Sehari-hari</div>
                            </div>
                        </div>
                    </div>
                </Kontainer>
            </section>

            {/* Timeline Roadmap — status ditulis sebagai teks berwarna,
                bukan titik + label kapital (audit no. 20) */}
            <section className="py-20">
                <Kontainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
                            Peta Perjalanan
                        </h2>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-gray-200 dark:bg-slate-700 transform -translate-x-1/2" />

                        {[
                            { title: 'Fase 1: Pondasi', desc: 'Peluncuran platform dasar untuk Teknik Informatika. Materi dilengkapi bertahap mulai Semester 1, satu mata kuliah sampai tuntas, dimulai dari Pengantar Ilmu Komputer.', status: 'Sedang berjalan', statusClass: 'text-amber-600 dark:text-amber-400' },
                            { title: 'Fase 2: Ekosistem', desc: 'Integrasi sistem login & profil, bookmark cloud, ruang diskusi, sistem upload materi, dan analytics pembelajaran.', status: 'Rencana', statusClass: 'text-gray-500 dark:text-gray-400' },
                            { title: 'Fase 3: Ekspansi', desc: 'Kolaborasi antar kampus serta perluasan ke program studi Saintek dan fakultas lainnya.', status: 'Rencana', statusClass: 'text-gray-500 dark:text-gray-400' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between mb-12 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
                            >
                                <div className="w-5/12" />
                                <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold">
                                    {i + 1}
                                </div>
                                <div className="w-5/12">
                                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
                                        <div className={`text-sm font-semibold mb-2 ${item.statusClass}`}>{item.status}</div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Kontainer>
            </section>

            {/* Team / Creator */}
            <section className="py-20 relative overflow-hidden">
                <Kontainer>
                    <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-12 md:p-20 text-center border border-gray-200 dark:border-slate-700">
                        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Dibuat dengan Hati</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            &quot;Projek ini lahir dari keresahan pribadi akan sulitnya mengakses materi kuliah yang terstruktur.
                            Harapannya, DuaVersi bisa menjadi teman belajar yang bisa diandalkan kapanpun dibutuhkan.&quot;
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">
                                Open Source
                            </span>
                            <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-medium border border-emerald-100">
                                Student Initiative
                            </span>
                            <span className="px-4 py-2 rounded-full bg-amber-50 text-amber-600 font-medium border border-amber-100">
                                Non-Profit
                            </span>
                        </div>
                    </div>
                </Kontainer>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 text-center">
                <Kontainer>
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Siap untuk mulai?</h2>
                    <div className="flex justify-center gap-4">
                        <Tombol variant="primary" ukuran="large" href="/semester/1" className="px-8 py-4">
                            Lihat Materi Semester 1
                        </Tombol>
                    </div>
                </Kontainer>
            </section>
        </div>
    )
}
