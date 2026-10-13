-- ==============================================================================
-- AlfaREL.ID Store — Initial Seed Data (Tahap 3)
-- Created: 2026-10-13
-- Contains: 4 Categories, Store Settings, and 12 Curated Beach Apparel Products
-- ==============================================================================

-- 1. Seed Categories
INSERT INTO categories (slug, name_id, name_en, sort_order)
VALUES
    ('shirts', 'Linen Beach Shirts', 'Linen Beach Shirts', 1),
    ('boardshorts', 'Boardshorts & Trunks', 'Boardshorts & Trunks', 2),
    ('tees', 'Relaxed Beach Tees', 'Relaxed Beach Tees', 3),
    ('accessories', 'Beach Accessories', 'Beach Accessories', 4)
ON CONFLICT (slug) DO UPDATE
SET name_id = EXCLUDED.name_id,
    name_en = EXCLUDED.name_en,
    sort_order = EXCLUDED.sort_order;

-- 2. Seed Store Settings
INSERT INTO store_settings (id, store_name, whatsapp_number, announcement_id, announcement_en, is_store_open, admin_pin_hash)
VALUES (
    1,
    'AlfaREL.ID Store',
    '6281234567890',
    'SPECIAL OFFER: COMPLIMENTARY SHIPPING ON ORDERS OVER IDR 250,000 NATIONWIDE',
    'SPECIAL OFFER: COMPLIMENTARY SHIPPING ON ORDERS OVER IDR 250,000 NATIONWIDE',
    true,
    '1234'
)
ON CONFLICT (id) DO UPDATE
SET store_name = EXCLUDED.store_name,
    whatsapp_number = EXCLUDED.whatsapp_number,
    announcement_id = EXCLUDED.announcement_id,
    announcement_en = EXCLUDED.announcement_en,
    is_store_open = EXCLUDED.is_store_open;

-- 3. Seed Products (12 Curated Beach Resort Apparel Items)
INSERT INTO products (
    slug,
    category_id,
    title_id,
    title_en,
    description_id,
    description_en,
    material_id,
    material_en,
    price,
    compare_at_price,
    images,
    available_sizes,
    available_colors,
    stock_status,
    is_featured,
    is_active,
    sort_order
)
VALUES
    -- 1. Bali Breeze Shirt
    (
        'bali-breeze-camp-collar-linen-shirt',
        (SELECT id FROM categories WHERE slug = 'shirts'),
        'Bali Breeze Camp Collar Linen Shirt',
        'Bali Breeze Camp Collar Linen Shirt',
        'Open Cuban collar shirt crafted from 100% garment-washed natural linen. Incredibly breezy and breathable under coastal sunshine with an effortless relaxed drape.',
        'Open Cuban collar shirt crafted from 100% garment-washed natural linen. Incredibly breezy and breathable under coastal sunshine with an effortless relaxed drape.',
        '100% Pure Washed Linen (Breathable & Ultra Light)',
        '100% Pure Washed Linen (Breathable & Ultra Light)',
        189000,
        229000,
        ARRAY['/images/products/bali-breeze-shirt.jpg', '/images/products/bali-breeze-shirt-2.jpg'],
        ARRAY['S', 'M', 'L', 'XL'],
        ARRAY['Sand Beige', 'Natural White'],
        'ready',
        true,
        true,
        1
    ),
    -- 2. Amalfi Striped Shirt
    (
        'amalfi-coast-striped-resort-shirt',
        (SELECT id FROM categories WHERE slug = 'shirts'),
        'Amalfi Coast Striped Resort Shirt',
        'Amalfi Coast Striped Resort Shirt',
        'Classic Mediterranean vertical stripes combining deep ocean navy with sunlit white. Crafted from cooling, wrinkle-resistant premium breathable rayon twill.',
        'Classic Mediterranean vertical stripes combining deep ocean navy with sunlit white. Crafted from cooling, wrinkle-resistant premium breathable rayon twill.',
        'Premium Breathable Rayon Twill',
        'Premium Breathable Rayon Twill',
        175000,
        215000,
        ARRAY['/images/products/amalfi-striped-shirt.jpg', '/images/products/amalfi-striped-shirt-2.jpg'],
        ARRAY['M', 'L', 'XL'],
        ARRAY['Navy / White Stripe'],
        'low_stock',
        true,
        true,
        2
    ),
    -- 3. Uluwatu Terracotta Camp Shirt
    (
        'uluwatu-sunset-terracotta-camp-shirt',
        (SELECT id FROM categories WHERE slug = 'shirts'),
        'Uluwatu Sunset Terracotta Camp Shirt',
        'Uluwatu Sunset Terracotta Camp Shirt',
        'Beach camp shirt featuring a warm sunset terracotta palette with subtle tropical botanical prints. Ideal for golden hour seaside dining.',
        'Beach camp shirt featuring a warm sunset terracotta palette with subtle tropical botanical prints. Ideal for golden hour seaside dining.',
        '100% Organic Viscose Rayon',
        '100% Organic Viscose Rayon',
        185000,
        NULL,
        ARRAY['/images/products/uluwatu-terracotta-shirt.jpg', '/images/products/uluwatu-terracotta-shirt-2.jpg'],
        ARRAY['S', 'M', 'L', 'XL', 'XXL'],
        ARRAY['Sunset Terracotta'],
        'ready',
        false,
        true,
        3
    ),
    -- 4. Canggu Retro 4-Way Stretch Boardshort
    (
        'canggu-retro-4-way-stretch-boardshort',
        (SELECT id FROM categories WHERE slug = 'boardshorts'),
        'Canggu Retro 4-Way Stretch Boardshort',
        'Canggu Retro 4-Way Stretch Boardshort',
        'Quick-dry beach boardshorts with 4-way stretch flex. Features a rear pocket with mesh drainage grommet and reinforced nautical drawcord.',
        'Quick-dry beach boardshorts with 4-way stretch flex. Features a rear pocket with mesh drainage grommet and reinforced nautical drawcord.',
        'Hydrophobic Repel-Flex Polyester & Spandex',
        'Hydrophobic Repel-Flex Polyester & Spandex',
        139000,
        169000,
        ARRAY['/images/products/canggu-stretch-boardshort.jpg', '/images/products/canggu-stretch-boardshort-2.jpg'],
        ARRAY['S', 'M', 'L', 'XL'],
        ARRAY['Sage Olive', 'Coast Sand'],
        'ready',
        true,
        true,
        4
    ),
    -- 5. Biarritz Wave Runner Boardshort
    (
        'biarritz-wave-runner-boardshort',
        (SELECT id FROM categories WHERE slug = 'boardshorts'),
        'Biarritz Wave Runner Boardshort',
        'Biarritz Wave Runner Boardshort',
        '15-inch outseam casual boardshorts in deep marine navy with retro white piping. Equally comfortable for ocean dips or beach club lounging.',
        '15-inch outseam casual boardshorts in deep marine navy with retro white piping. Equally comfortable for ocean dips or beach club lounging.',
        'Quick-Dry Nautical Nylon with Water-Repellent Finish',
        'Quick-Dry Nautical Nylon with Water-Repellent Finish',
        129000,
        NULL,
        ARRAY['/images/products/biarritz-wave-boardshort.jpg', '/images/products/biarritz-wave-boardshort-2.jpg'],
        ARRAY['M', 'L', 'XL'],
        ARRAY['Deep Ocean Navy'],
        'ready',
        false,
        true,
        5
    ),
    -- 6. Sanur Sun-Bleached Linen Easy Shorts
    (
        'sanur-sun-bleached-linen-easy-shorts',
        (SELECT id FROM categories WHERE slug = 'boardshorts'),
        'Sanur Sun-Bleached Linen Easy Shorts',
        'Sanur Sun-Bleached Linen Easy Shorts',
        'Easy shorts tailored from softened linen with a flexible elastic waistband. Deep side pockets and a distinctive natural textural weave for seaside chill.',
        'Easy shorts tailored from softened linen with a flexible elastic waistband. Deep side pockets and a distinctive natural textural weave for seaside chill.',
        '70% Linen, 30% Cotton Blend',
        '70% Linen, 30% Cotton Blend',
        149000,
        179000,
        ARRAY['/images/products/sanur-linen-shorts.jpg', '/images/products/sanur-linen-shorts-2.jpg'],
        ARRAY['S', 'M', 'L', 'XL'],
        ARRAY['Natural Sand', 'Charcoal'],
        'low_stock',
        true,
        true,
        6
    ),
    -- 7. Salty Days Heavyweight Relaxed Tee
    (
        'salty-days-heavyweight-relaxed-tee',
        (SELECT id FROM categories WHERE slug = 'tees'),
        'Salty Days Heavyweight Relaxed Tee',
        'Salty Days Heavyweight Relaxed Tee',
        '240 GSM heavyweight oversized tee with a relaxed coastal streetwear silhouette. Substantial yet airy feel crafted from 100% premium combed cotton.',
        '240 GSM heavyweight oversized tee with a relaxed coastal streetwear silhouette. Substantial yet airy feel crafted from 100% premium combed cotton.',
        '100% Combed Cotton 20s (240 GSM Heavyweight)',
        '100% Combed Cotton 20s (240 GSM Heavyweight)',
        119000,
        145000,
        ARRAY['/images/products/salty-days-tee.jpg', '/images/products/salty-days-tee-2.jpg'],
        ARRAY['S', 'M', 'L', 'XL'],
        ARRAY['Vintage Bone White', 'Faded Terracotta'],
        'ready',
        true,
        true,
        7
    ),
    -- 8. Palma Sunset Pocket Graphic Tee
    (
        'palma-sunset-pocket-graphic-tee',
        (SELECT id FROM categories WHERE slug = 'tees'),
        'Palma Sunset Pocket Graphic Tee',
        'Palma Sunset Pocket Graphic Tee',
        'Chest pocket t-shirt featuring minimal palm silhouette graphics on the back. Soft water-based discharge print seamlessly embedded in the fabric.',
        'Chest pocket t-shirt featuring minimal palm silhouette graphics on the back. Soft water-based discharge print seamlessly embedded in the fabric.',
        '100% Ringspun Cotton 24s',
        '100% Ringspun Cotton 24s',
        110000,
        NULL,
        ARRAY['/images/products/palma-sunset-tee.jpg', '/images/products/palma-sunset-tee-2.jpg'],
        ARRAY['M', 'L', 'XL'],
        ARRAY['Seafoam Mist'],
        'ready',
        false,
        true,
        8
    ),
    -- 9. Coastline Oversized Wave Tee
    (
        'coastline-oversized-wave-tee',
        (SELECT id FROM categories WHERE slug = 'tees'),
        'Coastline Oversized Wave Tee',
        'Coastline Oversized Wave Tee',
        'Unique enzyme-washed t-shirt with wave-washed subtle marbling. Laid-back vintage aesthetic tailored for casual coastal styling.',
        'Unique enzyme-washed t-shirt with wave-washed subtle marbling. Laid-back vintage aesthetic tailored for casual coastal styling.',
        '100% Washed Cotton (Enzyme Washed)',
        '100% Washed Cotton (Enzyme Washed)',
        125000,
        155000,
        ARRAY['/images/products/coastline-wave-tee.jpg', '/images/products/coastline-wave-tee-2.jpg'],
        ARRAY['S', 'M', 'L', 'XL'],
        ARRAY['Ocean Slate Grey'],
        'pre_order',
        false,
        true,
        9
    ),
    -- 10. Raffia Handwoven Beach Bucket Hat
    (
        'raffia-handwoven-beach-bucket-hat',
        (SELECT id FROM categories WHERE slug = 'accessories'),
        'Raffia Handwoven Beach Bucket Hat',
        'Raffia Handwoven Beach Bucket Hat',
        'Handcrafted natural raffia fiber bucket hat with a protective sun brim. Lightweight, crushable and packable for vacation luggage.',
        'Handcrafted natural raffia fiber bucket hat with a protective sun brim. Lightweight, crushable and packable for vacation luggage.',
        'Natural Woven Palm Raffia',
        'Natural Woven Palm Raffia',
        89000,
        110000,
        ARRAY['/images/products/raffia-bucket-hat.jpg', '/images/products/raffia-bucket-hat-2.jpg'],
        ARRAY['All Size (56-58cm)'],
        ARRAY['Natural Straw'],
        'ready',
        true,
        true,
        10
    ),
    -- 11. Sunkissed Canvas Coastal Tote Bag
    (
        'sunkissed-canvas-coastal-tote-bag',
        (SELECT id FROM categories WHERE slug = 'accessories'),
        'Sunkissed Canvas Coastal Tote Bag',
        'Sunkissed Canvas Coastal Tote Bag',
        'Heavyweight 14 oz organic cotton canvas tote bag with a water-resistant interior lining. Spacious enough for beach towels, sunglasses, and essentials.',
        'Heavyweight 14 oz organic cotton canvas tote bag with a water-resistant interior lining. Spacious enough for beach towels, sunglasses, and essentials.',
        '14 oz Heavyweight Cotton Canvas',
        '14 oz Heavyweight Cotton Canvas',
        99000,
        129000,
        ARRAY['/images/products/sunkissed-canvas-tote.jpg', '/images/products/sunkissed-canvas-tote-2.jpg'],
        ARRAY['One Size (40cm x 35cm x 12cm)'],
        ARRAY['Off-White Canvas & Teal'],
        'ready',
        false,
        true,
        11
    ),
    -- 12. Amber Horizon Polarized Beach Sunglasses
    (
        'amber-horizon-polarized-beach-sunglasses',
        (SELECT id FROM categories WHERE slug = 'accessories'),
        'Amber Horizon Polarized Beach Sunglasses',
        'Amber Horizon Polarized Beach Sunglasses',
        'Amber tortoise bio-acetate sunglasses equipped with polarized UV400 glare-reduction lenses for coastal sunlight.',
        'Amber tortoise bio-acetate sunglasses equipped with polarized UV400 glare-reduction lenses for coastal sunlight.',
        'Handcrafted Bio-Acetate & TAC Polarized Lenses',
        'Handcrafted Bio-Acetate & TAC Polarized Lenses',
        119000,
        149000,
        ARRAY['/images/products/amber-horizon-sunglasses.jpg', '/images/products/amber-horizon-sunglasses-2.jpg'],
        ARRAY['One Size'],
        ARRAY['Amber Tortoise'],
        'sold_out',
        false,
        true,
        12
    )
ON CONFLICT (slug) DO UPDATE
SET title_id = EXCLUDED.title_id,
    title_en = EXCLUDED.title_en,
    price = EXCLUDED.price,
    compare_at_price = EXCLUDED.compare_at_price,
    images = EXCLUDED.images,
    available_sizes = EXCLUDED.available_sizes,
    available_colors = EXCLUDED.available_colors,
    stock_status = EXCLUDED.stock_status,
    is_featured = EXCLUDED.is_featured,
    is_active = EXCLUDED.is_active;
