import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, PRODUCTS } from '@/lib/db';
import { ProductDetailView } from '@/components/product-detail-view';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

// 1. Dynamic Server-side Metadata Generation for High-Ranking SERPs
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | BroHood India',
      description: 'The requested luxury watch, sneaker or streetwear piece was not found.',
    };
  }

  const categoryLabel = product.category.toUpperCase();
  const title = `${product.title} — Buy Online at Best Price in India | BroHood`;
  const description = `Buy ${product.title} online in India at ₹${product.price.toLocaleString(
    'en-IN'
  )} (MRP ₹${product.mrp.toLocaleString(
    'en-IN'
  )}). Premium craftsmanship with brand hardcase box, Cash on Delivery (₹0 Advance), Blue Dart & Delhivery tracking & 7-day replacement.`;

  const canonicalUrl = `${baseUrl}/product/${product.slug}`;

  return {
    title,
    description,
    keywords: [
      product.title,
      `${product.brand} watches india`,
      `${product.brand} online cod`,
      `buy ${product.brand} online in india`,
      `${product.title} price in india`,
      'cash on delivery luxury store',
      'brohood shop',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} — BroHood India`,
      description,
      url: canonicalUrl,
      siteName: 'BroHood Store',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: product.primaryImage,
          width: 900,
          height: 1125,
          alt: `${product.title} - Front View`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | BroHood India`,
      description,
      images: [product.primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  // 2. Schema.org Product Rich Snippet (Enables Star Ratings and Price in Google Search)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.length > 0 ? product.images : [product.primaryImage],
    description: product.description,
    sku: `BH-${product.id}`,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'BroHood Store',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  // 3. Schema.org Breadcrumbs (Enables Hierarchical SERP navigation in Google)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.category.toUpperCase(),
        item: `${baseUrl}/shop?category=${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `${baseUrl}/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ProductDetailView product={product} />
    </>
  );
}
