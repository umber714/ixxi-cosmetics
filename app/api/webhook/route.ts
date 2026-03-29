import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')!;
  const body = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('Payment succeeded:', paymentIntent.id);

    try {
      await sendOrderConfirmation(paymentIntent);
      console.log('Order confirmation email sent for:', paymentIntent.id);
    } catch (err: any) {
      // Log but don't fail the webhook — Stripe would retry
      console.error('Failed to send order confirmation email:', err.message);
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout session completed:', session.id);
  }

  return NextResponse.json({ received: true });
}
