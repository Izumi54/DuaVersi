'use client'

import { useState } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Tombol from '@/components/ui/tombol'
import { ambilSemuaSemester } from '@/lib/data'

// Beranda direvisi 13 Nov 2026 mengikuti DESIGN.md (audit anti-slop #001
// gelombang 2, nomor 6-17 & 19): tanpa gradien biru-ungu, tanpa glass &
// glow massal, tanpa emoji sebagai ikon, tanpa animasi masuk bertumpuk
// (MOTION 1), ritme section bervariasi, satu skema warna kartu semester.
export default function HomePage() {
  // Interactive Demo State
  const [demoMode, setDemoMode] = useState('simplified') // 'academic' | 'simplified'

  const semesters = ambilSemuaSemester()

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

      {/* HERO — satu titik fokus: judul + dua aksi. Tanpa badge kapsul,
          tanpa orb gradien, tanpa emoji melayang (audit no. 6, 8, 9). */}
      <section className="pt-24 pb-20">
        <Kontainer>
          <div className="text-center relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
              Belajar Kuliah <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                Jadi Lebih Mudah.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
              Platform materi Teknik Informatika dengan pendekatan <span className="text-indigo-600 font-bold">Dual-Perspective</span>.
              Satu topik, dua cara penyampaian: versi mentah sesuai bahan kuliah, dan versi simplified dengan bahasa sehari-hari.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Tombol variant="primary" ukuran="large" href="/semester/1" className="w-full sm:w-auto px-8 py-4 text-lg">
                Lihat Materi Semester 1
              </Tombol>
              <Tombol variant="outline" ukuran="large" href="/tentang" className="w-full sm:w-auto px-8 py-4 text-lg">
                Apa Itu DuaVersi
              </Tombol>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* DEMO INTERAKTIF — panel polos tanpa jendela browser palsu (no. 16).
          Sakelar pil dipertahankan karena bentuk itu bentuk sakelar. */}
      <section className="py-16 relative z-10">
        <Kontainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rasakan Bedanya</h2>
            <p className="text-gray-500">Klik tombol di bawah untuk melihat perbedaan penyampaian materi.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Demo Toggle Switch */}
            <div className="flex justify-center mb-8">
              <div className="bg-white dark:bg-slate-800 p-1.5 rounded-full border border-gray-200 dark:border-slate-700 inline-flex relative">
                {/* Sliding Pill Background */}
                <div
                  className={`absolute top-1.5 bottom-1.5 w-[140px] bg-indigo-600 rounded-full transition-all duration-500 ${demoMode === 'academic' ? 'left-1.5' : 'left-[148px]'}`}
                />

                <button
                  onClick={() => setDemoMode('academic')}
                  className={`relative z-10 w-[140px] py-3 rounded-full font-bold text-sm transition-colors duration-300 cursor-pointer ${demoMode === 'academic' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Versi Akademik
                </button>
                <button
                  onClick={() => setDemoMode('simplified')}
                  className={`relative z-10 w-[140px] py-3 rounded-full font-bold text-sm transition-colors duration-300 cursor-pointer ${demoMode === 'simplified' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Versi Simple
                </button>
              </div>
            </div>

            {/* Demo Content Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700">
              {/* Demo Body Content - SCROLLABLE & FIXED HEIGHT */}
              <div className="relative h-[400px]">

                {/* Academic Content */}
                <div className={`absolute inset-0 p-8 md:p-12 overflow-y-auto transition-opacity duration-300 ${demoMode === 'academic' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Definisi Formal</span>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-4">Pointer dalam C++</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-serif mb-6">
                    &quot;Pointer adalah variabel yang menyimpan alamat memori dari variabel lain sebagai nilai referensinya. Operator dereference (*) digunakan untuk mengakses nilai yang disimpan di alamat memori tersebut, sedangkan operator address-of (&) digunakan untuk mendapatkan alamat memori.&quot;
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-serif mb-6">
                    Dalam pemrograman C++, penggunaan pointer sangat krusial untuk manajemen memori dinamis dan struktur data tingkat lanjut seperti linked list dan tree.
                  </p>
                  <div className="p-4 bg-gray-900 rounded-xl overflow-x-auto">
                    <code className="text-sm font-mono text-green-400">
                      int* ptr = &variable;<br />
                      printf(&quot;%d&quot;, *ptr);
                    </code>
                  </div>
                </div>

                {/* Simplified Content */}
                <div className={`absolute inset-0 p-8 md:p-12 overflow-y-auto transition-opacity duration-300 ${demoMode === 'simplified' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2 block">Penjelasan Santai</span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Pointer itu Petunjuk Jalan!</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    &quot;Bayangkan <strong className="text-indigo-600">kertas contekan</strong> di laci mejamu. <br /><br />
                    Variabel biasa itu <b>isinya</b> contekan tersebut. <br />
                    Pointer itu cuma <b>kertas petunjuk</b> yang bertuliskan: <br />
                    <i>&apos;Contekan ada di laci nomer 3&apos;</i>.&quot;
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Jadi kamu gak perlu bawa laci meja-nya kemana-mana (boros tenaga/memori), cukup bawa kertas petunjuknya aja! Pintar kan?
                  </p>
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                      Lebih masuk akal kan?
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* FITUR — daftar editorial, bukan tiga kartu fotokopian (no. 13):
          judul di kiri, penjelasan di kanan, dipisahkan garis. */}
      <section className="py-16 border-t border-gray-200 dark:border-slate-700">
        <Kontainer>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Cara Belajar di DuaVersi</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl">Tiga hal yang menentukan bentuk situs ini, dan yang benar-benar sudah berjalan.</p>

          <div className="divide-y divide-gray-200 dark:divide-slate-700 border-y border-gray-200 dark:border-slate-700">
            {[
              { title: 'To-The-Point', desc: 'Tanpa basa-basi. Materi disusun ringkas dan langsung ke inti.' },
              { title: 'Bahasa Manusia', desc: 'Bye-bye bahasa textbook kaku. Kita pakai analogi sehari-hari.' },
              { title: 'Progres Tercatat', desc: 'Topik yang sudah selesai dan bookmark tersimpan di browsermu, jadi kamu tahu sudah sampai mana.' }
            ].map((feature) => (
              <div key={feature.title} className="py-6 md:flex md:items-baseline md:gap-10">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:w-1/3 shrink-0 mb-2 md:mb-0">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Kontainer>
      </section>

      {/* SEMESTER GRID — satu skema warna (no. 17): permukaan solid,
          chip nomor indigo, label kosong jujur tanpa kaca (no. 7). */}
      <section className="py-20">
        <Kontainer>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Pilih Semester</h2>
              <p className="text-gray-500 text-lg">Materi tersusun rapi sesuai kurikulum.</p>
            </div>
            <div>
              <Link href="/cari">
                <span className="text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-2 text-lg">
                  Cari Topik
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {semesters.map((sem) => (
              <Link key={sem.id} href={`/semester/${sem.nomor}`}>
                <div className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 transition-colors hover:border-indigo-300 dark:hover:border-indigo-700">
                  <div className="absolute inset-0 p-6 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                      {/* Semester Number */}
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg">
                        {sem.nomor}
                      </div>
                      {/* Label jujur (Fase 1): semester tanpa mata kuliah ditandai terbuka, bukan disembunyikan */}
                      {sem.jumlahMataKuliah === 0 && (
                        <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-slate-700 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                          Belum tersedia
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1 block">Semester</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                        {sem.nama}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 font-medium">
                        {sem.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Kontainer>
      </section>

      {/* CTA — panel indigo pekat solid (no. 6), tanpa noise pihak ketiga
          (no. 12), tanpa orb bercahaya & glow tombol (no. 10). */}
      <section className="py-16 pb-24">
        <Kontainer>
          <div className="relative rounded-2xl overflow-hidden p-12 md:p-16 text-center bg-indigo-950">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
                Siap Jadi Mahasiswa <br />
                Paling Ambis?
              </h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Materi dilengkapi bertahap mulai Semester 1. Buka daftar semester, pilih mata kuliah, dan baca topiknya dalam versi yang paling cocok buatmu.
              </p>

              <Link href="/cari" className="inline-block px-10 py-5 rounded-lg bg-white text-indigo-900 font-bold text-xl hover:bg-indigo-50 transition-colors">
                Cari Topik Materi
              </Link>
            </div>
          </div>
        </Kontainer>
      </section>
    </div>
  )
}
