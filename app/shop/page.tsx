import type { Metadata } from 'next';
import { ShopView } from '@/components/shop-view';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

export const metadata: Metadata = {
  title: 'All Drops & Catalog — 1:1 Watches, Hype Sneakers, Goggles & Streetwear',
  description:
    'Explore the complete BroHood catalog: Rolex & AP master copy timepieces, retro hype sneakers (Air Jordan, Travis Scott), designer UV400 goggles, and 260 GSM oversized tees. Cash on Delivery across India.',
  keywords: [
    'first copy catalog',
    'buy 1:1 watches online india',
    'hype sneakers store india',
    'designer sunglasses cod',
    '260 gsm heavy tees',
    'first copy cash on delivery store',
    'brohood shop',
  ],
  alternates: {
    canonical: `${baseUrl}/shop`,
  },
  openGraph: {
    title: 'BroHood Catalog — 1:1 Master Quality Streetwear & Luxury',
    description: 'Shop curated collections with Cash on Delivery and real-time courier tracking.',
    url: `${baseUrl}/shop`,
  },
};

export default function ShopPage() {
  return <ShopView />;
}
