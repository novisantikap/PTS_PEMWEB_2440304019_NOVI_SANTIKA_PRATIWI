# PTS Pemrograman Web - TARA MART (Dashboard Produk UMKM)

* **Nama:** Novi Santika Pratiwi
* **NPM:** 2440304019
* **Mata Kuliah:** Pemrograman Web
* **Varian Kombinasi NIM:** 019 ($X=0, Y=1, Z=9, C=2$)

---

## 📌 Deskripsi Proyek
TARA MART adalah aplikasi dashboard inventaris dan stok produk minimarket berbasis web interaktif yang terintegrasi dengan REST API publik DummyJSON (`/products`).

## 🚀 Fitur Utamanya (Sesuai Varian NIM 019)
1. **Dataset Products ($X=0$):** Mengambil data produk dinamis dari `https://dummyjson.com/products`.
2. **Filter & Statistik Sederhana ($Y=1$):**
   - Menampilkan statistik Total Produk, Rata-rata Harga (Rp), dan Produk Termahal.
   - Filter produk berdasarkan kategori.
3. **Validasi Form Dua Input Berkaitan ($Z=9$):**
   - Form simulasi harga & diskon dengan validasi interaktif (Harga Diskon tidak boleh melebihi Harga Normal).
4. **Challenge - Debounce Search & Loading Indicator ($C=2$):**
   - Indikator pemuatan data (*loading spinner/text*).
   - Pencarian nama barang dengan teknik *debounce* untuk mengoptimalkan performa.

## 💻 Cara Menjalankan Proyek
1. Buka aplikasi **Laragon** dan pastikan modul **Apache** dalam kondisi *Start*.
2. Simpan folder proyek pada direktori `C:\laragon\www\PTS_PEMWEB_2440304019_NOVI_SANTIKA_PRATIWI\`.
3. Buka peramban dan akses: `http://localhost/PTS_PEMWEB_2440304019_NOVI_SANTIKA_PRATIWI/`.

* Status Proyek: Selesai & Siap Dites (Versi v0.1-PTS)