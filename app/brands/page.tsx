'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';
import { BRANDS } from '@/lib/db';

export default function BrandsDirectoryPage() {
  const watchBrands = BRANDS.filter((b) => b.categorySlug === 'watches');
  const sneakerBrands = BRANDS.filter((b) => b.categorySlug === 'sneakers');
  const goggleBrands = BRANDS.filter((b) => b.categorySlug === 'goggles');
  const apparelBrands = BRANDS.filter((b) => b.categorySlug === 'tshirts');

  const brandGroups = [
    { title: 'Luxury Timepieces', brands: watchBrands, cat: 'watches' },
    { title: 'Hype Sneakers & Retros', brands: sneakerBrands, cat: 'sneakers' },
    { title: 'Designer Eyewear', brands: goggleBrands, cat: 'goggles' },
    { title: 'Streetwear Apparel', brands: apparelBrands, cat: 'tshirts' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 text-white space-y-10">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles size={24} className="text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Brands Directory
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Explore curated 1:1 first copy editions by your favorite luxury and streetwear houses.
        </p>
      </div>

      <div className="space-y-12">
        {brandGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-amber-400">
                {group.title}
              </h2>
              <Link
                href={`/shop?category=${group.cat}`}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <span>View All In Category</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {group.brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/shop?brand=${brand.slug}`}
                  className="p-4 rounded-2xl bg-[#121316] hover:bg-[#18191e] border border-white/5 hover:border-amber-400/40 transition-all flex items-center justify-between group shadow-md"
                >
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300">
                    {brand.name}
                  </span>
                  <ArrowRight size={14} className="text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
