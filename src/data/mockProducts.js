export const initialCategories = [
  { id: 'all', key: 'cat_all', name_id: 'Semua Koleksi', name_en: 'All Collections' },
  { id: 'shirts', key: 'cat_shirts', name_id: 'Kemeja Linen Pantai', name_en: 'Linen Beach Shirts' },
  { id: 'boardshorts', key: 'cat_boardshorts', name_id: 'Celana Boardshorts', name_en: 'Boardshorts & Trunks' },
  { id: 'tees', key: 'cat_tees', name_id: 'Kaos Santai / Oversized', name_en: 'Relaxed / Oversized Tees' },
  { id: 'accessories', key: 'cat_accessories', name_id: 'Aksesoris Pantai', name_en: 'Beach Accessories' }
];

export const initialProducts = [
  {
    id: 'prod-01',
    category: 'shirts',
    title_id: 'Bali Breeze Camp Collar Linen Shirt',
    title_en: 'Bali Breeze Camp Collar Linen Shirt',
    description_id: 'Kemeja kerah cuban terbuka berbahan 100% linen alami yang diproses soft-washed. Sangat sejuk di kulit saat cuaca terik pantai dan memberikan siluet jatuh yang santai dan berkelas.',
    description_en: 'Cuban open collar shirt crafted from 100% garment-washed natural linen. Incredibly breezy and breathable under coastal sunshine with an effortless relaxed drape.',
    material_id: '100% Pure Washed Linen (Breathable & Ultra Light)',
    material_en: '100% Pure Washed Linen (Breathable & Ultra Light)',
    price: 189000,
    compareAtPrice: 229000,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sand Beige', 'Natural White'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-02',
    category: 'shirts',
    title_id: 'Amalfi Coast Striped Resort Shirt',
    title_en: 'Amalfi Coast Striped Resort Shirt',
    description_id: 'Motif garis vertikal klasik Mediterania dengan paduan warna ocean navy dan sunlit white. Berbahan rayon twill premium berpori yang sejuk dan anti-kusut.',
    description_en: 'Classic Mediterranean vertical stripes combining deep ocean navy with sunlit white. Crafted from cooling, wrinkle-resistant premium breathable rayon twill.',
    material_id: 'Premium Breathable Rayon Twill',
    material_en: 'Premium Breathable Rayon Twill',
    price: 175000,
    compareAtPrice: 215000,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy / White Stripe'],
    stockStatus: 'low_stock',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-03',
    category: 'shirts',
    title_id: 'Uluwatu Sunset Terracotta Camp Shirt',
    title_en: 'Uluwatu Sunset Terracotta Camp Shirt',
    description_id: 'Kemeja pantai dengan palet warna terakota senja hangat beraksen dedaunan tropis monokrom. Cocok untuk makan malam pantai sore hari.',
    description_en: 'Beach camp shirt featuring a warm sunset terracotta palette with subtle tropical botanical prints. Ideal for golden hour seaside dining.',
    material_id: '100% Organic Viscose Rayon',
    material_en: '100% Organic Viscose Rayon',
    price: 185000,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Sunset Terracotta'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-04',
    category: 'boardshorts',
    title_id: 'Canggu Retro 4-Way Stretch Boardshort',
    title_en: 'Canggu Retro 4-Way Stretch Boardshort',
    description_id: 'Celana pendek pantai cepat kering dengan fitur elastis 4 arah. Dilengkapi saku belakang dengan lubang drainase air dan tali pinggang drawcord kokoh.',
    description_en: 'Quick-dry beach boardshorts with 4-way stretch flex. Features a rear pocket with mesh drainage grommet and reinforced nautical drawcord.',
    material_id: 'Hydrophobic Repel-Flex Polyester & Spandex',
    material_en: 'Hydrophobic Repel-Flex Polyester & Spandex',
    price: 139000,
    compareAtPrice: 169000,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sage Olive', 'Coast Sand'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-05',
    category: 'boardshorts',
    title_id: 'Biarritz Wave Runner Boardshort',
    title_en: 'Biarritz Wave Runner Boardshort',
    description_id: 'Celana pendek santai berpotongan 15 inch (di atas lutut) bernuansa navy ocean dengan lis putih retro. Nyaman untuk berenang maupun nongkrong santai di beach club.',
    description_en: '15-inch outseam casual boardshorts in deep marine navy with retro white piping. Equally comfortable for ocean dips or beach club lounging.',
    material_id: 'Quick-Dry Nylon Taslan with Water-Repellent Finish',
    material_en: 'Quick-Dry Nylon Taslan with Water-Repellent Finish',
    price: 129000,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Deep Ocean Navy'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-06',
    category: 'boardshorts',
    title_id: 'Sanur Sun-Bleached Linen Easy Shorts',
    title_en: 'Sanur Sun-Bleached Linen Easy Shorts',
    description_id: 'Celana santai berbahan linen lembut berpinggang karet fleksibel. Saku samping dalam dan tekstur serat alami yang khas dan elegan.',
    description_en: 'Easy shorts tailored from softened linen with a flexible elastic waistband. Deep side pockets and a distinctive natural textural weave.',
    material_id: '70% Linen, 30% Cotton Blend',
    material_en: '70% Linen, 30% Cotton Blend',
    price: 149000,
    compareAtPrice: 179000,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Natural Sand', 'Charcoal'],
    stockStatus: 'low_stock',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-07',
    category: 'tees',
    title_id: 'Salty Days Heavyweight Relaxed Tee',
    title_en: 'Salty Days Heavyweight Relaxed Tee',
    description_id: 'Kaos oversized 240 GSM dengan potongan santai khas pesisir. Tidak menerawang, bahan tebal namun tetap adem berkat katun combed 20s premium.',
    description_en: '240 GSM heavyweight oversized tee with a relaxed coastal streetwear silhouette. Substantial yet airy feel crafted from 100% premium combed cotton.',
    material_id: '100% Combed Cotton 20s (240 GSM Heavyweight)',
    material_en: '100% Combed Cotton 20s (240 GSM Heavyweight)',
    price: 119000,
    compareAtPrice: 145000,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Vintage Bone White', 'Faded Terracotta'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-08',
    category: 'tees',
    title_id: 'Palma Sunset Pocket Graphic Tee',
    title_en: 'Palma Sunset Pocket Graphic Tee',
    description_id: 'Kaos saku dada dengan grafis minimalis siluet pohon kelapa di punggung. Sablon discharge halus yang tidak kaku dan menyatu dengan kain.',
    description_en: 'Chest pocket t-shirt featuring minimal palm silhouette graphics on the back. Soft water-based discharge print seamlessly embedded in the fabric.',
    material_id: '100% Ringspun Cotton 24s',
    material_en: '100% Ringspun Cotton 24s',
    price: 110000,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Seafoam Mist'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-09',
    category: 'tees',
    title_id: 'Coastline Oversized Acid-Wash Tee',
    title_en: 'Coastline Oversized Acid-Wash Tee',
    description_id: 'Kaos motif washed unik bertekstur ombak laut. Tampilan vintage kasual yang trendi bagi anak muda.',
    description_en: 'Unique acid-washed t-shirt with wave-washed subtle marbling. Laid-back vintage aesthetic tailored for casual coastal styling.',
    material_id: '100% Washed Cotton (Enzyme Washed)',
    material_en: '100% Washed Cotton (Enzyme Washed)',
    price: 125000,
    compareAtPrice: 155000,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ocean Slate Grey'],
    stockStatus: 'pre_order',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-10',
    category: 'accessories',
    title_id: 'Raffia Handwoven Beach Bucket Hat',
    title_en: 'Raffia Handwoven Beach Bucket Hat',
    description_id: 'Topi bucket anyaman serat raffia alami dengan brim pelindung terik sinar matahari. Ringan, dapat dilipat ke dalam koper tanpa merusak bentuk.',
    description_en: 'Handcrafted natural raffia fiber bucket hat with a protective sun brim. Lightweight, crushable and packable for vacation luggage.',
    material_id: 'Natural Woven Palm Raffia',
    material_en: 'Natural Woven Palm Raffia',
    price: 89000,
    compareAtPrice: 110000,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['All Size (56-58cm)'],
    colors: ['Natural Straw'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-11',
    category: 'accessories',
    title_id: 'Sunkissed Canvas Coastal Tote Bag',
    title_en: 'Sunkissed Canvas Coastal Tote Bag',
    description_id: 'Tas jinjing kanvas katun tebal 14 oz dengan lapisan dalam tahan cipratan air. Muat handuk pantai, botol minum, pakaian ganti, dan kacamata.',
    description_en: 'Heavyweight 14 oz organic cotton canvas tote bag with a water-resistant interior lining. Spacious enough for beach towels, sunglasses, and essentials.',
    material_id: '14 oz Heavyweight Cotton Canvas',
    material_en: '14 oz Heavyweight Cotton Canvas',
    price: 99000,
    compareAtPrice: 129000,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size (40cm x 35cm x 12cm)'],
    colors: ['Off-White Canvas & Teal'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-12',
    category: 'accessories',
    title_id: 'Amber Horizon Polarized Sunglasses',
    title_en: 'Amber Horizon Polarized Sunglasses',
    description_id: 'Kacamata hitam berbingkai bio-acetate cokelat amber dengan lensa polaroid UV400 anti-silau pantulan air laut.',
    description_en: 'Amber tortoise bio-acetate sunglasses equipped with polarized UV400 glare-reduction lenses for coastal sunlight.',
    material_id: 'Handcrafted Bio-Acetate & TAC Polarized Lenses',
    material_en: 'Handcrafted Bio-Acetate & TAC Polarized Lenses',
    price: 119000,
    compareAtPrice: 149000,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size'],
    colors: ['Amber Tortoise'],
    stockStatus: 'sold_out',
    isFeatured: false,
    isActive: true
  }
];

export const initialStoreSettings = {
  storeName: 'AlfaREL.ID Store',
  whatsappNumber: '6281234567890',
  announcement_id: '🌴 Promo Musim Panas: Diskon hingga 30% untuk koleksi pantai! 🌊',
  announcement_en: '🌴 Summer Breeze Promo: Up to 30% off on all coastal apparel! 🌊',
  isStoreOpen: true,
  adminPin: '1234' // Demo PIN
};
