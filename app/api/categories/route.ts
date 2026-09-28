import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/lib/db';

export async function GET() {
  return NextResponse.json({
    success: true,
    categories: CATEGORIES,
  });
}
