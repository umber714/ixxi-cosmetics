import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-8xl sm:text-9xl font-serif font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-4">Pagina No Encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Lo sentimos, la pagina que buscas no existe o ha sido movida.
      </p>
      <Link href="/" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Volver al Inicio
      </Link>
    </div>
  );
}
