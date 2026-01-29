# 📋 Survei Pembelajaran Bahasa Indonesia

Aplikasi survei untuk penelitian pembelajaran Bahasa Indonesia di SMP dengan dukungan penyimpanan data ke Google Spreadsheet.

## 📁 Struktur Folder

```
penelitiansmp/
├── index.html              # Halaman utama (pemilihan role)
├── guru.html               # Form survei untuk guru
├── siswa.html              # Form survei untuk siswa
├── css/
│   └── styles.css          # Styling aplikasi
├── js/
│   └── app.js              # JavaScript logic
├── google-apps-script/
│   └── Code.gs             # Google Apps Script untuk backend
└── README.md               # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. Menjalankan Aplikasi (Lokal)

Cukup buka file `index.html` di browser, atau gunakan Live Server di VS Code:
1. Install extension "Live Server" di VS Code
2. Klik kanan pada `index.html` > "Open with Live Server"

### 2. Mengonfigurasi Google Spreadsheet

Ikuti langkah berikut untuk menghubungkan form dengan Google Spreadsheet:

#### Langkah A: Buat Spreadsheet
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama (misal: "Data Survei Bahasa Indonesia")

#### Langkah B: Setup Google Apps Script
1. Di spreadsheet, buka menu **Extensions** > **Apps Script**
2. Hapus kode default yang ada
3. Copy seluruh isi file `google-apps-script/Code.gs` dan paste
4. Simpan project (Ctrl+S) dengan nama (misal: "Survei API")

#### Langkah C: Setup Awal Spreadsheet
1. Di Apps Script, pilih fungsi `setupSpreadsheet` dari dropdown
2. Klik tombol **Run** (▶️)
3. Jika diminta izin, klik "Review Permissions" dan izinkan akses
4. Ini akan membuat 2 sheet: "Guru" dan "Siswa" dengan header yang sesuai

#### Langkah D: Deploy Web App
1. Klik **Deploy** > **New deployment**
2. Klik ikon gear (⚙️) di sebelah "Select type" > pilih **Web app**
3. Isi konfigurasi:
   - Description: "Survei API v1"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik **Deploy**
5. Copy **URL** yang diberikan (format: `https://script.google.com/macros/s/.../exec`)

#### Langkah E: Hubungkan dengan Form
1. Buka file `js/app.js`
2. Cari baris:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Ganti `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` dengan URL yang sudah di-copy
4. Simpan file

## 📝 Fitur Aplikasi

### Halaman Utama (`index.html`)
- Pemilihan role: Guru atau Siswa
- Design modern dan responsif

### Form Guru (`guru.html`)
**Data Identitas:**
- Nama Lengkap
- NIP / NIK
- Nama Sekolah
- Lama Mengajar
- Rata-rata Jumlah Siswa per Kelas

**Kuesioner (5 pertanyaan):**
1. Kesulitan memberi umpan balik individual (Skala 1-5)
2. Jumlah siswa mempengaruhi kualitas respon (Skala 1-5)
3. Media pembelajaran yang digunakan (Checkbox multiple)
4. Persetujuan sistem AI membantu respon awal (Skala 1-5)
5. Masalah terbesar pembelajaran (Isian bebas)

### Form Siswa (`siswa.html`)
**Data Identitas:**
- Nama Lengkap
- NIS / NISN
- Kelas
- Nama Sekolah
- Jenis Kelamin

**Kuesioner (9 pertanyaan):**
1. Kesulitan memahami pelajaran (Skala 1-5)
2. Jumlah siswa mempengaruhi kesempatan penjelasan (Skala 1-5)
3. Media yang digunakan guru (Radio button)
4. Kemudahan mendapat bantuan dari guru (Skala 1-5)
5. AI membantu memahami pelajaran (Skala 1-5)
6. Lebih berani dengan media digital (Skala 1-5)
7. Takut salah saat menjawab (Skala 1-5)
8. Guru memberi tanggapan membantu (Skala 1-5)
9. Merasa aman dan nyaman (Skala 1-5)

## 📊 Struktur Data di Spreadsheet

### Sheet "Guru"
| Kolom | Deskripsi |
|-------|-----------|
| Timestamp | Waktu pengisian |
| Nama | Nama lengkap guru |
| NIP/NIK | Nomor identitas |
| Sekolah | Nama sekolah |
| Lama Mengajar | Kategori pengalaman |
| Jumlah Siswa per Kelas | Kategori jumlah |
| Q1-Q5 | Jawaban kuesioner |

### Sheet "Siswa"
| Kolom | Deskripsi |
|-------|-----------|
| Timestamp | Waktu pengisian |
| Nama | Nama lengkap siswa |
| NIS/NISN | Nomor identitas siswa |
| Kelas | Kelas siswa |
| Sekolah | Nama sekolah |
| Jenis Kelamin | L/P |
| Q1-Q9 | Jawaban kuesioner |

## 🎨 Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan Flexbox & Grid
- **JavaScript (Vanilla)** - Logic aplikasi
- **Google Apps Script** - Backend API
- **Google Spreadsheet** - Database
- **Font Awesome** - Ikon
- **Google Fonts (Poppins)** - Typography

## 📱 Responsif

Aplikasi ini responsif dan dapat digunakan di:
- Desktop (> 768px)
- Tablet (768px)
- Mobile (< 480px)

## 🔒 Keamanan Data

- Data dikirim langsung ke Google Spreadsheet
- Tidak ada data yang disimpan di server lain
- Akses spreadsheet dapat dibatasi sesuai kebutuhan

## 🐛 Troubleshooting

### Data tidak masuk ke Spreadsheet
1. Pastikan URL Apps Script sudah benar
2. Pastikan Apps Script sudah di-deploy sebagai Web App
3. Cek Console browser untuk error message

### Form tidak bisa submit
1. Pastikan semua field required sudah diisi
2. Cek koneksi internet

### Permission Error di Apps Script
1. Jalankan fungsi `setupSpreadsheet` terlebih dahulu
2. Izinkan semua permission yang diminta

## 📞 Kontak

Jika ada pertanyaan atau masalah, silakan hubungi peneliti.

---

© 2026 Penelitian Pembelajaran Bahasa Indonesia | SMP
