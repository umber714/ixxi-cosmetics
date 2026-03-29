'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer className="mt-24">
      {/* Newsletter */}
      <div className="border-t border-b border-border">
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
          <h3 className="text-3xl font-serif font-semibold mb-4">Unete a Nuestra Comunidad</h3>
          <p className="text-muted-foreground mb-6">
            Recibe consejos de belleza exclusivos, ofertas especiales y novedades directamente en tu inbox.
          </p>
          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Gracias por suscribirte!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electronico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-60"
              >
                {status === 'loading' ? '...' : 'Suscribirse'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-2">Error al suscribirse. Intenta de nuevo.</p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Todos los Productos</Link></li>
              <li><Link href="/shop?category=Cuidado+Facial" className="hover:text-foreground transition-colors">Cuidado Facial</Link></li>
              <li><Link href="/shop?category=Maquillaje" className="hover:text-foreground transition-colors">Maquillaje</Link></li>
              <li><Link href="/shop?category=Sets" className="hover:text-foreground transition-colors">Sets</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contacto</Link></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Envios</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Devoluciones</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">FAQ</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">Nosotros</Link></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Nuestra Historia</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Sostenibilidad</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Trabaja con Nosotros</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Siguenos</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2026 IXXI Cosmetics. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacidad</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terminos</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
