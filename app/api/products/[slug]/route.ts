import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, getProductsByCategory } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const related = getProductsByCategory(product.category)
      .filter((p) => p.slug !== product.slug)
      .slice(0, 4);

    return NextResponse.json({
      success: true,
      product,
      related,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
