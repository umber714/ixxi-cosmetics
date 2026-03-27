import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { products } from '@/data/products';

export async function POST(request: NextRequest) {
  const { items } = await request.json();

  // Validate items and calculate total server-side
  let total = 0;
  const lineItems = items.map((item: any) => {
    const product = products.find(p => p.id === item.id);
    if (!product) throw new Error('Product not found');
    total += product.price * item.quantity;
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.nextUrl.origin}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}