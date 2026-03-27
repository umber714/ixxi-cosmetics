'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import Image from 'next/image';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, isOpen, setIsOpen, totalItems, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-center py-2 px-4 text-sm">
        Envio gratis en compras superiores a $150 · Muestras de regalo en cada pedido
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border h-20 flex items-center">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-3xl font-serif font-bold tracking-wider">
            IXXI
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex space-x-8 text-sm font-medium">
            <li><Link href="/shop" className="hover:text-primary transition-colors">Tienda</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
          </ul>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-primary transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button className="relative hover:text-primary transition-colors" onClick={() => setIsOpen(true)}>
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="bg-white w-80 h-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-serif font-bold">IXXI</span>
              <button onClick={() => setMobileOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <nav className="flex flex-col space-y-4 text-lg">
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="py-2 border-b border-border">Tienda</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 border-b border-border">Nosotros</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="py-2 border-b border-border">Contacto</Link>
              <button className="py-2 border-b border-border text-left flex items-center gap-2">
                <Search className="w-5 h-5" /> Buscar
              </button>
              <button className="py-2 border-b border-border text-left flex items-center gap-2">
                <User className="w-5 h-5" /> Mi Cuenta
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Cart Header */}
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-2xl font-serif font-semibold">Tu Carrito</h2>
              <button onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-6">Tu carrito esta vacio</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsOpen(false)}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
                  >
                    Comenzar a Comprar
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                        <p className="text-primary font-semibold">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 border border-border rounded flex items-center justify-center hover:bg-secondary">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 border border-border rounded flex items-center justify-center hover:bg-secondary">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">Envio e impuestos calculados al finalizar la compra</p>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Finalizar Compra
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full border border-border text-center py-3 rounded-lg hover:bg-secondary transition font-medium"
                >
                  Continuar Comprando
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
