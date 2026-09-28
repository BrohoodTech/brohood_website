import { NextRequest, NextResponse } from 'next/server';
import { filterProducts, getAllProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category') || undefined;
    const brandsParam = searchParams.get('brands');
    const brands = brandsParam ? brandsParam.split(',').filter(Boolean) : undefined;
    const sizesParam = searchParams.get('sizes');
    const sizes = sizesParam ? sizesParam.split(',').filter(Boolean) : undefined;
    const minPrice = searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined;
    const maxPrice = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined;
    const sortBy = searchParams.get('sort') || 'featured';
    const inStockOnly = searchParams.get('in_stock') === 'true';
    const query = searchParams.get('q') || undefined;

    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(50, Number(searchParams.get('limit') || '12')));

    const filtered = filterProducts({
      category,
      brands,
      sizes,
      minPrice,
      maxPrice,
      sortBy,
      inStockOnly,
      query,
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      products: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
