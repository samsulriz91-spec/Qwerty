# Trading Assistant MT5 — PRD Komersial v0.1

Tanggal: 8 November 2026. Status: spesifikasi awal, belum merupakan EA siap jual.
Pemilik produk dan tester: pengguna. Target: produk MQL5 lengkap untuk dijual.

## Keputusan produk

- Target akhir lengkap, mengacu pada kemampuan Trade Assistant MT5: https://www.mql5.com/en/market/product/23415
- Produk orisinal; source, nama, aset dan tampilan pihak lain tidak disalin.
- Kalkulator web RC2 adalah baseline desain/perilaku, tetap terpisah dari pengembangan EA.
- Entry dipilih trader; EA membantu perencanaan, eksekusi yang diminta dan pengelolaan yang diaktifkan.
- Tidak menjanjikan profit atau kecocokan semua broker tanpa pengujian.
- Implementasi bertahap; klaim fitur mengikuti hasil nyata.

## Modul target versi lengkap

| ID | Modul | Target |
| --- | --- | --- |
| M01 | Koneksi terminal | Data akun, currency, simbol/suffix, Bid/Ask, tick time, spesifikasi volume dan kontrak |
| M02 | Risk engine | Nominal, balance/equity/free margin/custom, perhitungan rugi Entry-SL, biaya, pembulatan |
| M03 | Layer | L1/L2 berbobot, risiko total bersama, TP/RR per layer, model akun hedging/netting |
| M04 | Chart planner | Entry/SL/TP yang dapat digeser, input harga/points/pips, magnet harga, preview transaksi |
| M05 | Eksekusi | Market, limit, stop, stop-limit sesuai dukungan broker; pencegahan klik ganda |
| M06 | Trade management | BE, BE dengan estimasi biaya, partial close, L1 TP memicu BE L2 bila dipilih |
| M07 | Trailing | Jarak tetap, ATR, MA, Fractals, Parabolic SAR, High-Low, skema parsial |
| M08 | Pending lanjutan | OCO, trailing limit, pembatalan menurut kondisi |
| M09 | Virtual levels | Virtual pending/SL/TP dengan status ketergantungan koneksi yang jelas |
| M10 | Waktu & penutupan | Jadwal, close by symbol/side/status, target profit/loss dalam scope terpilih |
| M11 | Proteksi | Risiko gabungan, batas harian/jumlah ide/loss streak yang dapat dikonfigurasi |
| M12 | Kenyamanan | Preset, hotkeys, alert, screenshot, tampilan ringkas |
| M13 | Audit & recovery | Log tindakan, Magic Number, rekonsiliasi posisi setelah restart/reconnect |
| M14 | Paket komersial | Installer/panduan, versi, preset, changelog, kanal dukungan dan lisensi sesuai kanal distribusi |

Tidak semua fitur web harus dipindahkan persis: pada EA, harga/spesifikasi berasal dari terminal; ekspor dan penyimpanan harus mengikuti lingkungan MQL5.

## Prinsip eksekusi

1. Preview menunjukkan arah, volume, SL/TP dan anggaran risiko gabungan sebelum perintah dikirim.
2. Lot minimum tidak boleh dipaksakan jika melampaui anggaran.
3. Semua respons trade server diperiksa. Status tidak boleh dinyatakan berhasil hanya karena tombol ditekan.
4. Jika satu layer gagal, status dan risiko posisi yang benar-benar terbuka harus ditampilkan; kebijakan rollback/penanganannya masih perlu diputuskan.
5. Scope default hanya posisi yang dimiliki modul. Mengelola posisi lain harus pilihan yang eksplisit.
6. Identitas dan state harus cukup untuk mencegah order atau partial close terulang setelah reconnect.
7. Satuan pip/point, volume, mata uang cent dan biaya harus terlihat jelas.
8. Dukungan netting berbeda dari hedging; dua layer tidak boleh dijanjikan sebagai dua posisi independen di semua akun.
9. SL/TP virtual memiliki ketergantungan berbeda dari level server broker.
10. Jadwal memakai waktu server yang ditampilkan; perubahan zona waktu harus diuji.

## Kriteria penerimaan rilis

- Kode terkompilasi pada MetaEditor/MT5 target; hasil compile dicatat.
- Kalkulasi diuji terhadap contoh pembanding: forex mayor/cross/JPY, logam dan CFD yang didukung.
- USD/USC diuji pada konfigurasi broker sebenarnya atau demo yang representatif.
- Komisi/slippage tidak dihitung ganda; risiko setelah pembulatan tidak melewati anggaran yang didefinisikan.
- Eksekusi diuji untuk pasar tutup, invalid stops/volume, margin kurang, quote berubah dan penolakan server.
- Restart, reconnect, klik berulang, partial fill dan kondisi race diuji.
- BE, partial close, trailing dan OCO memiliki bukti pengujian yang terpisah.
- Fungsi yang belum lulus diberi status belum tersedia; tidak dipasarkan sebagai selesai.
- Dokumentasi instalasi, parameter, batasan dan recovery tersedia.
- Pengguna menyelesaikan uji penerimaan dan melaporkan hasil; kesiapan jual ditentukan dari bukti, bukan target fitur.
- Aturan kanal penjualan dan lisensi diperiksa saat kanal dipilih.

## Urutan pelaksanaan

A. Pilih lingkungan uji desktop MT5 dan broker/jenis akun awal.
B. Spesifikasikan dan implementasikan M01–M03.
C. Compile dan uji kalkulator dahulu tanpa membuka transaksi nyata.
D. Implementasikan M04–M05, lalu uji demo.
E. Implementasikan M06–M09 dengan pengujian tiap tindakan dan recovery.
F. Implementasikan M10–M13.
G. Uji regresi, beta pengguna, perbaikan, dan M14 sebelum penjualan.

## Peran dan pelaporan

Pengguna: pemilik produk, penentu kebutuhan, tester pada lingkungan yang disepakati.
Asisten: rancangan, kode, review, pengujian yang dapat dijalankan, diagnosis dan dokumentasi.
Setiap checkpoint membedakan: ditulis, terkompilasi, diuji otomatis, diuji MT5, diterima pengguna.

## Keputusan terbuka

Nama komersial; kanal penjualan; lisensi; harga; perangkat/terminal pengujian; dukungan broker awal; perilaku kegagalan layer; definisi BE dan biaya; cara akses melalui HP. Tidak ada pembelian, publikasi EA, atau transaksi akun yang dilakukan hanya berdasarkan PRD ini.
