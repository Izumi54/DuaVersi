'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Tombol from '@/components/ui/tombol'
import { ambilSemuaSemester } from '@/lib/data'

export default function HomePage() {
  // Scroll & Visibility State
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState({})

  // Interactive Demo State
  const [demoMode, setDemoMode] = useState('simplified') // 'academic' | 'simplified'

  // Refs for scroll detection
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const semesterRef = useRef(null)
  const ctaRef = useRef(null)
  const demoRef = useRef(null)

  // Soft Pastel Gradients for Cards (Visible but Calm)
  const softSemesterColors = [
    'from-indigo-100 to-blue-200 border-indigo-200',   // Sem 1
    'from-emerald-100 to-teal-200 border-emerald-200', // Sem 2
    'from-purple-100 to-fuchsia-200 border-purple-200',// Sem 3
    'from-amber-100 to-orange-200 border-amber-200',   // Sem 4
    'from-rose-100 to-pink-200 border-rose-200',       // Sem 5
    'from-cyan-100 to-sky-200 border-cyan-200',        // Sem 6
    'from-lime-100 to-green-200 border-lime-200',      // Sem 7
    'from-slate-100 to-gray-200 border-slate-200',     // Sem 8
  ]

  const semestersWithSoftColors = ambilSemuaSemester().map((sem, i) => ({
    ...sem,
    warna: softSemesterColors[i % softSemesterColors.length]
  }))

  // Optimized Scroll Handler (Throttled via requestAnimationFrame)
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          checkVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    const checkVisibility = () => {
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'features', ref: featuresRef },
        { id: 'semester', ref: semesterRef },
        { id: 'cta', ref: ctaRef },
        { id: 'demo', ref: demoRef }
      ]

      sections.forEach(({ id, ref }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const isVisible = rect.top < windowHeight * 0.85

          setVisibleSections(prev => {
            if (prev[id] !== isVisible && isVisible) {
              return { ...prev, [id]: true }
            }
            return prev
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    checkVisibility()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

      {/* HER0 SECTION with Floating 3D Elements */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Blobs (Optimized CSS Anim) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-purple-500/20 rounded-full blur-[80px] animate-float-slow" />
          <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-float-slower" />
        </div>

        {/* Floating Icons (Decorative) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute top-[20%] left-[15%] text-4xl opacity-20 animate-bounce-slow" style={{ animationDelay: '0s' }}>💻</span>
          <span className="absolute top-[30%] right-[20%] text-5xl opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }}>📚</span>
          <span className="absolute bottom-[25%] left-[25%] text-3xl opacity-20 animate-bounce-slow" style={{ animationDelay: '2s' }}>⚡</span>
        </div>

        <Kontainer>
          <div className={`text-center relative z-10 transition-all duration-1000 transform ${visibleSections.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-indigo-100 shadow-sm mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-indigo-600 tracking-wide">E-Learning Generasi Baru</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
              Belajar Kuliah <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x bg-300%">
                Jadi Lebih Mudah.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
              Platform materi Teknik Informatika dengan pendekatan <span className="text-indigo-600 font-bold">Dual-Perspective</span>.
              Pahami konsep sulit dalam hitungan menit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/semester/1">
                <Tombol variant="primary" size="large" className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all">
                  Mulai Belajar 🚀
                </Tombol>
              </Link>
              <Link href="/tentang">
                <Tombol variant="outline" size="large" className="w-full sm:w-auto px-8 py-4 text-lg hover:bg-white/50">
                  Pelajari Konsep
                </Tombol>
              </Link>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* INTERACTIVE DEMO SECTION (New!) */}
      <section ref={demoRef} className="py-24 relative z-10">
        <Kontainer>
          <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.demo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rasakan Bedanya</h2>
            <p className="options-text text-gray-500">Klik tombol di bawah untuk melihat perbedaan penyampaian materi.</p>
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${visibleSections.demo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Demo Toggle Switch */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur p-1.5 rounded-full border border-gray-200 shadow-lg inline-flex relative">
                {/* Sliding Pill Background */}
                <div
                  className={`absolute top-1.5 bottom-1.5 w-[140px] bg-indigo-600 rounded-full transition-all duration-500 ease-spring ${demoMode === 'academic' ? 'left-1.5' : 'left-[148px]'}`}
                />

                <button
                  onClick={() => setDemoMode('academic')}
                  className={`relative z-10 w-[140px] py-3 rounded-full font-bold text-sm transition-colors duration-300 ${demoMode === 'academic' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  🏛️ Versi Akademik
                </button>
                <button
                  onClick={() => setDemoMode('simplified')}
                  className={`relative z-10 w-[140px] py-3 rounded-full font-bold text-sm transition-colors duration-300 ${demoMode === 'simplified' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  ✨ Versi Simple
                </button>
              </div>
            </div>

            {/* Demo Content Browser Window */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all hover:scale-[1.01] duration-500">
              {/* Fake Browser Header */}
              <div className="bg-gray-50 px-6 py-4 flex items-center gap-4 border-b border-gray-100">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center text-xs font-mono text-gray-400 bg-white py-1.5 rounded-md border border-gray-100">
                  duaversi.com/demo/pointer
                </div>
              </div>

              {/* Demo Body Content - SCROLLABLE & FIXED HEIGHT */}
              <div className="relative h-[400px]">

                {/* Academic Content */}
                <div className={`absolute inset-0 p-8 md:p-12 overflow-y-auto transition-all duration-500 ease-in-out ${demoMode === 'academic' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-10 z-0 pointer-events-none'}`}>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Definisi Formal</span>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Pointer dalam C++</h3>
                  <p className="text-lg text-gray-600 leading-relaxed font-serif mb-6">
                    "Pointer adalah variabel yang menyimpan alamat memori dari variabel lain sebagai nilai referensinya. Operator dereference (*) digunakan untuk mengakses nilai yang disimpan di alamat memori tersebut, sedangkan operator address-of (&) digunakan untuk mendapatkan alamat memori."
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed font-serif mb-6">
                    Dalam pemrograman C++, penggunaan pointer sangat krusial untuk manajemen memori dinamis dan struktur data tingkat lanjut seperti linked list dan tree.
                  </p>
                  <div className="p-4 bg-gray-900 rounded-xl overflow-x-auto">
                    <code className="text-sm font-mono text-green-400">
                      int* ptr = &variable;<br />
                      printf("%d", *ptr);
                    </code>
                  </div>
                </div>

                {/* Simplified Content */}
                <div className={`absolute inset-0 p-8 md:p-12 overflow-y-auto transition-all duration-500 ease-in-out ${demoMode === 'simplified' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 z-0 pointer-events-none'}`}>
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2 block">✨ Penjelasan Santai</span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Pointer itu Petunjuk Jalan! 🗺️</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    "Bayangkan <strong className="text-indigo-600">kertas contekan</strong> di laci mejamu. <br /><br />
                    Variabel biasa itu <b>isinya</b> contekan tersebut. <br />
                    Pointer itu cuma <b>kertas petunjuk</b> yang bertuliskan: <br />
                    <i>'Contekan ada di laci nomer 3'</i>."
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Jadi kamu gak perlu bawa laci meja-nya kemana-mana (boros tenaga/memori), cukup bawa kertas petunjuknya aja! Pintar kan? 😎
                  </p>
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                      💡 Lebih masuk akal kan?
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* FEATURES SECTION (Enhanced Cards) */}
      <section ref={featuresRef} className="py-24 relative overflow-hidden">
        <Kontainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'To-The-Point', desc: 'Tanpa basa-basi. Materi disusun ringkas untuk pemahaman instan.', icon: '⚡', color: 'text-yellow-500', bg: 'bg-yellow-50' },
              { title: 'Bahasa Manusia', desc: 'Bye-bye bahasa textbook kaku. Kita pakai analogi sehari-hari.', icon: '🗣️', color: 'text-green-500', bg: 'bg-green-50' },
              { title: 'Visual Learning', desc: 'Diagram dan ilustrasi yang memanjakan mata dan otak kananmu.', icon: '🎨', color: 'text-purple-500', bg: 'bg-purple-50' }
            ].map((feature, i) => (
              <div
                key={i}
                className={`group p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center text-3xl mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Kontainer>
      </section>

      {/* SEMESTER GRID SECTION - SOFT DESIGN */}
      <section ref={semesterRef} className="py-24">
        <Kontainer>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className={`transition-all duration-700 ${visibleSections.semester ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Pilih Semester</h2>
              <p className="text-gray-500 text-lg">Materi tersusun rapi sesuai kurikulum.</p>
            </div>
            <div className={`transition-all duration-700 delay-200 ${visibleSections.semester ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Link href="/cari">
                <span className="text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-2 text-lg">
                  Cari Topik Spesifik ➜
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {semestersWithSoftColors.map((sem, i) => (
              <Link key={sem.id} href={`/semester/${sem.nomor}`}>
                <div
                  className={`group relative h-48 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] ${visibleSections.semester ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* VISIBLE SOFT GRADIENT BACKGROUND */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sem.warna} opacity-100 border border-white/50`} />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                      {/* Semester Number - Enhanced Contrast */}
                      <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-md text-gray-800 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                        {sem.nomor}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1 block">Semester</span>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1 group-hover:text-indigo-700 transition-colors">
                        {sem.nama}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1 font-medium">
                        {sem.deskripsi}
                      </p>
                    </div>

                    {/* Subtle Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-60 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                      ➜
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Kontainer>
      </section>

      {/* CTA SECTION (Premium) */}
      <section ref={ctaRef} className="py-24 pb-32">
        <Kontainer>
          <div
            className={`relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center transition-all duration-1000 ${visibleSections.cta ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-20 rotate-1'}`}
          >
            {/* Background with Glass Morphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* Glowing Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-40 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[150px] opacity-40 animate-pulse delay-700" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
                Siap Jadi Mahasiswa <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Paling Ambis?</span>
              </h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Gabung sekarang dan nikmati cara belajar yang belum pernah kamu rasakan sebelumnya di bangku kuliah.
              </p>

              <Link href="/cari">
                <button className="group relative px-10 py-5 rounded-full bg-white text-indigo-900 font-bold text-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Mulai Belajar Gratis
                    <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* CUSTOM STYLES for Specific Animations */}
      <style jsx global>{`
                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(20px, -20px); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-30px, 30px); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); opacity: 0.2; }
                    50% { transform: translateY(-20px); opacity: 0.4; }
                }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
                .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
                .bg-300\% { background-size: 300% 300%; }
                .animate-gradient-x { animation: gradient-x 8s ease infinite; }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
    </div>
  )
}