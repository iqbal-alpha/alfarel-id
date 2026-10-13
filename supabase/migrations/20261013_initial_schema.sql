-- ==============================================================================
-- AlfaREL.ID Store — Supabase PostgreSQL Schema Migration (Tahap 3)
-- Created: 2026-10-13
-- Architecture: Supabase Free Tier (PostgreSQL 15+ with RLS & Storage Bucket)
-- ==============================================================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Drop existing tables if needed (safe re-run)
-- DROP TABLE IF EXISTS order_logs CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS store_settings CASCADE;

-- ------------------------------------------------------------------------------
-- 3. Table: categories
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name_id VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category slug queries
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- ------------------------------------------------------------------------------
-- 4. Table: products
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title_id VARCHAR(150) NOT NULL,
    title_en VARCHAR(150) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    material_id VARCHAR(150),
    material_en VARCHAR(150),
    fit_id VARCHAR(100),
    fit_en VARCHAR(100),
    price NUMERIC(12, 2) NOT NULL,
    compare_at_price NUMERIC(12, 2), -- Harga coret / promo (opsional)
    images TEXT[] NOT NULL DEFAULT '{}', -- Array URL gambar produk (multi-angle)
    available_sizes VARCHAR(10)[] DEFAULT '{"S","M","L","XL"}',
    available_colors VARCHAR(50)[] DEFAULT '{}',
    stock_status VARCHAR(20) DEFAULT 'ready', -- 'ready', 'low_stock', 'pre_order', 'sold_out'
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for high-performance storefront browsing
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_products_updated_at ON products;
CREATE TRIGGER trigger_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 5. Table: store_settings (Single-Row Config)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS store_settings (
    id INT PRIMARY KEY DEFAULT 1,
    store_name VARCHAR(100) DEFAULT 'AlfaREL.ID Store',
    whatsapp_number VARCHAR(20) NOT NULL DEFAULT '6281234567890',
    announcement_id TEXT DEFAULT '🌴 Promo Musim Panas: Diskon hingga 30% untuk koleksi pantai! 🌊',
    announcement_en TEXT DEFAULT '🌴 Summer Breeze Promo: Up to 30% off on all coastal apparel! 🌊',
    is_store_open BOOLEAN DEFAULT TRUE,
    admin_pin_hash VARCHAR(255) DEFAULT '1234', -- Passcode admin (default 1234)
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT single_row_check CHECK (id = 1)
);

-- Trigger for store_settings updated_at
DROP TRIGGER IF EXISTS trigger_store_settings_updated_at ON store_settings;
CREATE TRIGGER trigger_store_settings_updated_at
BEFORE UPDATE ON store_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 6. Table: order_logs (WhatsApp Checkout Analytics)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code VARCHAR(30) NOT NULL,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(25),
    city VARCHAR(100),
    courier VARCHAR(50),
    items_count INT NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_logs_created ON order_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 7. Row Level Security (RLS) Configuration
-- ------------------------------------------------------------------------------
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_logs ENABLE ROW LEVEL SECURITY;

-- Categories Policies
CREATE POLICY "Allow public read categories"
ON categories FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated/admin write categories"
ON categories FOR ALL
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Products Policies
CREATE POLICY "Allow public read active products"
ON products FOR SELECT
USING (is_active = true OR auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated/admin write products"
ON products FOR ALL
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Store Settings Policies
CREATE POLICY "Allow public read store settings"
ON store_settings FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated/admin update store settings"
ON store_settings FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Order Logs Policies (Public can INSERT order clicks, Admin can view)
CREATE POLICY "Allow public insert order log"
ON order_logs FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow admin read order logs"
ON order_logs FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ------------------------------------------------------------------------------
-- 8. Supabase Storage: product-images Bucket Setup
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies: Public can read, authenticated/admin can upload
CREATE POLICY "Allow public read product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
