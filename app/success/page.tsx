import Link from 'next/link';
import { Check, Mail, Truck } from 'lucide-react';

export default function Success() {
  const orderNumber = 'IXXI' + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
      {/* Checkmark */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Pedido Confirmado!</h1>
      <p className="text-muted-foreground mb-2">Numero de pedido: <span className="font-mono font-semibold text-foreground">{orderNumber}</span></p>
      <p className="text-muted-foreground mb-8">Confirmacion enviada a: <span className="text-foreground">cliente@ejemplo.com</span></p>

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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
          Seguir Comprando
        </Link>
        <Link href="/" className="border border-border px-8 py-3 rounded-lg hover:bg-secondary transition font-medium">
          Volver al Inicio
        </Link>
      </div>

      <p className="text-sm text-muted-foreground mt-8">
        Necesitas ayuda? <Link href="/contact" className="text-primary hover:underline">Contactanos</Link>
      </p>
    </div>
  );
}
