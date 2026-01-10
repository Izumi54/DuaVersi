'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Tombol from '@/components/ui/tombol'
import Kartu from '@/components/ui/kartu'
import Kontainer from '@/components/layout/kontainer'
import { ambilSemuaSemester } from '@/lib/data'

export default function Home() {
  const daftarSemester = ambilSemuaSemester()
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
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

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div>
      {/* Hero Section - Minimal & Modern */}
      <section className="py-20 md:py-32">
        <Kontainer>
          <div
            id="hero"
            data-animate
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {/* Main Headline */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text-primary)'
              }}
            >
              Belajar Ilmu Komputer,
              <span style={{ color: 'var(--color-primary)' }}> Sesuai Gayamu</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Akses materi kuliah dalam dua format: catatan asli dosen atau versi yang disederhanakan.
              Pilih yang paling cocok dengan gaya belajarmu.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#semesters">
                <Tombol variant="primary" ukuran="large">
                  Jelajahi Materi
                </Tombol>
              </Link>
              <Link href="/tentang">
                <Tombol variant="outline" ukuran="large">
                  Pelajari Lebih Lanjut
                </Tombol>
              </Link>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* Features - Clean Grid */}
      <section className="py-16 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
        <Kontainer>
          <div
            id="features"
            data-animate
            className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Feature 1 */}
              <div className="text-left">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Konten Lengkap
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Materi lengkap untuk 8 semester mencakup 40+ mata kuliah Teknik Informatika.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-left">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Sistem Dual Format
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Catatan asli dosen dan versi simplified berdampingan untuk pemahaman lebih baik.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-left">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Cepat & Responsif
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Dibangun dengan Next.js untuk performa super cepat dan navigasi yang mulus.
                </p>
              </div>

            </div>
          </div>
        </Kontainer>
      </section>

      {/* Semester Grid - Professional Layout */}
      <section id="semesters" className="py-20 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
        <Kontainer>
          <div className="max-w-6xl mx-auto">

            {/* Section Header */}
            <div
              id="semester-header"
              data-animate
              className={`mb-12 transition-all duration-1000 ${isVisible['semester-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <h2
                className="text-3xl md:text-4xl font-semibold mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
              >
                Jelajahi Berdasarkan Semester
              </h2>
              <p
                className="text-base"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Pilih semester untuk melihat mata kuliah yang tersedia
              </p>
            </div>

            {/* Semester Cards Grid */}
            <div
              id="semester-grid"
              data-animate
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible['semester-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              {daftarSemester.map((semester, index) => (
                <Link
                  key={semester.id}
                  href={`/semester/${semester.nomor}`}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <Kartu
                    hover={true}
                    padding="medium"
                    className="h-full transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Semester Number */}
                    <div
                      className="text-4xl font-bold mb-3"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {semester.nomor}
                    </div>

                    {/* Semester Name */}
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {semester.nama}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm mb-4 line-clamp-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {semester.deskripsi}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
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

      {/* Bottom CTA - Minimal */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
        <Kontainer>
          <div
            id="cta"
            data-animate
            className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h2
              className="text-3xl font-semibold mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
            >
              Siap Mulai Belajar?
            </h2>
            <p
              className="text-base mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Cari di antara ribuan materi kuliah dan temukan yang kamu butuhkan
            </p>
            <Link href="/cari">
              <Tombol variant="primary" ukuran="large">
                Cari Materi
              </Tombol>
            </Link>
          </div>
        </Kontainer>
      </section>
    </div>
  )
}