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
 * Cari materi berdasarkan keyword
 * @param {string} keyword - Kata kunci pencarian
 * @returns {Array} Hasil pencarian
 */
export function cariMateri(keyword) {
    const topik = topikData
    const mataKuliah = mataKuliahData

    const keywordLower = keyword.toLowerCase()

    // Cari di topik
    const hasilTopik = topik.filter(t =>
        t.judul.toLowerCase().includes(keywordLower) ||
        t.deskripsi.toLowerCase().includes(keywordLower) ||
        t.tags.some(tag => tag.toLowerCase().includes(keywordLower))
    )

    // Tambahkan info mata kuliah ke hasil
    return hasilTopik.map(t => {
        const mk = mataKuliah.find(m => m.id === t.mataKuliahId)
        return {
            ...t,
            mataKuliah: mk
        }
    })
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
