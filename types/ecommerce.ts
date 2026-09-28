export type CategorySlug = 'watches' | 'sneakers' | 'goggles' | 'tshirts';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  imageUrl: string;
  itemCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  categorySlug: CategorySlug;
}

export interface ProductVariant {
  id: string;
  productId: string;
  variantType: 'size' | 'color' | 'dial' | 'edition';
  name: string; // e.g., 'UK 9', 'Black Dial', 'L - Oversized'
  sku: string;
  stockQuantity: number;
  priceDelta?: number; // additional price if premium
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string; // Cloudinary / ImageKit CDN URL
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  imageUrls?: string[]; // customer photos
  createdAt: string;
  isVerifiedBuyer: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  brandSlug: string;
  category: CategorySlug;
  description: string;
  specs: Record<string, string>; // e.g. { "Movement": "Automatic", "Dial Size": "41mm" } or { "Upper": "Leather", "Sole": "Rubber" }
  mrp: number; // Original strike-through price
  price: number; // Selling price
  discountPercent: number;
  isHot?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  primaryImage: string; // Cloudinary / ImageKit URL
  images: string[];
  variants: ProductVariant[];
  availableSizes: string[];
  availableColors: string[];
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  title: string;
  brand: string;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
  price: number;
  quantity: number;
  stockAvailable: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  slug: string;
  title: string;
  brand: string;
  price: number;
  mrp: number;
  image: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
}

export type PaymentMethod = 'razorpay' | 'cod';
export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. BH-2026-1049
  userId?: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  trackingNumber?: string;
  courierPartner?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

export interface ProductFilterState {
  category?: CategorySlug;
  brands: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'bestseller' | 'price_low' | 'price_high' | 'newest' | 'rating';
  inStockOnly: boolean;
  searchQuery?: string;
}
