'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, MessageCircle, HelpCircle, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    q: 'What does "1:1 Master Quality" mean?',
    a: '1:1 Master Quality means the product is crafted with the exact dimensions, weight, materials, branding tags, and movement specifications as the original. For watches, this includes sweeping automatic movements, sapphire crystal, and ceramic bezels. For sneakers, it means genuine leather/suede, correct stitch density, and authentic box packaging with extra laces.',
  },
  {
    q: 'How does Cash on Delivery (COD) work?',
    a: 'You can select "Cash on Delivery" at checkout with zero advance payment required. When your package arrives via our courier partners (Delhivery or BlueDart Express), you can inspect the sealed tamper-proof parcel and pay the delivery executive in cash or via UPI (GPay/PhonePe).',
  },
  {
    q: 'Can I see a video of my product before dispatch?',
    a: 'Yes, absolutely! We understand trust is everything. Simply message us on WhatsApp with your order number, or click the WhatsApp button on the product page. Our team will share a live 4K video showing the details, automatic second-hand sweep, or shoe stitching before packing.',
  },
  {
    q: 'What packaging is included with watches and sneakers?',
    a: 'All our luxury watches come with complete brand boxes (e.g., Rolex green box with booklets and guarantee card). All sneakers come in their iconic brand boxes with protective paper, extra laces, and hangtags.',
  },
  {
    q: 'How long does shipping take across India?',
    a: 'Orders are dispatched within 24 hours. Metro cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai) usually receive delivery within 2 to 3 business days. Rest of India takes 3 to 5 business days. You will receive an SMS and WhatsApp tracking link once shipped.',
  },
  {
    q: 'What is your size exchange and return policy?',
    a: 'We provide a 7-day hassle-free replacement policy. If sneaker size does not fit or if there is any transit damage, message our support on WhatsApp, and we will arrange a reverse pickup and replacement pair.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 text-white space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <HelpCircle size={24} className="text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Everything you need to know about our 1:1 master copy collections, COD, and video verification.
        </p>
      </div>

      <div className="divide-y divide-white/5 bg-[#121316] border border-white/5 rounded-3xl p-4 sm:p-6 shadow-xl">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-amber-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className="text-xs text-zinc-300 leading-relaxed mt-2.5 pr-6 animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#18191f] to-[#121316] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-sm font-bold text-white uppercase">Still have questions?</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Talk to our product specialists directly on WhatsApp.</p>
        </div>
        <a
          href="https://wa.me/919876543210?text=Hi%20BroHood%2C%20I%20have%20a%20question%20before%20placing%20my%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 flex-shrink-0"
        >
          <MessageCircle size={15} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
