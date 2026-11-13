# DESIGN.md — Arah Desain DuaVersi

> Ditulis 13 Nov 2026 sebagai perbaikan temuan audit anti-slop #001 nomor 2 (R-37).
> File ini adalah **arah**: keputusan identitas yang menjadi rujukan setiap perubahan UI.
> Filter anti-slop (`anti-slop/`) bekerja di atas arah ini, bukan sebaliknya.
> Setiap keputusan di bawah punya alasan satu baris (R-31). Mengubah arah = ubah file ini dulu, baru kodenya.

## Identitas

- **Produk:** platform materi kuliah Teknik Informatika; satu topik disajikan dalam dua versi:
  *Mentah* (bahan kuliah apa adanya) dan *Simplified* (penjelasan ulang berbahasa sehari-hari).
- **Motif identitas:** **dualitas dua versi itu sendiri**. Pasangan "Mentah ↔ Simplified" adalah
  satu-satunya ornamen konseptual yang khas DuaVersi; elemen dekoratif lain harus mendukung
  keterbacaan, bukan meniru tren. Alasan: kalau logo dan nama ditukar, dualitas ini yang membuat
  desain tetap terasa milik DuaVersi.
- **Karakter:** seperti catatan kuliah yang rapi dan jujur. Akademik, tenang, langsung ke isi.
  Bukan panggung startup: tidak menjanjikan yang belum ada, tidak berteriak dengan efek.
- **Audiens:** mahasiswa yang membuka situs untuk belajar, sering dari ponsel, sering terburu-buru.

## Dial (antislop Part 3)

**ENERGY 2 / RHYTHM 2 / MOTION 1**

- ENERGY 2: berani di hierarki dan tipografi, tidak berisik. Satu titik fokus per layar.
- RHYTHM 2: struktur konsisten antar halaman sejenis, dengan variasi komposisi antar jenis
  halaman (beranda boleh lebih ekspresif; halaman baca harus paling tenang).
- MOTION 1: gerak hanya status dan hover. Tidak ada animasi berputar tanpa akhir, tidak ada
  animasi masuk yang bertumpuk. Alasan: ini alat belajar, gerak yang tidak membantu membaca
  adalah gangguan; juga kewajiban `prefers-reduced-motion` (audit #001 no. 4).

## Warna

- **Inti:** indigo `#4f46e5` (primer), netral hangat-abu untuk dasar dan teks.
  Alasan indigo: warna ini sudah menjadi pengenal DuaVersi sejak versi pertama dan berasosiasi
  akademik; menggantinya tanpa alasan hanya mengganti satu default dengan default lain.
- **Aksen tunggal:** emerald untuk keadaan berhasil/progres selesai saja.
  Alasan: progres belajar adalah momen kunci produk, jadi satu-satunya tempat aksen kedua muncul.
- **Batas:** maksimal 2 warna inti + 1 aksen (R-29). Cyan dikeluarkan dari palet aktif;
  gradien pastel berbeda-beda per kartu semester adalah utang desain (audit #001 no. 17),
  dihapus saat nomor itu disetujui, bukan ditambah.
- **Gradien:** bukan perlakuan warna utama (audit #001 no. 6; per gelombang 2 tidak ada lagi
  `bg-gradient` di UI). Bila suatu saat dipakai, hanya untuk memisahkan satu tingkat
  hierarki, dengan alasan tertulis di sini.

## Tipografi

- **Heading: Outfit.** Alasan: geometris dan ramah, membedakan suara judul dari teks buku teks
  tanpa terasa korporat; sudah ter-self-host sejak Fase 2.
- **Body: Inter.** Alasan: keterbacaan teks Bahasa Indonesia yang panjang di ukuran kecil dan
  cakupan glif Latin yang lengkap; dipilih karena fungsi baca, bukan karena bawaan model.
- Keduanya di-self-host dari paket lokal (tanpa fetch Google Fonts saat build maupun runtime).

## Permukaan, radius, gerak

- **Glass/blur:** tidak dipakai. Per gelombang 2 audit #001 (13 Nov 2026) seluruh permukaan
  solid (24 kemunculan blur menjadi 0) dan header adalah batang solid bergaris bawah,
  bukan pil melayang. Kaca hanya boleh kembali bila ada elemen melayang yang benar-benar
  perlu dan alasannya ditulis di sini dulu.
- **Radius:** skala kecil dan berbeda per jenis elemen: tombol `rounded-lg`/`md`, kartu dan
  panel `rounded-2xl`, lencana `rounded-md`. Pil hanya untuk bentuk yang memang pil secara
  fungsi: sakelar (toggle demo), titik penanda, dan chip tag/metadata.
- **Shadow:** hanya penanda elevasi nyata (R-12); konten yang diam di halaman duduk rata.
  Pengecualian terukur per gelombang 2: kotak pencarian di halaman Cari (titik fokus
  halaman itu) dan hover kartu komponen `Kartu`.
- **Ikon:** bukan emoji. Bila ikon diperlukan, pakai satu set ikon bergaya konsisten yang
  relevan dengan isi; bila tidak ada yang relevan, tanpa ikon, label teks yang bekerja.

## Kejujuran konten (mengikat semua halaman)

- Angka selalu dihitung dari data; fitur hanya diklaim bila sudah berfungsi; status kosong
  ditulis apa adanya (praktik sejak Fase 1, dipertahankan).
- Tidak ada testimoni, statistik, atau janji hasil belajar tanpa bukti (R-17, R-18, R-36, R-38).

## Status arah vs utang

Arah di atas adalah keputusan mulai 13 Nov 2026. Selisihnya dengan keadaan situs adalah
daftar temuan `anti-slop/audit-001-2026-11-13.md`. Per 13 Nov 2026 malam, seluruh 20 temuan
audit #001 sudah diperbaiki dalam dua gelombang (1-5 lalu 6-20) dan diverifikasi di situs
live; file ini dan laporan di file audit adalah catatan keputusannya. Temuan baru dari audit
berikutnya tetap hanya diperbaiki bila nomornya disetujui Izumi, dan setiap perbaikan yang
mengubah arah harus memperbarui file ini.
