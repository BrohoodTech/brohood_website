import { Analytics } from '@vercel/analytics/next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { GlobalShell } from '@/components/global-shell';

const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const displayFont = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display' });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'BroHood™ India — 1:1 First Copy Luxury Watches, Hype Sneakers & Streetwear',
    template: '%s | BroHood India',
  },
  description:
    'Buy 1:1 master copy luxury watches (Rolex, Tissot, Hublot, Rado), hype sneakers (Jordan 1, Travis Scott, Samba), designer goggles & 260 GSM oversized tees in India. Cash on Delivery (₹0 Advance), Real-Time Blue Dart/Delhivery Tracking, 7-Day Doorstep Replacement.',
  keywords: [
    'first copy watches india',
    '1:1 master copy watches online',
    'rolex first copy watch cod',
    'first copy sneakers india',
    'air jordan 1 first copy',
    'travis scott replica low',
    'designer goggles uv400 cash on delivery',
    '260 gsm heavyweight oversized t-shirts',
    'watchocart alternative',
    'foothunk alternative',
    'first copy watches delhi mumbai bangalore',
    'brohood store',
  ],
  authors: [{ name: 'BroHood Store', url: baseUrl }],
  creator: 'BroHood Store',
  publisher: 'BroHood India',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'BroHood™ India — 1:1 First Copy Luxury Watches, Hype Sneakers & Streetwear',
    description:
      'India’s premier online store for 1:1 master quality watches, retro hype sneakers, statement goggles, and oversized tees. Cash on Delivery available across 27,000+ pin codes.',
    url: baseUrl,
    siteName: 'BroHood Store',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'BroHood India — 1:1 Master Quality Luxury Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BroHood™ India — 1:1 First Copy Luxury Watches, Hype Sneakers & Streetwear',
    description:
      'Cash on Delivery across India with Real-Time Courier Tracking. 1:1 Master Quality luxury timepieces and sneakers.',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
  themeColor: '#08080a',
};

// Organization, OnlineStore & LocalBusiness Structured Data (Schema.org JSON-LD for AEO & GEO)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'OnlineStore'],
      '@id': `${baseUrl}/#organization`,
      name: 'BroHood Store',
      alternateName: 'BroHood India',
      url: baseUrl,
      logo: `${baseUrl}/icon.svg`,
      description:
        'India’s premier streetwear destination for 1:1 first-copy luxury watches, hype sneakers, designer goggles, and heavyweight essentials.',
      sameAs: ['https://wa.me/919876543210'],
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash on Delivery, UPI, Google Pay, PhonePe, Paytm, BHIM, Credit Card, Debit Card, Net Banking',
      priceRange: '₹999 - ₹18,999',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: 'Karnataka',
        addressLocality: 'Bengaluru',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: 'Delhi NCR' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Bengaluru' },
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'City', name: 'Kolkata' },
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'City', name: 'Pune' },
        { '@type': 'City', name: 'Ahmedabad' },
        { '@type': 'City', name: 'Jaipur' },
        { '@type': 'City', name: 'Chandigarh' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-98765-43210',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'BroHood Store',
      description: '1:1 First Copy Luxury Watches, Hype Sneakers & Streetwear India',
      publisher: { '@id': `${baseUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/shop?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-IN',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        {/* Preconnect to critical assets */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://checkout.razorpay.com" />
        <link rel="dns-prefetch" href="https://api.postalpincode.in" />

        {/* LLM & AI Search Engine Discovery */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context Index" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Knowledge Base" />

        {/* Geographic Local SEO Tags (GEO) */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* Global Structured Data for AEO & Generative AI Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased bg-[#08080a] text-white overflow-x-hidden w-full max-w-[100vw] relative">
        <GlobalShell>{children}</GlobalShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}

