'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  Heart,
  Ruler,
} from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { getProductsByCategory } from '@/lib/db';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/product-card';
import { SizeGuideModal } from '@/components/size-guide-modal';

export function ProductDetailView({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, isInWishlist, toggleWishlist, openAuthModal, user } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors[0] || 'Original');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const isSaved = isInWishlist(product.id);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  // Derive images dynamically from active colorway
  const images = (product.colorImages && selectedColor && product.colorImages[selectedColor] && product.colorImages[selectedColor].length > 0)
    ? product.colorImages[selectedColor]
    : (product.images.length > 0 ? product.images : [product.primaryImage]);

  const handleColorChange = (col: string) => {
    setSelectedColor(col);
    setActiveImage(0);
  };
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

  const handleAddToCart = () => {
    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus('✓ Delivery in 2–3 business days via Delhivery/Blue Dart. COD Available.');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian pincode.');
    }
  };

  return (
    <div className="pb-36 sm:pb-24 md:pb-16 text-white w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-white transition-colors uppercase font-medium"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
            <img
              src={images[activeImage] || product.primaryImage}
              alt={`${product.title} - Front View`}
              className="w-full h-full object-cover transition-all duration-300"
              fetchPriority="high"
            />

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isSaved ? 'bg-red-500 text-white' : 'bg-black/50 text-white/80 hover:text-white'
              }`}
            >
              <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt={`${product.title} preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Buy Box & Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <span>{product.brand}</span>
              <span className="flex items-center gap-1 text-zinc-300 text-xs">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-500">({product.reviewCount} verified reviews)</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {product.title}
            </h1>
          </div>

          {/* Price Strip */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[#121316] border border-white/5 flex-wrap">
            <span className="text-3xl font-black text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-base text-zinc-500 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
            {product.discountPercent > 0 && (
              <span className="text-sm font-bold text-emerald-400">
                ({product.discountPercent}% OFF)
              </span>
            )}
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selection: Size */}
          {product.availableSizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wider font-bold text-zinc-400">
                    Select Size
                  </span>
                  {(product.category === 'sneakers' || product.category === 'tshirts') && (
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 ml-1"
                    >
                      <Ruler size={13} />
                      <span>Size Guide</span>
                    </button>
                  )}
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  ✓ Available in Stock
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-amber-400 text-black shadow-lg scale-105'
                        : 'bg-[#18191e] border border-white/5 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selection: Color / Edition with Image Switch */}
          {product.availableColors.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="uppercase tracking-wider font-bold text-zinc-400">
                  Colorway / Edition: <strong className="text-white">{selectedColor}</strong>
                </span>
                {product.colorImages?.[selectedColor] && (
                  <span className="text-[10px] text-amber-400/80 font-medium">
                    Tap to view color photo
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map((col) => {
                  const isSelected = selectedColor === col;
                  const colImg = product.colorImages?.[col]?.[0];
                  return (
                    <button
                      key={col}
                      onClick={() => handleColorChange(col)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-amber-400/15 border-2 border-amber-400 text-amber-300 font-bold shadow-md scale-105'
                          : 'bg-[#18191e] border border-white/5 text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      {colImg && (
                        <img
                          src={colImg}
                          alt={col}
                          className="w-5 h-5 rounded-md object-cover border border-white/10 shrink-0"
                        />
                      )}
                      <span>{col}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-white/10 rounded-xl px-3 py-3 bg-[#121316]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-zinc-400 hover:text-white"
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>
              <span className="text-xs font-bold px-3">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-zinc-400 hover:text-white"
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Bag */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.98] ${
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Buy Now (COD / UPI)
            </button>
          </div>

          {/* Delivery & COD Pincode Checker */}
          <div className="p-4 rounded-2xl bg-[#121316] border border-white/5 space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 block">
              Delivery & COD Serviceability Check
            </span>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Indian Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-[#1a1b20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-[11px] font-medium text-emerald-400 mt-1">
                {pincodeStatus}
              </p>
            )}
          </div>

          {/* WhatsApp Direct Order Enquiry */}
          <a
            href={`https://wa.me/${whatsappPhone}?text=Hi%20BroHood%2C%20I%20have%20a%20query%20about%3A%20${encodeURIComponent(
              product.title
            )}%20(Size%3A%20${selectedSize})`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-xs uppercase tracking-wider transition-all"
          >
            <MessageCircle size={17} />
            <span>Instant WhatsApp Order Support &amp; Size Advice</span>
          </a>

          {/* Indian Market Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-[10px] text-zinc-400">
            <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <Truck size={17} className="text-amber-400" />
              <span className="font-bold text-white">COD Available</span>
              <span className="text-[9px] text-zinc-400">₹0 Advance Needed</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <RotateCcw size={17} className="text-amber-400" />
              <span className="font-bold text-white">7-Day Exchange</span>
              <span className="text-[9px] text-zinc-400">Hassle-free size swap</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <ShieldCheck size={17} className="text-amber-400" />
              <span className="font-bold text-white">Insured Shipping</span>
              <span className="text-[9px] text-zinc-400">Live courier tracking</span>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-400 mb-2">
              Specifications & Build Details
            </h3>
            <div className="divide-y divide-white/5 bg-[#121316] rounded-2xl border border-white/5 overflow-hidden">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3 text-xs">
                  <span className="text-zinc-400 font-medium">{key}</span>
                  <span className="text-white font-bold text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-16 sm:mt-24 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              You May Also Like
            </h2>
            <Link
              href={`/shop?category=${product.category}`}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              View More In {product.category.toUpperCase()} →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 100% Mobile Sticky Action Dock (Anchored at Bottom-0, Safe Area Aware) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d10]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-2.5 safe-area-pb flex items-center gap-2 shadow-[0_-8px_30px_rgba(0,0,0,0.85)]">
        {/* Price & Size Tag */}
        <div className="flex flex-col pr-1 min-w-[70px]">
          <span className="text-[10px] text-zinc-400 uppercase font-bold leading-tight">
            {selectedSize}
          </span>
          <span className="text-sm font-black text-amber-400 leading-tight">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        {/* WhatsApp Quick Enquiry Button */}
        <a
          href={`https://wa.me/${whatsappPhone}?text=Hi%20BroHood%2C%20checking%20availability%20for%3A%20${encodeURIComponent(
            product.title
          )}%20(Size%3A%20${selectedSize})`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform"
          aria-label="WhatsApp enquiry"
        >
          <MessageCircle size={18} />
        </a>

        {/* Add to Bag */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 px-2 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all active:scale-95 border ${
            isAdded
              ? 'bg-emerald-500 text-white border-emerald-500'
              : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
          }`}
        >
          {isAdded ? 'Added ✓' : 'Add to Bag'}
        </button>

        {/* Buy Now (COD / UPI) */}
        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 px-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black rounded-xl font-black text-xs uppercase tracking-wider shadow-lg text-center transition-all active:scale-95"
        >
          Buy Now (COD)
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
