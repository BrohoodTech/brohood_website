import { NextRequest, NextResponse } from 'next/server';
import { COUPONS } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code || typeof cartTotal !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Coupon code and cart total are required' },
        { status: 400 }
      );
    }

    const coupon = COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    if (cartTotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue.toLocaleString('en-IN')}`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    discountAmount = Math.min(discountAmount, cartTotal);
    const newTotal = Math.max(0, cartTotal - discountAmount);

    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        description: coupon.description,
      },
      discountAmount,
      newTotal,
      message: `Coupon ${coupon.code} applied successfully! You saved ₹${discountAmount.toLocaleString('en-IN')}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error applying coupon' },
      { status: 500 }
    );
  }
}
