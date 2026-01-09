/**
 * Utility functions untuk data manipulation
 * DuaVersi - Platform Materi Kuliah
 */

/**
 * Ambil semua semester
 * @returns {Array} Daftar semester
 */
export function ambilSemuaSemester() {
    const semester = require('@/data/semester.json')
    return semester
}

/**
 * Ambil semester by ID
 * @param {string} id - ID semester
 * @returns {Object|null} Data semester atau null
 */
export function ambilSemesterById(id) {
    const semester = require('@/data/semester.json')
    return semester.find(s => s.id === id) || null
}

/**
 * Ambil semua mata kuliah
 * @returns {Array} Daftar mata kuliah
 */
export function ambilSemuaMataKuliah() {
    const mataKuliah = require('@/data/mataKuliah.json')
    return mataKuliah
}

/**
 * Ambil mata kuliah by ID
 * @param {string} id - ID mata kuliah
 * @returns {Object|null} Data mata kuliah atau null
 */
export function ambilMataKuliahById(id) {
    const mataKuliah = require('@/data/mataKuliah.json')
    return mataKuliah.find(mk => mk.id === id) || null
}

/**
 * Ambil mata kuliah by semester ID
 * @param {string} semesterId - ID semester
 * @returns {Array} Daftar mata kuliah dalam semester
 */
export function ambilMataKuliahBySemester(semesterId) {
    const mataKuliah = require('@/data/mataKuliah.json')
    return mataKuliah.filter(mk => mk.semesterId === semesterId)
}

/**
 * Ambil semua topik
 * @returns {Array} Daftar topik
 */
export function ambilSemuaTopik() {
    const topik = require('@/data/topik.json')
    return topik
}

/**
 * Ambil topik by ID
 * @param {string} id - ID topik
 * @returns {Object|null} Data topik atau null
 */
export function ambilTopikById(id) {
    const topik = require('@/data/topik.json')
    return topik.find(t => t.id === id) || null
}

/**
 * Ambil topik by mata kuliah ID
 * @param {string} mataKuliahId - ID mata kuliah
 * @returns {Array} Daftar topik dalam mata kuliah
 */
export function ambilTopikByMataKuliah(mataKuliahId) {
    const topik = require('@/data/topik.json')
    return topik.filter(t => t.mataKuliahId === mataKuliahId)
        .sort((a, b) => a.urutan - b.urutan)
}

/**
 * Cari materi berdasarkan keyword
 * @param {string} keyword - Kata kunci pencarian
 * @returns {Array} Hasil pencarian
 */
export function cariMateri(keyword) {
    const topik = require('@/data/topik.json')
    const mataKuliah = require('@/data/mataKuliah.json')

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
