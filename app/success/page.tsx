import Link from 'next/link';
import { Check, Mail, Truck, Package } from 'lucide-react';
import stripe from '@/lib/stripe';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string; session_id?: string; redirect_status?: string }>;
}) {
  const { payment_intent, session_id, redirect_status } = await searchParams;

  let email: string | null = null;
  let total: string | null = null;
  let orderRef: string = Math.random().toString(36).substring(2, 8).toUpperCase();
  let lineItems: { name: string; quantity: number; amount: number }[] = [];

  // Payment Intent flow (embedded Payment Element)
  if (payment_intent) {
    try {
      const intent = await stripe.paymentIntents.retrieve(payment_intent);
      if (intent.amount) {
        total = (intent.amount / 100).toFixed(2);
      }
      if (intent.receipt_email) {
        email = intent.receipt_email;
      }
      orderRef = payment_intent.slice(-8).toUpperCase();
    } catch {
      // Fall through to generic success
    }
  }

  // Checkout Session flow (legacy / hosted checkout)
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
      });
      email = session.customer_details?.email ?? null;
      total = session.amount_total ? (session.amount_total / 100).toFixed(2) : null;
      orderRef = session_id.slice(-8).toUpperCase();
      lineItems = (session.line_items?.data ?? []).map(item => ({
        name: item.description ?? '',
        quantity: item.quantity ?? 1,
        amount: (item.amount_total ?? 0) / 100,
      }));
    } catch {
      // Fall through to generic success
    }
  }

  // Don't show success if payment didn't succeed
  if (redirect_status && redirect_status !== 'succeeded') {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <h1 className="text-2xl font-serif font-bold mb-4 text-red-600">Pago no completado</h1>
        <p className="text-muted-foreground mb-8">Hubo un problema con tu pago. Por favor intenta de nuevo.</p>
        <Link href="/checkout" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
          Volver al Checkout
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
      {/* Checkmark */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Pedido Confirmado!</h1>
      <p className="text-muted-foreground mb-2">
        Numero de pedido: <span className="font-mono font-semibold text-foreground">IXXI-{orderRef}</span>
      </p>
      {email && (
        <p className="text-muted-foreground mb-2">
          Confirmacion enviada a: <span className="text-foreground">{email}</span>
        </p>
      )}
      {total && (
        <p className="text-muted-foreground mb-8">
          Total cobrado: <span className="font-semibold text-foreground">${total} MXN</span>
        </p>
      )}

      {/* Line items (Checkout Session only) */}
      {lineItems.length > 0 && (
        <div className="border border-border rounded-2xl p-6 mb-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Productos</h2>
          </div>
          <ul className="space-y-2">
            {lineItems.map((item, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span>
                  {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                </span>
                <span className="font-medium">${item.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="border border-border rounded-2xl p-6">
          <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Confirmacion por Email</h3>
          <p className="text-sm text-muted-foreground">Revisa tu bandeja de entrada</p>
        </div>
        <div className="border border-border rounded-2xl p-6">
          <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Envio en 3-5 Dias</h3>
          <p className="text-sm text-muted-foreground">Recibiras un email de seguimiento</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
          Seguir Comprando
        </Link>
        <Link href="/" className="border border-border px-8 py-3 rounded-lg hover:bg-secondary transition font-medium">
          Volver al Inicio
        </Link>
      </div>

      <p className="text-sm text-muted-foreground mt-8">
        Necesitas ayuda?{' '}
        <Link href="/contact" className="text-primary hover:underline">
          Contactanos
        </Link>
      </p>
    </div>
  );
}
