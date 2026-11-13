import Tombol from '@/components/ui/tombol'

export default function MateriNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-light)' }}>
            <div className="text-center">
                <div className="text-8xl mb-4">📚</div>
                <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    Materi Tidak Ditemukan
                </h1>
                <Tombol variant="primary" href="/">← Kembali ke Beranda</Tombol>
            </div>
        </div>
    )
}
