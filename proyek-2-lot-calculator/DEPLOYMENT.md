# Deployment RC1

`worker.mjs` adalah Worker ESM mandiri: UI, ikon, manifest, service worker dan API harga tertanam. File ini tidak membutuhkan bundler atau dependensi npm. Periksa sintaks dengan `node --check worker.mjs`.

Folder ini adalah Proyek 2 di repositori Qwerty, terpisah dari JPT di root. Deployment aplikasi dikelola terpisah melalui Sites. Build scripts yang disebut README berlaku pada checkout Sites; source GitHub dapat dijalankan langsung sebagai Worker.

Versi: RC1, fitur/desain dikunci. Lock bukan branch protection atau larangan memperbaiki bug. Android fisik dan instalasi/offline masih perlu diuji pengguna.
