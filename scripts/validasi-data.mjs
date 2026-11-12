/**
 * Validasi data statis DuaVersi (Fase 1 plan perbaikan).
 * Jalan: npm run validasi-data
 *
 * Yang dicek:
 * 1. JSON valid & ID unik di semester/mataKuliah/topik
 * 2. Integritas referensi: matkul -> semester, topik -> matkul, prasyarat -> kode matkul
 * 3. Field jumlah manual (jumlahMataKuliah/jumlahTopik) TIDAK boleh ada lagi di JSON —
 *    jumlah selalu dihitung dari data oleh src/lib/data.js
 * 4. Materi yang tersedia:true wajib punya URL asli (bukan placeholder "example")
 * 5. Urutan topik per mata kuliah unik (celah urutan = peringatan, bukan error)
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const warnings = []

function load(rel) {
    try {
        return JSON.parse(readFileSync(join(root, rel), 'utf8'))
    } catch (e) {
        errors.push(`${rel}: JSON tidak valid — ${e.message}`)
        return []
    }
}

const semester = load('src/data/semester.json')
const mataKuliah = load('src/data/mataKuliah.json')
const topik = load('src/data/topik.json')

function checkIds(list, name) {
    const seen = new Map()
    for (const item of list) {
        if (!item.id) errors.push(`${name}: ada entri tanpa id`)
        else if (seen.has(item.id)) errors.push(`${name}: id duplikat "${item.id}"`)
        else seen.set(item.id, item)
    }
    return seen
}

const semById = checkIds(semester, 'semester')
const mkById = checkIds(mataKuliah, 'mataKuliah')
checkIds(topik, 'topik')

// Field wajib
for (const s of semester) {
    for (const f of ['nomor', 'nama']) if (s[f] == null) errors.push(`semester ${s.id}: field "${f}" kosong`)
    if ('jumlahMataKuliah' in s) errors.push(`semester ${s.id}: field jumlahMataKuliah manual tidak boleh ada (dihitung dari data)`)
}
for (const mk of mataKuliah) {
    for (const f of ['kode', 'nama', 'semesterId']) if (mk[f] == null) errors.push(`mataKuliah ${mk.id}: field "${f}" kosong`)
    if ('jumlahTopik' in mk) errors.push(`mataKuliah ${mk.id}: field jumlahTopik manual tidak boleh ada (dihitung dari data)`)
}

// Referensi
const kodeMatkul = new Set(mataKuliah.map(mk => mk.kode))
for (const mk of mataKuliah) {
    if (!semById.has(mk.semesterId)) errors.push(`mataKuliah ${mk.id}: semesterId "${mk.semesterId}" tidak ditemukan`)
    if (mk.prasyarat != null && !kodeMatkul.has(mk.prasyarat)) errors.push(`mataKuliah ${mk.id}: prasyarat "${mk.prasyarat}" bukan kode mata kuliah yang ada`)
}
for (const t of topik) {
    if (!mkById.has(t.mataKuliahId)) errors.push(`topik ${t.id}: mataKuliahId "${t.mataKuliahId}" tidak ditemukan`)
    for (const f of ['judul', 'urutan']) if (t[f] == null) errors.push(`topik ${t.id}: field "${f}" kosong`)
}

// Materi: tersedia => URL asli; URL placeholder => wajib tersedia:false
for (const t of topik) {
    for (const versi of ['mentah', 'simplified']) {
        const m = t.materi?.[versi]
        if (!m) { errors.push(`topik ${t.id}: materi.${versi} tidak ada`); continue }
        const url = m.url || ''
        const placeholder = url.includes('example') || url === ''
        if (m.tersedia === true && placeholder) errors.push(`topik ${t.id} (${versi}): tersedia=true tapi URL masih placeholder/kosong`)
        if (m.tersedia === true && !url.startsWith('https://')) errors.push(`topik ${t.id} (${versi}): URL harus https://`)
    }
}

// Urutan topik per matkul
const perMatkul = new Map()
for (const t of topik) {
    if (!perMatkul.has(t.mataKuliahId)) perMatkul.set(t.mataKuliahId, [])
    perMatkul.get(t.mataKuliahId).push(t.urutan)
}
for (const [mkId, urutan] of perMatkul) {
    const sorted = [...urutan].sort((a, b) => a - b)
    if (new Set(urutan).size !== urutan.length) errors.push(`${mkId}: urutan topik duplikat (${urutan.join(', ')})`)
    else if (sorted.some((v, i) => v !== i + 1)) warnings.push(`${mkId}: urutan topik tidak kontinu mulai 1 (${sorted.join(', ')})`)
}

// Info jujur (bukan error): seberapa banyak konten yang benar-benar ada
const totalVersi = topik.length * 2
const tersedia = topik.reduce((n, t) => n + ['mentah', 'simplified'].filter(v => t.materi?.[v]?.tersedia).length, 0)
console.log(`Data: ${semester.length} semester, ${mataKuliah.length} mata kuliah, ${topik.length} topik`)
console.log(`Materi tersedia asli: ${tersedia}/${totalVersi} versi file`)

for (const w of warnings) console.warn(`⚠ PERINGATAN: ${w}`)
if (errors.length > 0) {
    for (const e of errors) console.error(`✖ ERROR: ${e}`)
    console.error(`\nValidasi GAGAL: ${errors.length} error`)
    process.exit(1)
}
console.log(`✔ Validasi LULUS (${warnings.length} peringatan)`)
