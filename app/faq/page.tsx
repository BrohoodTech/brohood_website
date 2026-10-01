import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { FaqAccordion } from '@/components/faq-accordion';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions & 1:1 Quality Guide',
  description:
    'Read answers about BroHood 1:1 master copy watches, hype sneakers, Cash on Delivery (COD) payment terms, real-time courier tracking, and 7-day doorstep replacement.',
  alternates: {
    canonical: `${baseUrl}/faq`,
  },
  openGraph: {
    title: 'FAQs & 1:1 Quality Guide | BroHood India',
    description:
      'Learn how BroHood delivers 1:1 first-copy luxury watches, hype sneakers, and streetwear with COD across India.',
    url: `${baseUrl}/faq`,
  },
};

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
    q: 'How does shipping and order tracking work?',
    a: 'Every order is processed and packed with official brand hardcase packaging directly from our master workshop network. As soon as your order is handed over to our express logistics partners (Blue Dart, Delhivery, or DTDC), an active tracking AWB code is sent directly to your phone via SMS and WhatsApp. You can also track your order live anytime on our Track Order page.',
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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <HelpCircle size={24} className="text-amber-400" />
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Everything you need to know about our 1:1 master copy collections, COD, and order tracking.
          </p>
        </div>

        <FaqAccordion faqs={FAQS} />
      </div>
    </>
  );
}
