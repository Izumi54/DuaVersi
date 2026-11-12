# Plan Perbaikan DuaVersi

> Status: **BERJALAN — Fase 0 & Fase 1 selesai 12 Nov 2026.** Dokumen ini dibuat 12 Nov 2026 dari hasil analisis
> (audit kode + `npm run lint` + `npm run build` + tes dev server), supaya urutan perbaikan
> jelas dulu sebelum ada kode yang diubah.
> Eksekusi dikerjakan di branch `perbaikan/fase-1-2`; titik kembali: tag `baseline-sebelum-perbaikan` (= `dc7c77a`).
> Repo: Izumi54/DuaVersi · commit patokan: `dc7c77a` (master)
> Clone lokal: `~/workspace/repos/DuaVersi`

---

## 1. Prinsip plan ini

1. **Tidak tambah fitur baru sebelum fondasi beres.** Login, cloud sync, upload, diskusi = backlog, bukan sekarang.
2. **UI tidak boleh mengklaim yang tidak ada.** Semua angka di UI dihitung dari data aktual, bukan ditulis manual.
3. **Satu mata kuliah selesai penuh lebih berharga daripada 8 semester setengah.** Bukti konsep dulu: CS101 tuntas dengan file asli.
4. **Setiap fase punya kriteria selesai yang bisa dites**, bukan "kira-kira sudah". Perbaikan tanpa tes = utang baru.
5. **Urutan mengikuti dependensi**, bukan mengikuti yang paling terlihat. Fondasi (Fase 2) sebelum polesan (Fase 5).

## 2. Baseline — kondisi terverifikasi saat plan dibuat

| Aspek | Fakta terukur |
|---|---|
| Konten nyata | 1 dari 8 semester terisi; 1 dari 5 mata kuliah punya topik (CS101, 12 topik); 7 semester & 4 matkul kosong tapi mengklaim 3–5 matkul / 10–14 topik |
| File materi | 24/24 URL masih placeholder `drive.google.com/file/d/1example-*` — preview & download pasti gagal |
| Lint | `npm run lint` **gagal: 19 error** (5× setState-di-effect, 12× unescaped entities, 2× `<a>` untuk navigasi internal) |
| Build | `npm run build` di VM gagal di fetch Google Fonts (Geist) — font yang sebenarnya tidak dipakai desain |
| Routing | `/semester/99`, `/mata-kuliah/ngawur`, `/materi/ngawur` → HTTP **200**, seharusnya 404 |
| Pencarian | Hanya mencari judul/deskripsi/tag topik; nama mata kuliah tidak dicari. 6 dari 7 saran cepat dijamin 0 hasil |
| Dark mode | Kelas `dark:` Tailwind v4 mengikuti OS, bukan toggle (tidak ada `@custom-variant dark`) |
| Arsitektur | Semua 7 halaman `'use client'`; tidak ada metadata per halaman; data diakses via `require()` di `src/lib/data.js` |
| Kualitas | Tidak ada test, tidak ada CI, tidak ada LICENSE, README masih template create-next-app |
| Yang sudah bagus | Struktur folder rapi, komponen UI sendiri (Tombol/Badge/Kartu/dll), hooks progress & theme, ide produk + demo interaktif di homepage |

## 3. Keputusan yang perlu diambil Izumi dulu

Plan bisa jalan penuh setelah 4 keputusan ini. Rekomendasi Zuga dicantumkan — kalau setuju semua, eksekusi tinggal mengikuti plan.

| # | Keputusan | Pilihan | Rekomendasi |
|---|---|---|---|
| D1 | Scope konten v1 | (a) Fokus Semester 1 tuntas, semester lain ditandai "segera hadir" · (b) Kejar 8 semester sekaligus | **(a)** — 8 semester sekaligus mengulang kesalahan yang sama: lebar dulu, isi belakangan |
| D2 | Semester/matkul kosong ditampilkan bagaimana? | (a) Sembunyikan dari grid · (b) Tampilkan dengan label jujur "Belum tersedia" dan tanpa angka palsu | **(b)** — struktur kurikulum tetap terlihat, tapi tidak menipu |
| D3 | File materi asli | (a) Google Drive milik Izumi (link share publik) · (b) File di-host sendiri di repo/server | **(a)** untuk v1 — paling cepat membuktikan konsep; migrasi bisa kapan saja karena URL ada di data |
| D4 | Target deploy setelah beres | (a) Vercel · (b) VM sendiri (izumi-dev.my.id) · (c) Belum deploy, lokal dulu | **(a)** — Next.js paling minim gesekan di Vercel; VM tetap untuk eksperimen |

## 4. Fase perbaikan

Estimasi = sesi kerja fokus, kasar, bukan janji. Urutan fase adalah urutan eksekusi.

### Fase 0 — Pengaman (setengah sesi) ✅ SELESAI 12 Nov 2026
- [x] Branch baru `perbaikan/fase-1-2` — master tidak disentuh langsung
- [x] Tag/backup commit `dc7c77a` sebagai titik kembali — tag anotasi `baseline-sebelum-perbaikan` + salinan bundle `~/workspace/repos/DuaVersi-baseline-sebelum-perbaikan.bundle` (di luar repo)
- [x] Catat baseline (dokumen ini) ke repo — commit pertama di branch `perbaikan/fase-1-2`
- **Selesai bila:** bisa kembali ke kondisi sekarang dalam 1 perintah git. ✅ Terverifikasi: `git worktree add <folder> baseline-sebelum-perbaikan` menghasilkan persis isi `dc7c77a` (diuji 12 Nov 2026, worktree uji lalu dihapus).

### Fase 1 — Kebenaran data (P0 · 1 sesi) — *yang diperbaiki: klaim palsu* ✅ SELESAI 12 Nov 2026
- [x] `jumlahMataKuliah` & `jumlahTopik` **dihitung dari data** (`lib/data.js`), field manual di JSON dihapus/dijadikan tidak dipakai UI
- [x] Halaman semester/matkul menampilkan angka aktual; status kosong memakai label sesuai keputusan D2
- [x] Semua URL placeholder `1example-*` → `tersedia: false` sampai file asli ada (UI sudah punya tampilan "belum tersedia", tinggal dipakai jujur)
- [x] Teks Halaman Tentang dikoreksi: Fase 1 roadmap tidak lagi mengklaim "8 semester lengkap"
- [x] Script validasi data sederhana (Node): cek ID duplikat, referensi yatim (topik→matkul→semester), dan URL placeholder — jalan dalam 1 perintah
- **Selesai bila:** tidak ada satu pun angka/teks di UI yang berbeda dari isi JSON; script validasi lulus. ✅ Terverifikasi 12 Nov 2026: `npm run validasi-data` LULUS di data baru (dan GAGAL 37 error saat diuji ke data baseline — script-nya terbukti menangkap masalah lama); dev server: badge Semester 1 = "5 Mata Kuliah", Semester 2 = "0 Mata Kuliah" konsisten dengan empty state-nya, homepage memuat 7 label "Belum tersedia", halaman materi menampilkan panel "Belum Tersedia", Tentang tidak lagi memuat klaim lama. Keputusan terapan: D1 fokus Semester 1, D2 label jujur (rekomendasi plan). Catatan: 0/24 versi file adalah kondisi jujur saat ini — mengisinya adalah Fase 4.

### Fase 2 — Fondasi teknis (P0 · 1–2 sesi) — *yang diperbaiki: 404, lint, font, dark mode*
- [ ] Halaman data (semester, mata-kuliah, materi) menjadi **Server Component**; `notFound()` dipanggil saat render, bukan di `useEffect`; tambah `generateStaticParams` untuk rute statis yang datanya JSON
- [ ] Metadata per halaman (`generateMetadata`): judul "CS101 — Pengantar Ilmu Komputer · DuaVersi", dst.
- [ ] `src/lib/data.js`: ganti `require()` berulang dengan `import` JSON sekali di modul
- [ ] Perbaiki 19 error lint per kelompok: pola setState-di-effect diganti (data statis tidak perlu effect), entities, `<a>` → `<Link>`
- [ ] Font disatukan: **hapus Geist** dari `layout.js`, Inter + Outfit dimuat via `next/font` (bukan `@import` CSS) — build tidak lagi tergantung fetch font yang tidak dipakai
- [ ] Dark mode dibetulkan: `@custom-variant dark` di Tailwind v4 agar kelas `dark:` mengikuti class toggle; cegah kedip tema saat load (script kecil di `<head>` membaca localStorage sebelum render); kunjungan pertama yang belum punya preferensi tersimpan mengikuti setting OS, bukan dipaksa light
- [ ] Samakan prop `Tombol`: satu nama (`ukuran`), perbaiki pemakaian `size=` di homepage & tentang
- **Selesai bila:** `npm run lint` 0 error · `npm run build` sukses · `/semester/99` dkk balas **404** · toggle dark mode mengubah seluruh halaman secara konsisten · judul tab berbeda per halaman.

### Fase 3 — Fitur inti benar-benar bekerja (P1 · 1 sesi)
- [ ] Pencarian mencari juga **nama + kode mata kuliah** dan nama semester; hasil dikelompokkan (Topik / Mata Kuliah)
- [ ] Saran cepat & placeholder pencarian **dibangkitkan dari data nyata** (hanya istilah yang pasti ada hasilnya)
- [ ] Logika bookmark disatukan jadi satu hook `useBookmarks` (sekarang logika yang sama ditulis 3 kali: halaman bookmark, materi, dan tersebar) — dipakai semua halaman
- [ ] Hilangkan `<button>` di dalam `<Link>`/`<a>` (materi, bookmark, header, semester) — ganti pola styling link-sebagai-tombol
- [ ] Tombol hapus bookmark bisa dijangkau keyboard & sentuh (tidak hover-only): selalu terlihat di sentuh, `focus-visible` jelas
- [ ] Perbaiki dependensi effect di halaman materi (`isTopicCompleted` tidak stabil → effect jalan tiap render)
- **Selesai bila:** cari "Basis Data" & "Struktur Data" menemukan mata kuliahnya · cari "Python" tidak lagi disarankan bila memang tidak ada · bookmark tambah/hapus konsisten dari halaman mana pun · navigasi keyboard penuh bisa mencapai semua tombol.

### Fase 4 — Konten nyata (P1 · berjalan paralel, milik Izumi + Zuga membantu)
- [ ] **CS101 tuntas dulu:** 12 topik × 2 versi = 24 file asli di Drive (keputusan D3), URL + ukuran + jumlah halaman diisi dari file sebenarnya
- [ ] Checklist per file: link bisa dibuka tanpa login, preview tampil di iframe, download jalan
- [ ] Baru setelah CS101 100%: matkul Semester 1 berikutnya, satu per satu — bukan langsung semester lain
- **Selesai bila (tonggak v1):** seorang mahasiswa bisa membuka CS101, membaca versi simplified, mengunduh versi original — semua dari file asli.

### Fase 5 — UX & desain (P2 · 1 sesi) — *lensa frontend-design*
- [ ] `prefers-reduced-motion` dihormati; animasi scroll serentak dikurangi — satu momen gerak utama (demo Dua Versi), sisanya tenang
- [ ] Glassmorphism & gradien pastel dikurangi dari "semua permukaan" menjadi aksen; perkuat hierarki tipografi Inter/Outfit agar identitasnya bukan template SaaS generik
- [ ] 126 inline style dikonsolidasikan bertahap ke token Tailwind/`@theme` (tidak harus 0, tapi warna tidak lagi ditulis tangan per file)
- [ ] Aset eksternal homepage (`grainy-gradients.vercel.app`) diganti aset lokal — halaman tidak bergantung domain orang lain
- [ ] Cek kontras dark/light untuk teks sekunder (abu di atas pastel)
- **Selesai bila:** halaman terasa sama bagusnya dengan animasi dimatikan (reduced-motion), dan tidak ada aset dari domain pihak ketiga selain Drive/font.

### Fase 6 — Kualitas & rilis (P2 · 1 sesi)
- [ ] Test minimal: unit untuk `lib/data.js` (pencarian, navigasi prev/next, hitungan) + smoke test Playwright 5 rute utama dan 1 rute invalid (memasang Playwright + Chromium di VM adalah bagian fase ini)
- [ ] GitHub Actions: `lint` + `build` + test di setiap push/PR — lint gagal tidak bisa terulang diam-diam
- [ ] README ditulis ulang: apa itu DuaVersi, cara jalan lokal, struktur data, cara menambah materi, screenshot
- [ ] Tambah LICENSE (usulan: MIT)
- [ ] Konvensi commit disepakati (Conventional Commits, satu baris ringkas) — riwayat lama memuat judul berupa tempelan perintah `git commit -m "..."` dan pesan multi-paragraf; tidak ditulis ulang, cukup tidak diulangi
- [ ] Deploy sesuai keputusan D4 + checklist rilis: semua kriteria Fase 1–4 hijau di alamat publik
- **Selesai bila:** orang lain bisa clone → `npm install` → `npm run dev` → paham proyek ini dari README saja.

## 5. Backlog — sengaja TIDAK dikerjakan sekarang

Sudah dijanjikan/diimpikan di dalam proyek (Halaman Tentang Fase 2), tapi mengerjakannya sekarang akan mengulangi pola "lebar dulu, fondasi belakangan":

- Login & profil, bookmark cloud sync
- Upload materi oleh pengguna / multi-kontributor
- Ruang diskusi, analytics pembelajaran
- Pindah data JSON statis → database/CMS (baru perlu bila kontributor > 1 atau materi > ±200 topik)
- Ekspansi program studi/fakultas lain

Masuk backlog resmi bila tonggak v1 (Fase 4) tercapai.

## 6. Ringkasan prioritas

| Prioritas | Isi | Fase | Estimasi |
|---|---|---|---|
| P0 — bohong & rusak | Klaim data palsu, URL placeholder, 404 salah, lint gagal, build rapuh, dark mode setengah | 1, 2 | 2–3 sesi |
| P1 — inti tidak bekerja | Pencarian, bookmark terduplikasi, konten asli CS101 | 3, 4 | 1 sesi + konten |
| P2 — bagus tapi belum layak rilis | Desain/aksesibilitas, test, CI, README, deploy | 5, 6 | 2 sesi |
| Nanti | Login, cloud, upload, diskusi, database, ekspansi | backlog | — |

**Total sampai v1 layak publik: ±5–6 sesi kerja**, di luar waktu Izumi menyiapkan file materi asli.

## 7. Risiko yang disadari

- File Drive asli mungkin belum ada sama sekali untuk versi *simplified* — itu pekerjaan menulis, bukan koding; Fase 4 bisa jadi fase terlama dan itu di luar kendali perbaikan kode.
- Mengubah halaman jadi Server Component menyentuh hampir semua halaman — makanya Fase 0 (branch + titik kembali) wajib, dan Fase 2 diuji per rute.
- Build di VM Muse punya keterbatasan jaringan (fetch font gagal) — setelah Geist dibuang, build harus terverifikasi **di VM ini**, bukan diasumsikan dari mesin lain.
