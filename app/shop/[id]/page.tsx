'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart, Heart, Share2, Star, Check, Minus, Plus, ArrowLeft } from 'lucide-react';
import { products, getRelatedProducts } from '@/data/products';
import { useCart } from '@/lib/cartContext';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';

interface Props {
  params: { id: string };
}

export default function ProductDetail({ params }: Props) {
  const product = products.find(p => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'reviews'>('ingredients');
  const { addItem } = useCart();

  if (!product) notFound();

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const related = getRelatedProducts(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Tienda</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="relative">
            <Link href="/shop" className="lg:hidden inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Volver
            </Link>
            <ProductGallery images={allImages} name={product.name} />
          </div>

          {/* Details */}
          <div>
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} resenas)</span>
            </div>

            <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-secondary transition">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 hover:bg-secondary transition">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Anadir al Carrito
              </button>
              <button className="w-12 h-12 border border-border rounded-lg flex items-center justify-center hover:bg-secondary transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 border border-border rounded-lg flex items-center justify-center hover:bg-secondary transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div className="space-y-3">
                {product.benefits.map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex border-b border-border mb-6">
            {(['ingredients', 'usage', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'ingredients' ? 'Ingredientes' : tab === 'usage' ? 'Modo de Uso' : 'Resenas'}
              </button>
            ))}
          </div>

          {activeTab === 'ingredients' && product.ingredients && (
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ing => (
                <span key={ing} className="bg-secondary px-4 py-2 rounded-full text-sm">
                  {ing}
                </span>
              ))}
            </div>
          )}

          {activeTab === 'usage' && product.usage && (
            <p className="text-muted-foreground max-w-2xl">{product.usage}</p>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold">{product.rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{product.reviews} resenas</p>
                </div>
              </div>
              <button className="border border-border px-6 py-2 rounded-lg hover:bg-secondary transition text-sm font-medium">
                Escribir una Resena
              </button>
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
