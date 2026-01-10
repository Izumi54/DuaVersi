'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import Tombol from '@/components/ui/tombol'
import Kartu from '@/components/ui/kartu'
import Kontainer from '@/components/layout/kontainer'
import { ambilSemuaSemester } from '@/lib/data'

export default function Home() {
  const daftarSemester = ambilSemuaSemester()
  const [scrollY, setScrollY] = useState(0)
  const [cardsVisible, setCardsVisible] = useState(false)
  const featuresRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Scroll-based detection - cards visible berdasarkan section position
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Cards visible jika section ada di viewport
        // IN: top < 80% window AND bottom > 20% window
        // OUT: sebaliknya
        const isInView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2

        setCardsVisible(isInView)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <Kontainer>
          <div className="max-w-5xl mx-auto text-center">
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

            <p
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Akses materi kuliah dalam dua format: catatan asli dosen atau versi yang disederhanakan.
              Pilih yang paling cocok dengan gaya belajarmu.
            </p>

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

      {/* Features Section dengan SCROLL-TRIGGERED ANIMATION */}
      <section
        ref={featuresRef}
        id="features"
        className="relative py-32 overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface-light)',
        }}
      >
        {/* Background Decorative */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
              transform: `translateY(${scrollY * 0.15}px)`
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
              transform: `translateY(${-scrollY * 0.15}px)`
            }}
          />
        </div>

        <Kontainer>
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-20">
              <div
                className="inline-block px-4 py-2 rounded-full mb-6"
                style={{
                  backgroundColor: 'rgba(79, 70, 229, 0.1)',
                  color: 'var(--color-primary)'
                }}
              >
                <span className="text-sm font-medium">Keunggulan</span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-primary)'
                }}
              >
                Kenapa Pilih DuaVersi?
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Platform belajar yang dirancang untuk memberikan pengalaman terbaik
              </p>
            </div>

            {/* Features Grid - SLIDE IN/OUT dengan SCROLL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Card 1 - Animated based on scroll */}
              <div
                className="group relative transition-all duration-700 ease-out"
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? 'translateX(0)' : 'translateX(-100px)',
                  transitionDelay: '0s'
                }}
              >
                <div className="relative p-8 h-full rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderColor: 'var(--color-border-light)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                    }}
                  />

                  <div className="mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0.2) 100%)',
                      }}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Konten Lengkap
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Materi lengkap untuk 8 semester mencakup 40+ mata kuliah Teknik Informatika dengan topik yang terstruktur.
                  </p>

                  <div
                    className="absolute bottom-4 right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="group relative transition-all duration-700 ease-out"
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? 'translateX(0)' : 'translateX(-100px)',
                  transitionDelay: '0.15s'
                }}
              >
                <div className="relative p-8 h-full rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderColor: 'var(--color-border-light)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-accent) 100%)'
                    }}
                  />

                  <div className="mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.2) 100%)',
                      }}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-secondary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Dual Format System
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Pilih antara materi asli dari dosen atau versi simplified. Fleksibilitas penuh sesuai gaya belajarmu.
                  </p>

                  <div
                    className="absolute bottom-4 right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  />
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="group relative transition-all duration-700 ease-out"
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? 'translateX(0)' : 'translateX(-100px)',
                  transitionDelay: '0.3s'
                }}
              >
                <div className="relative p-8 h-full rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderColor: 'var(--color-border-light)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary) 100%)'
                    }}
                  />

                  <div className="mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.2) 100%)',
                      }}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Cepat & Modern
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Dibangun dengan Next.js 16 untuk performa super cepat, navigasi instan, dan pengalaman yang mulus.
                  </p>

                  <div
                    className="absolute bottom-4 right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                </div>
              </div>

            </div>
          </div>
        </Kontainer>
      </section>

      {/* Semester Grid - STUNNING REDESIGN */}
      <section
        id="semesters"
        className="py-32 relative overflow-hidden"
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-surface-light) 50%, var(--color-bg-light) 100%)'
          }}
        />

        <Kontainer>
          <div className="max-w-7xl mx-auto relative">

            {/* Section Header */}
            <div className="text-center mb-20">
              <div
                className="inline-block px-4 py-2 rounded-full mb-6"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--color-secondary)'
                }}
              >
                <span className="text-sm font-medium">8 Semester</span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
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

            {/* Semester Cards Grid - 4 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {daftarSemester.map((semester, index) => {
                // Warna berbeda untuk setiap semester
                const colors = [
                  { bg: 'rgba(79, 70, 229, 0.1)', accent: 'var(--color-primary)', gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' },
                  { bg: 'rgba(16, 185, 129, 0.1)', accent: 'var(--color-secondary)', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
                  { bg: 'rgba(14, 165, 233, 0.1)', accent: 'var(--color-accent)', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' },
                  { bg: 'rgba(249, 115, 22, 0.1)', accent: '#F97316', gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' },
                  { bg: 'rgba(236, 72, 153, 0.1)', accent: '#EC4899', gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)' },
                  { bg: 'rgba(139, 92, 246, 0.1)', accent: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' },
                  { bg: 'rgba(20, 184, 166, 0.1)', accent: '#14B8A6', gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' },
                  { bg: 'rgba(239, 68, 68, 0.1)', accent: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' },
                ]
                const color = colors[index % colors.length]

                return (
                  <Link
                    key={semester.id}
                    href={`/semester/${semester.nomor}`}
                    className="group"
                  >
                    <div
                      className="relative h-full p-6 rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'var(--color-border-light)',
                      }}
                    >
                      {/* Gradient Top Border on Hover */}
                      <div
                        className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: color.gradient }}
                      />

                      {/* Background Circle Decoration */}
                      <div
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: color.gradient }}
                      />

                      {/* Semester Number - Big & Bold */}
                      <div
                        className="text-6xl font-black mb-4 transition-transform duration-500 group-hover:scale-110"
                        style={{
                          background: color.gradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {semester.nomor}
                      </div>

                      {/* Semester Name */}
                      <h3
                        className="text-lg font-bold mb-2 transition-colors duration-300"
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

                      {/* Meta Info with Icon */}
                      <div
                        className="flex items-center gap-2 pt-4 border-t"
                        style={{ borderColor: 'var(--color-border-light)' }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: color.bg }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: color.accent }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {semester.jumlahMataKuliah} mata kuliah
                        </span>
                      </div>

                      {/* Arrow Indicator */}
                      <div
                        className="absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0"
                        style={{ backgroundColor: color.bg }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: color.accent }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </Kontainer>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-32 border-t"
        style={{
          borderColor: 'var(--color-border-light)',
          backgroundColor: 'var(--color-surface-light)'
        }}
      >
        <Kontainer>
          <div className="max-w-3xl mx-auto text-center">
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