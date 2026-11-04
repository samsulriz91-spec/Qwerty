# Home demo · Calm Cockpit

Palet kandidat 4 November 2026. Demo Home ditujukan untuk trader yang
menggunakan satu HP Android. Seluruh data demo bersifat sintetis.

## Design plan

| Role | Token |
| --- | --- |
| Latar grafit | `#141318` |
| Permukaan | `#1d1b23` |
| Pembatas | `#373342` |
| Teks utama | `#f3effa` |
| Teks sekunder | `#b7afc7` |
| Aksen lavender | `#c7b9ff` |

Mint marks wins, coral marks losses, and slate marks breakeven. Use system
sans-serif for the interface and Bahnschrift/DIN Alternate fallbacks for numeric
displays. Use tabular numerals and download no fonts or assets.

## Layout

Desktop: 224px navigation rail, compact toolbar, period control, four KPI
summaries, then a wide balance chart beside a narrower outcome donut. A quiet
strip holds monthly target and today's discipline. A table spans the width below.

Phone: bottom navigation, two-column metrics, stacked charts, horizontal donut
legend, stacked target/discipline summaries, and table rows rendered as compact
records. Search spans the toolbar width; outcome and sort controls share a row.

## Review before implementation

Tempatkan saldo sebagai fokus Home, dengan gradien lembut khusus kartu saldo.
Lavender menandai grafik saldo, pilihan aktif, dan aksi utama. Warna hijau,
koral, dan abu-abu menunjukkan hasil trade. Gunakan batas tipis untuk bagian
yang perlu dipindai cepat dan sisakan visual utama untuk grafik saldo.

## Interaction and motion

- Balance supports pointer/touch inspection, exact tooltips, crosshair, focus,
  arrow keys, Home/End, and Escape. Native vertical page scrolling is preserved.
- Donut legend and arcs filter only the trade table. Clicking the selected
  outcome again restores all outcomes. Native filter controls stay synchronized.
- Search and date/P&L sorting operate within the selected period. Mobile has an
  explicit sorting selector; desktop has sortable column headers.
- Export CSV uses exactly the currently filtered/sorted table and marks rows DEMO.
- One entry animation, a chart line reveal, donut reveal, and progress transitions
  are used. Reduced-motion users get static changes.

## Data definitions

Account balance: initial balance plus all closed idea net P/L. Selected-period
metrics, chart, donut, and table use the same ideas. Partial-period chart starts
with the balance carried from earlier trades. Points are equally spaced by trade
sequence, not elapsed time; the interface states this. This is closed balance,
not floating equity.

Win rate includes BE in the denominator. Profit factor is the sum of positive
idea net P/L divided by the absolute sum of negative idea net P/L. No loss with
positive profit displays infinity; empty data displays a dash. A zero-count
outcome has no colored donut arc.

Target always uses this calendar month; discipline always uses today in Jakarta.
The seven-idea synthetic dataset has three ideas today. No input/persistence,
real-account connection, OCR, or execution is added. Daily quota is an indicator,
not a trade-blocking system.

## Source and verification

Read `.agents/skills/frontend-design/SKILL.md` before frontend work, as required
by AGENTS.md. Its unmodified upstream blobs remain:
SKILL.md `a5333457c414d20d625f307df945842c0952ecc3`;
LICENSE.txt `f433b1a53f5b830a205fd2df78e2b34974656c7b`.

See VERIFICATION.md for exact tested behavior and limits. Do not equate simulated
DOM tests with browser or device QA.


## Home component additions and render fix

A screenshot showed account/P&L numbers but blank charts and donut. The numeric
win-rate target was the parent of `winCount`; assigning its `textContent` removed
that child, and the next write threw. Numeric value spans and explanatory labels
are now siblings. Tests track ancestor/descendant ID removal rather than treating
all IDs as independent objects. Optional animation failures preserve static data.

| Reference component | Use in Home |
| --- | --- |
| Card | Top account balance and today's P/L, above period metrics |
| Chips | Quick seven-day/month/all-time period selectors |
| Toggle switch | Animation on/off, respecting system reduced motion |
| Bottom sheet | Account summary, trade details, and view options |
| Dialog | Confirm returning filters/view settings to defaults |
| Snackbar | Action feedback, with Undo for the animation setting |
| FAB | Raised circular Trade-new action within bottom navigation |
| Bottom navigation | Home, Journal (tabel), New Trade (petunjuk), Analytics (grafik), More (opsi tampilan) |

Do not fabricate entry/SL/TP/lot in the trade sheet. Reset changes only view state,
not the synthetic ideas. Dialogs use native modal behavior and preserve keyboard
focus management where the browser supports showModal. No login or live trading
capability is added.

## Core RC · Home dan Journal

Home menampilkan komposisi Win/Loss/BE dari Trade Idea CLOSED Actual pada
periode yang dipilih. Target bulanan memakai P/L CLOSED Actual bulan berjalan
untuk akun dan dataset aktif. Persentase tetap menampilkan nilai aktual saat
bar berhenti di 0% atau 100%.

Journal mengikuti FR-06 dan PR-07. Satu kartu mewakili satu ide, dengan
instrumen, arah, status, sumber hasil, jumlah layer, dan akses detail.
CLOSED diurutkan berdasarkan waktu close. PLAN dan OPEN mengikuti tanggal
idea. Pencarian dan chip status tampil langsung. Periode, hasil, sumber,
dan urutan waktu ada di bottom sheet. Rincian layer dan evidence ada pada
halaman detail yang dibuka dari kartu.

Bottom nav berbentuk pil dengan indikator aktif dan FAB bulat untuk New Trade.
Konfirmasi penting memakai dialog di tengah. Filter dan pengaturan tampilan
memakai bottom sheet. Sakelar Kurangi animasi berlaku langsung dan tersimpan
per browser. Pengaturan pengurangan gerak perangkat tetap dihormati.

## Penyempurnaan statistik, Journal, dan New Trade

Statistik Home menempatkan visual pada masing-masing kartu. Win Rate memakai
komposisi Win/Loss/BE. Profit Factor membandingkan nilai total hasil positif
dengan nilai absolut hasil negatif. Drawdown memakai ring persentase. Expectancy
tetap memakai satuan R dengan penanda relatif terhadap nol.

Journal memakai satu baris tab status bersudut 7 px. Filter menggunakan pilihan
visual langsung di bottom sheet. Pilihan baru berlaku setelah Terapkan.

New Trade mengikuti Identitas → Layer → Review. Status dipilih pada Identitas,
jumlah dan nilai posisi dikelola pada Layer, dan konfirmasi Actual ada di Review.
Dua layer tersedia secara default. Hapus layer berisi data meminta konfirmasi.

OCR satu posisi mengisi kandidat yang dapat dikenali dan tidak bentrok pada
draft layer aktif. Pengguna bisa memilih hasil yang bentrok secara eksplisit.
Offset harus diisi sebelum waktu OCR dipakai. Mengubah teks atau offset
membatalkan staging sesi terkait. Gross membutuhkan konfirmasi semua komponen
biaya. OCR tidak menyimpan trade dan tidak mengonfirmasi Actual.

## Quick Trade dan pilihan tiket OCR

New Trade membuka pilihan Quick Trade dan Detail Trade setelah konteks akun
dan dataset. Quick Trade menggabungkan identitas, layer, dan konfirmasi dalam
satu layar. Setup dan konteks tambahan bisa dibuka saat perlu. Detail Trade
mempertahankan Identitas → Layer → Review. Kedua mode memakai draft dan
validasi yang sama, dengan penyimpanan Live dan Experiment terpisah.

Panel impor menampilkan hasil dan pilihan tiket sebelum opsi teknis. Posisi
dipilih per layer. Tiket yang sudah dipakai di layer lain diberi pesan dan
jalan kembali. Nominal tanpa label Net/Gross menunggu keputusan pengguna.
Waktu perlu offset UTC server atau masukan manual. Pesan gagal menawarkan
pembacaan ulang, teks, dan isi manual.

Referensi desain tambahan [Impeccable](https://github.com/pbakaus/impeccable)
dipakai untuk memprioritaskan aksi, merancang pemulihan error, dan menguji
tampilan sempit. Panduan digunakan untuk review desain.
