/**
 * Uji pencarian DuaVersi (Fase 3 plan perbaikan).
 * Jalan: npm run uji-pencarian
 *
 * Mengimpor fungsi ASLI dari src/lib/data.js (bukan salinan logika) dan
 * menguji kriteria selesai Fase 3:
 * 1. Cari "Basis Data" & "Struktur Data" menemukan mata kuliahnya
 * 2. Cari "CS101" menemukan matkul + ke-12 topiknya
 * 3. Cari "Semester 1" menemukan ke-5 matkul semester itu
 * 4. Cari "Python" tidak menemukan apa-apa (dan tidak disarankan)
 * 5. Setiap saran dari saranPencarian() menghasilkan ≥1 hasil
 * 6. Hasil dikelompokkan: { topik, mataKuliah }
 */
import { cariMateri, saranPencarian } from '@/lib/data.js'

const gagal = []
let lulus = 0

function cek(nama, kondisi, detail = '') {
    if (kondisi) {
        lulus++
        console.log(`  ✓ ${nama}`)
    } else {
        gagal.push(nama)
        console.log(`  ✗ ${nama}${detail ? ` — ${detail}` : ''}`)
    }
}

console.log('Uji pencarian (Fase 3):')

const basisData = cariMateri('Basis Data')
cek(
    'cari "Basis Data" menemukan mata kuliah CS103',
    basisData.mataKuliah.some(mk => mk.kode === 'CS103'),
    `matkul: ${basisData.mataKuliah.map(mk => mk.kode).join(', ') || '(kosong)'}`
)
cek(
    'cari "Basis Data" jujur: CS103 tercatat 0 topik',
    basisData.mataKuliah.find(mk => mk.kode === 'CS103')?.jumlahTopik === 0,
    `jumlahTopik: ${basisData.mataKuliah.find(mk => mk.kode === 'CS103')?.jumlahTopik}`
)

const strukturData = cariMateri('Struktur Data')
cek(
    'cari "Struktur Data" menemukan mata kuliah CS102',
    strukturData.mataKuliah.some(mk => mk.kode === 'CS102'),
    `matkul: ${strukturData.mataKuliah.map(mk => mk.kode).join(', ') || '(kosong)'}`
)

const cs101 = cariMateri('CS101')
cek(
    'cari "CS101" menemukan matkulnya',
    cs101.mataKuliah.some(mk => mk.kode === 'CS101'),
    `matkul: ${cs101.mataKuliah.map(mk => mk.kode).join(', ') || '(kosong)'}`
)
cek(
    'cari "CS101" menemukan ke-12 topiknya',
    cs101.topik.length === 12,
    `topik: ${cs101.topik.length}`
)

const semester1 = cariMateri('Semester 1')
cek(
    'cari "Semester 1" menemukan ke-5 matkul semester itu',
    semester1.mataKuliah.length === 5,
    `matkul: ${semester1.mataKuliah.length}`
)

const python = cariMateri('Python')
cek(
    'cari "Python" tidak menemukan apa-apa',
    python.topik.length === 0 && python.mataKuliah.length === 0,
    `topik: ${python.topik.length}, matkul: ${python.mataKuliah.length}`
)

const saran = saranPencarian()
cek(
    'saranPencarian() mengembalikan 7 istilah',
    saran.length === 7,
    `saran: ${saran.join(', ')}`
)
const saranKosong = saran.filter(istilah => {
    const hasil = cariMateri(istilah)
    return hasil.topik.length + hasil.mataKuliah.length === 0
})
cek(
    'setiap saran menghasilkan ≥1 hasil (tidak ada saran 0 hasil)',
    saranKosong.length === 0,
    `saran 0 hasil: ${saranKosong.join(', ')}`
)
cek(
    '"Python" tidak ada di saran',
    !saran.some(istilah => istilah.toLowerCase() === 'python')
)

const kosong = cariMateri('')
cek(
    'kata kunci kosong menghasilkan grup kosong',
    kosong.topik.length === 0 && kosong.mataKuliah.length === 0
)

console.log(`\n${lulus} lulus, ${gagal.length} gagal`)
if (gagal.length > 0) process.exit(1)
