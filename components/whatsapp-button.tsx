'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ productTitle }: { productTitle?: string }) {
  const pathname = usePathname();
  // Hide on checkout, order confirmation, and product detail page (which has its own dedicated WhatsApp CTA)
  if (pathname === '/checkout' || pathname === '/order-confirmation' || pathname.startsWith('/product/')) return null;

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const message = productTitle
    ? `Hi BroHood, I would like to check availability and order details for: ${productTitle}`
    : 'Hi BroHood, I would like to enquire about products, sizes and COD delivery.';

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 sm:bottom-6 right-3.5 sm:right-6 z-40 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-3 rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 group font-medium text-xs sm:text-sm"
    >
      <MessageCircle size={20} className="fill-white text-[#25D366] shrink-0" />
      <span className="font-semibold text-xs hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
