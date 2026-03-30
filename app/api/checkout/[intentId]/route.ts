import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ intentId: string }> }
) {
  try {
    const { intentId } = await params;
    const { email, firstName, lastName, address, city, postalCode, phone } = await request.json();

    await stripe.paymentIntents.update(intentId, {
      ...(email && { receipt_email: email }),
      metadata: {
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        address: address ?? '',
        city: city ?? '',
        postalCode: postalCode ?? '',
        phone: phone ?? '',
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[checkout/update]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
