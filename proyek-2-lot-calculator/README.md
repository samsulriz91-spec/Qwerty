# Proyek 2 — Lot Calculator RC1

Versi fitur/desain dikunci 8 November 2026. USD/USC, Buy/Sell, SL harga/pips, digit per instrumen, L1/L2 berbobot, PWA.

## Sumber harga
Forex: Frankfurter harian. Logam: Gold API. Kripto: Coinbase spot. Indeks/energi: Yahoo Finance indeks/futures acuan melalui server. Semua berbeda dari feed broker MT5.

## Jalankan
Worker ESM mandiri di worker/index.js; aset PWA tertanam. Build: bash scripts/build.sh. Validasi: node scripts/validate-artifact.mjs.

## Batas verifikasi
Uji logika kalkulasi dan adapter lolos. Instalasi Android fisik/offline belum diverifikasi. Spesifikasi kontrak/pip/digit perlu disesuaikan broker. Data tersimpan per browser, tidak tersinkron ke server.
