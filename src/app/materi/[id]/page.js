import { notFound } from 'next/navigation'
import MateriInteraktif from '@/components/features/materi-interaktif'
import { ambilSemuaTopik, ambilTopikById, ambilMataKuliahById, ambilSemesterById, ambilTopikNavigation } from '@/lib/data'

export function generateStaticParams() {
    return ambilSemuaTopik().map((t) => ({ id: t.id }))
}

export async function generateMetadata({ params }) {
    const { id } = await params
    const topik = ambilTopikById(id)
    if (!topik) return { title: 'Materi Tidak Ditemukan · DuaVersi' }
    return {
        title: `${topik.judul} · DuaVersi`,
        description: topik.deskripsi,
    }
}

export default async function MateriDetailPage({ params }) {
    const { id } = await params

    // Server Component: notFound() saat render — rute materi invalid membalas
    // 404 asli (dulu halaman client merender pesan sendiri dengan status 200).
    const topik = ambilTopikById(id)
    if (!topik) {
        notFound()
    }
    const matkul = ambilMataKuliahById(topik.mataKuliahId)
    const semester = ambilSemesterById(matkul.semesterId)
    const { prev, next } = ambilTopikNavigation(topik.id)

    return (
        <MateriInteraktif
            topik={topik}
            matkul={matkul}
            semester={semester}
            prev={prev}
            next={next}
        />
    )
}
