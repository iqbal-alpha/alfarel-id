# PRODUCT REQUIREMENT DOCUMENT (PRD)
## AlfaREL.ID Store — E-Catalog & Fast Checkout (Chill & Beach Apparel)

* **Project Name**: AlfaREL.ID Store
* **Tagline**: *"Wear The Vacation Feeling — Effortless Coastal & Resort Apparel"*
* **Target Audience**: Pria & Wanita umur 15 – 40 tahun (Gen Z hingga Millennial)
* **Status**: Draft / Planned
* **Version**: 1.0.0
* **Deployment Target**: Cloudflare Pages (Free Tier)
* **Database Target**: Supabase PostgreSQL (Free Tier)
* **UI Design Reference**: [Figma E-commerce UI Preview](https://www.figma.com/design/GLbuGOWvTfJA2s95fJoM9o/E-commerce-Ui-Preview?node-id=2-2&p=f)

---

## 1. Executive Summary & Problem Statement

### 1.1 Latar Belakang & Problem Statement
* **Biaya Admin Marketplace Tinggi**: Marketplace e-commerce konvensional membebankan biaya komisi dan biaya layanan penjual antara 5% – 12% per transaksi, yang menggerus margin keuntungan brand pakaian lokal.
* **Payment Gateway Rumit**: Integrasi gateway pembayaran perbankan membutuhkan verifikasi legalitas bisnis formal (PT/CV), biaya setup, biaya MDR, serta sering mengalami kegagalan transaksi bagi pelanggan muda yang lebih nyaman transfer manual atau e-wallet personal (QRIS/BCA/Dana/GoPay).
* **Friction Pendaftaran Akun**: Mewajibkan pelanggan mendaftar akun dan mengingat password menurunkan tingkat konversi (drop-off rate hingga 40%).
* **Preferensi Transaksi Indonesia**: Pembeli di rentang umur 15–40 tahun di Indonesia sangat menyukai komunikasi langsung, konfirmasi ukuran, serta negosiasi pengiriman fleksibel via WhatsApp setelah memilih produk di katalog visual yang rapi.

### 1.2 Solusi Produk
**AlfaREL.ID Store** hadir sebagai platform **E-Catalog & WhatsApp Fast Checkout**:
1. Memberikan katalog produk visual interaktif berkecepatan tinggi (*instant search & category filter*).
2. Keranjang belanja melayang (*Floating Mini Cart*) berbasis memori lokal browser (*Local Storage*) tanpa wajib registrasi akun.
3. Generator format pesanan otomatis ke WhatsApp admin toko dengan 1-klik checkout.
4. Panel admin ringan (*Lightweight Admin Panel*) yang aman dan terlindungi password untuk manajemen produk (CRUD) secara instan.
5. Antarmuka dwibahasa (Bahasa Indonesia & English).
6. Biaya operasional $0/bulan (memanfaatkan Cloudflare Pages & Supabase Free Tier).

---

## 2. Design Read & Creative Direction (Taste-Skill Alignment)

> **Design Read**:
> *"Reading this as: E-Catalog & WhatsApp Fast Checkout apparel store for young adults (15–40 years old), with a chill, breezy coastal/beach vibe, leaning toward clean warm-minimalist typography, organic sand & seafoam ocean tones, tactile micro-interactions, and mobile-first frictionless commerce."*

### 2.1 Anti-Slop Directive (Menghindari Default Generik AI)
* **Bukan Gradian Ungu/Neon**: Tidak menggunakan gradasi neon sintetis (AI-purple/cyan glow) atau dark mesh klise.
* **Bukan Kartu Bertumpuk Kaku**: Menghindari grid 3 kartu kaku yang seragam. Menggunakan tata letak ritmis dengan kartu produk proporsional, bayangan lembut alami (*diffused warm shadows*), serta sudut membulat yang nyaman di mata (*12px - 16px border-radius*).
* **Bukan Glassmorphism Berlebihan**: Menggunakan background linen hangat yang bersih dengan efek *backdrop-blur* subtil hanya pada navigasi sticky dan drawer mini cart.

### 2.2 Mood & Vibe: "Chill & Beach"
Karakter brand AlfaREL.ID membawa suasana pantai tropis santai, angin laut sore, kemeja linen berpori, celana pendek pantai (*boardshorts*), dan *relaxed streetwear*:
* **Keywords**: *Breezy, Salty, Sun-Drenched, Casual Resort, Linen Comfort, Laid-back Youthful*.

### 2.3 Color System & Design Tokens
```css
:root {
  /* Surface & Canvas (Sand & Sunlit Linen) */
  --bg-primary: #FBF9F5;         /* Warm Sand Canvas */
  --bg-surface: #FFFFFF;         /* Pure Card White */
  --bg-subtle: #F3EFE6;          /* Sun-bleached Sand */
  --bg-muted: #E8E2D5;           /* Sandstone Border / Divider */

  /* Text & Contrast (Deep Ocean & Slate) */
  --text-primary: #0F2838;       /* Deep Marine Slate */
  --text-secondary: #52677B;     /* Weathered Navy Text */
  --text-tertiary: #8A9CAE;      /* Sea Mist Grey */

  /* Brand Accents (Coastal Waters & Sunset) */
  --color-primary: #1E6B7B;      /* Coastal Deep Teal */
  --color-primary-hover: #16535F;
  --color-seafoam: #62B6A8;      /* Tropical Seafoam Green */
  --color-seafoam-light: #E7F6F3;
  --color-accent-coral: #FF6B57; /* Sunset Coral (Stock badges & CTA highlight) */
  --color-coral-light: #FFF0ED;
  --color-palm: #3D5A45;         /* Island Palm Green */

  /* Utility / Badges */
  --badge-ready: #1D8A56;
  --badge-ready-bg: #EAF8F0;
  --badge-low: #D97706;
  --badge-low-bg: #FEF3C7;
  --badge-soldout: #94A3B8;
  --badge-soldout-bg: #F1F5F9;

  /* Typography */
  --font-display: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  /* Elevation & Shadows */
  --shadow-sm: 0 1px 3px rgba(15, 40, 56, 0.05);
  --shadow-md: 0 6px 18px rgba(15, 40, 56, 0.06), 0 2px 4px rgba(15, 40, 56, 0.03);
  --shadow-lg: 0 16px 36px rgba(15, 40, 56, 0.08), 0 4px 8px rgba(15, 40, 56, 0.03);
  --shadow-floating: 0 20px 45px rgba(30, 107, 123, 0.18), 0 6px 12px rgba(15, 40, 56, 0.06);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-full: 9999px;
}
```

### 2.4 Typography Hierarchy
* **Brand Logo**: *Outfit* atau *Plus Jakarta Sans* Bold (Tracking: +0.05em, "AlfaREL.ID") dengan titik warna Coral Accent.
* **Headings (H1/H2)**: SemiBold/Bold dengan kerning rapat, menghadirkan estetika editorial kasual.
* **Product Titles**: Medium 15px/16px (Mobile), 16px/18px (Desktop).
* **Price Tag**: Bold 16px/18px dengan font tabular numerals (`font-variant-numeric: tabular-nums;`).
* **Micro-copy & Badges**: 11px/12px Uppercase dengan letter-spacing 0.04em.

---

## 3. Target Audience & User Personas

| Parameter | Persona A: Gen Z Beachgoer | Persona B: Millennial Casual Shopper | Persona C: Store Owner / Admin |
| :--- | :--- | :--- | :--- |
| **Nama & Umur** | Arya, 21 tahun (Mahasiswa/Kreator) | Dania, 32 tahun (Eksekutif Muda / Ibu Muda) | Mas Farel, 27 tahun (Founder AlfaREL.ID) |
| **Kebiasaan Belanja** | Browsing Instagram/TikTok dari smartphone (iOS/Android), menyukai busana liburan, festival, dan santai kopi sore. | Belanja pakaian santai akhir pekan, kemeja linen suami & diri sendiri, mengutamakan kemudahan tanpa ribet login. | Mengelola stok toko dari HP/Laptop, melayani chat WA dengan cepat, tidak ingin pusing dengan sistem ERP rumit. |
| **Pain Points** | Malas isi form checkout panjang di website biasa; sering kehabisan ukuran; butuh kepastian stok cepat. | Benci harus verifikasi email/password baru; ragu pembayaran jika payment gateway sering error. | Terbebani biaya potongan marketplace (Shopee/Tokopedia hingga 10%); butuh data pesanan terstruktur masuk ke WA. |
| **Tujuan di Web** | Buka link katalog, cari kemeja pantai motif/linen, pilih ukuran L, 1-klik kirim pesanan ke WhatsApp. | Pilih 2-3 potong baju santai, tinjau cart, hitung estimasi ongkir, langsung koordinasi alamat via WhatsApp. | Update status stok kosong/ready, ganti harga promo, dan terima format chat WA yang tinggal dibalas total rekening. |

---

## 4. Rincian Fitur & Fungsionalitas Produk

### 4.1 Mobile-First View & Responsive Desktop Layout
* **Mobile Experience (Prioritas Utama)**:
  * Dioptimalkan untuk navigasi satu tangan (*thumb-friendly zone*).
  * Tombol filter dan search mudah dijangkau di bagian atas dengan area tap minimal 44x44px.
  * Kartu produk tersusun dalam grid 2 kolom (*2-column compact grid*) yang estetis dan hemat ruang gulir.
  * *Bottom Floating Bar*: Menampilkan indikator Mini Cart melayang di bagian bawah layar tanpa menutupi konten penting.
* **Desktop Experience**:
  * Tampilan melebar dengan grid 3 hingga 4 kolom produk yang rapi.
  * Navigasi atas tetap ramping dengan bilah pencarian instan terintegrasi.
  * Mini cart drawer meluncur mulus dari sisi kanan layar (*right slide-over*).

### 4.2 Instant Search & Category Filtering
* **Instant Keyword Search**:
  * Pencarian instan (debounced 150ms) yang mencocokkan judul, kategori, material, dan warna.
  * Indikator status pencarian (*clear button* "X", *counter* hasil produk yang ditemukan).
* **Category Filter Chips**:
  * Baris chip kategori horizontal yang dapat di-*scroll*:
    1. *All Collections* (Semua Koleksi)
    2. *Linen Beach Shirts* (Kemeja Linen Pantai)
    3. *Boardshorts* (Celana Pendek Pantai)
    4. *Relaxed Tees* (Kaos Santai / Oversized)
    5. *Beach Accessories* (Topi Pantai, Tote Bag, Kacamata)
  * Filter aktif memiliki status visual yang jelas (*pill* dengan background teal/ocean).
* **Stock Badge Indicators**:
  * **Ready Stock**: Badge hijau daun sage lembut (`Ready`).
  * **Low Stock**: Badge oranye pasir hangat (`Sisa 2!`).
  * **Pre-Order**: Badge biru laut (`PO 3-5 Hari`).
  * **Sold Out**: Badge abu-abu redup (`Habis`), tombol *Add to Cart* otomatis dinonaktifkan.

### 4.3 Interactive Product Detail Sheet / Modal
* Membuka ringkasan produk tanpa meninggalkan konteks halaman utama (modal responsif di desktop, *bottom sheet* di mobile).
* Galeri foto produk (mendukung multi-gambar dengan indikator swipe/dots).
* Selector Ukuran (*Size Picker*): S, M, L, XL, XXL.
* Selector Varian Warna / Motif jika tersedia.
* Panduan Ukuran (*Size Chart*) dalam modal pop-up ringkas.
* Deskripsi bahan (e.g. *100% Breathable Rayon / Premium Washed Linen*).
* Tombol aksi: `+ Masukkan Keranjang` (*Add to Cart*) dengan micro-haptic animation.

### 4.4 Floating Mini Cart (Zero Login, Local Storage)
* **Karakteristik & Mekanisme**:
  * Tersimpan langsung di browser pelanggan via `localStorage` (key: `alfarel_cart_v1`).
  * Pelanggan tidak perlu login atau mendaftar akun.
  * Indikator jumlah item (*badge badge-counter*) di ikon keranjang melayang yang selalu terlihat saat di-scroll.
* **Fitur di Dalam Mini Cart**:
  * Daftar item dengan gambar thumbnail, judul, ukuran yang dipilih, dan harga satuan.
  * Kontrol penambahan/pengurangan kuantitas (`+` / `-`) dan tombol hapus produk (`trash icon`).
  * Ringkasan subtotal harga yang dihitung otomatis secara real-time.
  * Input catatan khusus (*Special Notes*): e.g. "Tolong bungkus rapi untuk kado" atau "Kirim sebelum jam 3 sore".
  * Tombol CTA utama: `Lanjut ke WhatsApp Checkout` dengan ikon WhatsApp resmi.

### 4.5 WhatsApp Order Generator
* **Alur Checkout**:
  1. Pelanggan menekan tombol checkout dari Mini Cart.
  2. Muncul modal formulir checkout singkat:
     * Nama Lengkap Pemesan (Wajib)
     * Nomor Telepon / WA Pemesan (Wajib)
     * Alamat Pengiriman Lengkap (Jalan, No Rumah, RT/RW) (Wajib)
     * Kota / Kabupaten & Kecamatan (Wajib)
     * Pilihan Zona Ongkos Kirim (Flat Rate):
       - *Jabodetabek*: Rp 10.000
       - *Pulau Jawa (Luar Jabodetabek)*: Rp 18.000
       - *Luar Pulau Jawa*: Rp 30.000
     * Pilihan Ekspedisi Favorit (J&T Express, JNE, SiCepat, Instant/Sameday)
     * Catatan Tambahan (Opsional)
  3. Sistem mengompilasi seluruh data ke string terformat standar WhatsApp (*URL-encoded*) dengan kalkulasi otomatis: **Subtotal Produk + Ongkir = Total Pembayaran**.
  4. Membuka link `https://wa.me/{ADMIN_PHONE_NUMBER}?text={ENCODED_MESSAGE}`.
* **Template Format Pesan WhatsApp (Standar Pesanan):**
```text
🌴 *HALO ALFAREL.ID, SAYA MAU PESAN APPAREL INI* 🌊
------------------------------------------
ID Pesanan: #ALF-20261012-4821

📋 *DAFTAR ITEM BELANJA:*
1. Bali Breeze Linen Shirt (Navy)
   • Ukuran: L
   • Qty: 1 pcs @ Rp 189.000 = Rp 189.000
2. Sunset Chill Boardshort (Beige)
   • Ukuran: M
   • Qty: 2 pcs @ Rp 129.000 = Rp 258.000

------------------------------------------
📦 *Total Item:* 3 pcs
💰 *Subtotal Produk:* Rp 447.000
🚚 *Ongkos Kirim (Jabodetabek):* Rp 10.000
💳 *TOTAL PEMBAYARAN:* Rp 457.000

📍 *DATA PENGIRIMAN:*
• Nama Penerima: Arya Pratama
• No. WhatsApp: 081234567890
• Alamat: Jl. Danau Tamblingan No. 45, Sanur
• Kecamatan/Kota: Denpasar Selatan, Denpasar - Bali
• Ekspedisi Favorit: J&T Express
• Catatan: Tolong dicek ukuran kemejanya ya kak

Mohon konfirmasi pesanan dan nomor rekening / QRIS pembayaran ya kak. Terima kasih! 🤙
```

### 4.6 Lightweight Admin Panel (Password-Protected CRUD)
* **Akses**: Route `/admin` terlindungi otentikasi berbasis PIN / Passcode (disimpan dalam environment variable aman atau session token).
* **Fungsi Utama**:
  * **Product List View**: Tabel/kartu daftar semua produk dengan status aktif/nonaktif, harga, stok, dan kategori.
  * **Create Product**: Tambah produk baru (Nama ID & EN, Kategori, Harga, Harga Coret/Promo, URL Gambar dari Supabase Storage/CDN, Pilihan Ukuran, Status Stok).
  * **Quick Toggle**: Mengubah status ketersediaan stok (*Ready* / *Low Stock* / *Sold Out* / *Hidden*) dalam 1-klik switch.
  * **Edit & Delete Product**: Mengubah data produk yang sudah ada secara instan.
  * **Store Settings**: Mengubah nomor WhatsApp admin penerima pesanan, status toko (Buka/Tutup sementara), dan teks banner pengumuman.

### 4.7 Sistem Dwibahasa & Standar Editorial Internasional (English-First Coastal Standard)
* **English-First Default**: Seluruh antarmuka publik secara default disajikan dalam Bahasa Inggris editorial yang bersih, elegan, dan ramah wisatawan/pembeli internasional.
* **Tombol Switch Bahasa Instan (*ID* / *EN*)**: Tersedia di navbar/announcement bar tanpa me-reload halaman (*zero flicker*).
* **Menyimpan Preferensi Bahasa**: Disimpan di `localStorage` (key: `alfarel_lang`).
* **Kamus Terjemahan i18n**:
  * Label navigasi, tombol CTA, placeholder input, badge status stok (*Ready to Ship* / *Siap Kirim*), opsi ongkir, pesan checkout, dan keterangan mini cart.
  * Kolom judul dan deskripsi produk di database mendukung `name_id` & `name_en` serta `description_id` & `description_en` (dengan fallback otomatis ke versi ID jika EN kosong).
* **Standar Brand Authenticity & No-Fabrication**:
  * Larangan keras klaim palsu seperti "3.5+ Million Satisfied Shoppers" atau bintang review fiktif tanpa data ulasan riil.
  * Menampilkan narasi butik coastal otentik: *"Small Batch Craft"*, *"100% Breathable Linen"*, dan *"Ethically Crafted in Bali"*.
  * Seluruh harga disajikan dalam format konsisten `IDR xxx,xxx` / `Rp xxx.xxx`.

---

## 5. Arsitektur Teknis & Database Schema (Supabase & Cloudflare)

### 5.1 Arsitektur Sistem
```
+------------------------------------------------------------------------+
|                            USER BROWSER                                |
|  - React + Vite (Fast SPA Component Engine, Thumb-Friendly UI)         |
|  - Client-side State: LocalStorage (Cart Items, Language, Theme)       |
|  - Zero-Bloat Vanilla CSS Design Tokens (Warm Linen, Seafoam, Coral)   |
|  - Responsive Mobile-First Viewport                                    |
+-----------------------------------+------------------------------------+
                                    |
                                    | HTTPS / Edge Delivery
                                    v
+------------------------------------------------------------------------+
|                      CLOUDFLARE PAGES (FREE TIER)                      |
|  - Global Anycast CDN (Zero Latency Edge Cache)                       |
|  - Custom Domain + Free Auto SSL Certificate                          |
|  - Cloudflare Functions / Edge Worker (Admin Auth Proxy & Secure API)  |
+-----------------------------------+------------------------------------+
                                    |
                                    | REST API / Supabase JS Client
                                    v
+------------------------------------------------------------------------+
|                     SUPABASE POSTGRESQL (FREE TIER)                    |
|  - Database: PostgreSQL with Row-Level Security (RLS)                  |
|  - Storage: Supabase Storage Bucket ('product-images')                 |
|  - Realtime Capabilities for Instant Product Updates                   |
+------------------------------------------------------------------------+
                                    |
                                    v
                            WHATSAPP API / wa.me
                      Direct Chat To Merchant Phone
```

### 5.2 Supabase Database Schema (DDL)

```sql
-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name_id VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title_id VARCHAR(150) NOT NULL,
    title_en VARCHAR(150) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    price NUMERIC(12, 2) NOT NULL,
    compare_at_price NUMERIC(12, 2), -- Harga coret / promo
    images TEXT[] NOT NULL DEFAULT '{}', -- Array URL gambar produk
    available_sizes VARCHAR(10)[] DEFAULT '{"S","M","L","XL"}',
    available_colors VARCHAR(50)[] DEFAULT '{}',
    stock_status VARCHAR(20) DEFAULT 'ready', -- 'ready', 'low_stock', 'pre_order', 'sold_out'
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Store Settings Table (Single-Row Config)
CREATE TABLE store_settings (
    id INT PRIMARY KEY DEFAULT 1,
    store_name VARCHAR(100) DEFAULT 'AlfaREL.ID Store',
    whatsapp_number VARCHAR(20) NOT NULL DEFAULT '6281234567890',
    announcement_id TEXT DEFAULT '🌴 Promo Musim Panas: Diskon hingga 30% untuk koleksi pantai! 🌊',
    announcement_en TEXT DEFAULT '🌴 Summer Breeze Promo: Up to 30% off on all coastal apparel! 🌊',
    is_store_open BOOLEAN DEFAULT TRUE,
    admin_pin_hash VARCHAR(255) NOT NULL, -- SHA-256 / bcrypt hash untuk otentikasi admin
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row_check CHECK (id = 1)
);

-- 5. Orders Analytics Log (Statistik Pesanan yang Ter-Generate ke WhatsApp)
CREATE TABLE order_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_code VARCHAR(30) NOT NULL,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(25),
    city VARCHAR(100),
    items_count INT NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Row Level Security (RLS) Configuration
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_logs ENABLE ROW LEVEL SECURITY;

-- Public READ Policies (Catalog Browsing)
CREATE POLICY "Allow public read active categories"
ON categories FOR SELECT USING (true);

CREATE POLICY "Allow public read active products"
ON products FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read store settings"
ON store_settings FOR SELECT USING (true);

CREATE POLICY "Allow public insert order log"
ON order_logs FOR INSERT WITH CHECK (true);
```

---

## 6. Rencana Desain Antarmuka (UI/UX Wireframes & Komponen)

### 6.1 Anatomi Halaman Utama (Homepage / Catalog)

#### A. Top Announcement Bar (Marquee / Slider)
* Background: `--color-primary` (Deep Teal `#1E6B7B`).
* Teks putih lembut 12px: *"🌴 Free Sticker Pack & Pengiriman Cepat ke Seluruh Indonesia 🌊"*.
* Pemilih Bahasa (*Pill Switcher* `ID | EN`) di pojok kanan atas.

#### B. Sticky Header & Navigation Bar
* **Logo**: `AlfaREL.ID` (Font Bold, sentuhan dot coral oranye di ujung).
* **Live Search Trigger**: Bilah pencarian dengan placeholder *"Cari kemeja linen, boardshort, kaos pantai..."*.
* **Cart Floating Trigger**: Ikon keranjang dengan counter badge oranye dinamis jika keranjang terisi.
* **Filter Toggle / Category Scroll**: Baris horizontal chip kategori yang sticky saat scroll melewati banner.

#### C. Hero Showcase Banner ("Breeze of Paradise")
* Visual: Gambar lifestyle anak muda berpakaian santai di pantai berpasir putih / pohon kelapa dengan pencahayaan hangat sore hari.
* Tipografi: *"Chill Looks for Sunlit Days"* (Sub-judul: *Koleksi busana pantai kasual berbahan sejuk & premium*).
* CTA: Tombol pill *"Jelajahi Koleksi"* scroll langsung ke grid katalog.

#### D. Product Card Component (Sesuai Referensi Figma E-commerce)
* **Aspect Ratio**: 4:5 vertikal (ideal untuk busana).
* **Card Surface**: Background putih bersih dengan radius 16px dan border tipis `1px solid var(--bg-muted)`.
* **Stock Badge**: Melayang di pojok kiri atas foto (Pill 11px dengan warna status stok).
* **Wishlist / Quick View**: Ikon melayang di pojok kanan atas.
* **Detail Produk**:
  * Kategori label kecil (11px, `--text-tertiary`).
  * Judul produk (15px, semi-bold, 1-2 baris).
  * Harga utama (16px bold teal) & Harga coret (13px line-through abu-abu).
  * Ukuran tersedia yang ringkas: `S M L XL`.
* **Action Button**: Tombol `+ Keranjang` yang elegan atau tap pada kartu membuka detail produk.

#### E. Floating Mini Cart (Interactive Drawer)
* **State Tertutup**: Floating button di kanan bawah dengan ikon tas belanja, badge total item, dan subtotal mengapung.
* **State Terbuka**:
  * Overlay semi-transparan dengan efek blur di latar belakang.
  * Panel drawer geser dari kanan (Desktop) atau bottom sheet (Mobile).
  * Header drawer: *"Keranjang Belanja (3 Item)"* + tombol tutup `✕`.
  * Scrollable item list: Thumbnail 64x64px, nama produk, tag ukuran, harga, pengontrol kuantitas `[-] 1 [+]`, dan tombol hapus `🗑️`.
  * Input catatan opsional.
  * Total kalkulasi: Subtotal produk + estimasi catatan.
  * Tombol CTA: `Lanjut ke WhatsApp (Rp 447.000) →` (Warna hijau WhatsApp resmi `#25D366` dengan teks tebal putih).

#### F. WhatsApp Checkout Modal
* Pop-up form dengan 5 isian esensial:
  1. *Nama Lengkap*
  2. *Nomor WhatsApp*
  3. *Alamat Pengiriman (Jalan & No. Rumah)*
  4. *Kecamatan & Kota/Kabupaten*
  5. *Pilihan Ekspedisi Favorit*
* Pratinjau format pesan WhatsApp sebelum tombol kirim ditekan.
* Tombol aksi: *"Buka WhatsApp Sekarang"*, memicu `window.open(waUrl, '_blank')`.

#### G. Lightweight Admin Panel (`/admin`)
* **Login Screen**: Minimalist keypad / PIN entry box berlatar belakang gelap sand-navy dengan perlindungan brute-force.
* **Dashboard Nav**:
  * Tab 1: *Katalog Produk* (List, Add, Edit, Delete, Toggle Stock)
  * Tab 2: *Pengaturan Toko* (Nomor WA Toko, Banner Promo, Jam Operasional)
  * Tab 3: *Riwayat Checkout WA* (Statistik klik pemesanan)
* **Modal Form Produk**:
  * Input teks judul (ID & EN), deskripsi (ID & EN), harga, harga diskon, input URL gambar produk, checkbox ukuran aktif, dropdown kategori, dan pilihan status stok.

---

## 7. Kamus Terjemahan (i18n Dictionary Structure)

```json
{
  "id": {
    "nav_home": "Beranda",
    "nav_catalog": "Katalog",
    "search_placeholder": "Cari kemeja linen, boardshort, kaos...",
    "category_all": "Semua Koleksi",
    "stock_ready": "Ready Stock",
    "stock_low": "Sisa Sedikit",
    "stock_po": "Pre-Order",
    "stock_soldout": "Habis",
    "add_to_cart": "Tambah ke Keranjang",
    "cart_title": "Keranjang Belanja",
    "cart_empty": "Keranjang belanja kamu masih kosong 🌴",
    "cart_total": "Total Belanja",
    "cart_note_placeholder": "Catatan tambahan (opsional)...",
    "checkout_btn": "Pesan via WhatsApp",
    "modal_checkout_title": "Informasi Pengiriman",
    "form_name": "Nama Lengkap",
    "form_phone": "Nomor WhatsApp",
    "form_address": "Alamat Lengkap",
    "form_city": "Kecamatan & Kota/Kabupaten",
    "form_courier": "Pilihan Kurir Favorit",
    "form_submit": "Kirim Pesanan ke WhatsApp",
    "admin_login_title": "Admin AlfaREL.ID",
    "admin_pin_placeholder": "Masukkan PIN Admin"
  },
  "en": {
    "nav_home": "Home",
    "nav_catalog": "Catalog",
    "search_placeholder": "Search linen shirts, boardshorts, tees...",
    "category_all": "All Collections",
    "stock_ready": "In Stock",
    "stock_low": "Low Stock",
    "stock_po": "Pre-Order",
    "stock_soldout": "Sold Out",
    "add_to_cart": "Add to Cart",
    "cart_title": "Shopping Cart",
    "cart_empty": "Your shopping cart is currently empty 🌴",
    "cart_total": "Total Amount",
    "cart_note_placeholder": "Special instructions (optional)...",
    "checkout_btn": "Order via WhatsApp",
    "modal_checkout_title": "Delivery Information",
    "form_name": "Full Name",
    "form_phone": "WhatsApp Number",
    "form_address": "Full Shipping Address",
    "form_city": "District & City",
    "form_courier": "Preferred Courier",
    "form_submit": "Send Order to WhatsApp",
    "admin_login_title": "AlfaREL.ID Admin",
    "admin_pin_placeholder": "Enter Admin PIN"
  }
}
```

---

## 8. Non-Functional Requirements & Metrik Keberhasilan

### 8.1 Performance & Core Web Vitals
* **First Contentful Paint (FCP)**: < 1.0 detik (berkat Cloudflare edge caching dan zero-bundle bloat).
* **Largest Contentful Paint (LCP)**: < 2.0 detik pada koneksi 4G mobile.
* **Cumulative Layout Shift (CLS)**: 0.0 (rasio gambar memiliki placeholder dan dimensi eksplisit).
* **Lighthouse Score**: Target > 95 untuk Performance, Accessibility, Best Practices, dan SEO.

### 8.2 SEO & Social Sharing (Open Graph)
* Meta Tag dinamis dengan thumbnail gambar produk bertema pantai resolusi tinggi (1200x630px).
* Dukungan meta tags `og:title`, `og:description`, `og:image`, dan `twitter:card`.
* Semantic HTML5: `header`, `nav`, `main`, `section`, `article`, `footer`.

### 8.3 Keamanan (Security)
* Supabase Row Level Security (RLS) mengunci seluruh operasi tulis produk dari anon public client.
* Operasi CRUD admin diamankan lewat Cloudflare Pages Function dengan validasi token/hash sesi admin.
* Sanitasi input teks nama dan alamat sebelum dimasukkan ke string WhatsApp guna mencegah injeksi format teks liar.

---

## 9. Rencana Implementasi & Roadmap Pengembangan

Sesuai kesepakatan alur pengembangan, proyek dikerjakan secara berurutan dalam 5 tahapan utama:

| Tahap | Fokus Pekerjaan | Deliverable & Output |
| :--- | :--- | :--- |
| **Tahap 1: PRD & Design Plan** *(Selesai)* | Perumusan spesifikasi produk, skema database, token desain *chill & beach*, dan arsitektur sistem. | Dokumen resmi [PRD.md](file:///c:/Users/ASUS/Documents/Antigravity/Apparel/PRD.md). |
| **Tahap 2: Front-end di Local** | Inisialisasi React + Vite, perancangan antarmuka mobile-first & desktop bertema pantai, sistem i18n dwibahasa, katalog produk mock, floating mini cart (*local storage*), modal checkout WhatsApp (dengan pilihan flat ongkir), dan preview admin panel. | Aplikasi web interaktif berjalan di `localhost` dan teruji di browser. |
| **Tahap 3: Pengaturan Database** | Penyusunan skema tabel PostgreSQL di Supabase (`categories`, `products`, `store_settings`, `order_logs`), konfigurasi RLS (Row Level Security), pembuatan bucket storage aset gambar, dan script seed data awal. | Skrip migrasi SQL & database Supabase aktif siap pakai. |
| **Tahap 4: Integrasi Front-end & Database** | Menghubungkan client Supabase ke aplikasi React, live fetch katalog produk, fungsi CRUD admin real-time, dan pencatatan log pesanan. | Website terhubung penuh ke database cloud. |
| **Tahap 5: Deployment ke GitHub & Cloudflare** | Inisialisasi Git repository, push ke GitHub, setup Cloudflare Pages Free Tier dengan auto-build & deployment edge, serta uji performa akhir. | Website aktif online di URL Cloudflare Pages dengan SSL gratis. |

---

*Dokumen ini merupakan acuan resmi spesifikasi produk dan desain untuk pengembangan website AlfaREL.ID Store.*
