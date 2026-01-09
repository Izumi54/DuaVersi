import Link from 'next/link'
import Tombol from '@/components/ui/tombol'
import Kartu from '@/components/ui/kartu'
import Badge from '@/components/ui/badge'
import Kontainer from '@/components/layout/kontainer'
import { ambilSemuaSemester } from '@/lib/data'

export default function Home() {
  const daftarSemester = ambilSemuaSemester()

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--color-bg-light)' }}
      >
        <Kontainer>
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-primary)'
              }}
            >
              DuaVersi
            </h1>

            {/* Tagline */}
            <p
              className="text-xl md:text-2xl mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Satu Materi, Dua Versi
            </p>
            <p
              className="text-lg mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Belajar Sesuai Gayamu - Pilih antara materi original atau versi yang mudah dipahami
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#semester">
                <Tombol variant="primary" ukuran="large">
                  📚 Lihat Semua Materi
                </Tombol>
              </Link>
              <Link href="/tentang">
                <Tombol variant="outline" ukuran="large">
                  ℹ️ Tentang DuaVersi
                </Tombol>
              </Link>
            </div>
          </div>
        </Kontainer>
      </section>

      {/* Features Section */}
      <section className="py-12" style={{ backgroundColor: 'var(--color-surface-light)' }}>
        <Kontainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <Kartu padding="large" className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Materi Lengkap
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                8 semester dengan lebih dari 40 mata kuliah lengkap
              </p>
            </Kartu>

            {/* Feature 2 */}
            <Kartu padding="large" className="text-center">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Dual-Content System
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Versi mentah dari dosen & versi simplified untuk pemahaman lebih mudah
              </p>
            </Kartu>

            {/* Feature 3 */}
            <Kartu padding="large" className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Super Cepat
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Load time &lt; 2 detik dengan teknologi Next.js terbaru
              </p>
            </Kartu>
          </div>
        </Kontainer>
      </section>

      {/* Semester Grid Section */}
      <section id="semester" className="py-16" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <Kontainer>
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
            >
              Pilih Semester
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Pilih semester untuk melihat mata kuliah yang tersedia
            </p>
          </div>

          {/* Semester Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {daftarSemester.map((semester) => (
              <Link key={semester.id} href={`/semester/${semester.nomor}`}>
                <Kartu
                  hover={true}
                  padding="large"
                  className="text-center h-full transition-transform hover:scale-105"
                >
                  {/* Semester Number */}
                  <div
                    className="text-5xl font-bold mb-2"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {semester.nomor}
                  </div>

                  {/* Semester Name */}
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    {semester.nama}
                  </h3>

                  {/* Deskripsi */}
                  <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {semester.deskripsi}
                  </p>

                  {/* Badge */}
                  <Badge variant="secondary" ukuran="small">
                    {semester.jumlahMataKuliah} Mata Kuliah
                  </Badge>

                  {/* Tahun Akademik */}
                  <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {semester.tahunAkademik}
                  </p>
                </Kartu>
              </Link>
            ))}
          </div>
        </Kontainer>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-surface-light)' }}>
        <Kontainer>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
            >
              Siap Mulai Belajar?
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Akses ribuan materi kuliah dengan dua versi berbeda untuk pengalaman belajar yang lebih baik
            </p>
            <Link href="/cari">
              <Tombol variant="primary" ukuran="large">
                🔍 Cari Materi Sekarang
              </Tombol>
            </Link>
          </div>
        </Kontainer>
      </section>
    </div>
  )
}