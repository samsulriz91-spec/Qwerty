# Jurnal Pro Trader · Demo Home Calm Cockpit

Buka `index.html` langsung di browser. Tidak perlu build, instalasi npm, atau
koneksi internet. Halaman ini menggunakan data simulasi akun cent dalam USC.

- Ringkasan saldo/P&L hari ini di atas, chips periode, dan sakelar animasi.
- Bottom sheet detail akun/trade, dialog reset tampilan, dan snackbar dengan Undo.
- Palet grafit/lavender dengan sidebar desktop dan navigasi bawah di HP.
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
belum sistem pemblokiran. Journal menuju tabel, Analytics menuju grafik,
More membuka opsi tampilan, dan New Trade menjelaskan cara mencoba Core RC.

## Panduan desain

AGENTS.md mengarahkan agen untuk membaca `.agents/skills/frontend-design/SKILL.md`.
Skill dan lisensi aslinya disertakan dari
[anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design).
Palet kandidat dan definisi data demo ada di DESIGN.md. Salinan skill ini adalah
panduan proyek, bukan pemasangan skill pribadi atau plugin ChatGPT.

## Verifikasi

Jalankan `node tests/verify-home.cjs` (tanpa paket npm tambahan). Pengujian
menjalankan JavaScript asli di DOM stub untuk memeriksa perhitungan, filter,
donut, tabel, CSV, dan event grafik. Pengujian tersebut tidak memeriksa layout
browser atau perilaku perangkat nyata. Status lengkap ada di VERIFICATION.md.


## Perbaikan angka/grafik kosong

Target angka Win rate dipisahkan dari keterangannya supaya pembaruan angka tidak
menghapus elemen yang dipakai render berikutnya. Pengujian regresi kini melacak
hubungan induk/anak elemen. Animasi yang tidak didukung tidak menghentikan data.

Ketuk Personal Cent atau Lihat detail akun untuk ringkasan akun. Ketuk instrumen
pada tabel untuk detail trade. Menu titik tiga membuka opsi tampilan; reset hanya
mengembalikan periode/filter/animasi dan tidak menghapus data contoh.

## Frontend Core RC OCR1

Patch [jpt-core-rc-ocr1-cockpit.patch](patches/jpt-core-rc-ocr1-cockpit.patch)
menerapkan desain ini ke source Core RC OCR1. Jalankan dari folder hasil ekstraksi
arsip Core RC yang berisi `checkpoint/`.

```sh
git apply --check /path/to/jpt-core-rc-ocr1-cockpit.patch
git apply /path/to/jpt-core-rc-ocr1-cockpit.patch
cd checkpoint/redesign
python3 build.py
node tests/core.test.cjs
node tests/batch2.test.cjs
node tests/features.test.cjs
```

Buka `dist/index.html` untuk mengevaluasi aplikasi lengkap. Baseline OCR1 yang
sesuai memiliki SHA-256 HTML
`8de7e907a5f900308642022896c928e8680f70494e34b368d8fe94626a09a028`.
Core RC memakai penyimpanan lokal. Ekspor backup dari working copy lama bila
memindahkan file atau membuka versi baru di alamat browser yang berbeda.

Patch mencakup donut hasil CLOSED Actual, progres target bulanan, Journal
berbasis kartu, panel filter dan sortir, dialog konfirmasi, serta sakelar
Kurangi animasi. Demo Home juga memakai bentuk navigasi baru.

Revisi New Trade memakai tiga tahap dan dapat mengisi kandidat OCR langsung ke
draft layer aktif. Journal memakai tab status bersudut dan pilihan filter
langsung dalam panel. Kartu statistik Home menampilkan visual per metrik.

New Trade menyediakan Quick Trade satu layar dan Detail Trade tiga tahap.
Satu screenshot riwayat mengisi L1–L3 sesuai jumlah posisi dan urutan MT5.
