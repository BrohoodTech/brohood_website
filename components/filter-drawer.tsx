'use client';

import { useState } from 'react';
import { Filter, X, RotateCcw, Check } from 'lucide-react';
import { BRANDS } from '@/lib/db';

interface FilterDrawerProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  priceRange: [number, number];
  onPriceChange: (val: [number, number]) => void;
  inStockOnly: boolean;
  onToggleStock: () => void;
  onReset: () => void;
}

const AVAILABLE_SIZES = [
  'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11',
  'S', 'M', 'L', 'XL', 'XXL',
  '41mm Standard'
];

export function FilterDrawer({
  selectedCategory,
  onCategoryChange,
  selectedBrands,
  onToggleBrand,
  selectedSizes,
  onToggleSize,
  priceRange,
  onPriceChange,
  inStockOnly,
  onToggleStock,
  onReset,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { label: 'All Items', value: 'all' },
    { label: 'Watches', value: 'watches' },
    { label: 'Sneakers', value: 'sneakers' },
    { label: 'Goggles', value: 'goggles' },
    { label: 'T-Shirts', value: 'tshirts' },
  ];

  const filteredBrands = selectedCategory === 'all'
    ? BRANDS
    : BRANDS.filter((b) => b.categorySlug === selectedCategory);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    selectedSizes.length +
    (inStockOnly ? 1 : 0);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-[#16171b] hover:bg-[#1f2026] text-white text-xs font-medium transition-all"
      >
        <Filter size={14} className="text-amber-400" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Slide-out Backdrop and Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-[#0e0f12] border-l border-white/10 h-full flex flex-col text-white shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-amber-400" />
                <h3 className="font-semibold text-sm tracking-wide">Filters & Sorting</h3>
              </div>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={onReset}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Filter Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Category Filter */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2.5">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => onCategoryChange(cat.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === cat.value
                          ? 'bg-amber-400 text-black font-semibold'
                          : 'bg-[#1a1b20] text-zinc-300 hover:bg-[#25262c]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2.5">
                  Brand ({filteredBrands.length})
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {filteredBrands.map((brand) => {
                    const isSelected = selectedBrands.includes(brand.slug);
                    return (
                      <button
                        key={brand.slug}
                        onClick={() => onToggleBrand(brand.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                            : 'bg-[#16171b] text-zinc-300 hover:bg-[#1e1f25]'
                        }`}
                      >
                        <span>{brand.name}</span>
                        {isSelected && <Check size={14} className="text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Pills (Sneakers & Tees) */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2.5">
                  Sizes (Shoes & Apparel)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => onToggleSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-black font-bold shadow-md'
                            : 'bg-[#16171b] border border-white/5 text-zinc-300 hover:border-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                    Max Price
                  </label>
                  <span className="text-xs font-semibold text-amber-400">
                    Up to ₹{priceRange[1].toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="999"
                  max="15000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>₹999</span>
                  <span>₹15,000+</span>
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-medium text-zinc-300">In-Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={onToggleStock}
                    className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Footer Apply Button */}
            <div className="p-4 border-t border-white/10 bg-[#121316]">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
