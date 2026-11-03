# Jurnal Pro Trader — Modern Analytics Home

Buka `index.html` langsung di browser. Tidak perlu build, instalasi npm, atau
koneksi internet. Halaman ini menggunakan data simulasi akun cent dalam USC.

- Layout navy/biru dengan sidebar desktop dan navigasi bawah di HP.
- Grafik balance dengan tooltip, crosshair, sentuhan, dan tombol panah keyboard.
- Donut win/loss/BE. Klik hasil untuk menyaring tabel; klik lagi untuk membatalkan.
- Tabel responsif, pencarian instrumen/arah, filter hasil, dan urutan waktu/P&L.
- Ekspor CSV sesuai isi tabel, dengan penanda DEMO pada setiap baris.
- Target bulanan, kuota ide harian, dan animasi yang mengikuti reduced motion.

Saldo saat ini mencakup semua ide. Filter periode mengubah metrik, grafik,
donut, dan cakupan tabel. Filter hasil/pencarian hanya menyaring tabel; tidak
mengubah metrik atau persentase donut. Target bulanan dan disiplin hari ini
memakai periode masing-masing dalam kalender Asia/Jakarta.

Angka simulasi semua waktu: saldo awal 2,474.00 USC, net P/L +478.70 USC,
saldo akhir 2,952.70 USC dari tujuh ide. Tidak ada koneksi MT5, login, backend,
OCR, penyimpanan, atau halaman selain Home. Kuota harian adalah indikator demo,
belum sistem pemblokiran. Tombol halaman lain menjelaskan statusnya.

## Panduan desain

AGENTS.md mengarahkan agen untuk membaca `.agents/skills/frontend-design/SKILL.md`.
Skill dan lisensi aslinya disertakan dari
[anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design).
Arah desain dan definisi data final ada di DESIGN.md. Salinan skill ini adalah
panduan proyek, bukan pemasangan skill pribadi atau plugin ChatGPT.

## Verifikasi

Jalankan `node tests/verify-home.cjs` (tanpa paket npm tambahan). Pengujian
menjalankan JavaScript asli di DOM stub untuk memeriksa perhitungan, filter,
donut, tabel, CSV, dan event grafik. Pengujian tersebut tidak memeriksa layout
browser atau perilaku perangkat nyata. Status lengkap ada di VERIFICATION.md.
