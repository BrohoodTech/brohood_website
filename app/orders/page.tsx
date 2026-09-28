'use client';

import Link from 'next/link';
import { Package, Truck, ArrowLeft, MessageCircle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function OrdersPage() {
  const { orders, user, openAuthModal } = useStore();

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 text-white space-y-4">
        <Package size={36} className="text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold">Sign In to Track Orders</h2>
        <p className="text-xs text-zinc-400">View real-time delivery status, tracking IDs, and purchase history.</p>
        <button
          onClick={() => openAuthModal('view your orders and shipments')}
          className="px-6 py-3 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-lg"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-white">
      {/* Header */}
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Back to Account</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          My Orders & Shipments ({orders.length})
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 bg-[#121316] border border-white/5 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Package size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">No orders placed yet</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            When you purchase watches, sneakers, goggles, or tees, you can track their express dispatch and delivery right here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-lg"
          >
            <span>Start Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4 shadow-xl"
            >
              {/* Top Bar: Order ID, Date & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-amber-400">{order.orderNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                      {order.orderStatus}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-white block">
                    Total: ₹{order.finalTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : 'Paid Online (Razorpay)'}
                  </span>
                </div>
              </div>

              {/* Courier Tracking Status */}
              <div className="p-3.5 rounded-2xl bg-[#18191e] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Truck size={18} className="text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Courier: {order.courierPartner || 'Delhivery Express'}</span>
                    <p className="text-[11px] text-zinc-400">AWB / Tracking Number: <strong className="text-zinc-200">{order.trackingNumber}</strong></p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919876543210?text=Hi%20BroHood%2C%20what%20is%20the%20current%20location%20for%20order%20${order.orderNumber}%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold text-[11px] uppercase tracking-wider transition-colors w-fit"
                >
                  <MessageCircle size={13} />
                  <span>Get Live Location</span>
                </a>
              </div>

              {/* Order Items */}
              <div className="space-y-3 pt-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-none">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-xl bg-black/40"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400">{item.brand}</span>
                        <h4 className="font-semibold text-white line-clamp-1">{item.title}</h4>
                        <p className="text-zinc-400 text-[11px]">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address Snapshot */}
              <div className="pt-2 border-t border-white/5 text-[11px] text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  Delivering to: <strong className="text-zinc-300">{order.shippingAddress.fullName}</strong>, {order.shippingAddress.addressLine1}, {order.shippingAddress.city} ({order.shippingAddress.pincode})
                </span>
                <span className="text-emerald-400 font-semibold">✓ 7-Day Exchange Protection Active</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
