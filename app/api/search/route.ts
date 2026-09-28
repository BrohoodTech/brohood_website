import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  if (!q || q.length < 2) {
    return NextResponse.json({
      success: true,
      results: [],
      popularSearches: ['Rolex Submariner', 'Jordan 1 Low', 'Panda Dunk', 'Wayfarer', 'Heavyweight Tee'],
    });
  }

  const results = PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  )
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      brand: p.brand,
      category: p.category,
      price: p.price,
      mrp: p.mrp,
      image: p.primaryImage,
    }));

  return NextResponse.json({
    success: true,
    query: q,
    results,
  });
}
