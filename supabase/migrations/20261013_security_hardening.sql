-- ==============================================================================
-- AlfaREL.ID Store — Security & RLS Hardening Migration
-- ==============================================================================

-- 1. Create Private Admin Auth Table (Zero Public SELECT access)
CREATE TABLE IF NOT EXISTS alfarel_admin_auth (
    id INT PRIMARY KEY DEFAULT 1,
    pin_hash VARCHAR(255) NOT NULL DEFAULT '1234',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT alfarel_admin_auth_single_row CHECK (id = 1)
);

ALTER TABLE alfarel_admin_auth ENABLE ROW LEVEL SECURITY;

-- Revoke all public access from alfarel_admin_auth
REVOKE ALL ON alfarel_admin_auth FROM anon, authenticated, public;
GRANT ALL ON alfarel_admin_auth TO service_role;

-- Migrate existing PIN if it exists in store settings
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'alfarel_store_settings' AND column_name = 'admin_pin_hash'
    ) THEN
        INSERT INTO alfarel_admin_auth (id, pin_hash)
        SELECT 1, admin_pin_hash FROM alfarel_store_settings WHERE id = 1
        ON CONFLICT (id) DO UPDATE SET pin_hash = EXCLUDED.pin_hash;
        
        -- Drop admin_pin_hash from public settings table to prevent public disclosure
        ALTER TABLE alfarel_store_settings DROP COLUMN IF EXISTS admin_pin_hash;
    ELSE
        INSERT INTO alfarel_admin_auth (id, pin_hash)
        VALUES (1, '1234')
        ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;

-- 2. Create Secure Stored Procedure for Admin PIN Verification (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION alfarel_verify_admin_pin(input_pin TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    stored_hash TEXT;
BEGIN
    IF input_pin IS NULL OR trim(input_pin) = '' THEN
        RETURN false;
    END IF;

    SELECT pin_hash INTO stored_hash FROM alfarel_admin_auth WHERE id = 1;
    
    IF stored_hash IS NULL THEN
        RETURN false;
    END IF;

    -- Verify plain match or crypt hash
    IF stored_hash = input_pin OR stored_hash = crypt(input_pin, stored_hash) THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$;

GRANT EXECUTE ON FUNCTION alfarel_verify_admin_pin(TEXT) TO anon, authenticated;

-- 3. Secure alfarel_order_logs RLS Policies (Prevent public scraping of customer PII)
DROP POLICY IF EXISTS "Allow read alfarel order logs" ON alfarel_order_logs;
DROP POLICY IF EXISTS "Allow admin read alfarel order logs" ON alfarel_order_logs;

-- Allow ONLY authenticated users or service_role to read order logs
CREATE POLICY "Allow authenticated read alfarel order logs"
ON alfarel_order_logs FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Allow public insertion of new order records
DROP POLICY IF EXISTS "Allow public insert alfarel order log" ON alfarel_order_logs;
CREATE POLICY "Allow public insert alfarel order log"
ON alfarel_order_logs FOR INSERT
WITH CHECK (true);

-- 4. Tighten Storage Bucket Policies for alfarel-images
DROP POLICY IF EXISTS "Allow authenticated upload alfarel images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete alfarel images" ON storage.objects;

CREATE POLICY "Allow authenticated upload alfarel images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'alfarel-images' 
    AND (auth.role() = 'authenticated' OR auth.role() = 'service_role')
);

CREATE POLICY "Allow authenticated delete alfarel images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'alfarel-images' 
    AND (auth.role() = 'authenticated' OR auth.role() = 'service_role')
);

-- Ensure public read for catalog assets
DROP POLICY IF EXISTS "Allow public read alfarel images" ON storage.objects;
CREATE POLICY "Allow public read alfarel images"
ON storage.objects FOR SELECT
USING (bucket_id = 'alfarel-images');
