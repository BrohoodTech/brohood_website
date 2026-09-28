import { Product, Category, Brand, Coupon } from '@/types/ecommerce';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Luxury Watches',
    slug: 'watches',
    description: 'First copy Swiss & Japanese automatic sweeps, chronographs, and master editions',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    id: 'cat-2',
    name: 'Hype Sneakers',
    slug: 'sneakers',
    description: '1:1 Master Quality retros, daily low-tops, and hype silhouette drops',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
  },
  {
    id: 'cat-3',
    name: 'Designer Goggles',
    slug: 'goggles',
    description: 'UV400 polarized luxury eyewear, wraparound sunglasses, and statement frames',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    id: 'cat-4',
    name: 'Streetwear T-Shirts',
    slug: 'tshirts',
    description: '240+ GSM Heavyweight oversized drop-shoulder essentials and graphic tees',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
  },
];

export const BRANDS: Brand[] = [
  // Watch Brands
  { id: 'b-rolex', name: 'Rolex', slug: 'rolex', categorySlug: 'watches', logoUrl: '/brands/rolex.svg' },
  { id: 'b-ap', name: 'Audemars Piguet', slug: 'audemars-piguet', categorySlug: 'watches', logoUrl: '/brands/ap.svg' },
  { id: 'b-cartier', name: 'Cartier', slug: 'cartier', categorySlug: 'watches', logoUrl: '/brands/cartier.svg' },
  { id: 'b-patek', name: 'Patek Philippe', slug: 'patek-philippe', categorySlug: 'watches', logoUrl: '/brands/patek.svg' },
  
  // Sneaker Brands
  { id: 'b-nike', name: 'Nike', slug: 'nike', categorySlug: 'sneakers', logoUrl: '/brands/nike.svg' },
  { id: 'b-jordan', name: 'Air Jordan', slug: 'air-jordan', categorySlug: 'sneakers', logoUrl: '/brands/jordan.svg' },
  { id: 'b-adidas', name: 'Adidas', slug: 'adidas', categorySlug: 'sneakers', logoUrl: '/brands/adidas.svg' },
  { id: 'b-nb', name: 'New Balance', slug: 'new-balance', categorySlug: 'sneakers', logoUrl: '/brands/nb.svg' },
  { id: 'b-asics', name: 'Asics', slug: 'asics', categorySlug: 'sneakers', logoUrl: '/brands/asics.svg' },

  // Eyewear Brands
  { id: 'b-rayban', name: 'Ray-Ban', slug: 'ray-ban', categorySlug: 'goggles', logoUrl: '/brands/rayban.svg' },
  { id: 'b-gm', name: 'Gentle Monster', slug: 'gentle-monster', categorySlug: 'goggles', logoUrl: '/brands/gm.svg' },
  { id: 'b-prada', name: 'Prada', slug: 'prada', categorySlug: 'goggles', logoUrl: '/brands/prada.svg' },

  // Apparel Brand
  { id: 'b-brohood', name: 'BroHood Originals', slug: 'brohood', categorySlug: 'tshirts', logoUrl: '/brands/brohood.svg' },
];

export const PRODUCTS: Product[] = [
  // 1. Rolex Submariner Date
  {
    id: 'prod-w1',
    slug: 'rolex-submariner-date-black-dial',
    title: 'Submariner Date 41mm 904L Black Dial',
    brand: 'Rolex',
    brandSlug: 'rolex',
    category: 'watches',
    description: '1:1 Master Quality replica with smooth automatic sweep movement, scratch-resistant sapphire crystal with 2.5x cyclops magnifier, and unidirection ceramic bezel.',
    specs: {
      'Movement': 'Automatic Sweep Calibre 3235 Clone',
      'Case Diameter': '41 mm',
      'Material': '904L Stainless Steel',
      'Bezel': 'Ceramic Unidirectional Rotating',
      'Glass': 'Sapphire Crystal with Anti-Reflective Coating',
      'Water Resistance': '50M Splash & Daily Wash Proof',
      'Packaging': 'Green Box with Booklet and Authenticity Card included'
    },
    mrp: 14999,
    price: 4499,
    discountPercent: 70,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 48,
    primaryImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    ],
    variants: [
      { id: 'v-w1-black', productId: 'prod-w1', variantType: 'dial', name: 'Black Dial / Black Bezel', sku: 'RLX-SUB-BLK', stockQuantity: 6 },
      { id: 'v-w1-green', productId: 'prod-w1', variantType: 'dial', name: 'Hulk Green Dial / Green Bezel', sku: 'RLX-SUB-GRN', stockQuantity: 2 },
    ],
    availableSizes: ['41mm Standard'],
    availableColors: ['Black / Steel', 'Emerald Green / Steel'],
    inStock: true,
  },

  // 2. Audemars Piguet Royal Oak
  {
    id: 'prod-w2',
    slug: 'audemars-piguet-royal-oak-41mm-blue-dial',
    title: 'Royal Oak Selfwinding 41mm Blue Tapisserie',
    brand: 'Audemars Piguet',
    brandSlug: 'audemars-piguet',
    category: 'watches',
    description: 'Iconic octagonal bezel with 8 hexagonal screws, "Grande Tapisserie" patterned dial, and integrated brushed stainless steel bracelet with double AP folding clasp.',
    specs: {
      'Movement': 'Automatic Calibre 4302 Clone',
      'Case Diameter': '41 mm',
      'Thickness': '10.5 mm',
      'Dial': 'Blue Grande Tapisserie Pattern',
      'Material': 'Brushed & Polished 316L Stainless Steel',
      'Glass': 'Double Glareproofed Sapphire Crystal'
    },
    mrp: 18999,
    price: 5499,
    discountPercent: 71,
    isHot: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 32,
    primaryImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'],
    variants: [
      { id: 'v-w2-blue', productId: 'prod-w2', variantType: 'dial', name: 'Blue Dial', sku: 'AP-RO-BLU', stockQuantity: 4 },
      { id: 'v-w2-black', productId: 'prod-w2', variantType: 'dial', name: 'Black Dial', sku: 'AP-RO-BLK', stockQuantity: 3 },
    ],
    availableSizes: ['41mm Standard'],
    availableColors: ['Deep Blue', 'Charcoal Black'],
    inStock: true,
  },

  // 3. Nike Air Jordan 1 Low Travis Scott Reverse Mocha
  {
    id: 'prod-s1',
    slug: 'nike-air-jordan-1-low-travis-scott-reverse-mocha',
    title: 'Air Jordan 1 Low x Travis Scott "Reverse Mocha"',
    brand: 'Air Jordan',
    brandSlug: 'air-jordan',
    category: 'sneakers',
    description: '1:1 Master Quality batch featuring suede nubuck underlays, tumbled sail leather overlays, reverse oversized cream Swoosh, Cactus Jack embroidered heel motifs, and sail vintage midsole.',
    specs: {
      'Upper': 'Premium Suede & Tumbled Leather',
      'Sole': 'Air-Cushioned Rubber Cupsole',
      'Laces Included': '3 Extra pairs (Cream, Brown, Pink)',
      'Box': 'Special Edition Travis Scott Brown Box with Paper'
    },
    mrp: 8999,
    price: 2999,
    discountPercent: 67,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 84,
    primaryImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85',
    ],
    variants: [
      { id: 'v-s1-7', productId: 'prod-s1', variantType: 'size', name: 'UK 7', sku: 'AJ1-TS-UK7', stockQuantity: 5 },
      { id: 'v-s1-8', productId: 'prod-s1', variantType: 'size', name: 'UK 8', sku: 'AJ1-TS-UK8', stockQuantity: 3 },
      { id: 'v-s1-9', productId: 'prod-s1', variantType: 'size', name: 'UK 9', sku: 'AJ1-TS-UK9', stockQuantity: 2 }, // low stock
      { id: 'v-s1-10', productId: 'prod-s1', variantType: 'size', name: 'UK 10', sku: 'AJ1-TS-UK10', stockQuantity: 4 },
      { id: 'v-s1-11', productId: 'prod-s1', variantType: 'size', name: 'UK 11', sku: 'AJ1-TS-UK11', stockQuantity: 1 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Mocha / Sail / White'],
    inStock: true,
  },

  // 4. Nike Dunk Low Panda
  {
    id: 'prod-s2',
    slug: 'nike-dunk-low-retro-panda-black-white',
    title: 'Dunk Low Retro "Panda" Black & White',
    brand: 'Nike',
    brandSlug: 'nike',
    category: 'sneakers',
    description: 'The universally loved classic colorway. Crisp white base with sleek black leather panels, padded collar, and durable two-tone rubber traction sole.',
    specs: {
      'Upper': 'Smooth Synthetic & Full-Grain Leather',
      'Sole': 'Flexible Vulcanized Rubber',
      'Comfort': 'Padded Low-Cut Collar & Foam Sockliner',
      'Box': 'Original Red Nike Sportswear Box'
    },
    mrp: 6999,
    price: 2499,
    discountPercent: 64,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 112,
    primaryImage: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85'],
    variants: [
      { id: 'v-s2-6', productId: 'prod-s2', variantType: 'size', name: 'UK 6', sku: 'DNK-PND-UK6', stockQuantity: 4 },
      { id: 'v-s2-7', productId: 'prod-s2', variantType: 'size', name: 'UK 7', sku: 'DNK-PND-UK7', stockQuantity: 6 },
      { id: 'v-s2-8', productId: 'prod-s2', variantType: 'size', name: 'UK 8', sku: 'DNK-PND-UK8', stockQuantity: 8 },
      { id: 'v-s2-9', productId: 'prod-s2', variantType: 'size', name: 'UK 9', sku: 'DNK-PND-UK9', stockQuantity: 5 },
      { id: 'v-s2-10', productId: 'prod-s2', variantType: 'size', name: 'UK 10', sku: 'DNK-PND-UK10', stockQuantity: 4 },
    ],
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Black / White'],
    inStock: true,
  },

  // 5. Adidas Samba OG
  {
    id: 'prod-s3',
    slug: 'adidas-samba-og-white-core-black',
    title: 'Samba OG Core White & Black Gum Sole',
    brand: 'Adidas',
    brandSlug: 'adidas',
    category: 'sneakers',
    description: 'The definitive terrace fashion staple. Smooth leather upper with suede T-toe overlay, serrated 3-Stripes, gold-foil Samba wordmark, and retro gum rubber outsole.',
    specs: {
      'Upper': 'Full-Grain Leather with Suede T-Toe',
      'Outsole': 'Vintage Gum Rubber Sole',
      'Fit': 'Regular True to Size',
      'Box': 'Original Blue Adidas Originals Box'
    },
    mrp: 6499,
    price: 2399,
    discountPercent: 63,
    isHot: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 65,
    primaryImage: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85'],
    variants: [
      { id: 'v-s3-7', productId: 'prod-s3', variantType: 'size', name: 'UK 7', sku: 'SAMBA-UK7', stockQuantity: 4 },
      { id: 'v-s3-8', productId: 'prod-s3', variantType: 'size', name: 'UK 8', sku: 'SAMBA-UK8', stockQuantity: 6 },
      { id: 'v-s3-9', productId: 'prod-s3', variantType: 'size', name: 'UK 9', sku: 'SAMBA-UK9', stockQuantity: 3 },
      { id: 'v-s3-10', productId: 'prod-s3', variantType: 'size', name: 'UK 10', sku: 'SAMBA-UK10', stockQuantity: 2 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['White / Core Black / Gum'],
    inStock: true,
  },

  // 6. Ray-Ban Wayfarer Classic
  {
    id: 'prod-g1',
    slug: 'ray-ban-original-wayfarer-classic-polarised',
    title: 'Original Wayfarer Classic Polarized Black Frame',
    brand: 'Ray-Ban',
    brandSlug: 'ray-ban',
    category: 'goggles',
    description: '1:1 replica of the legendary Wayfarer. Premium heavy acetate construction, etched RB laser marking on the left glass lens, and 100% UV400 polarized eye protection.',
    specs: {
      'Lens Technology': 'UV400 Polarized G-15 Green Crystal Glass',
      'Frame Material': 'Handcrafted Italian-Grade Acetate',
      'Hinge': '7-Barrel Metal Hinges with Smooth Flex',
      'Box': 'Black Leather Case, Cleaning Cloth & Certificate Booklet'
    },
    mrp: 4999,
    price: 1599,
    discountPercent: 68,
    isHot: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 54,
    primaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'],
    variants: [
      { id: 'v-g1-black', productId: 'prod-g1', variantType: 'color', name: 'Polished Black / G-15 Green', sku: 'RB-WYF-BLK', stockQuantity: 12 },
      { id: 'v-g1-tortoise', productId: 'prod-g1', variantType: 'color', name: 'Tortoiseshell / Brown Lens', sku: 'RB-WYF-TRT', stockQuantity: 5 },
    ],
    availableSizes: ['Standard 50mm'],
    availableColors: ['Glossy Black', 'Havana Tortoise'],
    inStock: true,
  },

  // 7. Gentle Monster Her 01
  {
    id: 'prod-g2',
    slug: 'gentle-monster-her-01-oversized-sunglasses',
    title: 'Her 01 Oversized Square Bold Acetate Sunglasses',
    brand: 'Gentle Monster',
    brandSlug: 'gentle-monster',
    category: 'goggles',
    description: 'High-fashion statement square frame with flat Zeiss black lenses and subtle circular silver pin embellishments on the temples.',
    specs: {
      'Lenses': 'Zeiss UV400 Anti-Scratch Black Flat Lenses',
      'Frame': 'Oversized Square Polished Acetate',
      'Case': 'Signature Gentle Monster White Textured Hard Pouch'
    },
    mrp: 5499,
    price: 1799,
    discountPercent: 67,
    isHot: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 29,
    primaryImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'],
    variants: [
      { id: 'v-g2-black', productId: 'prod-g2', variantType: 'color', name: 'Midnight Black', sku: 'GM-HER-BLK', stockQuantity: 8 }
    ],
    availableSizes: ['Universal Fit'],
    availableColors: ['Midnight Black'],
    inStock: true,
  },

  // 8. BroHood 260 GSM Heavyweight Oversized Tee
  {
    id: 'prod-t1',
    slug: 'brohood-260-gsm-heavyweight-oversized-tee-washed-onyx',
    title: '260 GSM Heavyweight Oversized Boxy Tee - Washed Onyx',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Crafted from 100% combed French Terry cotton with a hefty 260 GSM weight. Features dropped shoulders, a thick 1.2-inch ribbed collar that never sags, and an effortless streetwear silhouette.',
    specs: {
      'Fabric': '100% Combed Compact Cotton (French Terry)',
      'GSM': '260 GSM Heavyweight',
      'Fit': 'Boxy Streetwear Oversized Drop-Shoulder',
      'Collar': '1.2 inch Spandex Ribbed Neckline (Anti-Sag)',
      'Wash Care': 'Cold Machine Wash inside-out'
    },
    mrp: 2499,
    price: 899,
    discountPercent: 64,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 97,
    primaryImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'],
    variants: [
      { id: 'v-t1-s', productId: 'prod-t1', variantType: 'size', name: 'S', sku: 'BH-TEE-ONYX-S', stockQuantity: 10 },
      { id: 'v-t1-m', productId: 'prod-t1', variantType: 'size', name: 'M', sku: 'BH-TEE-ONYX-M', stockQuantity: 15 },
      { id: 'v-t1-l', productId: 'prod-t1', variantType: 'size', name: 'L', sku: 'BH-TEE-ONYX-L', stockQuantity: 8 },
      { id: 'v-t1-xl', productId: 'prod-t1', variantType: 'size', name: 'XL', sku: 'BH-TEE-ONYX-XL', stockQuantity: 6 },
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Washed Onyx', 'Bone Off-White'],
    inStock: true,
  },
];

export const COUPONS: Coupon[] = [
  {
    code: 'FIRST10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1499,
    maxDiscount: 500,
    description: '10% OFF on orders above ₹1,499 (Max ₹500)',
  },
  {
    code: 'BROHOOD500',
    discountType: 'flat',
    discountValue: 500,
    minOrderValue: 4999,
    description: 'Flat ₹500 OFF on orders above ₹4,999',
  },
  {
    code: 'EXTRA50',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 999,
    description: 'Instant ₹50 OFF on orders above ₹999',
  },
];

// Helper functions for catalog queries
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(type: 'hot' | 'bestseller' | 'all' = 'all'): Product[] {
  if (type === 'hot') return PRODUCTS.filter((p) => p.isHot);
  if (type === 'bestseller') return PRODUCTS.filter((p) => p.isBestseller);
  return PRODUCTS.slice(0, 6);
}

export function filterProducts(options: {
  category?: string;
  brands?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  inStockOnly?: boolean;
  query?: string;
}): Product[] {
  let list = [...PRODUCTS];

  if (options.category && options.category !== 'all') {
    list = list.filter((p) => p.category === options.category);
  }

  if (options.brands && options.brands.length > 0) {
    list = list.filter((p) => options.brands!.includes(p.brandSlug));
  }

  if (options.sizes && options.sizes.length > 0) {
    list = list.filter((p) =>
      p.availableSizes.some((s) => options.sizes!.includes(s))
    );
  }

  if (options.minPrice !== undefined) {
    list = list.filter((p) => p.price >= options.minPrice!);
  }

  if (options.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }

  if (options.inStockOnly) {
    list = list.filter((p) => p.inStock);
  }

  if (options.query && options.query.trim().length > 0) {
    const q = options.query.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (options.sortBy === 'price_low') {
    list.sort((a, b) => a.price - b.price);
  } else if (options.sortBy === 'price_high') {
    list.sort((a, b) => b.price - a.price);
  } else if (options.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (options.sortBy === 'bestseller') {
    list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  }

  return list;
}
