import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const buf = Buffer.from(await request.arrayBuffer());

  console.log('[webhook] sig present:', !!sig, '| body length:', buf.length, '| secret set:', !!process.env.STRIPE_WEBHOOK_SECRET);

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('[webhook] Signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log('[webhook] Received event:', event.type);

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('[webhook] Payment intent succeeded:', paymentIntent.id, 'email:', paymentIntent.receipt_email);

    try {
      await sendOrderConfirmation(paymentIntent);
      console.log('[webhook] Order confirmation email sent');
    } catch (err: any) {
      console.error('[webhook] Failed to send email:', err.message);
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('[webhook] Checkout session completed:', session.id);
  }

  return NextResponse.json({ received: true });
}
