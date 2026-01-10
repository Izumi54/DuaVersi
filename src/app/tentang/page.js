'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Kontainer from '@/components/layout/kontainer'
import Tombol from '@/components/ui/tombol'

export default function TentangPage() {
    const [scrollY, setScrollY] = useState(0)
    const [visibleSections, setVisibleSections] = useState({})

    // Refs for sections
    const sectionsRef = useRef([])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)

            // Check visibility for each section
            sectionsRef.current.forEach((section, index) => {
                if (section) {
                    const rect = section.getBoundingClientRect()
                    const windowHeight = window.innerHeight
                    const isInView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2

                    setVisibleSections(prev => ({
                        ...prev,
                        [`section-${index}`]: isInView
                    }))
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el)
        }
    }

    return (
        <div className="min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
                        transform: `translate(20%, -20%) translateY(${scrollY * 0.2}px)`
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
                        transform: `translate(-20%, 20%) translateY(${-scrollY * 0.1}px)`
                    }}
                />
            </div>

            {/* Hero Section */}
            <section
                className="relative py-32 flex items-center justify-center min-h-[60vh]"
                ref={addToRefs}
            >
                <Kontainer>
                    <div
                        className="text-center transition-all duration-1000"
                        style={{
                            opacity: visibleSections['section-0'] ? 1 : 0,
                            transform: visibleSections['section-0'] ? 'translateY(0)' : 'translateY(30px)'
                        }}
                    >
                        <div
                            className="inline-block px-6 py-2 rounded-full mb-8 backdrop-blur-md border"
                            style={{
                                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                borderColor: 'var(--color-primary)',
                                color: 'var(--color-primary)'
                            }}
                        >
                            <span className="font-semibold tracking-wide uppercase text-sm">Our Story</span>
                        </div>

                        <h1
                            className="text-5xl md:text-7xl font-bold mb-8"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                        >
                            Merajut Masa Depan
                            <br />
                            <span style={{
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
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
            <section
                className="py-20 relative"
                ref={addToRefs}
            >
                <Kontainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Visi Card */}
                        <div
                            className="group relative p-10 rounded-3xl border backdrop-blur-md overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderColor: 'var(--color-border-light)',
                                opacity: visibleSections['section-1'] ? 1 : 0,
                                transform: visibleSections['section-1'] ? 'translateX(0)' : 'translateX(-50px)',
                                transitionDelay: '0.1s'
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full transition-all duration-500 group-hover:scale-150" />
                            <div className="text-6xl mb-6">🎯</div>
                            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Visi Kami</h2>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                Menjadi katalisator transformasi pendidikan digital Indonesia dengan menyediakan akses materi berkualitas yang adaptif terhadap gaya belajar setiap individu.
                            </p>
                        </div>

                        {/* Misi Card */}
                        <div
                            className="group relative p-10 rounded-3xl border backdrop-blur-md overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderColor: 'var(--color-border-light)',
                                opacity: visibleSections['section-1'] ? 1 : 0,
                                transform: visibleSections['section-1'] ? 'translateX(0)' : 'translateX(50px)',
                                transitionDelay: '0.2s'
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full transition-all duration-500 group-hover:scale-150" />
                            <div className="text-6xl mb-6">🚀</div>
                            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Misi Kami</h2>
                            <ul className="space-y-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Demokratisasi akses materi berkualitas tinggi
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Inovasi metode pembelajaran dual-content
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Membangun ekosistem belajar kolaboratif
                                </li>
                            </ul>
                        </div>
                    </div>
                </Kontainer>
            </section>

            {/* Core Features / Apa Itu */}
            <section
                className="py-24 relative"
                ref={addToRefs}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent" />
                <Kontainer>
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="text-center mb-16 transition-all duration-700"
                            style={{
                                opacity: visibleSections['section-2'] ? 1 : 0,
                                transform: visibleSections['section-2'] ? 'translateY(0)' : 'translateY(20px)'
                            }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
                                Revolusi Dual-Content
                            </h2>
                            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
                                Satu topik, dua pendekatan. Pilih metode yang paling efektif untukmu.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Raw Version */}
                            <div
                                className="group p-8 rounded-3xl border border-indigo-100 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:border-indigo-500 hover:shadow-xl"
                                style={{
                                    opacity: visibleSections['section-2'] ? 1 : 0,
                                    transform: visibleSections['section-2'] ? 'translateX(0)' : 'translateX(-30px)',
                                    transitionDelay: '0.1s'
                                }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                    📄
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-indigo-900">Versi Akademik</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Materi original standar universitas. Ideal untuk mendalami teori dasar, notasi formal, dan referensi akademik yang presisi.
                                </p>
                                <div className="text-xs font-bold tracking-wider text-indigo-500 uppercase">Perdalam Teori</div>
                            </div>

                            {/* Simplified Version */}
                            <div
                                className="group p-8 rounded-3xl border border-emerald-100 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500 hover:shadow-xl"
                                style={{
                                    opacity: visibleSections['section-2'] ? 1 : 0,
                                    transform: visibleSections['section-2'] ? 'translateX(0)' : 'translateX(30px)',
                                    transitionDelay: '0.2s'
                                }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                    ✨
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-emerald-900">Versi Simplified</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Penjelasan dengan bahasa manusia. Analogi dunia nyata, studi kasus praktis, dan visualisasi yang mempermudah pemahaman.
                                </p>
                                <div className="text-xs font-bold tracking-wider text-emerald-500 uppercase">Paham Cepat</div>
                            </div>
                        </div>
                    </div>
                </Kontainer>
            </section>

            {/* Timeline Roadmap */}
            <section
                className="py-24"
                ref={addToRefs}
            >
                <Kontainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
                            Peta Perjalanan
                        </h2>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2" />

                        {[
                            { title: 'Fase 1: Pondasi', desc: 'Peluncuran platform dasar untuk Teknik Informatika dengan materi 8 semester lengkap.', icon: '🏗️', status: 'Done', color: 'bg-green-500' },
                            { title: 'Fase 2: Ekosistem', desc: 'Integrasi sistem login, bookmark cloud, user tracking, dan analytics.', icon: '🌱', status: 'In Progress', color: 'bg-yellow-500' },
                            { title: 'Fase 3: Ekspansi', desc: 'Kolaborasi antar kampus dan perluasan ke program studi Saintek lainnya.', icon: '🚀', status: 'Future', color: 'bg-blue-500' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between mb-12 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
                            >
                                <div className="w-5/12" />
                                <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-gray-100 shadow-xl text-xl">
                                    {item.icon}
                                </div>
                                <div
                                    className="w-5/12 group hover:-translate-y-1 transition-transform duration-300"
                                    style={{
                                        opacity: visibleSections['section-3'] ? 1 : 0,
                                        transform: visibleSections['section-3'] ? 'translateY(0)' : 'translateY(20px)',
                                        transitionDelay: `${i * 0.2}s`
                                    }}
                                >
                                    <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`w-2 h-2 rounded-full ${item.color}`} />
                                            <span className="text-xs font-bold uppercase text-gray-400">{item.status}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Kontainer>
            </section>

            {/* Team / Creator */}
            <section
                className="py-24 relative overflow-hidden"
                ref={addToRefs}
            >
                <div
                    className="absolute inset-0 opacity-50"
                    style={{ background: 'linear-gradient(to top, rgba(79, 70, 229, 0.05), transparent)' }}
                />
                <Kontainer>
                    <div
                        className="max-w-5xl mx-auto bg-white/60 backdrop-blur-xl rounded-[3rem] p-12 md:p-20 text-center border border-white/50 shadow-2xl transition-all duration-1000"
                        style={{
                            opacity: visibleSections['section-4'] ? 1 : 0,
                            transform: visibleSections['section-4'] ? 'scale(1)' : 'scale(0.95)'
                        }}
                    >
                        <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl mb-8 shadow-lg shadow-indigo-500/30">
                            👨‍💻
                        </div>
                        <h2 className="text-4xl font-bold mb-6 text-gray-800">Dibuat dengan Hati</h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            "Projek ini lahir dari keresahan pribadi akan sulitnya mengakses materi kuliah yang terstruktur.
                            Harapannya, DuaVersi bisa menjadi teman belajar yang bisa diandalkan kapanpun dibutuhkan."
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
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Siap untuk mulai?</h2>
                    <div className="flex justify-center gap-4">
                        <Link href="/">
                            <Tombol variant="primary" size="large" className="px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                Mulai Belajar Sekarang
                            </Tombol>
                        </Link>
                    </div>
                </Kontainer>
            </section>
        </div>
    )
}
