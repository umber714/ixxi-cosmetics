import { getBestSellers } from '@/data/products';
import ProductCard from './ProductCard';

export default function BestSellers() {
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">Los Mas Vendidos</h2>
          <p className="text-muted-foreground">Descubre los favoritos de nuestra comunidad</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
