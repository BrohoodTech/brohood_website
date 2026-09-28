import { NextRequest, NextResponse } from 'next/server';
import { BRANDS } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let brands = BRANDS;
  if (category) {
    brands = brands.filter((b) => b.categorySlug === category);
  }

  return NextResponse.json({
    success: true,
    brands,
  });
}
