import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { products } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const { items, email, firstName, lastName, address, city, postalCode, phone } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Calculate total server-side (never trust the client)
    let subtotal = 0;
    const itemDescriptions: string[] = [];
    for (const item of items as { id: string; variantId?: string; quantity: number }[]) {
      const product = products.find(p => p.id === item.id);
      if (!product) throw new Error(`Product not found: ${item.id}`);
      let unitPrice = product.price;
      let label = product.name;
      if (item.variantId) {
        const variant = product.variants?.find(v => v.id === item.variantId);
        if (!variant) throw new Error(`Variant not found: ${item.variantId}`);
        unitPrice = variant.price;
        label = `${product.name} (${variant.label})`;
      }
      subtotal += unitPrice * item.quantity;
      itemDescriptions.push(`${label} x${item.quantity}`);
    }

    const shipping = subtotal >= 150 ? 0 : 9.99;
    const tax = subtotal * 0.21;
    const total = subtotal + shipping + tax;
    const amount = Math.round(total * 100); // Stripe requires cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
      ...(email && { receipt_email: email }),
      metadata: {
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        address: address ?? '',
        city: city ?? '',
        postalCode: postalCode ?? '',
        phone: phone ?? '',
        items: itemDescriptions.join(', '),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error('[checkout] Stripe error:', err.message, err.type, err.code);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
