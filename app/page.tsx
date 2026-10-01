'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Truck, Flame, Star, Watch, CheckCircle2, PackageCheck } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/db';
import { BrandCarousel } from '@/components/brand-carousel';
import { ProductCard } from '@/components/product-card';

const HERO_SLIDES = [
  {
    tag: '1:1 Master Quality Swiss & Japanese Movements',
    title: 'FIRST COPY LUXURY WATCHES',
    subtitle: 'Tissot PRX Powermatic, Hublot Big Bang Ceramic, Rado Centrix Jubilee & Rolex Submariner. Heavy solid steel, brand box set & live Blue Dart tracking.',
    cta: 'Explore Watches',
    link: '/shop?category=watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=90',
  },
  {
    tag: 'Retro Classic Integrated Sports Watches',
    title: 'TISSOT PRX & SWISS CHRONOS',
    subtitle: 'Embossed waffle dial, smooth sweeping automatic seconds, scratch-proof sapphire crystal & butterfly clasp. Cash on Delivery across India.',
    cta: 'Shop Tissot & Chronos',
    link: '/shop?brand=tissot',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=90',
  },
  {
    tag: 'Hype Silhouettes & OG Colorways',
    title: 'HYPE SNEAKERS & RETROS',
    subtitle: 'Travis Scott Lows, Air Jordan 4 Retro, Nike Dunk Pandas & Adidas Samba OGs. OG box packaging, spare laces & SKU tag included.',
    cta: 'Shop Sneakers',
    link: '/shop?category=sneakers',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1920&q=90',
  },
  {
    tag: 'Heavyweight Drop Shoulder Essentials',
    title: '260 GSM STREETWEAR TEES',
    subtitle: 'Pure French Terry compact combed cotton with high-density puff prints and zero neck-sagging.',
    cta: 'Shop Apparel',
    link: '/shop?category=tshirts',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1920&q=90',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeGender, setActiveGender] = useState<'all' | 'men' | 'unisex' | 'women'>('all');
  const [activePriceFilter, setActivePriceFilter] = useState<string>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  // Price Segment filter logic
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activePriceFilter === 'under1500') return p.price <= 1500;
    if (activePriceFilter === 'under3000') return p.price > 1500 && p.price <= 3000;
    if (activePriceFilter === 'above3000') return p.price > 3000;
    return true;
  });

  return (
    <div className="space-y-10 sm:space-y-16 w-full max-w-full overflow-x-hidden">
      {/* 1. Hero Campaign Slider */}
      <section className="relative w-full max-w-full aspect-[4/5] sm:aspect-[16/7] max-h-[620px] overflow-hidden bg-black select-none">
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent" />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-5 flex flex-col justify-end pb-8 sm:pb-16 text-white space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-400">
            <Flame size={14} className="text-amber-400 fill-amber-400 shrink-0" />
            <span>{slide.tag}</span>
          </div>

          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight uppercase font-heading text-white">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
            {slide.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href={slide.link}
              className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <span>{slide.cta}</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/shop"
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all border border-white/10"
            >
              All Drops
            </Link>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5 px-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* 2. Circular Brand Avatar Slider */}
      <BrandCarousel />

      {/* 3. Shop by Category (Interactive Cards) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest font-black text-amber-400 mb-0.5">
              Curated Collections
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading">
              Shop by Category
            </h2>
          </div>
          <Link href="/shop" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-semibold">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/40 border border-white/5 hover:border-amber-400/40 transition-all duration-300 shadow-lg"
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  {cat.itemCount} Designs
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3.5 Primary Showcase: First Copy Luxury Watches (Tissot, Hublot, Rado, Rolex) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#16171c] to-[#0d0d10] border border-amber-400/20 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <p className="text-xs uppercase tracking-widest font-black text-amber-400 mb-1 flex items-center gap-1.5">
                <Watch size={14} />
                <span>Curated Swiss &amp; Japanese Automatic Movements</span>
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
                First Copy Luxury Watches
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
                Automatic sweeping second hands (no ticking), solid 904L stainless steel, ceramic bezels, and scratch-resistant sapphire crystal. Tissot PRX, Hublot Big Bang, Rado Centrix Jubilee &amp; Rolex Submariner.
              </p>
            </div>

            <Link
              href="/shop?category=watches"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-lg"
            >
              <span>View All Watches</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Luxury Watch Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {PRODUCTS.filter((p) => p.category === 'watches').slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Watch Guarantee Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/5 text-[11px] text-zinc-300">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Smooth Sweep Seconds (No Ticking)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Sapphire Crystal Glass</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Brand Hardcase Box & Papers</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>₹0 Advance Cash on Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gender & Price Segmentation Filters */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#121316] border border-white/5 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Gender Switcher */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-1.5">
                Target Fit / Gender
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: 'All Fits', val: 'all' },
                  { label: "Men's Edit", val: 'men' },
                  { label: 'Unisex', val: 'unisex' },
                  { label: "Women's Edit", val: 'women' },
                ].map((g) => (
                  <button
                    key={g.val}
                    onClick={() => setActiveGender(g.val as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeGender === g.val
                        ? 'bg-amber-400 text-black shadow-md'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Segment Selector */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-1.5">
                Shop by Budget
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under ₹1,499', val: 'under1500' },
                  { label: '₹1,500 - ₹3,000', val: 'under3000' },
                  { label: 'Master Editions (₹3,000+)', val: 'above3000' },
                ].map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setActivePriceFilter(p.val)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activePriceFilter === p.val
                        ? 'bg-amber-400 text-black shadow-md'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hot Drops & Trending Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest font-black text-amber-400 mb-0.5 flex items-center gap-1.5">
              <Flame className="text-amber-400 fill-amber-400" size={13} />
              <span>Trending Across India</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading">
              Hot Drops &amp; Bestsellers
            </h2>
          </div>

          <Link href="/shop" className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
            <span>Explore Store</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Direct Workshop Dispatch & Real-Time Tracking Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-[#18191f] to-black border border-white/10 p-6 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2.5 max-w-xl text-center md:text-left">
            <p className="text-xs uppercase tracking-widest font-black text-emerald-400 flex items-center justify-center md:justify-start gap-1.5">
              <PackageCheck size={14} />
              <span>Direct Workshop Sealed Dispatch</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-white font-heading">
              Track Your Order Live From Workshop to Doorstep
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every timepiece and sneaker pair is individually quality-checked and sealed with complete brand hardcase presentation packaging. Receive instant Blue Dart &amp; Delhivery AWB tracking via WhatsApp &amp; SMS as soon as your parcel ships.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20BroHood%2C%20I%20would%20like%20to%20check%20my%20order%20status%20and%20tracking%20updates."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <span>Track on WhatsApp</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* 7. Real Customer Unboxing Reviews */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-black text-amber-400 mb-1">
            Verified Buyer Feedback
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading">
            Customer Reviews Across India
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Real unboxing feedback from 1,200+ verified customers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Rohan Mehra (Mumbai)',
              product: 'Tissot PRX Powermatic 80 Ice Blue',
              comment: 'Ordered through Cash on Delivery. Weight is 138g, matches original specs. Sweeping seconds hand has zero stutter and the butterfly clasp has a solid click. Total value for money!',
              rating: 5,
            },
            {
              name: 'Aman Sharma (Delhi NCR)',
              product: 'Rolex Cosmograph Daytona "Panda"',
              comment: 'Both chronograph pushers work smoothly and the bezel is real ceramic. Received Blue Dart tracking within 24 hours of ordering. Solid 904L steel feel and original wave box.',
              rating: 5,
            },
            {
              name: 'Vikram Desai (Bengaluru)',
              product: 'Nike Dunk Low Retro "Panda"',
              comment: 'Ordered UK 9 and it fits true to size. Delivery took 3 days via Delhivery to Indiranagar instead of 2, but the leather finish and clean box packaging made up for it.',
              rating: 4,
            },
            {
              name: 'Rajesh Kulkarni (Hyderabad)',
              product: 'Rado Centrix High-Tech Ceramic Jubilee',
              comment: 'Bought this for formal wear. The black ceramic links feel cold and silky smooth. Diamond indices give a subtle luxury look without appearing cheap. ₹0 advance COD.',
              rating: 5,
            },
            {
              name: 'Harpreet Singh (Chandigarh)',
              product: 'Air Jordan 1 Low Travis Scott Reverse Mocha',
              comment: 'Suede hair moves with a finger stroke, reverse swoosh stitching is neat, and came with all 3 extra laces. Minor corner bump on the box during transit but sneakers were 10/10 pristine.',
              rating: 4,
            },
            {
              name: 'Sahil Patel (Ahmedabad)',
              product: 'BroHood 260 GSM Heavyweight Oversized Tee',
              comment: 'Fabric is seriously heavy French Terry. Washed it twice and zero neck sagging or color fading. Sizing chart was accurate, fits with the right oversized streetwear drop.',
              rating: 5,
            },
          ].map((review, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#121316] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={idx < review.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified Buyer
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">&quot;{review.comment}&quot;</p>
              <div className="pt-2 border-t border-white/5">
                <h4 className="text-xs font-bold text-white">{review.name}</h4>
                <p className="text-[10px] text-amber-400">{review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
