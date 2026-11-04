# Verifikasi · Calm Cockpit, 4 November 2026

Scope: standalone Home with synthetic data, not a live-journal release.

## Riwayat verifikasi demo sebelum redesign

### Render regression reproduced and fixed

The previous build 810abdc nested `winCount` inside the `winRate` write target.
Updating `winRate.textContent` removed `winCount`. The next assignment threw
`Cannot set properties of null (setting textContent)`, before chart/donut render.
The previous independent-ID stub missed this DOM lifetime behavior.

The updated regression test models descendant-ID removal. Running it against
`git show 810abdc:index.html` fails at the exact winCount write; the fixed source
passes and fills chart opening/closing balances, donut segments/counts and table.
An independent lxml HTML parse confirms the affected IDs are now siblings.

### Passed

- Top balance 2,952.70 USC, today's P/L +217.70 USC, and 7 all-time closed ideas.
- Period chips and native selector synchronization.
- Account/trade bottom sheet state; reset confirm/cancel preserves ideas.
- Motion toggle and snackbar Undo; three simulated unsupported animation calls
  cannot interrupt static values or table rendering.

`node tests/verify-home.cjs`: actual inline JavaScript executed with a hierarchy-aware DOM stub.

- Account: 2,474.00 initial +478.70 P/L =2,952.70 USC, 7 closed ideas.
- Fixed Jakarta date 4 November: month +341.70 /4 ideas; 7 days +520.70 /6;
  all time +478.70 /7. All-time WR 71.4%, PF 7.53. Month opening 2,611.00.
- Changing period updates chart, metrics, donut, and table consistently.
- Donut selection toggles table outcome filter; headline metrics stay unchanged.
- Search, sorting, mobile sort selection, reset, empty result and disabled export.
- CSV content matches the selected table and includes DEMO labels. Actual download
  and the browser file-save behavior are not tested by the stub.
- Chart point inspection, pointer clamping, crosshair visibility, keyboard events,
  and tooltip text. These are simulated events, not physical input tests.
- Empty data, BE denominator and arc, infinity when there is profit but no loss,
  and finite chart coordinates at six simulated widths.
- Jakarta date boundaries, year change and leap day; unique IDs/icon references.
- `git diff --check`; HTMLParser parse; balanced CSS delimiters.
- Contrast on surface #101c2e: secondary text 7.42:1; mint 10.08:1; coral 7.74:1.
  These selected colors are checked, not a complete accessibility audit.

### Batas verifikasi versi sebelumnya

Actual browser rendering, screenshots, responsive overflow, animation appearance,
real download behavior, touch gestures, physical device and keyboard navigation.
The local browser binary remains unavailable. A cloud-browser check also could not open the local file because its URL security policy disallows file URLs. No visual browser verification is claimed. Do not
present the DOM stub as browser or visual QA. No external deployment is requested
or verified. GitHub contains source, not a hosted application.

## Pengujian redesign Calm Cockpit

- Chromium 153, viewport 320/360/375/390/412/768/1280 CSS px. Core RC dan demo
  Home lulus pemeriksaan lebar halaman. Demo Home merender grafik dan donut,
  mengganti periode, menuju Journal/Analytics, serta membuka opsi More.
- Core RC merender lima tujuan navigasi, empat kategori Analytics, filter
  Journal, grafik dengan inspeksi keyboard, dan Calendar dari More.
- Core RC menjaga posisi halaman saat sheet dibuka, menerima percobaan scroll
  latar, dan ditutup lewat Escape. Kandidat OCR teks sintetis dapat dibaca,
  kolom Entry minimal 48 px dan lebih dari 200 px lebar pada viewport uji.
- Regresi Core RC: 27 + 33 + 48 = 108 lulus. Tes DOM demo Home juga lulus.
- Patch diterapkan pada salinan OCR1 yang bersih dan menghasilkan build yang
  identik dengan working copy redesign.

Bukti ini berasal dari browser dan fixture sintetis. Uji fisik Android,
OCR gambar MT5 nyata, serta deployment produksi belum dilakukan pada redesign.

## Penambahan Home dan Journal

- Chromium 153 pada 320/360/375/390/412/768/1280 CSS px. Verifikasi donut
  kosong, komposisi termasuk BE bernilai nol, dan target bulanan yang
  tetap konsisten saat periode Home berubah.
- Verifikasi chip status, pencarian tanpa hasil, filter BE + Actual, reset,
  urutan waktu, detail Trade Idea dan layer, serta fokus saat dialog konfirmasi.
- Uji sakelar Kurangi animasi dari keyboard dan konfirmasi pilihan setelah
  reload. Halaman tetap bebas overflow horizontal pada viewport uji.
- 108 tes regresi Core RC dan tes DOM demo Home lulus. Patch dapat diterapkan
  ulang ke baseline OCR1 dengan output HTML identik.

## Revisi statistik, filter, New Trade, dan OCR

- 108 tes regresi Core RC lulus. Patch OCR1 dapat diterapkan ulang dan
  menghasilkan build yang identik.
- OCR Tesseract native membaca gambar sintetis untuk uji parser. Uji browser
  memakai keluaran OCR sintetis melalui pengganti worker untuk mengisolasi
  perpindahan hasil dari upload ke draft dan konfirmasi sebelum save.
- Verifikasi Net P/L nol, lot pada format satu posisi, offset UTC pecahan,
  perlindungan nilai manual, dan pemisahan kandidat dari Actual.
- Browser Chromium diuji pada lebar 320/360/375/390/412/768/1280 CSS px.
  Screenshot MT5 asli, OCR CDN di Android, dan perangkat fisik masih terbuka.

## Quick Trade dan OCR riwayat beberapa posisi

- 109 tes unit dan regresi lulus. Patch kembali diterapkan pada OCR1 bersih
  dan menghasilkan HTML identik.
- Chromium 153 pada 320/360/375/390/412/768/1280 CSS px menguji pindah mode
  dengan draft, pemulihan dari error baca file, pilih tiket, perlindungan
  dari tiket ganda antar-layer, offset, hasil nol, dan simpan.
- Engine Tesseract.js/WASM dijalankan di Chromium dengan aset uji lokal.
  Jalur unggah memakai PNG yang disiapkan dari gambar di browser. Gambar
  sintetis dan potongan pratinjau MT5 pengguna berhasil dibaca. Bukti
  pratinjau pengguna diperiksa privat dan tidak dimasukkan ke repo.
- Akses CDN langsung dari browser uji gagal. Perilaku CDN dan
  `content://` pada HP Android pengguna masih perlu diperiksa.
