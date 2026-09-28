'use client';

import Link from 'next/link';

export function BrandCarousel() {
  const featuredBrands = [
    {
      name: 'Rolex',
      slug: 'rolex',
      cat: 'Luxury Watches',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
      badge: 'Automatic',
    },
    {
      name: 'Air Jordan',
      slug: 'air-jordan',
      cat: 'Retro Sneakers',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
      badge: 'Retros',
    },
    {
      name: 'AP',
      slug: 'audemars-piguet',
      cat: 'Royal Oak',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
      badge: 'Tapisserie',
    },
    {
      name: 'Nike',
      slug: 'nike',
      cat: 'Dunks & Air',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=80',
      badge: 'Dunk Low',
    },
    {
      name: 'Cartier',
      slug: 'cartier',
      cat: 'Santos & Tank',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
      badge: 'Classic',
    },
    {
      name: 'Adidas',
      slug: 'adidas',
      cat: 'Samba & Terrace',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80',
      badge: 'Samba OG',
    },
    {
      name: 'New Balance',
      slug: 'new-balance',
      cat: '550 & 9060s',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80',
      badge: '550 Retro',
    },
    {
      name: 'Ray-Ban',
      slug: 'ray-ban',
      cat: 'Wayfarer & Aviator',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80',
      badge: 'Polarized',
    },
    {
      name: 'Gentle Monster',
      slug: 'gentle-monster',
      cat: 'Fashion Frames',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80',
      badge: 'Zeiss Lens',
    },
    {
      name: 'BroHood',
      slug: 'brohood',
      cat: '260 GSM Tees',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
      badge: 'Oversized',
    },
  ];

  return (
    <section className="py-8 border-b border-white/5 bg-[#0e0e11]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Shop by Brand
            </h3>
            <p className="text-[11px] text-zinc-400">1:1 Master Quality collections from top luxury & streetwear houses</p>
          </div>
          <Link href="/shop" className="text-xs text-amber-400 hover:text-amber-300 font-bold transition-colors">
            All Brands →
          </Link>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/shop?brand=${brand.slug}`}
              className="flex flex-col items-center gap-2 group flex-shrink-0"
            >
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border border-white/10 group-hover:border-amber-400 bg-black/60 shadow-lg transition-all duration-300 group-hover:scale-105">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-1.5 left-1 right-1 text-center text-[10px] font-bold text-white group-hover:text-amber-300 truncate">
                  {brand.name}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-white uppercase tracking-wider text-center">
                {brand.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
