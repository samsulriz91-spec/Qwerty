# Rencana Trading Assistant MT5 — Proyek 2

Tanggal pencatatan: 8 November 2026 (WIB)
Status: target produk komersial lengkap telah ditetapkan pengguna; implementasi EA belum dimulai.

## 1. Tujuan yang dinyatakan pengguna

Mengembangkan Lot Calculator menjadi Trading Assistant berbasis EA MQL5 untuk MetaTrader 5. Referensi fungsional:
https://www.mql5.com/en/market/product/23415

Referensi dipakai untuk mempelajari kemampuan dan alur. Jangan menyalin source code, merek, atau aset produk tersebut.

Aplikasi kalkulator web RC2 tetap menjadi baseline yang sudah disetujui. Rencana EA tidak mengubah aplikasi atau mengeksekusi transaksi.

## 2. Baseline yang sudah tersedia

- Source web/PWA: proyek-2-lot-calculator/worker.mjs dalam repositori Qwerty.
- Rilis aktif: RC2; RC1 digantikan sebagai versi aktif, riwayat commit dipertahankan.
- GitHub: https://github.com/samsulriz91-spec/Qwerty/tree/main/proyek-2-lot-calculator
- Aplikasi: https://lot-calculator-proyek-2.milkboys.chatgpt.site
- Tampilan navy, putih, lime; input ringkas; pengaturan tambahan melalui panel bawah.
- USD/USC, Buy/Sell, Entry–SL atau Entry–Jarak harga/pips, digit per instrumen.
- Pembagian risiko L1/L2 dengan bobot total 100%; lot dibulatkan ke bawah.
- Biaya komisi buka+tutup per lot dan cadangan slippage dalam anggaran risiko.
- Preset awal Exness forex/logam, ekspor-impor profil, status kesehatan harga.
- Data akun disimpan lokal pada browser; belum ada sinkronisasi cloud.
- Harga web merupakan referensi penyedia eksternal, bukan koneksi MT5.

Baseline ini tidak membuktikan EA telah dibuat. Pengujian fisik Android, instalasi/offline PWA, serta seluruh spesifikasi broker belum terverifikasi.

## 3. Arah produk EA

Target produk: Trading Assistant lengkap untuk dijual. Pengguna adalah pemilik produk dan tester; asisten membantu rancangan, implementasi, pemeriksaan kode, dokumentasi dan perbaikan berdasarkan bukti pengujian.

Arah dasar: asisten trading manual. Pengguna menentukan arah dan setup; EA membantu kalkulasi, eksekusi yang diperintahkan, serta pengelolaan posisi menurut aturan.

Keputusan pengguna terbaru: versi lengkap Trading Assistant menjadi target, termasuk kemampuan referensi dalam dokumen ini. Urutan pengembangan bertahap bukan pengurangan target. Parameter, perilaku eksekusi, scope rilis pertama, platform uji, dan kesiapan jual masih memerlukan spesifikasi serta bukti pengujian.

Fitur khas yang diprioritaskan untuk dibahas:
- Satu anggaran risiko dibagi ke L1 dan L2, bukan dikalikan dua.
- Entry dan SL yang saling terhubung dengan jarak harga/pips.
- TP/RR terpisah per layer; contoh penggunaan pengguna: L1 RR 1:2 dan L2 RR 1:4.
- L1 mencapai TP → pindahkan SL L2 ke BE, bila diaktifkan pengguna.
- Komisi/slippage dan risiko aktual setelah pembulatan lot tetap terlihat.
- UI ringkas dan fungsi tambahan tidak memenuhi layar utama.

## 4. Kemampuan referensi yang dapat dipertimbangkan

Target kemampuan versi lengkap; setiap modul harus melewati pengujian sebelum dinyatakan tersedia:
1. Perhitungan risiko berdasarkan balance, equity, free margin, nominal, atau basis khusus.
2. Garis Entry/SL/TP yang dapat digeser pada chart.
3. Eksekusi market dan pending order.
4. Partial close.
5. Breakeven dengan offset biaya.
6. Trailing stop: jarak tetap, ATR, MA, Fractals, Parabolic SAR, High–Low, atau skema parsial.
7. OCO, trailing limit, dan order virtual.
8. Penjadwalan buka/tutup.
9. Penutupan posisi berdasarkan simbol, arah, atau target profit/loss.
10. Preset, hotkeys, screenshot, dan alert.
11. Pemisahan transaksi yang dikelola melalui Magic Number/identitas order.

Virtual SL/TP, trailing, dan otomatisasi lain membutuhkan pembahasan tentang ketergantungan pada terminal/koneksi; jangan menganggapnya identik dengan stop yang tersimpan di server broker.

## 5. Roadmap usulan

### Fase A — Spesifikasi dan rancangan
- Putuskan simbol, broker/akun awal, jenis akun hedging/netting, dan lingkungan penggunaan.
- Definisikan otoritas EA: menghitung saja, eksekusi manual lewat panel, atau pengelolaan otomatis.
- Definisikan unit point/pip, kontrak cent, biaya, pembulatan, dan validasi SL/TP.
- Tentukan perilaku jika satu layer berhasil dibuka dan layer lainnya gagal.
- Buat PRD dan acceptance criteria sebelum implementasi.

### Fase B — Mesin kalkulasi MQL5
- Baca akun dan spesifikasi simbol dari terminal broker.
- Gunakan data Bid/Ask dan waktu tick broker, bukan feed web.
- Evaluasi rugi Entry→SL dalam mata uang akun; pertimbangkan OrderCalcProfit.
- Validasi volume minimum/maksimum/step, tick size, stop/freeze level dan margin.
- Komisi serta cadangan slippage dihitung terpisah sesuai definisi yang disepakati.
- Uji USD/USC dan berbagai kelas instrumen pada akun demo.

### Fase C — Panel eksekusi
- Preview risiko, lot, SL/TP sebelum membuka transaksi.
- Market order terlebih dahulu; L1/L2 berbobot dan TP/RR terpisah.
- Cegah klik ganda, duplikasi order, dan transaksi pada input tidak valid.
- Tangani kegagalan, penolakan, partial fill, dan pemulihan status.

### Fase D — Pengelolaan posisi
- BE, partial close, lalu trailing.
- Pengelolaan hanya pada posisi dalam lingkup yang disetujui.
- Aturan L1 TP → L2 BE harus mengenali penutupan TP yang benar, bukan setiap hilangnya posisi L1.
- Uji restart terminal, reconnect, dan idempotensi tindakan.

### Fase E — Disiplin dan fitur tambahan
- Batas risiko gabungan, jumlah ide, dan penghentian setelah batas loss jika disepakati.
- Pending/OCO, waktu, notifikasi, dan pencatatan aktivitas menyusul berdasarkan kebutuhan.
- Aturan prop firm harus dapat dikonfigurasi; jangan diasumsikan sama untuk semua perusahaan.

## 6. Batas platform dan migrasi

- Web/PWA adalah referensi UI dan perilaku, bukan file EA yang cukup diganti ekstensi.
- Mesin EA perlu ditulis dan diuji dalam MQL5.
- EA tidak berjalan langsung dalam aplikasi MT5 Android; perlu lingkungan desktop yang sesuai.
- Penggunaan lewat HP, remote desktop, VPS, atau penghubung web masih keputusan terbuka.
- Panel interaktif dan proses otomatis memiliki kebutuhan lingkungan berbeda.
- Tidak ada jaminan bahwa aturan web saat ini sudah aman untuk eksekusi broker tanpa validasi tambahan.

Referensi teknis untuk fase implementasi:
https://www.mql5.com/en/docs/trading/ordercalcprofit
https://www.mql5.com/en/docs/marketinformation/symbolinfodouble
https://get.exness.help/hc/en-us/articles/360013782820-Are-Expert-Advisors-EA-available-for-mobile-platforms

## 7. Keputusan yang masih terbuka

- Target komersial sudah diputuskan. Kanal penjualan dan bentuk lisensi masih terbuka.
- Nama produk, lisensi/distribusi, dan dukungan broker selain Exness.
- Scope versi pertama, jenis order, serta aturan untuk akun hedging/netting.
- Apakah L1/L2 selalu posisi terpisah atau dikelola sebagai partial close.
- Arti BE: harga entry atau titik impas setelah estimasi biaya.
- Lingkungan desktop/VPS dan cara akses pengguna dari HP.
- Anggaran, jadwal, dan perangkat pengujian.

## 8. Checkpoint untuk melanjutkan

Mulai dari baseline RC2 dan dokumen ini. PRD awal produk komersial disimpan dalam TRADING_ASSISTANT_COMMERCIAL_PRD.md. Tugas berikutnya adalah menetapkan lingkungan pengujian dan acceptance criteria rinci, lalu mengimplementasikan mesin kalkulasi MQL5. Cakupan lengkap adalah target pengguna; detail yang belum diputuskan tidak boleh diisi dengan klaim keberhasilan. Jangan mengubah atau deploy web, memulai pembelian, atau mengeksekusi transaksi hanya karena rencana ini tersimpan.

## 9. Status komersialisasi

Komersial adalah tujuan, bukan status siap jual. Compile, pengujian pada MT5, pengelolaan kesalahan eksekusi, restart/reconnect, dokumentasi, dan validasi pengguna harus dibuktikan. Pengguna berperan sebagai tester. Belum ada file EA terkompilasi atau rilis EA yang dinyatakan lulus. Web RC2 tetap terpisah dan tidak diubah oleh keputusan ini.
