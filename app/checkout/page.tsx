'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Shield } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

export default function Checkout() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Tu carrito esta vacio</h1>
        <p className="text-muted-foreground mb-8">Agrega productos a tu carrito para continuar</p>
        <Link href="/shop" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 150 ? 0 : 9.99;
  const tax = subtotal * 0.21;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Informacion de Contacto</h2>
            <input
              type="email"
              placeholder="Correo electronico"
              className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Direccion de Envio</h2>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nombre" className="px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
              <input placeholder="Apellido" className="px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <input placeholder="Direccion" className="w-full mt-4 px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input placeholder="Ciudad" className="px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
              <input placeholder="Codigo Postal" className="px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <input placeholder="Telefono" className="w-full mt-4 px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Metodo de Pago</h2>
            <div className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                <span className="font-medium">Pago Seguro con Stripe</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Pago 100% seguro y encriptado</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition font-medium text-lg">
            Proceder al Pago
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-28 self-start">
          <div className="bg-secondary/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envio</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA (21%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {subtotal < 150 && (
              <p className="text-sm text-primary mt-4">
                Agrega ${(150 - subtotal).toFixed(2)} mas para envio gratis
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
