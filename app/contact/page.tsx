import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

export const metadata: Metadata = {
  title: 'Contact Customer Support & WhatsApp Order Tracking | BroHood India',
  description:
    'Reach BroHood customer support directly via WhatsApp (+91 98765 43210) for live courier tracking, size advice, and COD order assistance across India.',
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Support & Order Tracking | BroHood India',
    description: 'Instant WhatsApp assistance, delivery status, and order support across India.',
    url: `${baseUrl}/contact`,
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'BroHood Support & Order Tracking',
    url: `${baseUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'BroHood Store',
      telephone: '+91-98765-43210',
      email: 'support@brohood.in',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-98765-43210',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: 'Mo-Sa 10:00-20:00',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

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
            <MessageCircle size={24} className="text-amber-400" />
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              Contact & Support
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            We are here to assist with sizing questions, delivery status, and order tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Support Channels */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4 shadow-xl">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Direct Contact Details
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#18191e] hover:bg-[#20222a] border border-white/5 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366]">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#25D366]">WhatsApp Support (Fastest)</p>
                    <p className="text-zinc-400 text-xs">+91 98765 43210 • 10 AM to 8 PM</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#18191e] border border-white/5">
                  <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Email Enquiries</p>
                    <p className="text-zinc-400 text-xs">support@brohood.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#18191e] border border-white/5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Operational Hours</p>
                    <p className="text-zinc-400 text-xs">Mon – Sat: 10:00 AM – 8:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Send Inquiry Form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
