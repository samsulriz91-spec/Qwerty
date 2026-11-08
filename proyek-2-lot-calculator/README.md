# Proyek 2 — Lot Calculator RC2

RC2 menggantikan RC1 pada link aplikasi yang sama. UI ringkas dengan panel saldo/risiko/bobot, harga SL di bawah kolom jarak, ekspor-impor JSON, preset awal Exness USD/USC, kesehatan harga, komisi round-trip dan slippage, serta L1/L2 berbobot.

Source mandiri: worker/index.js pada checkout Sites; worker.mjs pada GitHub. Aset PWA dan API indeks/energi tertanam. node --check worker.mjs untuk cek sintaks.

Data akun tetap lokal di browser dan kunci penyimpanan dipertahankan. Preset Exness baru diterapkan saat dipilih. Mata uang biaya sesuai akun aktif, komisi per lot pulang-pergi.

Harga: Frankfurter referensi harian; Gold API; Coinbase spot; Yahoo Finance indeks/futures. Bukan feed MT5. Digit/step broker perlu diperiksa. Instalasi Android fisik dan offline belum terverifikasi. RC1 tidak lagi menjadi versi aktif; riwayat commit tetap tersedia.
