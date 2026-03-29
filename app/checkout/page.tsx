'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '@/lib/cartContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const inputClass = 'w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary';
const inputErrorClass = 'w-full px-4 py-3 border border-red-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-400';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface PaymentFormProps {
  form: FormData;
}

function PaymentForm({ form }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        payment_method_data: {
          billing_details: {
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            phone: form.phone,
            address: {
              line1: form.address,
              city: form.city,
              postal_code: form.postalCode,
              country: 'MX',
            },
          },
        },
      },
    });

    if (error) {
      setError(error.message ?? 'Error al procesar el pago');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition font-medium text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando...
          </>
        ) : (
          'Pagar Ahora'
        )}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [form, setForm] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const shipping = subtotal >= 150 ? 0 : 9.99;
  const tax = subtotal * 0.21;
  const total = subtotal + shipping + tax;

  const required: (keyof FormData)[] = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode'];
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!form.email || !form.email.includes('@')) errors.email = 'Ingresa un correo valido';
  if (!form.firstName) errors.firstName = 'Requerido';
  if (!form.lastName) errors.lastName = 'Requerido';
  if (!form.address) errors.address = 'Requerido';
  if (!form.city) errors.city = 'Requerido';
  if (!form.postalCode) errors.postalCode = 'Requerido';

  const isFormValid = required.every(f => !errors[f]);

  function handleChange(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  function handleBlur(field: keyof FormData) {
    return () => setTouched(prev => ({ ...prev, [field]: true }));
  }

  useEffect(() => {
    if (items.length === 0) return;

    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(i => ({ id: i.product.id, quantity: i.quantity })),
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        phone: form.phone,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setClientSecret(data.clientSecret);
      })
      .catch(err => setFetchError(err.message));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Contact + Shipping + Payment */}
        <div className="space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Informacion de Contacto</h2>
            <div>
              <input
                type="email"
                placeholder="Correo electronico *"
                value={form.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                className={touched.email && errors.email ? inputErrorClass : inputClass}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Direccion de Envio</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="Nombre *"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  className={touched.firstName && errors.firstName ? inputErrorClass : inputClass}
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Apellido *"
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  className={touched.lastName && errors.lastName ? inputErrorClass : inputClass}
                />
                {touched.lastName && errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <input
                placeholder="Direccion *"
                value={form.address}
                onChange={handleChange('address')}
                onBlur={handleBlur('address')}
                className={touched.address && errors.address ? inputErrorClass : inputClass}
              />
              {touched.address && errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <input
                  placeholder="Ciudad *"
                  value={form.city}
                  onChange={handleChange('city')}
                  onBlur={handleBlur('city')}
                  className={touched.city && errors.city ? inputErrorClass : inputClass}
                />
                {touched.city && errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Codigo Postal *"
                  value={form.postalCode}
                  onChange={handleChange('postalCode')}
                  onBlur={handleBlur('postalCode')}
                  className={touched.postalCode && errors.postalCode ? inputErrorClass : inputClass}
                />
                {touched.postalCode && errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
            <input
              placeholder="Telefono"
              value={form.phone}
              onChange={handleChange('phone')}
              className={`${inputClass} mt-4`}
            />
          </div>

          {/* Stripe Payment Element */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Metodo de Pago</h2>
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Shield className="w-4 h-4" />
                <span>Pago 100% seguro y encriptado</span>
              </div>

              {!isFormValid ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Completa los campos requeridos para continuar con el pago
                </p>
              ) : fetchError ? (
                <p className="text-red-500 text-sm">{fetchError}</p>
              ) : !clientSecret ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: { theme: 'stripe' },
                  }}
                >
                  <PaymentForm form={form} />
                </Elements>
              )}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
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
