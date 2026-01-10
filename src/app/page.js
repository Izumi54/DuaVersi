'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Tombol from '@/components/ui/tombol'
import Kartu from '@/components/ui/kartu'
import Kontainer from '@/components/layout/kontainer'
import { ambilSemuaSemester } from '@/lib/data'

export default function Home() {
  const daftarSemester = ambilSemuaSemester()
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({
    hero: true,
    features: true,
    semesters: true,
    cta: true,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    window.addEventListener('scroll', handleScroll)
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Full Height dengan Parallax */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <Kontainer>
          <div
            id="hero"
            data-animate
            className={`max-w-5xl mx-auto text-center transition-all duration-1500 ${isVisible.hero !== false ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            {/* Main Headline - Besar dan Bold */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text-primary)',
                lineHeight: '1.1'
              }}
            >
              Belajar Ilmu Komputer,
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Sesuai Gayamu
              </span>
            </h1>

            {/* Subtitle - Elegant */}
            <p
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Akses materi kuliah dalam dua format: catatan asli dosen atau versi yang disederhanakan.
              Pilih yang paling cocok dengan gaya belajarmu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <Link href="#features">
                <Tombol variant="primary" ukuran="large" className="px-8 py-4 text-base">
                  Mulai Sekarang
                </Tombol>
              </Link>
              <Link href="/tentang">
                <Tombol variant="outline" ukuran="large" className="px-8 py-4 text-base">
                  Pelajari Lebih Lanjut
                </Tombol>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 animate-bounce">
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* Features Section - Full Height & Centered */}
      <section
        id="features"
        className="relative min-h-screen flex items-center justify-center py-20"
        style={{
          backgroundColor: 'var(--color-surface-light)',
        }}
      >
        <Kontainer>
          <div
            data-animate
            className={`max-w-6xl mx-auto transition-all duration-1500 delay-300 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-primary)'
                }}
              >
                Kenapa DuaVersi?
              </h2>
            </div>

            {/* Features Grid - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {/* Feature 1 */}
              <div
                className="text-center transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: '100ms' }}
              >
                <div className="mb-6">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: 'rgba(79, 70, 229, 0.1)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    01
                  </div>
                </div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Konten Lengkap
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Materi lengkap untuk 8 semester mencakup 40+ mata kuliah Teknik Informatika.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="text-center transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: '200ms' }}
              >
                <div className="mb-6">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      color: 'var(--color-secondary)'
                    }}
                  >
                    02
                  </div>
                </div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Sistem Dual Format
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Catatan asli dosen dan versi simplified berdampingan untuk pemahaman lebih baik.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="text-center transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: '300ms' }}
              >
                <div className="mb-6">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: 'rgba(14, 165, 233, 0.1)',
                      color: 'var(--color-accent)'
                    }}
                  >
                    03
                  </div>
                </div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Cepat & Responsif
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Dibangun dengan Next.js untuk performa super cepat dan navigasi yang mulus.
                </p>
              </div>

            </div>
          </div>
        </Kontainer>
      </section>

      {/* Semester Grid - Centered & Spacious */}
      <section
        id="semesters"
        className="py-24"
      >
        <Kontainer>
          <div className="max-w-6xl mx-auto">

            {/* Section Header - Centered */}
            <div
              data-animate
              className={`text-center mb-16 transition-all duration-1500 ${isVisible.semesters ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
              >
                Jelajahi Berdasarkan Semester
              </h2>
              <p
                className="text-xl max-w-2xl mx-auto"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Pilih semester untuk melihat mata kuliah yang tersedia
              </p>
            </div>

            {/* Semester Cards Grid */}
            <div
              data-animate
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1500 delay-500 ${isVisible.semesters ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {daftarSemester.map((semester, index) => (
                <Link
                  key={semester.id}
                  href={`/semester/${semester.nomor}`}
                  className={`transition-all duration-700 ${isVisible.semesters ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <Kartu
                    hover={true}
                    padding="medium"
                    className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Semester Number */}
                    <div
                      className="text-5xl font-bold mb-4"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {semester.nomor}
                    </div>

                    {/* Semester Name */}
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {semester.nama}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm mb-5 line-clamp-2 leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {semester.deskripsi}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {semester.jumlahMataKuliah} mata kuliah
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {semester.tahunAkademik}
                      </span>
                    </div>
                  </Kartu>
                </Link>
              ))}
            </div>
          </div>
        </Kontainer>
      </section>

      {/* Bottom CTA - Clean & Minimal */}
      <section
        className="py-32 border-t"
        style={{
          borderColor: 'var(--color-border-light)',
          backgroundColor: 'var(--color-surface-light)'
        }}
      >
        <Kontainer>
          <div
            data-animate
            className={`max-w-3xl mx-auto text-center transition-all duration-1500 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            id="cta"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
            >
              Siap Mulai Belajar?
            </h2>
            <p
              className="text-xl mb-10 leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Cari di antara ribuan materi kuliah dan temukan yang kamu butuhkan
            </p>
            <Link href="/cari">
              <Tombol variant="primary" ukuran="large" className="px-10 py-4 text-base">
                Cari Materi Sekarang
              </Tombol>
            </Link>
          </div>
        </Kontainer>
      </section>
    </div>
  )
}