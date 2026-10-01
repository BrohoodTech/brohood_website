'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, BRANDS, CATEGORIES } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { FilterDrawer } from '@/components/filter-drawer';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlCategory = searchParams.get('category') || 'all';
  const urlBrand = searchParams.get('brand') || '';
  const urlQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState<string>(urlCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(urlBrand ? [urlBrand] : []);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([999, 15000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const toggleBrand = (brandSlug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandSlug) ? prev.filter((b) => b !== brandSlug) : [...prev, brandSlug]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setCategory('all');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange([999, 15000]);
    setInStockOnly(false);
    setSortBy('featured');
    router.push('/shop');
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brandSlug));
    }

    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.availableSizes.some((s) => selectedSizes.includes(s))
      );
    }

    list = list.filter((p) => p.price <= priceRange[1]);

    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    if (urlQuery.trim()) {
      const q = urlQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price_low') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_high') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'discount') list.sort((a, b) => b.discountPercent - a.discountPercent);

    return list;
  }, [category, selectedBrands, selectedSizes, priceRange, inStockOnly, sortBy, urlQuery]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Breadcrumbs & Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Home</span>
          <span>/</span>
          <span className="text-amber-400 uppercase font-semibold">
            {activeCategoryObj ? activeCategoryObj.name : 'All Products'}
          </span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
              {urlQuery ? `Search Results for "${urlQuery}"` : activeCategoryObj ? activeCategoryObj.name : 'The Complete Edit'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Curated luxury timepieces, hype sneakers, statement frames, and heavyweight drop-shoulder streetwear.
            </p>
          </div>
          <span className="text-xs font-semibold text-zinc-400">
            Showing <strong className="text-amber-400 font-bold">{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Quick Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar w-full max-w-full">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
            category === 'all'
              ? 'bg-amber-400 text-black shadow-md'
              : 'bg-[#121316] text-zinc-300 hover:bg-[#1b1c20] border border-white/5'
          }`}
        >
          All Items
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
              category === cat.slug
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-[#121316] text-zinc-300 hover:bg-[#1b1c20] border border-white/5'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter Toolbar (Filter Drawer + Sort Dropdown) */}
      <div className="flex items-center justify-between gap-3 bg-[#121316] border border-white/5 rounded-2xl p-3">
        <div className="flex items-center gap-3">
          <FilterDrawer
            selectedCategory={category}
            onCategoryChange={setCategory}
            selectedBrands={selectedBrands}
            onToggleBrand={toggleBrand}
            selectedSizes={selectedSizes}
            onToggleSize={toggleSize}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            inStockOnly={inStockOnly}
            onToggleStock={() => setInStockOnly(!inStockOnly)}
            onReset={resetFilters}
          />

          {(selectedBrands.length > 0 || selectedSizes.length > 0 || category !== 'all' || inStockOnly) && (
            <button
              onClick={resetFilters}
              className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs text-zinc-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#18191e] border border-white/10 text-white rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-amber-400"
          >
            <option value="featured">Featured / Curated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#121316] border border-white/5 rounded-3xl p-8 space-y-4">
          <p className="text-base font-semibold text-white">No items match your active filters.</p>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your brand, size, or price filter to explore more pieces.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-lg"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ShopView() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400 text-xs">Loading BroHood Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
