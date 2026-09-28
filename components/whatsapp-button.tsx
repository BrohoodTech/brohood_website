'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ productTitle }: { productTitle?: string }) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const message = productTitle
    ? `Hi BroHood, I would like to see video verification / check availability for: ${productTitle}`
    : 'Hi BroHood, I would like to enquire about products, sizes and COD delivery.';

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group font-medium text-sm"
    >
      <MessageCircle size={20} className="fill-white text-[#25D366]" />
      <span className="hidden sm:inline font-semibold">Chat / Video Call</span>
    </a>
  );
}
