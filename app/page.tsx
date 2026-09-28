'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, ChevronLeft, ChevronRight, Video, Flame, Star } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/db';
import { BrandCarousel } from '@/components/brand-carousel';
import { ProductCard } from '@/components/product-card';

const HERO_SLIDES = [
  {
    tag: '1:1 Master Quality Drops',
    title: 'HYPE SNEAKERS & RETROS',
    subtitle: 'Travis Scott Lows, Dunk Pandas, Samba OGs & 550s. Original boxes and extra laces included.',
    cta: 'Shop Sneakers',
    link: '/shop?category=sneakers',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=85',
  },
  {
    tag: 'Precision & Presence',
    title: 'SWISS LUXURY TIMEPIECES',
    subtitle: 'Automatic sweeping movements, ceramic rotating bezels, and 904L brushed steel cases.',
    cta: 'Explore Watches',
    link: '/shop?category=watches',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85',
  },
  {
    tag: 'Heavyweight Essentials',
    title: '260 GSM OVERSIZED TEES',
    subtitle: 'French Terry luxury cotton, anti-sag thick ribbed collars, and effortless boxy drop-shoulders.',
    cta: 'Shop Apparel',
    link: '/shop?category=tshirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=85',
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
    <div className="space-y-10 sm:space-y-16">
      {/* 1. Hero Campaign Slider */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/7] max-h-[620px] overflow-hidden bg-black select-none">
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent" />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-5 flex flex-col justify-end pb-8 sm:pb-16 text-white space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase w-fit backdrop-blur-md">
            <Sparkles size={13} />
            <span>{slide.tag}</span>
          </div>

          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight uppercase font-heading">
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
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400">
              Curated Collections
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
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

      {/* 4. Gender & Price Segmentation Filters */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#121316] border border-white/5 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Gender Switcher */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-1.5">
                Target Fit / Gender
              </span>
              <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <Flame className="text-amber-400 fill-amber-400" size={20} />
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400">
                Fresh Stock
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Hot Drops & Bestsellers
              </h2>
            </div>
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

      {/* 6. Video Call & WhatsApp Reassurance Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-[#18191f] to-black border border-white/10 p-6 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Video size={14} />
              <span>Video Verification Available</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight leading-tight">
              See Your Product Live Before Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Hesitant about the finishing, automatic second-hand sweep, or shoe stitching? Request a quick 2-minute video call on WhatsApp. We inspect your exact pair before packing!
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20BroHood%2C%20I%20would%20like%20to%20request%20a%20video%20call%20verification%20before%20ordering."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <span>Connect on WhatsApp</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* 7. Real Customer Unboxing Reviews */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400">
            Social Proof
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Verified Customer Reviews
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Real feedback from 1,200+ stylish brothers across India</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              name: 'Aman Sharma (Delhi)',
              product: 'Rolex Submariner Date 41mm',
              comment: 'The weight and bezel click are identical to my friend’s original. Sweep is butter smooth. Green box and documents were also high quality!',
              rating: 5,
            },
            {
              name: 'Rohan Mehra (Mumbai)',
              product: 'Air Jordan 1 Low Travis Scott',
              comment: 'Suede moves with finger stroke, stitching is flawless. Came with all 3 extra laces. Definitely my new go-to store.',
              rating: 5,
            },
            {
              name: 'Kabir Verma (Bengaluru)',
              product: '260 GSM Oversized Heavyweight Tee',
              comment: 'Heavy cotton that does not shrink after wash. Collar stays stiff and ribbed. Perfect oversized drape for sneakers.',
              rating: 5,
            },
          ].map((review, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#121316] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
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
