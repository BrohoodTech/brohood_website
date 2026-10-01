import { Product, Category, Brand, Coupon } from '@/types/ecommerce';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Luxury Watches',
    slug: 'watches',
    description: 'First copy Swiss & Japanese automatic sweeps, chronographs, and master editions',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    itemCount: 10,
  },
  {
    id: 'cat-2',
    name: 'Hype Sneakers',
    slug: 'sneakers',
    description: '1:1 Master Quality retros, daily low-tops, and hype silhouette drops',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    itemCount: 10,
  },
  {
    id: 'cat-3',
    name: 'Streetwear T-Shirts',
    slug: 'tshirts',
    description: '240+ GSM Heavyweight oversized drop-shoulder essentials and graphic tees',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
  },
  {
    id: 'cat-4',
    name: 'Designer Goggles',
    slug: 'goggles',
    description: 'UV400 polarized luxury eyewear, wraparound sunglasses, and statement frames',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    itemCount: 6,
  },
];

export const BRANDS: Brand[] = [
  // Watch Brands
  { id: 'b-rolex', name: 'Rolex', slug: 'rolex', categorySlug: 'watches', logoUrl: '/brands/rolex.svg' },
  { id: 'b-tissot', name: 'Tissot', slug: 'tissot', categorySlug: 'watches', logoUrl: '/brands/tissot.svg' },
  { id: 'b-hublot', name: 'Hublot', slug: 'hublot', categorySlug: 'watches', logoUrl: '/brands/hublot.svg' },
  { id: 'b-rado', name: 'Rado', slug: 'rado', categorySlug: 'watches', logoUrl: '/brands/rado.svg' },
  { id: 'b-ap', name: 'Audemars Piguet', slug: 'audemars-piguet', categorySlug: 'watches', logoUrl: '/brands/ap.svg' },
  { id: 'b-omega', name: 'Omega', slug: 'omega', categorySlug: 'watches', logoUrl: '/brands/omega.svg' },
  { id: 'b-patek', name: 'Patek Philippe', slug: 'patek-philippe', categorySlug: 'watches', logoUrl: '/brands/patek.svg' },
  { id: 'b-cartier', name: 'Cartier', slug: 'cartier', categorySlug: 'watches', logoUrl: '/brands/cartier.svg' },
  { id: 'b-casio', name: 'Casio G-Shock', slug: 'casio', categorySlug: 'watches', logoUrl: '/brands/casio.svg' },
  
  // Sneaker Brands
  { id: 'b-nike', name: 'Nike', slug: 'nike', categorySlug: 'sneakers', logoUrl: '/brands/nike.svg' },
  { id: 'b-jordan', name: 'Air Jordan', slug: 'air-jordan', categorySlug: 'sneakers', logoUrl: '/brands/jordan.svg' },
  { id: 'b-adidas', name: 'Adidas', slug: 'adidas', categorySlug: 'sneakers', logoUrl: '/brands/adidas.svg' },
  { id: 'b-nb', name: 'New Balance', slug: 'new-balance', categorySlug: 'sneakers', logoUrl: '/brands/nb.svg' },
  { id: 'b-yeezy', name: 'Yeezy', slug: 'yeezy', categorySlug: 'sneakers', logoUrl: '/brands/yeezy.svg' },
  { id: 'b-asics', name: 'Asics', slug: 'asics', categorySlug: 'sneakers', logoUrl: '/brands/asics.svg' },

  // Eyewear Brands
  { id: 'b-rayban', name: 'Ray-Ban', slug: 'ray-ban', categorySlug: 'goggles', logoUrl: '/brands/rayban.svg' },
  { id: 'b-gm', name: 'Gentle Monster', slug: 'gentle-monster', categorySlug: 'goggles', logoUrl: '/brands/gm.svg' },
  { id: 'b-prada', name: 'Prada', slug: 'prada', categorySlug: 'goggles', logoUrl: '/brands/prada.svg' },

  // Apparel Brand
  { id: 'b-brohood', name: 'BroHood Originals', slug: 'brohood', categorySlug: 'tshirts', logoUrl: '/brands/brohood.svg' },
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. WATCHES (10 Products)
  // ==========================================

  // W1. Rolex Submariner Date
  {
    id: 'prod-w1',
    slug: 'rolex-submariner-date-41mm',
    title: 'Rolex Submariner Date 41mm 904L Steel',
    brand: 'Rolex',
    brandSlug: 'rolex',
    category: 'watches',
    description: '1:1 Master Quality replica with smooth automatic sweep movement, scratch-resistant sapphire crystal with 2.5x cyclops magnifier, and unidirectional 120-click ceramic bezel.',
    specs: {
      'Movement': 'Automatic Sweep Calibre 3235 Clone (28,800 vph)',
      'Case Diameter': '41 mm',
      'Material': '904L Solid Stainless Steel',
      'Bezel': 'Ceramic Unidirectional Rotating',
      'Glass': 'Sapphire Crystal with Anti-Reflective Coating',
      'Water Resistance': '50M Splash & Daily Wash Proof',
      'Packaging': 'Signature Green Box, Guarantee Card & Booklets'
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
      'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85',
    ],
    colorImages: {
      'Black Dial / Black Bezel': [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85'
      ],
      'Hulk Emerald Green': [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
      ],
      'Bluesy Royal Blue / Gold': [
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w1-blk', productId: 'prod-w1', variantType: 'color', name: 'Black Dial / Black Bezel', sku: 'RLX-SUB-BLK', stockQuantity: 6 },
      { id: 'v-w1-grn', productId: 'prod-w1', variantType: 'color', name: 'Hulk Emerald Green', sku: 'RLX-SUB-GRN', stockQuantity: 3 },
      { id: 'v-w1-blu', productId: 'prod-w1', variantType: 'color', name: 'Bluesy Royal Blue / Gold', sku: 'RLX-SUB-BLU', stockQuantity: 2 },
    ],
    availableSizes: ['41mm Standard'],
    availableColors: ['Black Dial / Black Bezel', 'Hulk Emerald Green', 'Bluesy Royal Blue / Gold'],
    inStock: true,
  },

  // W2. Tissot PRX Powermatic 80
  {
    id: 'prod-w2',
    slug: 'tissot-prx-powermatic-80-automatic',
    title: 'Tissot PRX Powermatic 80 Integrated Bracelet',
    brand: 'Tissot',
    brandSlug: 'tissot',
    category: 'watches',
    description: 'The vintage 1978 icon remastered. Beautiful embossed waffle tapisserie dial, integrated satin-brushed stainless steel bracelet with butterfly clasp, and exposed exhibition sapphire caseback.',
    specs: {
      'Movement': 'Automatic Calibre 80 Clone with Smooth Sweeping Hand',
      'Case Diameter': '40 mm Slim Profile (10.9mm thickness)',
      'Dial': 'Embossed Waffle Texture with Polished Indices',
      'Bracelet': 'Integrated 316L Solid Stainless Steel with Triple Butterfly Clasp',
      'Glass': 'Anti-Scratch Sapphire Crystal with Blue AR Coating',
      'Packaging': 'Tissot Red Heritage Presentation Box with Warranty Card'
    },
    mrp: 9999,
    price: 3299,
    discountPercent: 67,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 76,
    primaryImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
    ],
    colorImages: {
      'Ice Blue Waffle Dial': [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85'
      ],
      'Emerald Green Waffle Dial': [
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
      ],
      'Classic Black Waffle Dial': [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w2-ice', productId: 'prod-w2', variantType: 'color', name: 'Ice Blue Waffle Dial', sku: 'TIS-PRX-ICE', stockQuantity: 8 },
      { id: 'v-w2-grn', productId: 'prod-w2', variantType: 'color', name: 'Emerald Green Waffle Dial', sku: 'TIS-PRX-GRN', stockQuantity: 5 },
      { id: 'v-w2-blk', productId: 'prod-w2', variantType: 'color', name: 'Classic Black Waffle Dial', sku: 'TIS-PRX-BLK', stockQuantity: 4 },
    ],
    availableSizes: ['40mm Standard'],
    availableColors: ['Ice Blue Waffle Dial', 'Emerald Green Waffle Dial', 'Classic Black Waffle Dial'],
    inStock: true,
  },

  // W3. Rolex Cosmograph Daytona "Panda"
  {
    id: 'prod-w3',
    slug: 'rolex-daytona-cosmograph-panda',
    title: 'Rolex Cosmograph Daytona "Panda" Chronograph',
    brand: 'Rolex',
    brandSlug: 'rolex',
    category: 'watches',
    description: 'The holy grail motorsport chronograph. 1:1 Master Quality replica with high-contrast white dial and black snailed chronograph counters, black Cerachrom tachymetric ceramic bezel, and solid 904L Oystersteel bracelet.',
    specs: {
      'Movement': 'Automatic Chronograph Sweep Calibre 4130 Clone',
      'Case Diameter': '40 mm',
      'Bezel': 'Black Monobloc Cerachrom in High-Tech Ceramic',
      'Pushers': 'Screw-Down Chronograph Pushers and Triplock Crown',
      'Glass': 'Sapphire Crystal with Laser-Etched Crown at 6 o’clock',
      'Material': '904L Solid Stainless Steel',
      'Packaging': 'Rolex Green Wooden Wave Box, Guarantee Card & Booklets'
    },
    mrp: 17999,
    price: 5299,
    discountPercent: 71,
    isHot: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 93,
    primaryImage: 'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
    ],
    colorImages: {
      'White Panda Dial': [
        'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
      ],
      'Reverse Panda Black Dial': [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w3-panda', productId: 'prod-w3', variantType: 'color', name: 'White Panda Dial', sku: 'RLX-DAY-PND', stockQuantity: 5 },
      { id: 'v-w3-blk', productId: 'prod-w3', variantType: 'color', name: 'Reverse Panda Black Dial', sku: 'RLX-DAY-BLK', stockQuantity: 3 },
    ],
    availableSizes: ['40mm Standard'],
    availableColors: ['White Panda Dial', 'Reverse Panda Black Dial'],
    inStock: true,
  },

  // W4. Audemars Piguet Royal Oak
  {
    id: 'prod-w4',
    slug: 'audemars-piguet-royal-oak-41mm',
    title: 'Audemars Piguet Royal Oak Selfwinding 41mm',
    brand: 'Audemars Piguet',
    brandSlug: 'audemars-piguet',
    category: 'watches',
    description: 'Iconic octagonal bezel with 8 hexagonal screws, "Grande Tapisserie" patterned dial, and integrated brushed stainless steel bracelet with double AP folding clasp.',
    specs: {
      'Movement': 'Automatic Calibre 4302 Clone with 28,800 vph',
      'Case Diameter': '41 mm',
      'Thickness': '10.5 mm Ultra-Slim',
      'Dial': 'Grande Tapisserie Waffle Pattern',
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
    colorImages: {
      'Grande Tapisserie Deep Blue': [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
      ],
      'Charcoal Black Dial': [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85'
      ],
      'Silver White Tapisserie': [
        'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w4-blue', productId: 'prod-w4', variantType: 'color', name: 'Grande Tapisserie Deep Blue', sku: 'AP-RO-BLU', stockQuantity: 4 },
      { id: 'v-w4-black', productId: 'prod-w4', variantType: 'color', name: 'Charcoal Black Dial', sku: 'AP-RO-BLK', stockQuantity: 3 },
      { id: 'v-w4-silver', productId: 'prod-w4', variantType: 'color', name: 'Silver White Tapisserie', sku: 'AP-RO-SLV', stockQuantity: 2 },
    ],
    availableSizes: ['41mm Standard'],
    availableColors: ['Grande Tapisserie Deep Blue', 'Charcoal Black Dial', 'Silver White Tapisserie'],
    inStock: true,
  },

  // W5. Hublot Big Bang Ceramic Chronograph
  {
    id: 'prod-w5',
    slug: 'hublot-big-bang-ceramic-chronograph',
    title: 'Hublot Big Bang Unico Skeleton Chronograph',
    brand: 'Hublot',
    brandSlug: 'hublot',
    category: 'watches',
    description: 'Aggressive modern luxury watchmaking. Matte black micro-blasted ceramic bezel with 6 H-shaped titanium screws, multi-layered skeleton dial showcasing column-wheel chronograph movement, and ribbed natural vulcanized rubber strap.',
    specs: {
      'Movement': 'Automatic Skeleton Flyback Chronograph Clone',
      'Case Diameter': '44 mm Bold Masculine Wrist Presence',
      'Bezel': 'Satin-Finished Black Ceramic with 6 Titanium H-Screws',
      'Glass': 'Sapphire Crystal with Interior Anti-Reflective Treatment',
      'Strap': 'Black Structured Lined Natural Rubber with Deployant Buckle',
      'Packaging': 'Hublot Porthole Hardcase Presentation Box'
    },
    mrp: 16999,
    price: 4899,
    discountPercent: 71,
    isHot: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 42,
    primaryImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'All Black Ceramic': [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85'
      ],
      'Rose Gold / Black Ceramic': [
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w5-blk', productId: 'prod-w5', variantType: 'color', name: 'All Black Ceramic', sku: 'HUB-BB-BLK', stockQuantity: 4 },
      { id: 'v-w5-rgd', productId: 'prod-w5', variantType: 'color', name: 'Rose Gold / Black Ceramic', sku: 'HUB-BB-RGD', stockQuantity: 2 },
    ],
    availableSizes: ['44mm Standard'],
    availableColors: ['All Black Ceramic', 'Rose Gold / Black Ceramic'],
    inStock: true,
  },

  // W6. Rado Centrix High-Tech Ceramic Jubilee
  {
    id: 'prod-w6',
    slug: 'rado-centrix-high-tech-ceramic-jubilee',
    title: 'Rado Centrix High-Tech Ceramic Diamond Jubilee',
    brand: 'Rado',
    brandSlug: 'rado',
    category: 'watches',
    description: '1:1 Master Quality luxury dress watch. Glossy scratch-resistant black high-tech ceramic center links on gold-tone stainless steel bracelet, edge-to-edge curved sapphire crystal, and deep black lacquered dial with 4 diamond hour markers.',
    specs: {
      'Movement': 'Swiss Quartz Precision Movement with Quick-Set Date',
      'Case Diameter': '38 mm Slim Profile Formal Dress Watch',
      'Bracelet': 'Black High-Tech Ceramic & Yellow Gold PVD Steel',
      'Glass': 'Edge-to-Edge Curved Scratch-Proof Sapphire Crystal',
      'Dial': 'Deep Black Lacquered with 4 Brilliant-Cut Diamond Indices',
      'Clasp': 'Titanium 3-Fold Clasp',
      'Packaging': 'Rado Signature Hardcase Box with Certificate'
    },
    mrp: 13999,
    price: 3699,
    discountPercent: 74,
    isHot: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 51,
    primaryImage: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Black & Gold High-Tech Ceramic': [
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85'
      ],
      'Platinum Silver & Black Ceramic': [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w6-bgd', productId: 'prod-w6', variantType: 'color', name: 'Black & Gold High-Tech Ceramic', sku: 'RDO-CTX-BGD', stockQuantity: 6 },
      { id: 'v-w6-slv', productId: 'prod-w6', variantType: 'color', name: 'Platinum Silver & Black Ceramic', sku: 'RDO-CTX-SLV', stockQuantity: 3 },
    ],
    availableSizes: ['38mm Standard'],
    availableColors: ['Black & Gold High-Tech Ceramic', 'Platinum Silver & Black Ceramic'],
    inStock: true,
  },

  // W7. Omega Seamaster Diver 300M Co-Axial
  {
    id: 'prod-w7',
    slug: 'omega-seamaster-diver-300m-co-axial',
    title: 'Omega Seamaster Diver 300M Wave Dial 42mm',
    brand: 'Omega',
    brandSlug: 'omega',
    category: 'watches',
    description: 'James Bond’s iconic maritime timepiece. Laser-engraved wave pattern ceramic dial, skeleton hands, helium escape valve, and ceramic bezel with white enamel diving scale.',
    specs: {
      'Movement': 'Automatic Co-Axial Master Chronometer Calibre 8800 Clone',
      'Case Diameter': '42 mm',
      'Bezel': 'Polished Ceramic with White Enamel Diving Scale',
      'Glass': 'Domed Scratch-Resistant Sapphire Crystal',
      'Bracelet': '5-Link Brushed & Polished Stainless Steel with Diver Extension',
      'Packaging': 'Omega Red Wooden Box with Operation Manual'
    },
    mrp: 15999,
    price: 4799,
    discountPercent: 70,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 38,
    primaryImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Laser Wave Blue Dial': [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'
      ],
      'Laser Wave Black Dial': [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w7-blu', productId: 'prod-w7', variantType: 'color', name: 'Laser Wave Blue Dial', sku: 'OMG-SM-BLU', stockQuantity: 5 },
      { id: 'v-w7-blk', productId: 'prod-w7', variantType: 'color', name: 'Laser Wave Black Dial', sku: 'OMG-SM-BLK', stockQuantity: 3 },
    ],
    availableSizes: ['42mm Standard'],
    availableColors: ['Laser Wave Blue Dial', 'Laser Wave Black Dial'],
    inStock: true,
  },

  // W8. Patek Philippe Nautilus 5711/1A
  {
    id: 'prod-w8',
    slug: 'patek-philippe-nautilus-5711',
    title: 'Patek Philippe Nautilus 5711 Blue Ribbed Dial',
    brand: 'Patek Philippe',
    brandSlug: 'patek-philippe',
    category: 'watches',
    description: 'The pinnacle of luxury sports watches. Rounded octagonal bezel, horizontally embossed blue gradient dial, ultra-thin 8.3mm profile, and seamlessly integrated stainless steel bracelet.',
    specs: {
      'Movement': 'Automatic Calibre 324 SC Ultra-Thin Clone (28,800 vph)',
      'Case Diameter': '40 mm (10 to 4 o’clock)',
      'Case Thickness': '8.3 mm Super Slim',
      'Dial': 'Horizontally Ribbed Sunburst Blue-Black Gradient',
      'Glass': 'Sapphire Crystal with Anti-Reflective Coating',
      'Packaging': 'Patek Philippe Brown Leather Presentation Box'
    },
    mrp: 19999,
    price: 5899,
    discountPercent: 71,
    isHot: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 45,
    primaryImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Nautilus Sunburst Blue': [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
      ],
      'Nautilus Olive Green': [
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w8-blu', productId: 'prod-w8', variantType: 'color', name: 'Nautilus Sunburst Blue', sku: 'PP-NTL-BLU', stockQuantity: 4 },
      { id: 'v-w8-grn', productId: 'prod-w8', variantType: 'color', name: 'Nautilus Olive Green', sku: 'PP-NTL-GRN', stockQuantity: 2 },
    ],
    availableSizes: ['40mm Standard'],
    availableColors: ['Nautilus Sunburst Blue', 'Nautilus Olive Green'],
    inStock: true,
  },

  // W9. Cartier Santos de Cartier Large
  {
    id: 'prod-w9',
    slug: 'cartier-santos-de-cartier-large',
    title: 'Cartier Santos de Cartier Large Steel Roman Dial',
    brand: 'Cartier',
    brandSlug: 'cartier',
    category: 'watches',
    description: 'The world’s first pilot watch created in 1904. Square curved case with exposed bezel screws, iconic Roman numeral opaline dial, blued steel sword hands, and QuickSwitch interchangeable bracelet system.',
    specs: {
      'Movement': 'Automatic Calibre 1847 MC Clone with Date Window',
      'Case Dimensions': '39.8 mm x 47.5 mm (Large Model)',
      'Crown': 'Heptagonal Crown Set with a Blue Synthetic Spinel',
      'Dial': 'Silvered Opaline Dial with Black Roman Numerals',
      'Glass': 'Scratch-Proof Sapphire Crystal',
      'Packaging': 'Cartier Red Jewelry Presentation Box'
    },
    mrp: 14999,
    price: 4399,
    discountPercent: 71,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 36,
    primaryImage: 'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Classic Opaline White / Roman': [
        'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=900&q=85'
      ],
      'Sunray Midnight Blue Dial': [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w9-wht', productId: 'prod-w9', variantType: 'color', name: 'Classic Opaline White / Roman', sku: 'CRT-SNT-WHT', stockQuantity: 5 },
      { id: 'v-w9-blu', productId: 'prod-w9', variantType: 'color', name: 'Sunray Midnight Blue Dial', sku: 'CRT-SNT-BLU', stockQuantity: 3 },
    ],
    availableSizes: ['Large Model (39.8mm)'],
    availableColors: ['Classic Opaline White / Roman', 'Sunray Midnight Blue Dial'],
    inStock: true,
  },

  // W10. Casio G-Shock Full Metal CasiOak
  {
    id: 'prod-w10',
    slug: 'casio-gshock-full-metal-casioak-gm-b2100',
    title: 'Casio G-Shock Full Metal "CasiOak" GM-B2100',
    brand: 'Casio G-Shock',
    brandSlug: 'casio',
    category: 'watches',
    description: 'Heavy solid all-stainless steel construction of the viral octagonal CasiOak. Shock-resistant buffer structure, dual analog-digital display, high-brightness double LED illumination, and solid stainless steel bracelet.',
    specs: {
      'Movement': 'Tough Solar Quartz Dual Time Movement',
      'Case Diameter': '44.4 mm Full Solid Metal Construction',
      'Bezel': 'Forged, Cut & Polished Solid Stainless Steel',
      'Glass': 'Hardened Mineral Crystal with Anti-Scratch Finish',
      'Water Resistance': '200M Shock & Splash Resistant',
      'Packaging': 'G-Shock Hexagonal Metal Tin & Outer Box'
    },
    mrp: 8999,
    price: 2499,
    discountPercent: 72,
    isHot: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 64,
    primaryImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Silver Steel / Black Dial': [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'
      ],
      'Stealth Full Ion Black': [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-w10-slv', productId: 'prod-w10', variantType: 'color', name: 'Silver Steel / Black Dial', sku: 'CSO-OAK-SLV', stockQuantity: 7 },
      { id: 'v-w10-blk', productId: 'prod-w10', variantType: 'color', name: 'Stealth Full Ion Black', sku: 'CSO-OAK-BLK', stockQuantity: 4 },
    ],
    availableSizes: ['Standard 44mm'],
    availableColors: ['Silver Steel / Black Dial', 'Stealth Full Ion Black'],
    inStock: true,
  },

  // ==========================================
  // 2. SNEAKERS (10 Products with color-switching images & UK sizes!)
  // ==========================================

  // S1. Travis Scott x Air Jordan 1 Low
  {
    id: 'prod-s1',
    slug: 'nike-air-jordan-1-low-travis-scott',
    title: 'Air Jordan 1 Low x Travis Scott Edition',
    brand: 'Air Jordan',
    brandSlug: 'air-jordan',
    category: 'sneakers',
    description: '1:1 Master Quality batch featuring premium suede nubuck underlays, tumbled sail leather overlays, reverse oversized cream Swoosh, Cactus Jack embroidered heel motifs, and sail vintage midsole.',
    specs: {
      'Upper': 'Genuine Suede Nubuck & Tumbled Leather',
      'Sole': 'Encapsulated Air-Cushioned Rubber Cupsole',
      'Laces Included': '3 Extra pairs (Cream, Brown, Pink or Red)',
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
    colorImages: {
      'Reverse Mocha': [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85'
      ],
      'Black Phantom': [
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ],
      'Fragment Blue': [
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s1-uk6', productId: 'prod-s1', variantType: 'size', name: 'UK 6', sku: 'AJ1-TS-UK6', stockQuantity: 4 },
      { id: 'v-s1-uk7', productId: 'prod-s1', variantType: 'size', name: 'UK 7', sku: 'AJ1-TS-UK7', stockQuantity: 6 },
      { id: 'v-s1-uk8', productId: 'prod-s1', variantType: 'size', name: 'UK 8', sku: 'AJ1-TS-UK8', stockQuantity: 5 },
      { id: 'v-s1-uk9', productId: 'prod-s1', variantType: 'size', name: 'UK 9', sku: 'AJ1-TS-UK9', stockQuantity: 3 },
      { id: 'v-s1-uk10', productId: 'prod-s1', variantType: 'size', name: 'UK 10', sku: 'AJ1-TS-UK10', stockQuantity: 4 },
      { id: 'v-s1-uk11', productId: 'prod-s1', variantType: 'size', name: 'UK 11', sku: 'AJ1-TS-UK11', stockQuantity: 2 },
    ],
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Reverse Mocha', 'Black Phantom', 'Fragment Blue'],
    inStock: true,
  },

  // S2. Nike Dunk Low Retro Panda
  {
    id: 'prod-s2',
    slug: 'nike-dunk-low-retro-panda',
    title: 'Nike Dunk Low Retro "Panda" Classic',
    brand: 'Nike',
    brandSlug: 'nike',
    category: 'sneakers',
    description: 'The universally loved classic silhouette. Crisp white base with sleek black leather panels, padded collar, perforated toe box, and durable two-tone rubber traction cupsole.',
    specs: {
      'Upper': 'Full-Grain Smooth Cowhide Leather',
      'Sole': 'Flexible Vulcanized Cupsole with Pivot Circle',
      'Comfort': 'Padded Low-Cut Collar & Soft Foam Sockliner',
      'Box': 'Original Red Nike Sportswear Hardcase Box'
    },
    mrp: 6999,
    price: 2499,
    discountPercent: 64,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 112,
    primaryImage: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
    ],
    colorImages: {
      'Panda Black & White': [
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ],
      'Grey Fog / White': [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85'
      ],
      'UNC University Blue': [
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s2-uk6', productId: 'prod-s2', variantType: 'size', name: 'UK 6', sku: 'DNK-PND-UK6', stockQuantity: 6 },
      { id: 'v-s2-uk7', productId: 'prod-s2', variantType: 'size', name: 'UK 7', sku: 'DNK-PND-UK7', stockQuantity: 8 },
      { id: 'v-s2-uk8', productId: 'prod-s2', variantType: 'size', name: 'UK 8', sku: 'DNK-PND-UK8', stockQuantity: 10 },
      { id: 'v-s2-uk9', productId: 'prod-s2', variantType: 'size', name: 'UK 9', sku: 'DNK-PND-UK9', stockQuantity: 7 },
      { id: 'v-s2-uk10', productId: 'prod-s2', variantType: 'size', name: 'UK 10', sku: 'DNK-PND-UK10', stockQuantity: 5 },
      { id: 'v-s2-uk11', productId: 'prod-s2', variantType: 'size', name: 'UK 11', sku: 'DNK-PND-UK11', stockQuantity: 3 },
    ],
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Panda Black & White', 'Grey Fog / White', 'UNC University Blue'],
    inStock: true,
  },

  // S3. Adidas Samba OG Gum Sole
  {
    id: 'prod-s3',
    slug: 'adidas-samba-og-white-black-gum',
    title: 'Adidas Samba OG Retro Gum Sole Sneakers',
    brand: 'Adidas',
    brandSlug: 'adidas',
    category: 'sneakers',
    description: 'The definitive streetwear and terrace fashion staple. Smooth leather upper with soft suede T-toe overlay, serrated 3-Stripes, gold-foil Samba lettering, and vintage gum rubber outsole.',
    specs: {
      'Upper': 'Full-Grain Soft Leather with Suede T-Toe Overlay',
      'Outsole': 'Vintage Gum Rubber Sole with Diamond Traction',
      'Fit': 'True to Size Low Profile Retro Sneaker',
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
    colorImages: {
      'Cloud White / Core Black': [
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85'
      ],
      'Core Black / Cloud White': [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ],
      'Silver Metallic Edition': [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s3-uk6', productId: 'prod-s3', variantType: 'size', name: 'UK 6', sku: 'SMB-UK6', stockQuantity: 4 },
      { id: 'v-s3-uk7', productId: 'prod-s3', variantType: 'size', name: 'UK 7', sku: 'SMB-UK7', stockQuantity: 7 },
      { id: 'v-s3-uk8', productId: 'prod-s3', variantType: 'size', name: 'UK 8', sku: 'SMB-UK8', stockQuantity: 9 },
      { id: 'v-s3-uk9', productId: 'prod-s3', variantType: 'size', name: 'UK 9', sku: 'SMB-UK9', stockQuantity: 5 },
      { id: 'v-s3-uk10', productId: 'prod-s3', variantType: 'size', name: 'UK 10', sku: 'SMB-UK10', stockQuantity: 3 },
    ],
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Cloud White / Core Black', 'Core Black / Cloud White', 'Silver Metallic Edition'],
    inStock: true,
  },

  // S4. Air Jordan 4 Retro Bred Reimagined
  {
    id: 'prod-s4',
    slug: 'air-jordan-4-retro-bred-reimagined',
    title: 'Air Jordan 4 Retro "Bred Reimagined" High-Top',
    brand: 'Air Jordan',
    brandSlug: 'air-jordan',
    category: 'sneakers',
    description: 'Upgraded with premium full-grain black leather replacing traditional nubuck. Signature structural wing eyelets, mesh netting quarter panels, visible Air heel unit, and embossed Nike Air heel branding.',
    specs: {
      'Upper': 'Plush Full-Grain Black Tumbled Leather',
      'Cushioning': 'Visible Air Sole Unit in Heel & Encapsulated Forefoot Air',
      'Hardware': 'Molded TPU Eyestays & Support Wings',
      'Box': 'Retro Air Jordan 4 Cement Splatter Box'
    },
    mrp: 9499,
    price: 3299,
    discountPercent: 65,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 71,
    primaryImage: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Bred Reimagined (Black / Red)': [
        'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=85'
      ],
      'Military Black & White': [
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85'
      ],
      'Pine Green SB': [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s4-uk7', productId: 'prod-s4', variantType: 'size', name: 'UK 7', sku: 'AJ4-BRD-UK7', stockQuantity: 4 },
      { id: 'v-s4-uk8', productId: 'prod-s4', variantType: 'size', name: 'UK 8', sku: 'AJ4-BRD-UK8', stockQuantity: 6 },
      { id: 'v-s4-uk9', productId: 'prod-s4', variantType: 'size', name: 'UK 9', sku: 'AJ4-BRD-UK9', stockQuantity: 3 },
      { id: 'v-s4-uk10', productId: 'prod-s4', variantType: 'size', name: 'UK 10', sku: 'AJ4-BRD-UK10', stockQuantity: 5 },
      { id: 'v-s4-uk11', productId: 'prod-s4', variantType: 'size', name: 'UK 11', sku: 'AJ4-BRD-UK11', stockQuantity: 2 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Bred Reimagined (Black / Red)', 'Military Black & White', 'Pine Green SB'],
    inStock: true,
  },

  // S5. New Balance 550 Vintage Low
  {
    id: 'prod-s5',
    slug: 'new-balance-550-vintage-retro',
    title: 'New Balance 550 Vintage Basketball Low',
    brand: 'New Balance',
    brandSlug: 'new-balance',
    category: 'sneakers',
    description: 'A tribute to 1989 basketball culture. Premium layered leather construction, vintage aged cream midsole, micro-perforated midfoot panels, and padded tongue with basketball graphic patch.',
    specs: {
      'Upper': 'Layered Full-Grain Leather & Suede Mudguard',
      'Midsole': 'Cushioned EVA Foam with Rubber Outsole',
      'Weight': 'Solid Sturdy Retro Basketball Build',
      'Box': 'Original Grey New Balance Box'
    },
    mrp: 6999,
    price: 2499,
    discountPercent: 64,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 49,
    primaryImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Sea Salt / White Grey': [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85'
      ],
      'White & Forest Green': [
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85'
      ],
      'Shadow Black & Grey': [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s5-uk7', productId: 'prod-s5', variantType: 'size', name: 'UK 7', sku: 'NB-550-UK7', stockQuantity: 5 },
      { id: 'v-s5-uk8', productId: 'prod-s5', variantType: 'size', name: 'UK 8', sku: 'NB-550-UK8', stockQuantity: 7 },
      { id: 'v-s5-uk9', productId: 'prod-s5', variantType: 'size', name: 'UK 9', sku: 'NB-550-UK9', stockQuantity: 4 },
      { id: 'v-s5-uk10', productId: 'prod-s5', variantType: 'size', name: 'UK 10', sku: 'NB-550-UK10', stockQuantity: 3 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Sea Salt / White Grey', 'White & Forest Green', 'Shadow Black & Grey'],
    inStock: true,
  },

  // S6. Nike Air Force 1 '07 Low
  {
    id: 'prod-s6',
    slug: 'nike-air-force-1-07-low-classic',
    title: 'Nike Air Force 1 \'07 Low All-Time Essential',
    brand: 'Nike',
    brandSlug: 'nike',
    category: 'sneakers',
    description: 'The most legendary streetwear sneaker on earth. Pristine crisp leather, metal AF1 lace deubré dubrae, chunky encapsulated air-cushioned midsole, and pivot-point star-tread outsole.',
    specs: {
      'Upper': 'Smooth Crisp White Full-Grain Leather',
      'Sole': 'Thick Air-Cushioned Stitched Rubber Sole',
      'Details': 'Metal AF1 Silver Lace Lock Included',
      'Box': 'Nike Sportswear Classic Grey Box'
    },
    mrp: 5999,
    price: 2199,
    discountPercent: 63,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 140,
    primaryImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Triple White': [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85'
      ],
      'Triple Black': [
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85'
      ],
      'White / Pine Green Swoosh': [
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s6-uk6', productId: 'prod-s6', variantType: 'size', name: 'UK 6', sku: 'AF1-UK6', stockQuantity: 8 },
      { id: 'v-s6-uk7', productId: 'prod-s6', variantType: 'size', name: 'UK 7', sku: 'AF1-UK7', stockQuantity: 12 },
      { id: 'v-s6-uk8', productId: 'prod-s6', variantType: 'size', name: 'UK 8', sku: 'AF1-UK8', stockQuantity: 15 },
      { id: 'v-s6-uk9', productId: 'prod-s6', variantType: 'size', name: 'UK 9', sku: 'AF1-UK9', stockQuantity: 10 },
      { id: 'v-s6-uk10', productId: 'prod-s6', variantType: 'size', name: 'UK 10', sku: 'AF1-UK10', stockQuantity: 6 },
    ],
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Triple White', 'Triple Black', 'White / Pine Green Swoosh'],
    inStock: true,
  },

  // S7. Yeezy Boost 350 V2
  {
    id: 'prod-s7',
    slug: 'yeezy-boost-350-v2-slip-on',
    title: 'Yeezy Boost 350 V2 Primeknit Ultra-Comfort',
    brand: 'Yeezy',
    brandSlug: 'yeezy',
    category: 'sneakers',
    description: 'Unrivaled comfort with re-engineered Primeknit upper, post-dyed monofilament side stripe, and full-length responsive Boost foam encased in ribbed TPU sidewalls.',
    specs: {
      'Upper': 'Breathable Engineered Primeknit',
      'Midsole': 'Full-Length Responsive Boost Cushioning',
      'Closure': 'Lace-Up with Infinity Stitching Option',
      'Box': 'Cardboard 350 V2 Slide-Out Box'
    },
    mrp: 7999,
    price: 2799,
    discountPercent: 65,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 58,
    primaryImage: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Zebra (White / Black)': [
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85'
      ],
      'Bone Off-White': [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85'
      ],
      'Onyx Stealth Black': [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s7-uk7', productId: 'prod-s7', variantType: 'size', name: 'UK 7', sku: 'YZY-UK7', stockQuantity: 4 },
      { id: 'v-s7-uk8', productId: 'prod-s7', variantType: 'size', name: 'UK 8', sku: 'YZY-UK8', stockQuantity: 6 },
      { id: 'v-s7-uk9', productId: 'prod-s7', variantType: 'size', name: 'UK 9', sku: 'YZY-UK9', stockQuantity: 5 },
      { id: 'v-s7-uk10', productId: 'prod-s7', variantType: 'size', name: 'UK 10', sku: 'YZY-UK10', stockQuantity: 3 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Zebra (White / Black)', 'Bone Off-White', 'Onyx Stealth Black'],
    inStock: true,
  },

  // S8. Asics Gel-Kayano 14 Metallic
  {
    id: 'prod-s8',
    slug: 'asics-gel-kayano-14-metallic-runner',
    title: 'Asics Gel-Kayano 14 Metallic Y2K Running Shoes',
    brand: 'Asics',
    brandSlug: 'asics',
    category: 'sneakers',
    description: 'The pinnacle of the Y2K metallic dad-shoe aesthetic. Open mesh base with shiny synthetic silver overlays, visible shock-absorbing GEL technology in forefoot and rearfoot, and TRUSSTIC support system.',
    specs: {
      'Upper': 'Layered Breathable Mesh with Metallic Synthetic Panels',
      'Cushioning': 'GEL Technology Dampening Units',
      'Style': 'Y2K Tech-Runner Streetwear Silhouette',
      'Box': 'Asics Sportstyle Blue Box'
    },
    mrp: 7499,
    price: 2699,
    discountPercent: 64,
    isHot: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 39,
    primaryImage: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Cream / Pure Silver': [
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=85'
      ],
      'Black / Coffee Metallic': [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s8-uk7', productId: 'prod-s8', variantType: 'size', name: 'UK 7', sku: 'ASC-KYN-UK7', stockQuantity: 3 },
      { id: 'v-s8-uk8', productId: 'prod-s8', variantType: 'size', name: 'UK 8', sku: 'ASC-KYN-UK8', stockQuantity: 5 },
      { id: 'v-s8-uk9', productId: 'prod-s8', variantType: 'size', name: 'UK 9', sku: 'ASC-KYN-UK9', stockQuantity: 4 },
      { id: 'v-s8-uk10', productId: 'prod-s8', variantType: 'size', name: 'UK 10', sku: 'ASC-KYN-UK10', stockQuantity: 2 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Cream / Pure Silver', 'Black / Coffee Metallic'],
    inStock: true,
  },

  // S9. Air Jordan 1 High OG Chicago Lost & Found
  {
    id: 'prod-s9',
    slug: 'air-jordan-1-high-chicago-lost-and-found',
    title: 'Air Jordan 1 High OG "Chicago Lost & Found"',
    brand: 'Air Jordan',
    brandSlug: 'air-jordan',
    category: 'sneakers',
    description: 'The sneaker that started it all, built with vintage 1985 aesthetics. Cracked leather collar detailing, aged muslin tongue, Varsity Red leather overlays, and mismatched replacement box lid.',
    specs: {
      'Upper': 'Cracked Vintage Leather & Full-Grain Red Leather',
      'Sole': 'Aged Sail Rubber Cupsole with Air Cushioning',
      'Extras': 'Vintage Receipt Printout & Spare Black Laces',
      'Box': 'Distressed 1985 Air Jordan Box with Replacement Lid'
    },
    mrp: 8999,
    price: 3199,
    discountPercent: 64,
    isHot: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 96,
    primaryImage: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Chicago Varsity Red & White': [
        'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=85'
      ],
      'Black Toe Retro': [
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s9-uk7', productId: 'prod-s9', variantType: 'size', name: 'UK 7', sku: 'AJ1-CHG-UK7', stockQuantity: 4 },
      { id: 'v-s9-uk8', productId: 'prod-s9', variantType: 'size', name: 'UK 8', sku: 'AJ1-CHG-UK8', stockQuantity: 6 },
      { id: 'v-s9-uk9', productId: 'prod-s9', variantType: 'size', name: 'UK 9', sku: 'AJ1-CHG-UK9', stockQuantity: 5 },
      { id: 'v-s9-uk10', productId: 'prod-s9', variantType: 'size', name: 'UK 10', sku: 'AJ1-CHG-UK10', stockQuantity: 3 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Chicago Varsity Red & White', 'Black Toe Retro'],
    inStock: true,
  },

  // S10. Air Jordan 1 Low Travis Scott "Black Phantom"
  {
    id: 'prod-s10',
    slug: 'air-jordan-1-low-travis-scott-black-phantom',
    title: 'Air Jordan 1 Low Travis Scott "Black Phantom"',
    brand: 'Air Jordan',
    brandSlug: 'air-jordan',
    category: 'sneakers',
    description: 'Triple black stealth with bold contrast stitching. Premium jet-black nubuck and suede, reverse lateral swoosh, embroidered bee emblem representing Travis’s daughter Stormi, and bandana included.',
    specs: {
      'Upper': 'All-Black Velvety Suede & Nubuck with White Contrast Stitching',
      'Sole': 'Solid Black Rubber Cupsole',
      'Included': 'Two Cactus Jack Paisley Bandanas & 3 Lace Sets',
      'Box': 'Special Edition Matte Black Cactus Jack Box'
    },
    mrp: 8999,
    price: 3099,
    discountPercent: 65,
    isHot: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 47,
    primaryImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'All Black Phantom': [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-s10-uk7', productId: 'prod-s10', variantType: 'size', name: 'UK 7', sku: 'AJ1-PHT-UK7', stockQuantity: 3 },
      { id: 'v-s10-uk8', productId: 'prod-s10', variantType: 'size', name: 'UK 8', sku: 'AJ1-PHT-UK8', stockQuantity: 5 },
      { id: 'v-s10-uk9', productId: 'prod-s10', variantType: 'size', name: 'UK 9', sku: 'AJ1-PHT-UK9', stockQuantity: 2 },
      { id: 'v-s10-uk10', productId: 'prod-s10', variantType: 'size', name: 'UK 10', sku: 'AJ1-PHT-UK10', stockQuantity: 4 },
    ],
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['All Black Phantom'],
    inStock: true,
  },

  // ==========================================
  // 3. STREETWEAR T-SHIRTS (8 Products with sizes S-XXL & color-switching images!)
  // ==========================================

  // T1. BroHood Heavyweight 260 GSM Boxy Drop-Shoulder Tee
  {
    id: 'prod-t1',
    slug: 'brohood-260-gsm-heavyweight-boxy-tee',
    title: 'BroHood 260 GSM Heavyweight Boxy Drop-Shoulder Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Crafted from 100% combed French Terry compact cotton with a hefty 260 GSM weight. Features dropped shoulders, a thick 1.2-inch ribbed collar that never sags, and an effortless streetwear drape.',
    specs: {
      'Fabric': '100% Combed Compact Cotton (French Terry)',
      'GSM': '260 GSM Heavyweight Fabric',
      'Fit': 'Boxy Streetwear Oversized Drop-Shoulder',
      'Collar': '1.2 inch Spandex Ribbed Neckline (Anti-Sag)',
      'Wash Care': 'Bio-Washed & Pre-Shrunk; Cold Machine Wash'
    },
    mrp: 2499,
    price: 899,
    discountPercent: 64,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 97,
    primaryImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'
    ],
    colorImages: {
      'Washed Onyx Black': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
      ],
      'Vintage Sage Green': [
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'
      ],
      'Chalk Off-White': [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85'
      ],
      'Earth Cocoa Brown': [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t1-s', productId: 'prod-t1', variantType: 'size', name: 'S', sku: 'BH-TEE-S', stockQuantity: 10 },
      { id: 'v-t1-m', productId: 'prod-t1', variantType: 'size', name: 'M', sku: 'BH-TEE-M', stockQuantity: 14 },
      { id: 'v-t1-l', productId: 'prod-t1', variantType: 'size', name: 'L', sku: 'BH-TEE-L', stockQuantity: 8 },
      { id: 'v-t1-xl', productId: 'prod-t1', variantType: 'size', name: 'XL', sku: 'BH-TEE-XL', stockQuantity: 6 },
      { id: 'v-t1-xxl', productId: 'prod-t1', variantType: 'size', name: 'XXL', sku: 'BH-TEE-XXL', stockQuantity: 4 },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Washed Onyx Black', 'Vintage Sage Green', 'Chalk Off-White', 'Earth Cocoa Brown'],
    inStock: true,
  },

  // T2. Tokyo Cyberpunk Acid-Wash Graphic Tee
  {
    id: 'prod-t2',
    slug: 'tokyo-cyberpunk-acid-wash-graphic-tee',
    title: 'Tokyo Cyberpunk Vintage Acid-Wash Heavy Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Washed mineral acid wash finish giving each piece a unique vintage fade. High-density distressed Tokyo kanji graphic print on front and back that won’t peel or crack in washing.',
    specs: {
      'Fabric': '100% Combed Cotton Single Jersey 250 GSM',
      'Print': 'Crackle Screen-Print & High-Density Puff Ink',
      'Treatment': 'Individual Mineral Enzyme Acid Wash',
      'Fit': 'Relaxed Drop-Shoulder Oversized'
    },
    mrp: 2799,
    price: 999,
    discountPercent: 64,
    isHot: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 62,
    primaryImage: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Faded Acid Charcoal': [
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'
      ],
      'Acid Washed Indigo': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t2-s', productId: 'prod-t2', variantType: 'size', name: 'S', sku: 'CP-TEE-S', stockQuantity: 8 },
      { id: 'v-t2-m', productId: 'prod-t2', variantType: 'size', name: 'M', sku: 'CP-TEE-M', stockQuantity: 12 },
      { id: 'v-t2-l', productId: 'prod-t2', variantType: 'size', name: 'L', sku: 'CP-TEE-L', stockQuantity: 9 },
      { id: 'v-t2-xl', productId: 'prod-t2', variantType: 'size', name: 'XL', sku: 'CP-TEE-XL', stockQuantity: 5 },
      { id: 'v-t2-xxl', productId: 'prod-t2', variantType: 'size', name: 'XXL', sku: 'CP-TEE-XXL', stockQuantity: 3 },
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Faded Acid Charcoal', 'Acid Washed Indigo'],
    inStock: true,
  },

  // T3. Minimalist French Terry Mock-Neck Tee
  {
    id: 'prod-t3',
    slug: 'french-terry-mock-neck-oversized-tee',
    title: 'French Terry Mock-Neck Oversized Minimal Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Elevated luxury basic featuring a subtle 1-inch raised mock-neck collar. Heavy French Terry loops inside absorb moisture while the smooth exterior keeps a crisp architectural drape.',
    specs: {
      'Fabric': '100% French Terry Loopback Cotton 270 GSM',
      'Neckline': 'Clean Ribbed Mock-Neck (1-inch rise)',
      'Seams': 'Double-Needle Flatlock Reinforcement',
      'Fit': 'Structured Boxy Fit'
    },
    mrp: 2699,
    price: 949,
    discountPercent: 65,
    isHot: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 44,
    primaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Raw Bone White': [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85'
      ],
      'Slate Grey': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
      ],
      'Pitch Black': [
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t3-s', productId: 'prod-t3', variantType: 'size', name: 'S', sku: 'MCK-TEE-S', stockQuantity: 7 },
      { id: 'v-t3-m', productId: 'prod-t3', variantType: 'size', name: 'M', sku: 'MCK-TEE-M', stockQuantity: 11 },
      { id: 'v-t3-l', productId: 'prod-t3', variantType: 'size', name: 'L', sku: 'MCK-TEE-L', stockQuantity: 7 },
      { id: 'v-t3-xl', productId: 'prod-t3', variantType: 'size', name: 'XL', sku: 'MCK-TEE-XL', stockQuantity: 4 },
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Raw Bone White', 'Slate Grey', 'Pitch Black'],
    inStock: true,
  },

  // T4. Gothic Arch Embroidered Heavyweight Tee
  {
    id: 'prod-t4',
    slug: 'gothic-arch-embroidered-heavyweight-tee',
    title: 'Gothic Arch High-Density Embroidered Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Intricate 80,000-stitch tonal gothic arch embroidery across the chest with heavy 280 GSM cotton. Built for year-round layering with a drape that holds its shape wash after wash.',
    specs: {
      'Fabric': '100% Ring-Spun Compact Combed Cotton 280 GSM',
      'Detail': 'High-Density 80,000 Stitch Embroidery',
      'Fit': 'Oversized Skater Silhouette',
      'Care': 'Machine Wash inside out in cold water'
    },
    mrp: 2999,
    price: 1049,
    discountPercent: 65,
    isHot: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 38,
    primaryImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Dark Pitch Black': [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85'
      ],
      'Forest Emerald Green': [
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t4-m', productId: 'prod-t4', variantType: 'size', name: 'M', sku: 'GTH-TEE-M', stockQuantity: 9 },
      { id: 'v-t4-l', productId: 'prod-t4', variantType: 'size', name: 'L', sku: 'GTH-TEE-L', stockQuantity: 12 },
      { id: 'v-t4-xl', productId: 'prod-t4', variantType: 'size', name: 'XL', sku: 'GTH-TEE-XL', stockQuantity: 6 },
      { id: 'v-t4-xxl', productId: 'prod-t4', variantType: 'size', name: 'XXL', sku: 'GTH-TEE-XXL', stockQuantity: 3 },
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    availableColors: ['Dark Pitch Black', 'Forest Emerald Green'],
    inStock: true,
  },

  // T5. Retro Automotive Racing Heavy Tee 280 GSM
  {
    id: 'prod-t5',
    slug: 'retro-automotive-racing-heavy-tee',
    title: 'Retro Grand Prix Automotive Racing Heavy Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Vintage 1970s Monaco and Le Mans racing aesthetic. Weathered screenprint of vintage racecars with aged typography on heavyweight 260 GSM fabric.',
    specs: {
      'Fabric': 'Bio-Washed 260 GSM Single Jersey',
      'Graphics': 'Vintage Distressed Discharge Screen Print',
      'Neck': 'Reinforced 1x1 Heavy Ribbing',
      'Fit': 'Relaxed Streetwear Drop-Shoulder'
    },
    mrp: 2499,
    price: 899,
    discountPercent: 64,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 52,
    primaryImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Aged Off-White Cream': [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85'
      ],
      'Midnight Vintage Navy': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t5-s', productId: 'prod-t5', variantType: 'size', name: 'S', sku: 'RCE-TEE-S', stockQuantity: 6 },
      { id: 'v-t5-m', productId: 'prod-t5', variantType: 'size', name: 'M', sku: 'RCE-TEE-M', stockQuantity: 10 },
      { id: 'v-t5-l', productId: 'prod-t5', variantType: 'size', name: 'L', sku: 'RCE-TEE-L', stockQuantity: 8 },
      { id: 'v-t5-xl', productId: 'prod-t5', variantType: 'size', name: 'XL', sku: 'RCE-TEE-XL', stockQuantity: 5 },
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Aged Off-White Cream', 'Midnight Vintage Navy'],
    inStock: true,
  },

  // T6. Oversized Heavyweight Cargo Pocket Tee
  {
    id: 'prod-t6',
    slug: 'heavyweight-cargo-pocket-oversized-tee',
    title: 'Heavyweight Utility Cargo Pocket Drop Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Utility-inspired streetwear essential featuring a functional nylon ripstop chest pocket with matte D-ring hardware and side-split hem.',
    specs: {
      'Fabric': '100% Combed Compact Cotton 260 GSM with Nylon Pocket',
      'Hardware': 'Matte Black Aluminum D-Ring',
      'Hem': 'Straight Cut with 2-inch Reinforced Side Splits',
      'Fit': 'Oversized Boxy Fit'
    },
    mrp: 2699,
    price: 949,
    discountPercent: 65,
    isHot: true,
    isBestseller: false,
    rating: 4.7,
    reviewCount: 29,
    primaryImage: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Army Tactical Olive': [
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85'
      ],
      'Stealth Jet Black': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t6-m', productId: 'prod-t6', variantType: 'size', name: 'M', sku: 'UTL-TEE-M', stockQuantity: 8 },
      { id: 'v-t6-l', productId: 'prod-t6', variantType: 'size', name: 'L', sku: 'UTL-TEE-L', stockQuantity: 11 },
      { id: 'v-t6-xl', productId: 'prod-t6', variantType: 'size', name: 'XL', sku: 'UTL-TEE-XL', stockQuantity: 6 },
    ],
    availableSizes: ['M', 'L', 'XL'],
    availableColors: ['Army Tactical Olive', 'Stealth Jet Black'],
    inStock: true,
  },

  // T7. Faded Vintage Mineral Wash Blank Tee
  {
    id: 'prod-t7',
    slug: 'faded-vintage-mineral-wash-blank-tee',
    title: 'Faded Vintage Mineral Wash Essential Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'No loud branding, just pure premium texture. Individually garment-dyed and enzyme washed for an ultra-soft broken-in feel straight from day one.',
    specs: {
      'Fabric': '100% Super-Combed Cotton 240 GSM',
      'Finish': 'Enzyme Stone Wash with Soft Vintage Fade',
      'Fit': 'Relaxed Streetwear Silhouette',
      'Care': 'Bio-washed to eliminate post-wash shrinkage'
    },
    mrp: 2299,
    price: 799,
    discountPercent: 65,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 56,
    primaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Charcoal Wash': [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85'
      ],
      'Muted Clay Rust': [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t7-s', productId: 'prod-t7', variantType: 'size', name: 'S', sku: 'MNR-TEE-S', stockQuantity: 7 },
      { id: 'v-t7-m', productId: 'prod-t7', variantType: 'size', name: 'M', sku: 'MNR-TEE-M', stockQuantity: 12 },
      { id: 'v-t7-l', productId: 'prod-t7', variantType: 'size', name: 'L', sku: 'MNR-TEE-L', stockQuantity: 9 },
      { id: 'v-t7-xl', productId: 'prod-t7', variantType: 'size', name: 'XL', sku: 'MNR-TEE-XL', stockQuantity: 5 },
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Charcoal Wash', 'Muted Clay Rust'],
    inStock: true,
  },

  // T8. Heavyweight Raw Hem Skate Boxy Tee
  {
    id: 'prod-t8',
    slug: 'heavyweight-raw-hem-skate-tee',
    title: 'Heavyweight Raw-Edge Hem Skater Boxy Tee',
    brand: 'BroHood Originals',
    brandSlug: 'brohood',
    category: 'tshirts',
    description: 'Distressed raw rolled-edge hemline inspired by 90s skater culture. Extra-wide chest proportions with structured drop-shoulders and reinforced neck tape.',
    specs: {
      'Fabric': '100% Compact Combed Ring-Spun Cotton 270 GSM',
      'Hem Detail': 'Raw Cut Hem with Lockstitch Fray-Proof Barrier',
      'Fit': 'Wide-Body Boxy Drop-Shoulder',
      'Pre-Wash': 'Pre-Shrunk Bio Polish'
    },
    mrp: 2499,
    price: 899,
    discountPercent: 64,
    isHot: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 31,
    primaryImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Washed Off-Black': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
      ],
      'Pure Cloud White': [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-t8-m', productId: 'prod-t8', variantType: 'size', name: 'M', sku: 'RAW-TEE-M', stockQuantity: 9 },
      { id: 'v-t8-l', productId: 'prod-t8', variantType: 'size', name: 'L', sku: 'RAW-TEE-L', stockQuantity: 11 },
      { id: 'v-t8-xl', productId: 'prod-t8', variantType: 'size', name: 'XL', sku: 'RAW-TEE-XL', stockQuantity: 6 },
    ],
    availableSizes: ['M', 'L', 'XL'],
    availableColors: ['Washed Off-Black', 'Pure Cloud White'],
    inStock: true,
  },

  // ==========================================
  // 4. DESIGNER GOGGLES & EYEWEAR (6 Products)
  // ==========================================

  // G1. Ray-Ban Original Wayfarer Classic
  {
    id: 'prod-g1',
    slug: 'ray-ban-original-wayfarer-classic-polarized',
    title: 'Ray-Ban Original Wayfarer Classic Polarized',
    brand: 'Ray-Ban',
    brandSlug: 'ray-ban',
    category: 'goggles',
    description: '1:1 replica of the legendary Wayfarer. Premium heavy acetate construction, etched RB laser marking on the left glass lens, and 100% UV400 polarized crystal eye protection.',
    specs: {
      'Lens Technology': 'UV400 Polarized G-15 Green Crystal Glass',
      'Frame Material': 'Handcrafted Italian-Grade Dense Acetate',
      'Hinge': '7-Barrel Metal Hinges with Smooth Tight Flex',
      'Packaging': 'Black Textured Leather Case, Cloth & Certificate'
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
    colorImages: {
      'Glossy Black / G-15 Green Lens': [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'
      ],
      'Tortoiseshell Havana / Brown Lens': [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-g1-blk', productId: 'prod-g1', variantType: 'color', name: 'Glossy Black / G-15 Green Lens', sku: 'RB-WYF-BLK', stockQuantity: 12 },
      { id: 'v-g1-trt', productId: 'prod-g1', variantType: 'color', name: 'Tortoiseshell Havana / Brown Lens', sku: 'RB-WYF-TRT', stockQuantity: 6 },
    ],
    availableSizes: ['Standard 50mm'],
    availableColors: ['Glossy Black / G-15 Green Lens', 'Tortoiseshell Havana / Brown Lens'],
    inStock: true,
  },

  // G2. Gentle Monster Her 01
  {
    id: 'prod-g2',
    slug: 'gentle-monster-her-01-oversized-square',
    title: 'Gentle Monster Her 01 Oversized Square Sunglasses',
    brand: 'Gentle Monster',
    brandSlug: 'gentle-monster',
    category: 'goggles',
    description: 'High-fashion statement square frame with flat Zeiss black lenses and subtle circular silver pin embellishments on the temples. Universal comfortable nose bridge fit.',
    specs: {
      'Lenses': 'Zeiss UV400 Anti-Scratch Black Flat Lenses',
      'Frame': 'Oversized Square Polished Dense Acetate',
      'Temple Details': 'Engraved Gentle Monster Wordmark & Bullet Pins',
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
    colorImages: {
      'Midnight Black': [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'
      ],
      'Dark Tortoise Shell': [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-g2-blk', productId: 'prod-g2', variantType: 'color', name: 'Midnight Black', sku: 'GM-HER-BLK', stockQuantity: 8 },
      { id: 'v-g2-trt', productId: 'prod-g2', variantType: 'color', name: 'Dark Tortoise Shell', sku: 'GM-HER-TRT', stockQuantity: 4 },
    ],
    availableSizes: ['Universal Fit'],
    availableColors: ['Midnight Black', 'Dark Tortoise Shell'],
    inStock: true,
  },

  // G3. Prada Symbole Geometric Acetate
  {
    id: 'prod-g3',
    slug: 'prada-symbole-geometric-acetate-sunglasses',
    title: 'Prada Symbole Geometric Bold Acetate Sunglasses',
    brand: 'Prada',
    brandSlug: 'prada',
    category: 'goggles',
    description: 'Chunky geometric rectangular silhouette with faceted sculptural temples featuring the iconic Prada triangular metal plaque logo.',
    specs: {
      'Frame': 'Thick Bold Rectangular Acetate Construction',
      'Lenses': '100% UVA/UVB Polarized Dark Grey Lenses',
      'Logo': 'Prada Enamelled Triangle Logo Inlay on Both Temples',
      'Packaging': 'Prada Black Saffiano Leather Box & Microfiber Pouch'
    },
    mrp: 5999,
    price: 1899,
    discountPercent: 68,
    isHot: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 41,
    primaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Solid Black / Grey Lenses': [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'
      ],
      'Marble Havana / Brown': [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-g3-blk', productId: 'prod-g3', variantType: 'color', name: 'Solid Black / Grey Lenses', sku: 'PRD-SYM-BLK', stockQuantity: 7 },
      { id: 'v-g3-hvn', productId: 'prod-g3', variantType: 'color', name: 'Marble Havana / Brown', sku: 'PRD-SYM-HVN', stockQuantity: 3 },
    ],
    availableSizes: ['Standard 53mm'],
    availableColors: ['Solid Black / Grey Lenses', 'Marble Havana / Brown'],
    inStock: true,
  },

  // G4. Ray-Ban Clubmaster Classic
  {
    id: 'prod-g4',
    slug: 'ray-ban-clubmaster-classic-browline',
    title: 'Ray-Ban Clubmaster Classic Browline Sunglasses',
    brand: 'Ray-Ban',
    brandSlug: 'ray-ban',
    category: 'goggles',
    description: 'Retro browline vintage silhouette with polished black acetate upper brows, gold wire rims, adjustable silicone nose pads, and G-15 crystal glass lenses.',
    specs: {
      'Lenses': 'Polarized G-15 Green Crystal Glass Lenses',
      'Frame': 'Black Acetate Browline with Gold-Plated Metal Rim',
      'Nose Pads': 'Soft Adjustable Hypoallergenic Silicone',
      'Box': 'Ray-Ban Tan Leather Protective Case & Booklets'
    },
    mrp: 4799,
    price: 1499,
    discountPercent: 69,
    isHot: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 37,
    primaryImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Ebony Black & Gold Wire': [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'
      ],
      'Mock Tortoise & Gold': [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-g4-blk', productId: 'prod-g4', variantType: 'color', name: 'Ebony Black & Gold Wire', sku: 'RB-CLB-BLK', stockQuantity: 9 },
      { id: 'v-g4-trt', productId: 'prod-g4', variantType: 'color', name: 'Mock Tortoise & Gold', sku: 'RB-CLB-TRT', stockQuantity: 5 },
    ],
    availableSizes: ['Standard 51mm'],
    availableColors: ['Ebony Black & Gold Wire', 'Mock Tortoise & Gold'],
    inStock: true,
  },

  // G5. Gentle Monster Lilit Oversized Acetate
  {
    id: 'prod-g5',
    slug: 'gentle-monster-lilit-square-sunglasses',
    title: 'Gentle Monster Lilit 01 Flat Top Sunglasses',
    brand: 'Gentle Monster',
    brandSlug: 'gentle-monster',
    category: 'goggles',
    description: 'Clean modern square silhouette with smooth rounded corners, flat black 99.9% UV protection lenses, and subtle circular metal studs at the corners.',
    specs: {
      'Lenses': 'Zeiss UV400 Black Flat Lenses',
      'Frame': 'Handcrafted Glossy Black Acetate',
      'Style': 'Unisex Contemporary Minimalist Aesthetic',
      'Case': 'Gentle Monster Signature White Presentation Box'
    },
    mrp: 5299,
    price: 1699,
    discountPercent: 68,
    isHot: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 22,
    primaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Jet Black 01': [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-g5-blk', productId: 'prod-g5', variantType: 'color', name: 'Jet Black 01', sku: 'GM-LLT-BLK', stockQuantity: 6 },
    ],
    availableSizes: ['Universal Fit'],
    availableColors: ['Jet Black 01'],
    inStock: true,
  },

  // G6. Ray-Ban Aviator Classic Polarized
  {
    id: 'prod-g6',
    slug: 'ray-ban-aviator-classic-polarized-gold',
    title: 'Ray-Ban Aviator Classic Polarized Gold Wire',
    brand: 'Ray-Ban',
    brandSlug: 'ray-ban',
    category: 'goggles',
    description: 'The iconic 1937 teardrop design originally created for US aviators. Lightweight gold metal wire frame with crystal green polarized G-15 glass lenses and clear temple tips.',
    specs: {
      'Lenses': 'Polarized G-15 Teardrop Crystal Glass',
      'Frame': 'Polished Gold-Plated Lightweight Steel Wire',
      'Bridge': 'Double Brow Bar with Laser Stamp',
      'Box': 'Ray-Ban Case, Cloth and Guarantee Booklet'
    },
    mrp: 4999,
    price: 1549,
    discountPercent: 69,
    isHot: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 68,
    primaryImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'],
    colorImages: {
      'Gold Frame / G-15 Green Lens': [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85'
      ],
      'Black Metal Frame / Black Lens': [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'
      ]
    },
    variants: [
      { id: 'v-g6-gld', productId: 'prod-g6', variantType: 'color', name: 'Gold Frame / G-15 Green Lens', sku: 'RB-AVT-GLD', stockQuantity: 8 },
      { id: 'v-g6-blk', productId: 'prod-g6', variantType: 'color', name: 'Black Metal Frame / Black Lens', sku: 'RB-AVT-BLK', stockQuantity: 5 },
    ],
    availableSizes: ['Standard 58mm'],
    availableColors: ['Gold Frame / G-15 Green Lens', 'Black Metal Frame / Black Lens'],
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
  return PRODUCTS.slice(0, 8);
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
