import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress, paymentMethod, couponCode, cartTotal } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Your cart is empty' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.pincode) {
      return NextResponse.json(
        { success: false, error: 'Complete shipping address is required' },
        { status: 400 }
      );
    }

    // Generate unique human-readable order number
    const orderNumber = `BH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const freeShippingThreshold = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD || '1499');
    const shippingFee = cartTotal >= freeShippingThreshold ? 0 : 99;
    const finalAmount = cartTotal + shippingFee;

    // Online Razorpay Payment flow
    if (paymentMethod === 'razorpay') {
      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

      let razorpayOrderId = `order_mock_${Date.now()}`;

      // If live Razorpay credentials are present, invoke Razorpay Orders API
      if (razorpayKeyId && razorpaySecret) {
        try {
          const authString = Buffer.from(`${razorpayKeyId}:${razorpaySecret}`).toString('base64');
          const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${authString}`,
            },
            body: JSON.stringify({
              amount: Math.round(finalAmount * 100), // amount in paise
              currency: 'INR',
              receipt: orderNumber,
              notes: {
                shipping_phone: shippingAddress.phone,
                customer_name: shippingAddress.fullName,
              },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            razorpayOrderId = data.id;
          }
        } catch (e) {
          console.error('Razorpay API call error:', e);
        }
      }

      return NextResponse.json({
        success: true,
        orderNumber,
        paymentMethod: 'razorpay',
        razorpayOrderId,
        amount: finalAmount,
        currency: 'INR',
        keyId: razorpayKeyId || 'rzp_test_placeholder',
      });
    }

    // Cash on Delivery flow
    return NextResponse.json({
      success: true,
      orderNumber,
      paymentMethod: 'cod',
      amount: finalAmount,
      currency: 'INR',
      status: 'placed',
      message: 'Order placed successfully via Cash on Delivery',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
