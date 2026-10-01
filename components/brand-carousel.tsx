'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Watch, ArrowRight } from 'lucide-react';

interface BrandItem {
  name: string;
  slug: string;
  category: 'watches' | 'sneakers' | 'goggles';
  categoryLabel: string;
  tagline: string;
  image: string;
  badge: string;
}

const BRANDS_DATA: BrandItem[] = [
  // Luxury Watches
  {
    name: 'Tissot',
    slug: 'tissot',
    category: 'watches',
    categoryLabel: 'Swiss Timepieces',
    tagline: 'PRX Powermatic 80 Waffle Dial',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85',
    badge: 'Automatic Sweep',
  },
  {
    name: 'Rolex',
    slug: 'rolex',
    category: 'watches',
    categoryLabel: 'Swiss Timepieces',
    tagline: 'Submariner Date & Daytona Panda',
    image: 'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?auto=format&fit=crop&w=800&q=85',
    badge: '904L Steel & Ceramic',
  },
  {
    name: 'Hublot',
    slug: 'hublot',
    category: 'watches',
    categoryLabel: 'Swiss Timepieces',
    tagline: 'Big Bang Unico Chrono Ceramic',
    image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=85',
    badge: 'Working Chronograph',
  },
  {
    name: 'Rado',
    slug: 'rado',
    category: 'watches',
    categoryLabel: 'Swiss Timepieces',
    tagline: 'Centrix High-Tech Ceramic Jubilee',
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=85',
    badge: 'High-Tech Ceramic',
  },
  {
    name: 'Audemars Piguet',
    slug: 'audemars-piguet',
    category: 'watches',
    categoryLabel: 'Swiss Timepieces',
    tagline: 'Royal Oak 41mm Blue Tapisserie',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85',
    badge: 'Octagonal Bezel',
  },
  {
    name: 'Cartier',
    slug: 'cartier',
    category: 'watches',
    categoryLabel: 'Swiss Timepieces',
    tagline: 'Santos de Cartier Steel',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=85',
    badge: 'Classic Roman Dial',
  },
  {
    name: 'Omega',
    slug: 'omega',
    category: 'watches',
    categoryLabel: 'Swiss Timepieces',
    tagline: 'Speedmaster & Seamaster 300M',
    image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=800&q=85',
    badge: 'Master Chronometer',
  },

  // Hype Sneakers
  {
    name: 'Air Jordan',
    slug: 'air-jordan',
    category: 'sneakers',
    categoryLabel: 'Hype Footwear',
    tagline: 'Retro 1 High & 4 Retro Cactus Jack',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85',
    badge: 'Travis Scott Edition',
  },
  {
    name: 'Nike',
    slug: 'nike',
    category: 'sneakers',
    categoryLabel: 'Hype Footwear',
    tagline: 'Dunk Low Retro Panda',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=85',
    badge: 'Daily Low-Top',
  },
  {
    name: 'Adidas',
    slug: 'adidas',
    category: 'sneakers',
    categoryLabel: 'Hype Footwear',
    tagline: 'Samba OG & Terrace Classics',
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=85',
    badge: 'Gum Sole Classic',
  },
  {
    name: 'New Balance',
    slug: 'new-balance',
    category: 'sneakers',
    categoryLabel: 'Hype Footwear',
    tagline: '550 Vintage White & Grey',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=85',
    badge: 'Retro Court',
  },

  // Luxury Eyewear
  {
    name: 'Ray-Ban',
    slug: 'ray-ban',
    category: 'goggles',
    categoryLabel: 'Designer Eyewear',
    tagline: 'Wayfarer Classic Polarized',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85',
    badge: 'UV400 Polarized',
  },
  {
    name: 'Gentle Monster',
    slug: 'gentle-monster',
    category: 'goggles',
    categoryLabel: 'Designer Eyewear',
    tagline: 'Her 01 Flat-Top Statement Frame',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=85',
    badge: 'Oversized Acetate',
  },
  {
    name: 'Prada',
    slug: 'prada',
    category: 'goggles',
    categoryLabel: 'Designer Eyewear',
    tagline: 'Symbole Geometric Luxury Sunglasses',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=85',
    badge: 'Geometric Temple',
  },
];

export function BrandCarousel() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'watches' | 'sneakers' | 'goggles'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredBrands = activeCategory === 'all'
    ? BRANDS_DATA
    : BRANDS_DATA.filter((b) => b.category === activeCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 border-b border-white/5 bg-[#0b0c0f] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 space-y-6 w-full min-w-0">
        {/* Header & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
          <div>
            <p className="text-xs uppercase tracking-widest font-black text-amber-400 mb-1">
              Featured Houses &amp; Labels
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-heading">
              Shop by Brand
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Curated collections from premier Swiss watchmakers, hype sneaker houses, and eyewear labels.
            </p>
          </div>

          {/* Category Tabs & Carousel Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto overflow-hidden">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold overflow-x-auto no-scrollbar scrollbar-none max-w-full">
              {[
                { id: 'all', label: 'All Brands' },
                { id: 'watches', label: 'Luxury Watches' },
                { id: 'sneakers', label: 'Hype Sneakers' },
                { id: 'goggles', label: 'Eyewear' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === tab.id
                      ? 'bg-amber-400 text-black shadow-md font-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Left / Right Nav Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleScroll('left')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                aria-label="Previous brands"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                aria-label="Next brands"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Enlarged Brand Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none no-scrollbar snap-x snap-mandatory w-full max-w-full"
        >
          {filteredBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/shop?brand=${brand.slug}`}
              className="group relative flex-shrink-0 w-52 sm:w-64 aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/60 bg-[#14151a] shadow-xl hover:shadow-[0_12px_35px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-[1.02] snap-start flex flex-col justify-end p-5"
            >
              {/* Background Product Image */}
              <div className="absolute inset-0">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
              </div>

              {/* Bottom Card Content with Clean Typography */}
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  <span>{brand.categoryLabel}</span>
                  <span className="text-zinc-400 font-medium text-[10px]">{brand.badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-zinc-300 font-medium line-clamp-1">
                  {brand.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Drops</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Brands Directory Link */}
        <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
          <span>Showing {filteredBrands.length} featured labels</span>
          <Link
            href="/brands"
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline"
          >
            <span>View Complete Brands Directory</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
