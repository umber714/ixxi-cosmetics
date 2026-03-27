'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/lib/cartContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
            Best Seller
          </span>
        )}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-3 right-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/90"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{product.category}</p>
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-medium hover:text-primary transition-colors mb-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
