'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
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
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/lib/db';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/product-card';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = getProductBySlug(slug);
  const { addToCart, isInWishlist, toggleWishlist, openAuthModal, user } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.availableSizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product?.availableColors[0] || 'Original');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  if (!product) return notFound();

  const isSaved = isInWishlist(product.id);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const images = product.images.length > 0 ? product.images : [product.primaryImage];

  const handleAddToCart = () => {
    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      openAuthModal(`buy "${product.title}"`);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus('✓ Delivery in 2–3 business days. COD Available for this pincode.');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian pincode.');
    }
  };

  return (
    <div className="pb-24 md:pb-16 text-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link
          href={`/shop?category=${product.category}`}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to {product.category.toUpperCase()}</span>
        </Link>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
            <img
              src={images[activeImage] || product.primaryImage}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-black font-black text-[10px] uppercase tracking-wider shadow-md">
                1:1 Master Quality
              </span>
              {product.discountPercent > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-black text-[10px] uppercase tracking-wider shadow-md">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
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
                >
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
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
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[#121316] border border-white/5">
            <span className="text-3xl font-black text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-base text-zinc-500 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold">
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
                <span className="uppercase tracking-wider font-bold text-zinc-400">
                  Select Size
                </span>
                <span className="text-[11px] text-amber-400 font-semibold">
                  Only 2 left in stock!
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

          {/* Variant Selection: Color / Dial */}
          {product.availableColors.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 block mb-2">
                Edition / Color: <strong className="text-white">{selectedColor}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedColor === col
                        ? 'bg-amber-400/20 border border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#18191e] border border-white/5 text-zinc-300'
                    }`}
                  >
                    {col}
                  </button>
                ))}
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
              >
                <Minus size={15} />
              </button>
              <span className="text-xs font-bold px-3">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-zinc-400 hover:text-white"
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
            href={`https://wa.me/919876543210?text=Hi%20BroHood%2C%20I%20want%20to%20order%20or%20request%20video%20verification%20for%3A%20${encodeURIComponent(
              product.title
            )}%20(Size%3A%20${selectedSize})`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-bold text-xs uppercase tracking-wider transition-all"
          >
            <MessageCircle size={16} />
            <span>Request Video Verification on WhatsApp</span>
          </a>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-[10px] text-zinc-400">
            <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5">
              <Truck size={16} className="text-amber-400" />
              <span>Free Delivery Above ₹1,499</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5">
              <RotateCcw size={16} className="text-amber-400" />
              <span>7-Day Replacement</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>COD All India</span>
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

      {/* Sticky Bottom Action Bar on Mobile */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-[#0c0d10]/95 backdrop-blur-xl border-t border-white/10 p-3 flex items-center gap-2 shadow-2xl">
        <a
          href={`https://wa.me/919876543210?text=Hi%20BroHood%2C%20checking%20availability%20for%3A%20${encodeURIComponent(
            product.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#25D366] text-white rounded-xl flex items-center justify-center"
          aria-label="WhatsApp enquiry"
        >
          <MessageCircle size={18} />
        </a>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-white/10 text-white border border-white/10 rounded-xl font-bold text-xs uppercase tracking-wider"
        >
          {isAdded ? 'Added ✓' : 'Add to Bag'}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-xl font-black text-xs uppercase tracking-wider shadow-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
