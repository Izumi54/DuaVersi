export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          {/* Logo/Brand */}
          <h1 
            className="text-6xl font-bold mb-4" 
            style={{ 
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)'
            }}
          >
            DuaVersi
          </h1>
          
          {/* Tagline */}
          <p 
            className="text-xl mb-8" 
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Satu Materi, Dua Versi - Belajar Sesuai Gayamu
          </p>
          
          {/* Status */}
          <div 
            className="inline-block px-6 py-3 rounded-full mb-8"
            style={{ 
              backgroundColor: 'rgba(5, 150, 105, 0.1)',
              color: 'var(--color-secondary)'
            }}
          >
            <p className="font-semibold">
              🚀 Setup Berhasil! Project DuaVersi Siap Development
            </p>
          </div>
          
          {/* Quick Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Card 1 */}
            <div 
              className="p-6 rounded-lg shadow-sm"
              style={{ backgroundColor: 'var(--color-surface-light)' }}
            >
              <div className="text-4xl mb-2">📚</div>
              <h3 className="font-semibold mb-1">Materi Lengkap</h3>
              <p 
                className="text-sm" 
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Semester 1-8
              </p>
            </div>
            
            {/* Card 2 */}
            <div 
              className="p-6 rounded-lg shadow-sm"
              style={{ backgroundColor: 'var(--color-surface-light)' }}
            >
              <div className="text-4xl mb-2">🔄</div>
              <h3 className="font-semibold mb-1">Dual-Content</h3>
              <p 
                className="text-sm" 
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Mentah & Simplified
              </p>
            </div>
            
            {/* Card 3 */}
            <div 
              className="p-6 rounded-lg shadow-sm"
              style={{ backgroundColor: 'var(--color-surface-light)' }}
            >
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Super Cepat</h3>
              <p 
                className="text-sm" 
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Load &lt; 2 detik
              </p>
            </div>
          </div>
          
          {/* Tech Stack Info */}
          <div className="mt-12">
            <p 
              className="text-sm" 
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Dibuat dengan Next.js 16 + Tailwind CSS v4 + ❤️
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}