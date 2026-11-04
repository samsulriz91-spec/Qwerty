# Rencana pembukaan kembali Jurnal Pro Trader

Status 4 November 2026 WIB. Branch ini mendokumentasikan pekerjaan. Aplikasi penuh dilanjutkan dari checkpoint Core RC OCR1. Home pada repo ini berfungsi sebagai referensi UI. Palet akhir dan perilaku scroll pada Android perlu ditinjau.

## Blueprint

JPT membantu trader mencatat Trade Idea, mengukur hasil, dan meninjau proses. Target awal adalah web Chrome Android portrait. Arah produk Personal First, Commercial Later, dengan native mobile pada fase selanjutnya. Navigasi produk terdiri dari Home, Journal, New Trade, Analytics, dan More.

## PRD ringkas

- Satu ide, maksimum tiga layer. Alur PLAN → OPEN → CLOSED dengan partial close, snapshot risiko awal, dan re-entry sebagai ide baru.
- Performa utama memakai CLOSED Actual eligible. Win Rate menghitung BE di denominator. Live dan Experiment serta currency native mempunyai konteks terpisah.
- New Trade memakai Identity → Layers → Review. OCR mengisi kandidat yang ditinjau sebelum disimpan.
- Analytics memiliki Performance, Process, Risk dan Edge. Review dan Improvement menautkan insight ke trade sumber.
- Backup memiliki preview, validasi, konfirmasi dan pemulihan yang diuji.

## Workflow GitHub

Review kebutuhan dan acceptance per batch. Gunakan branch terpisah untuk perubahan aplikasi, fixture sintetis dan PR dengan catatan pengujian. Cocokkan build, checksum dan hasil pengujian pada kandidat yang sama. Perubahan data atau rilis memiliki gerbang masing-masing.

## Roadmap

Urutan berikut memakai gerbang kelulusan. Durasi ditentukan sesudah scope batch, akses lingkungan, dan kebutuhan uji perangkat diketahui.

| Milestone | Isi dan keluaran | Syarat keluar |
| --- | --- | --- |
| R0 Buka kembali | Master plan, source map, status keputusan, planning branch GitHub | Source Core RC dan demo Home dibedakan. Baseline dan build teridentifikasi |
| R1 Baseline dan reproduksi | Audit ZIP OCR1, build terisolasi, test baseline, map FR ke source dan regresi | Reproduksi dari source, checksum cocok, tes tercatat, batas perangkat tertulis |
| R2 Alur kritis di HP | Review Quick Trade/New Trade, OCR, layer, draft, keyboard, save, refresh, export/import dan restore | Pemilik produk menilai alur sebelum integrasi. Screenshot asli dan Chrome Android fisik digunakan dalam QA yang sesuai |
| R3 IA dan visual | Selesaikan nav/Calendar, screen states, layout Home dan detail, opsi palet, behavior anti-scroll, prototype interaktif | Layout, warna, scroll/gesture dan titik masuk disetujui; contoh Home GitHub dipakai selektif |
| R4 Core integration | Implementasikan UI yang disetujui di atas Core RC, bertahap Home → New Trade → Journal → Detail → Analytics → More | P/L, WR, PF, R, DD dan populasi sama antarhalaman. Restore, quota, draft dan OCR lolos skenario regresi |
| R5 Data dan evidence closeout | Re-entry UI E2E, parity multi-account/periode, backup interrupted, native-origin storage, Golden Matrix dan audit Gate B terpisah | Semua blocker P0 ditutup atau scope rilis dibatasi dengan keputusan eksplisit. Evidence menutup ID yang tepat |
| R6 Improvement | Coach/Review, Setup/Process, MAE/MFE/Rule Leak, Edge, Action/Experiment, Session Plan dan Screenshot Evidence. Builder hybrid lewat desain → prototype → implementasi | Kelayakan data, versi template, sample guardrails dan link evidence terbukti. Skor produksi memiliki keputusan sendiri |
| R7 Kandidat web personal | Staging, security review, Android UAT, recovery drill, deployment plan | Tes browser dan perangkat sesuai target, backup dapat dipulihkan, rollback siap, owner go/no-go |
| R8 Operasi dan perluasan | Release yang disetujui, observasi, perbaikan, evaluasi cloud, Prop Firm Suite, native mobile dan komersialisasi | Scope lanjutan dibuat dari kebutuhan nyata, dengan kontrak keamanan dan data masing-masing |

**Prioritas praktis saat dibuka kembali.** Mulai dari R1 dengan source Core RC OCR1. R2 menargetkan area yang memicu jeda, yaitu New Trade/Quick Trade dan pembacaan OCR pada HP. R3 dapat berjalan sebagai tinjauan desain terpisah. Gate B v2.5.4 dan Gate A evidence mempunyai daftar bukti sendiri. Hasil dari Core RC tidak otomatis menutup keduanya.

## Handover singkat

Source aplikasi penuh dan arsip bukti berada dalam checkpoint proyek. Lokasi build di dalam paket adalah checkpoint/redesign. Bukti lokal dan kesiapan Android fisik dicatat terpisah. Dokumen master memuat acceptance, status tiap modul, sumber, dan detail pemulihan.
