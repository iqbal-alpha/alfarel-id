-- ==============================================================================
-- AlfaREL.ID Store — Supabase PostgreSQL Schema Migration (Tahap 3)
-- Table Prefix: alfarel_* (Safe multi-tenant shared database pattern)
-- ==============================================================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 2. Table: alfarel_categories
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alfarel_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name_id VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_alfarel_categories_slug ON alfarel_categories(slug);

-- ------------------------------------------------------------------------------
-- 3. Table: alfarel_products
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alfarel_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES alfarel_categories(id) ON DELETE SET NULL,
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

CREATE INDEX IF NOT EXISTS idx_alfarel_products_category ON alfarel_products(category_id);
CREATE INDEX IF NOT EXISTS idx_alfarel_products_active ON alfarel_products(is_active);
CREATE INDEX IF NOT EXISTS idx_alfarel_products_featured ON alfarel_products(is_featured);
CREATE INDEX IF NOT EXISTS idx_alfarel_products_slug ON alfarel_products(slug);

-- Auto-update updated_at trigger function
CREATE OR REPLACE FUNCTION alfarel_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_alfarel_products_updated_at ON alfarel_products;
CREATE TRIGGER trigger_alfarel_products_updated_at
BEFORE UPDATE ON alfarel_products
FOR EACH ROW
EXECUTE FUNCTION alfarel_update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 4. Table: alfarel_store_settings (Single-Row Config)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alfarel_store_settings (
    id INT PRIMARY KEY DEFAULT 1,
    store_name VARCHAR(100) DEFAULT 'AlfaREL.ID Store',
    whatsapp_number VARCHAR(20) NOT NULL DEFAULT '6281234567890',
    announcement_id TEXT DEFAULT '🌴 SPECIAL OFFER: COMPLIMENTARY SHIPPING ON ORDERS OVER IDR 250,000 NATIONWIDE',
    announcement_en TEXT DEFAULT '🌴 SPECIAL OFFER: COMPLIMENTARY SHIPPING ON ORDERS OVER IDR 250,000 NATIONWIDE',
    is_store_open BOOLEAN DEFAULT TRUE,
    admin_pin_hash VARCHAR(255) DEFAULT '1234',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT alfarel_single_row_check CHECK (id = 1)
);

DROP TRIGGER IF EXISTS trigger_alfarel_store_settings_updated_at ON alfarel_store_settings;
CREATE TRIGGER trigger_alfarel_store_settings_updated_at
BEFORE UPDATE ON alfarel_store_settings
FOR EACH ROW
EXECUTE FUNCTION alfarel_update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 5. Table: alfarel_order_logs (WhatsApp Checkout Analytics)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alfarel_order_logs (
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

CREATE INDEX IF NOT EXISTS idx_alfarel_order_logs_created ON alfarel_order_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 6. Row Level Security (RLS) Configuration
-- ------------------------------------------------------------------------------
ALTER TABLE alfarel_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE alfarel_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE alfarel_store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE alfarel_order_logs ENABLE ROW LEVEL SECURITY;

-- Categories Policies
CREATE POLICY "Allow public read alfarel categories"
ON alfarel_categories FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated/admin write alfarel categories"
ON alfarel_categories FOR ALL
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Products Policies
CREATE POLICY "Allow public read active alfarel products"
ON alfarel_products FOR SELECT
USING (is_active = true OR auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated/admin write alfarel products"
ON alfarel_products FOR ALL
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Store Settings Policies
CREATE POLICY "Allow public read alfarel store settings"
ON alfarel_store_settings FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated/admin update alfarel store settings"
ON alfarel_store_settings FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Order Logs Policies
CREATE POLICY "Allow public insert alfarel order log"
ON alfarel_order_logs FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow admin read alfarel order logs"
ON alfarel_order_logs FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ------------------------------------------------------------------------------
-- 7. Supabase Storage: alfarel-images Bucket Setup
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('alfarel-images', 'alfarel-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read alfarel images"
ON storage.objects FOR SELECT
USING (bucket_id = 'alfarel-images');

CREATE POLICY "Allow authenticated upload alfarel images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'alfarel-images');

CREATE POLICY "Allow authenticated delete alfarel images"
ON storage.objects FOR DELETE
USING (bucket_id = 'alfarel-images');
