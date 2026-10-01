'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem, WishlistItem, ShippingAddress, Order, Coupon } from '@/types/ecommerce';
import { COUPONS, PRODUCTS } from '@/lib/db';

export interface UserProfile {
  email: string;
  fullName: string;
  phone: string;
  provider: 'google' | 'email';
}

interface StoreContextType {
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;

  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => boolean;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartFinalTotal: number;
  shippingFee: number;

  appliedCoupon: Coupon | null;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;

  addresses: ShippingAddress[];
  selectedAddress: ShippingAddress | null;
  addAddress: (address: ShippingAddress) => void;
  updateAddress: (index: number, address: ShippingAddress) => void;
  deleteAddress: (index: number) => void;
  setSelectedAddress: (address: ShippingAddress) => void;

  orders: Order[];
  createOrder: (paymentMethod: 'razorpay' | 'cod', shippingAddress: ShippingAddress) => Order;

  isAuthModalOpen: boolean;
  authModalContext: string;
  openAuthModal: (context?: string) => void;
  closeAuthModal: () => void;

  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_ADDRESSES: ShippingAddress[] = [
  {
    fullName: 'Musharraf Khan',
    phone: '9876543210',
    addressLine1: 'Flat 402, Royal Palms Residency, 80ft Road',
    addressLine2: 'Near Metro Station',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [addresses, setAddresses] = useState<ShippingAddress[]>(DEFAULT_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(DEFAULT_ADDRESSES[0] || null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalContext, setAuthModalContext] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('brohood_user');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedCart = localStorage.getItem('brohood_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('brohood_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedAddresses = localStorage.getItem('brohood_addresses');
      if (storedAddresses) {
        const parsed = JSON.parse(storedAddresses);
        if (parsed.length > 0) {
          setAddresses(parsed);
          setSelectedAddress(parsed[0]);
        }
      }

      const storedOrders = localStorage.getItem('brohood_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  // Sync state to LocalStorage
  const saveCartToStorage = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem('brohood_cart', JSON.stringify(updated));
  };

  const saveWishlistToStorage = (updated: WishlistItem[]) => {
    setWishlist(updated);
    localStorage.setItem('brohood_wishlist', JSON.stringify(updated));
  };

  const saveAddressesToStorage = (updated: ShippingAddress[]) => {
    setAddresses(updated);
    localStorage.setItem('brohood_addresses', JSON.stringify(updated));
  };

  const saveOrdersToStorage = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem('brohood_orders', JSON.stringify(updated));
  };

  // Auth Operations
  const login = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('brohood_user', JSON.stringify(profile));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brohood_user');
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    localStorage.setItem('brohood_user', JSON.stringify(updated));
  };

  const openAuthModal = (context = 'access your bag & wishlist') => {
    setAuthModalContext(context);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  // Cart Operations
  const addToCart = (product: Product, size?: string, color?: string, quantity = 1): boolean => {
    const effectiveSize = size || product.availableSizes[0] || 'Standard';
    const effectiveColor = color || product.availableColors[0] || 'Original';
    const itemId = `${product.id}-${effectiveSize}-${effectiveColor}`;

    const existingIndex = cart.findIndex((item) => item.id === itemId);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
    } else {
      const itemImage = (product.colorImages && effectiveColor && product.colorImages[effectiveColor]?.[0])
        ? product.colorImages[effectiveColor][0]
        : product.primaryImage;

      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        productSlug: product.slug,
        title: product.title,
        brand: product.brand,
        image: itemImage,
        selectedSize: effectiveSize,
        selectedColor: effectiveColor,
        price: product.price,
        quantity,
        stockAvailable: 10,
      };
      updated = [newItem, ...cart];
    }

    saveCartToStorage(updated);
    openCartDrawer();
    return true;
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updated = cart.map((item) => (item.id === itemId ? { ...item, quantity } : item));
    saveCartToStorage(updated);
  };

  const removeFromCart = (itemId: string) => {
    const updated = cart.filter((item) => item.id !== itemId);
    saveCartToStorage(updated);
  };

  const clearCart = () => {
    saveCartToStorage([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Free shipping on orders over ₹1,499
  const shippingFee = cartSubtotal >= 1499 || cartSubtotal === 0 ? 0 : 99;

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (cartSubtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { success: false, message: 'Invalid promo code' };
    }
    if (cartSubtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Min order value for ${coupon.code} is ₹${coupon.minOrderValue}`,
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Promo code ${coupon.code} applied!` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.productId === product.id);
    let updated: WishlistItem[];

    if (exists) {
      updated = wishlist.filter((item) => item.productId !== product.id);
    } else {
      const newItem: WishlistItem = {
        id: `wish-${product.id}`,
        productId: product.id,
        slug: product.slug,
        title: product.title,
        brand: product.brand,
        price: product.price,
        mrp: product.mrp,
        image: product.primaryImage,
      };
      updated = [newItem, ...wishlist];
    }

    saveWishlistToStorage(updated);
  };

  const isInWishlist = (productId: string) => wishlist.some((item) => item.productId === productId);

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter((item) => item.productId !== productId);
    saveWishlistToStorage(updated);
  };

  // Addresses Operations
  const addAddress = (address: ShippingAddress) => {
    const updated = [address, ...addresses];
    saveAddressesToStorage(updated);
    setSelectedAddress(address);
  };

  const updateAddress = (index: number, address: ShippingAddress) => {
    const updated = [...addresses];
    updated[index] = address;
    saveAddressesToStorage(updated);
    if (selectedAddress === addresses[index]) setSelectedAddress(address);
  };

  const deleteAddress = (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    saveAddressesToStorage(updated);
    if (updated.length > 0) setSelectedAddress(updated[0]);
    else setSelectedAddress(null);
  };

  // Orders Operations
  const createOrder = (paymentMethod: 'razorpay' | 'cod', shippingAddress: ShippingAddress): Order => {
    const orderNumber = `BH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: user?.email,
      items: [...cart],
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'razorpay' ? 'paid' : 'pending',
      orderStatus: 'confirmed',
      subtotal: cartSubtotal,
      discountAmount,
      shippingFee,
      finalTotal: cartFinalTotal,
      trackingNumber: `EXP-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courierPartner: 'Delhivery Surface Express',
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrdersToStorage(updatedOrders);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,

        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartFinalTotal,
        shippingFee,

        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,

        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,

        addresses,
        selectedAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setSelectedAddress,

        orders,
        createOrder,

        isAuthModalOpen,
        authModalContext,
        openAuthModal,
        closeAuthModal,

        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,

        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
