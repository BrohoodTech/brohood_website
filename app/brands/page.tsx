import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Flame, ArrowRight } from 'lucide-react';
import { BRANDS } from '@/lib/db';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

export const metadata: Metadata = {
  title: 'Luxury Brands Directory — Rolex, Audemars Piguet, Nike, Jordan, Ray-Ban',
  description:
    'Explore 1:1 master copy luxury brands at BroHood India. Swiss timepieces (Rolex, AP, Cartier), hype sneakers (Nike, Air Jordan, Adidas), and designer eyewear with Cash on Delivery.',
  keywords: [
    'first copy brands india',
    'rolex first copy',
    'air jordan replica',
    'cartier first copy',
    'ray-ban sunglasses cod',
    'brohood brands directory',
  ],
  alternates: {
    canonical: `${baseUrl}/brands`,
  },
  openGraph: {
    title: 'Luxury Brands Directory | BroHood India',
    description: 'Explore 1:1 master quality drops by Rolex, Jordan, AP, Nike, Cartier, and Ray-Ban.',
    url: `${baseUrl}/brands`,
  },
};

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
          <Flame size={24} className="text-amber-400 fill-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Brands Directory
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Explore all iconic watchmakers, sneaker labels, and luxury streetwear brands.
        </p>
      </div>

      <div className="space-y-8">
        {brandGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                {group.title}
              </h2>
              <Link
                href={`/shop?category=${group.cat}`}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <span>View Collection</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {group.brands.map((b) => (
                <Link
                  key={b.id}
                  href={`/shop?brand=${b.slug}`}
                  className="p-5 rounded-2xl bg-[#121316] border border-white/5 hover:border-amber-400/40 transition-all group flex flex-col justify-between h-28"
                >
                  <span className="font-extrabold text-sm sm:text-base text-white group-hover:text-amber-300">
                    {b.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 group-hover:text-zinc-300">
                    Explore Drops →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
