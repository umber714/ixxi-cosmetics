import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function GET() {
  try {
    const balance = await stripe.balance.retrieve();
    return NextResponse.json({ ok: true, currency: balance.available[0]?.currency });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err.message,
      type: err.type,
      code: err.code,
      keyPrefix: process.env.STRIPE_SECRET_KEY?.slice(0, 12) + '...',
    }, { status: 500 });
  }
}
