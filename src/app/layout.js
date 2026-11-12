import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Font di-self-host via @fontsource (woff2 lokal dari node_modules).
// Riwayat: dulu font dimuat lewat @import Google Fonts di CSS + Geist yang
// tidak dipakai; pemuatan font bawaan Next pun tetap fetch ke Google saat
// build. Dengan @fontsource, build tidak menyentuh Google Fonts (Fase 2).
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";

export const metadata = {
  title: "DuaVersi - Platform Materi Kuliah",
  description: "Satu Materi, Dua Versi - Belajar Sesuai Gayamu",
  keywords: ["materi kuliah", "pembelajaran", "mahasiswa", "edukasi"],
};

// Terapkan tema SEBELUM render pertama agar tidak ada kedip tema (FOUC):
// pakai preferensi tersimpan bila ada; kunjungan pertama mengikuti setting OS.
const temaAwalScript = `(function(){try{var t=localStorage.getItem('duaversi_theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaAwalScript }} />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <Header />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
