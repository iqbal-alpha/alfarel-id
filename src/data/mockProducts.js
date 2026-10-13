export const initialCategories = [
  { id: 'all', key: 'cat_all', name_id: 'All Collections', name_en: 'All Collections', name: 'All Collections' },
  { id: 'shirts', key: 'cat_shirts', name_id: 'Linen Beach Shirts', name_en: 'Linen Beach Shirts', name: 'Linen Beach Shirts' },
  { id: 'boardshorts', key: 'cat_boardshorts', name_id: 'Boardshorts & Trunks', name_en: 'Boardshorts & Trunks', name: 'Boardshorts & Trunks' },
  { id: 'tees', key: 'cat_tees', name_id: 'Relaxed Beach Tees', name_en: 'Relaxed Beach Tees', name: 'Relaxed Beach Tees' },
  { id: 'accessories', key: 'cat_accessories', name_id: 'Beach Accessories', name_en: 'Beach Accessories', name: 'Beach Accessories' }
];

export const initialProducts = [
  {
    id: 'prod-01',
    category: 'shirts',
    title_id: 'Bali Breeze Camp Collar Linen Shirt',
    title_en: 'Bali Breeze Camp Collar Linen Shirt',
    description_id: 'Open Cuban collar shirt crafted from 100% garment-washed natural linen. Incredibly breezy and breathable under coastal sunshine with an effortless relaxed drape.',
    description_en: 'Open Cuban collar shirt crafted from 100% garment-washed natural linen. Incredibly breezy and breathable under coastal sunshine with an effortless relaxed drape.',
    material_id: '100% Pure Washed Linen (Breathable & Ultra Light)',
    material_en: '100% Pure Washed Linen (Breathable & Ultra Light)',
    price: 189000,
    compareAtPrice: 229000,
    images: [
      '/images/products/bali-breeze-shirt.jpg',
      '/images/products/bali-breeze-shirt-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sand Beige', 'Natural White'],
    colorHexes: ['#D7C9B1', '#FAF7F2'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-02',
    category: 'shirts',
    title_id: 'Amalfi Coast Striped Resort Shirt',
    title_en: 'Amalfi Coast Striped Resort Shirt',
    description_id: 'Classic Mediterranean vertical stripes combining deep ocean navy with sunlit white. Crafted from cooling, wrinkle-resistant premium breathable rayon twill.',
    description_en: 'Classic Mediterranean vertical stripes combining deep ocean navy with sunlit white. Crafted from cooling, wrinkle-resistant premium breathable rayon twill.',
    material_id: 'Premium Breathable Rayon Twill',
    material_en: 'Premium Breathable Rayon Twill',
    price: 175000,
    compareAtPrice: 215000,
    images: [
      '/images/products/amalfi-striped-shirt.jpg',
      '/images/products/amalfi-striped-shirt-2.jpg'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy / White Stripe'],
    colorHexes: ['#1E3A5F', '#A3C4DC'],
    stockStatus: 'low_stock',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-03',
    category: 'shirts',
    title_id: 'Uluwatu Sunset Terracotta Camp Shirt',
    title_en: 'Uluwatu Sunset Terracotta Camp Shirt',
    description_id: 'Beach camp shirt featuring a warm sunset terracotta palette with subtle tropical botanical prints. Ideal for golden hour seaside dining.',
    description_en: 'Beach camp shirt featuring a warm sunset terracotta palette with subtle tropical botanical prints. Ideal for golden hour seaside dining.',
    material_id: '100% Organic Viscose Rayon',
    material_en: '100% Organic Viscose Rayon',
    price: 185000,
    compareAtPrice: null,
    images: [
      '/images/products/uluwatu-terracotta-shirt.jpg',
      '/images/products/uluwatu-terracotta-shirt-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Sunset Terracotta'],
    colorHexes: ['#C86D51', '#707A57'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-04',
    category: 'boardshorts',
    title_id: 'Canggu Retro 4-Way Stretch Boardshort',
    title_en: 'Canggu Retro 4-Way Stretch Boardshort',
    description_id: 'Quick-dry beach boardshorts with 4-way stretch flex. Features a rear pocket with mesh drainage grommet and reinforced nautical drawcord.',
    description_en: 'Quick-dry beach boardshorts with 4-way stretch flex. Features a rear pocket with mesh drainage grommet and reinforced nautical drawcord.',
    material_id: 'Hydrophobic Repel-Flex Polyester & Spandex',
    material_en: 'Hydrophobic Repel-Flex Polyester & Spandex',
    price: 139000,
    compareAtPrice: 169000,
    images: [
      '/images/products/canggu-stretch-boardshort.jpg',
      '/images/products/canggu-stretch-boardshort-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sage Olive', 'Coast Sand'],
    colorHexes: ['#7A9A8B', '#C9B99A'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-05',
    category: 'boardshorts',
    title_id: 'Biarritz Wave Runner Boardshort',
    title_en: 'Biarritz Wave Runner Boardshort',
    description_id: '15-inch outseam casual boardshorts in deep marine navy with retro white piping. Equally comfortable for ocean dips or beach club lounging.',
    description_en: '15-inch outseam casual boardshorts in deep marine navy with retro white piping. Equally comfortable for ocean dips or beach club lounging.',
    material_id: 'Quick-Dry Nautical Nylon with Water-Repellent Finish',
    material_en: 'Quick-Dry Nautical Nylon with Water-Repellent Finish',
    price: 129000,
    compareAtPrice: null,
    images: [
      '/images/products/biarritz-wave-boardshort.jpg',
      '/images/products/biarritz-wave-boardshort-2.jpg'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Deep Ocean Navy'],
    colorHexes: ['#1B2E4B', '#486581'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-06',
    category: 'boardshorts',
    title_id: 'Sanur Sun-Bleached Linen Easy Shorts',
    title_en: 'Sanur Sun-Bleached Linen Easy Shorts',
    description_id: 'Easy shorts tailored from softened linen with a flexible elastic waistband. Deep side pockets and a distinctive natural textural weave for seaside chill.',
    description_en: 'Easy shorts tailored from softened linen with a flexible elastic waistband. Deep side pockets and a distinctive natural textural weave for seaside chill.',
    material_id: '70% Linen, 30% Cotton Blend',
    material_en: '70% Linen, 30% Cotton Blend',
    price: 149000,
    compareAtPrice: 179000,
    images: [
      '/images/products/sanur-linen-shorts.jpg',
      '/images/products/sanur-linen-shorts-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Natural Sand', 'Charcoal'],
    colorHexes: ['#D7C8B5', '#2E3238'],
    stockStatus: 'low_stock',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-07',
    category: 'tees',
    title_id: 'Salty Days Heavyweight Relaxed Tee',
    title_en: 'Salty Days Heavyweight Relaxed Tee',
    description_id: '240 GSM heavyweight oversized tee with a relaxed coastal streetwear silhouette. Substantial yet airy feel crafted from 100% premium combed cotton.',
    description_en: '240 GSM heavyweight oversized tee with a relaxed coastal streetwear silhouette. Substantial yet airy feel crafted from 100% premium combed cotton.',
    material_id: '100% Combed Cotton 20s (240 GSM Heavyweight)',
    material_en: '100% Combed Cotton 20s (240 GSM Heavyweight)',
    price: 119000,
    compareAtPrice: 145000,
    images: [
      '/images/products/salty-days-tee.jpg',
      '/images/products/salty-days-tee-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Vintage Bone White', 'Faded Terracotta'],
    colorHexes: ['#EDE8DC', '#BF6852'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-08',
    category: 'tees',
    title_id: 'Palma Sunset Pocket Graphic Tee',
    title_en: 'Palma Sunset Pocket Graphic Tee',
    description_id: 'Chest pocket t-shirt featuring minimal palm silhouette graphics on the back. Soft water-based discharge print seamlessly embedded in the fabric.',
    description_en: 'Chest pocket t-shirt featuring minimal palm silhouette graphics on the back. Soft water-based discharge print seamlessly embedded in the fabric.',
    material_id: '100% Ringspun Cotton 24s',
    material_en: '100% Ringspun Cotton 24s',
    price: 110000,
    compareAtPrice: null,
    images: [
      '/images/products/palma-sunset-tee.jpg',
      '/images/products/palma-sunset-tee-2.jpg'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Seafoam Mist'],
    colorHexes: ['#8BBDAE', '#4B7B70'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-09',
    category: 'tees',
    title_id: 'Coastline Oversized Wave Tee',
    title_en: 'Coastline Oversized Wave Tee',
    description_id: 'Unique enzyme-washed t-shirt with wave-washed subtle marbling. Laid-back vintage aesthetic tailored for casual coastal styling.',
    description_en: 'Unique enzyme-washed t-shirt with wave-washed subtle marbling. Laid-back vintage aesthetic tailored for casual coastal styling.',
    material_id: '100% Washed Cotton (Enzyme Washed)',
    material_en: '100% Washed Cotton (Enzyme Washed)',
    price: 125000,
    compareAtPrice: 155000,
    images: [
      '/images/products/coastline-wave-tee.jpg',
      '/images/products/coastline-wave-tee-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ocean Slate Grey'],
    colorHexes: ['#5E7285', '#334155'],
    stockStatus: 'pre_order',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-10',
    category: 'accessories',
    title_id: 'Raffia Handwoven Beach Bucket Hat',
    title_en: 'Raffia Handwoven Beach Bucket Hat',
    description_id: 'Handcrafted natural raffia fiber bucket hat with a protective sun brim. Lightweight, crushable and packable for vacation luggage.',
    description_en: 'Handcrafted natural raffia fiber bucket hat with a protective sun brim. Lightweight, crushable and packable for vacation luggage.',
    material_id: 'Natural Woven Palm Raffia',
    material_en: 'Natural Woven Palm Raffia',
    price: 89000,
    compareAtPrice: 110000,
    images: [
      '/images/products/raffia-bucket-hat.jpg',
      '/images/products/raffia-bucket-hat-2.jpg'
    ],
    sizes: ['All Size (56-58cm)'],
    colors: ['Natural Straw'],
    colorHexes: ['#D9C59B'],
    stockStatus: 'ready',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'prod-11',
    category: 'accessories',
    title_id: 'Sunkissed Canvas Coastal Tote Bag',
    title_en: 'Sunkissed Canvas Coastal Tote Bag',
    description_id: 'Heavyweight 14 oz organic cotton canvas tote bag with a water-resistant interior lining. Spacious enough for beach towels, sunglasses, and essentials.',
    description_en: 'Heavyweight 14 oz organic cotton canvas tote bag with a water-resistant interior lining. Spacious enough for beach towels, sunglasses, and essentials.',
    material_id: '14 oz Heavyweight Cotton Canvas',
    material_en: '14 oz Heavyweight Cotton Canvas',
    price: 99000,
    compareAtPrice: 129000,
    images: [
      '/images/products/sunkissed-canvas-tote.jpg',
      '/images/products/sunkissed-canvas-tote-2.jpg'
    ],
    sizes: ['One Size (40cm x 35cm x 12cm)'],
    colors: ['Off-White Canvas & Teal'],
    colorHexes: ['#EFECE6', '#1E6B7B'],
    stockStatus: 'ready',
    isFeatured: false,
    isActive: true
  },
  {
    id: 'prod-12',
    category: 'accessories',
    title_id: 'Amber Horizon Polarized Beach Sunglasses',
    title_en: 'Amber Horizon Polarized Beach Sunglasses',
    description_id: 'Amber tortoise bio-acetate sunglasses equipped with polarized UV400 glare-reduction lenses for coastal sunlight.',
    description_en: 'Amber tortoise bio-acetate sunglasses equipped with polarized UV400 glare-reduction lenses for coastal sunlight.',
    material_id: 'Handcrafted Bio-Acetate & TAC Polarized Lenses',
    material_en: 'Handcrafted Bio-Acetate & TAC Polarized Lenses',
    price: 119000,
    compareAtPrice: 149000,
    images: [
      '/images/products/amber-horizon-sunglasses.jpg',
      '/images/products/amber-horizon-sunglasses-2.jpg'
    ],
    sizes: ['One Size'],
    colors: ['Amber Tortoise'],
    colorHexes: ['#A0632D', '#1A1A1A'],
    stockStatus: 'sold_out',
    isFeatured: false,
    isActive: true
  }
];

export const initialStoreSettings = {
  storeName: 'AlfaREL.ID Store',
  whatsappNumber: '6281234567890',
  announcement_id: 'SPECIAL OFFER: COMPLIMENTARY SHIPPING ON ORDERS OVER IDR 250,000 NATIONWIDE',
  announcement_en: 'SPECIAL OFFER: COMPLIMENTARY SHIPPING ON ORDERS OVER IDR 250,000 NATIONWIDE',
  isStoreOpen: true,
  adminPin: '1234'
};
