# Jurnal Pro Trader — Home

Prototipe halaman Home berbahasa Indonesia dengan data simulasi akun cent.
Buka `index.html` langsung di browser. Tidak membutuhkan build atau instalasi.

- Tampilan navy/biru untuk HP dan desktop.
- Saldo semua waktu dan grafik balance berdasarkan trade closed.
- Filter bulan ini, tujuh hari terakhir, dan semua waktu untuk metrik dan grafik.
- Net P/L, win rate, jumlah trade ideas, profit factor, target bulanan, dan kuota harian.
- Satu sumber data demo; tanggal mengikuti kalender Asia/Jakarta.

Semua angka adalah simulasi. Belum ada koneksi MT5, backend, login, penyimpanan,
OCR, atau halaman selain Home. Tombol halaman lain menampilkan penjelasan.
Kuota harian hanya indikator demo, belum menjadi sistem pemblokiran trade.

Saldo saat ini selalu mencakup semua ide. Filter periode hanya mengubah metrik,
grafik, dan daftar trade. Target bulanan dan disiplin hari ini tetap memakai
periode masing-masing. Win rate memasukkan ide BE dalam total ide; profit factor
membagi jumlah net P/L ide positif dengan nilai absolut net P/L ide negatif.

## Panduan desain proyek

`AGENTS.md` mengarahkan pekerjaan frontend untuk membaca
`.agents/skills/frontend-design/SKILL.md`. Salinan asli skill frontend-design
dan lisensinya disertakan dari [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design).
Keputusan tampilan dan sumber skill dicatat dalam `DESIGN.md`.

Menaruh skill di repo menyediakan panduan bagi agen yang membacanya; ini tidak
menginstal plugin, menjalankan kode otomatis, atau memasang skill pribadi di ChatGPT.

## Pemeriksaan

Jalankan `node tests/verify-home.cjs` untuk memeriksa perhitungan, filter,
saldo pembuka periode, kondisi tanpa data, serta tanggal WIB. Tidak perlu paket npm.
Pengujian ini menjalankan JavaScript asli menggunakan DOM stub; tidak memverifikasi
tampilan CSS atau interaksi browser. Lihat `VERIFICATION.md` untuk status pemeriksaan.
