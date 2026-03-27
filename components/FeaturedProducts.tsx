import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">Productos Destacados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Seleccion especial de nuestros productos mas amados por su eficacia y calidad excepcional
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/shop" className="border border-border px-8 py-3 rounded-lg hover:bg-secondary transition font-medium inline-block">
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}
