/**
 * Utility functions untuk data manipulation
 * DuaVersi - Platform Materi Kuliah
 *
 * Sejak Fase 2 plan perbaikan: data JSON di-import sekali di level modul,
 * bukan di-require berulang di setiap fungsi.
 */
import semesterData from '@/data/semester.json'
import mataKuliahData from '@/data/mataKuliah.json'
import topikData from '@/data/topik.json'

/**
 * Jumlah selalu DIHITUNG dari data aktual, tidak disimpan manual di JSON.
 * Dulu semester.json/mataKuliah.json punya field jumlahMataKuliah/jumlahTopik
 * yang ditulis tangan dan tidak sesuai isi (mis. mengklaim 5, aktual 0).
 * Sejak Fase 1 plan perbaikan, field itu dihapus dari JSON dan dihitung di sini.
 */
function denganJumlahMataKuliah(semester) {
    const mataKuliah = mataKuliahData
    return {
        ...semester,
        jumlahMataKuliah: mataKuliah.filter(mk => mk.semesterId === semester.id).length
    }
}

function denganJumlahTopik(mataKuliah) {
    const topik = topikData
    return {
        ...mataKuliah,
        jumlahTopik: topik.filter(t => t.mataKuliahId === mataKuliah.id).length
    }
}

/**
 * Ambil semua semester
 * @returns {Array} Daftar semester (jumlahMataKuliah dihitung dari data)
 */
export function ambilSemuaSemester() {
    const semester = semesterData
    return semester.map(denganJumlahMataKuliah)
}

/**
 * Ambil semester by ID
 * @param {string} id - ID semester
 * @returns {Object|null} Data semester atau null
 */
export function ambilSemesterById(id) {
    const semester = semesterData
    const ditemukan = semester.find(s => s.id === id)
    return ditemukan ? denganJumlahMataKuliah(ditemukan) : null
}

/**
 * Ambil semua mata kuliah
 * @returns {Array} Daftar mata kuliah (jumlahTopik dihitung dari data)
 */
export function ambilSemuaMataKuliah() {
    const mataKuliah = mataKuliahData
    return mataKuliah.map(denganJumlahTopik)
}

/**
 * Ambil mata kuliah by ID
 * @param {string} id - ID mata kuliah
 * @returns {Object|null} Data mata kuliah atau null
 */
export function ambilMataKuliahById(id) {
    const mataKuliah = mataKuliahData
    const ditemukan = mataKuliah.find(mk => mk.id === id)
    return ditemukan ? denganJumlahTopik(ditemukan) : null
}

/**
 * Ambil mata kuliah by semester ID
 * @param {string} semesterId - ID semester
 * @returns {Array} Daftar mata kuliah dalam semester
 */
export function ambilMataKuliahBySemester(semesterId) {
    const mataKuliah = mataKuliahData
    return mataKuliah.filter(mk => mk.semesterId === semesterId).map(denganJumlahTopik)
}

/**
 * Ambil semua topik
 * @returns {Array} Daftar topik
 */
export function ambilSemuaTopik() {
    const topik = topikData
    return topik
}

/**
 * Ambil topik by ID
 * @param {string} id - ID topik
 * @returns {Object|null} Data topik atau null
 */
export function ambilTopikById(id) {
    const topik = topikData
    return topik.find(t => t.id === id) || null
}

/**
 * Ambil topik by mata kuliah ID
 * @param {string} mataKuliahId - ID mata kuliah
 * @returns {Array} Daftar topik dalam mata kuliah
 */
export function ambilTopikByMataKuliah(mataKuliahId) {
    const topik = topikData
    return topik.filter(t => t.mataKuliahId === mataKuliahId)
        .sort((a, b) => a.urutan - b.urutan)
}

/**
 * Normalisasi kata kunci: huruf kecil + buang spasi ujung.
 */
function normalisasiKata(teks) {
    return (teks || '').toLowerCase().trim()
}

/**
 * Cari materi berdasarkan keyword — sejak Fase 3 mencari juga nama + kode
 * mata kuliah dan nama semester, hasilnya dikelompokkan (Topik / Mata Kuliah).
 *
 * - Topik cocok bila judul/deskripsi/tag mengandung kata kunci, ATAU mata
 *   kuliahnya yang cocok (mis. cari "CS101" menemukan ke-12 topik CS101).
 * - Mata kuliah cocok bila nama/kode mengandung kata kunci, ATAU semesternya
 *   yang cocok (mis. cari "Semester 1" menemukan ke-5 matkul Semester 1).
 * - Mata kuliah tanpa topik tetap muncul di kelompoknya (mis. "Basis Data"
 *   → CS103, 0 topik) — halaman matkulnya sendiri yang menampilkan
 *   empty state jujur, bukan hasil pencarian yang disembunyikan.
 *
 * @param {string} keyword - Kata kunci pencarian
 * @returns {{ topik: Array, mataKuliah: Array }} Hasil dikelompokkan
 */
export function cariMateri(keyword) {
    const kata = normalisasiKata(keyword)
    if (!kata) return { topik: [], mataKuliah: [] }

    const semesterCocok = new Set(
        semesterData
            .filter(s => normalisasiKata(s.nama).includes(kata))
            .map(s => s.id)
    )

    const mataKuliahCocok = mataKuliahData
        .filter(mk =>
            normalisasiKata(mk.nama).includes(kata) ||
            normalisasiKata(mk.kode).includes(kata) ||
            semesterCocok.has(mk.semesterId)
        )
        .map(mk => ({
            ...denganJumlahTopik(mk),
            semester: semesterData.find(s => s.id === mk.semesterId) || null
        }))
    const idMatkulCocok = new Set(mataKuliahCocok.map(mk => mk.id))

    // Cari di topik
    const hasilTopik = topikData.filter(t =>
        normalisasiKata(t.judul).includes(kata) ||
        normalisasiKata(t.deskripsi).includes(kata) ||
        (t.tags || []).some(tag => normalisasiKata(tag).includes(kata)) ||
        idMatkulCocok.has(t.mataKuliahId)
    )

    // Tambahkan info mata kuliah ke hasil
    return {
        topik: hasilTopik.map(t => {
            const mk = mataKuliahData.find(m => m.id === t.mataKuliahId)
            return {
                ...t,
                mataKuliah: mk
            }
        }),
        mataKuliah: mataKuliahCocok
    }
}

/**
 * Saran cepat pencarian — dibangkitkan dari data nyata (Fase 3).
 * Kandidatnya kode lalu nama mata kuliah (nama diurutkan dari yang
 * terpendek); hanya istilah yang benar-benar menghasilkan ≥1 hasil yang
 * dipakai. Dulu daftarnya ditulis tangan dan 6 dari 7 saran dijamin
 * 0 hasil ("Python", "Jaringan", "AI", "Web Design", "React", "Database").
 *
 * @returns {Array<string>} Maksimal 7 istilah yang pasti ada hasilnya
 */
export function saranPencarian() {
    const kode = mataKuliahData.map(mk => mk.kode)
    const nama = mataKuliahData
        .map(mk => mk.nama)
        .sort((a, b) => a.length - b.length)
    const kandidat = [...new Set([...kode, ...nama])]

    return kandidat
        .filter(istilah => {
            const hasil = cariMateri(istilah)
            return hasil.topik.length + hasil.mataKuliah.length > 0
        })
        .slice(0, 7)
}

/**
 * Ambil topik prev/next untuk navigasi
 * @param {string} topikId - ID topik saat ini
 * @returns {Object} {prev, next}
 */
export function ambilTopikNavigation(topikId) {
    const topikSekarang = ambilTopikById(topikId)
    if (!topikSekarang) return { prev: null, next: null }

    const semuaTopikMatkul = ambilTopikByMataKuliah(topikSekarang.mataKuliahId)
    const indexSekarang = semuaTopikMatkul.findIndex(t => t.id === topikId)

    return {
        prev: indexSekarang > 0 ? semuaTopikMatkul[indexSekarang - 1] : null,
        next: indexSekarang < semuaTopikMatkul.length - 1 ? semuaTopikMatkul[indexSekarang + 1] : null
    }
}

/**
 * Format ukuran file
 * @param {string} ukuranString - Ukuran dalam format "2.5 MB"
 * @returns {string} Ukuran terformat
 */
export function formatUkuranFile(ukuranString) {
    return ukuranString
}

/**
 * Cek apakah materi tersedia
 * @param {Object} materi - Object materi (mentah atau simplified)
 * @returns {boolean} true jika tersedia
 */
export function cekMateriTersedia(materi) {
    return materi && materi.tersedia === true
}
