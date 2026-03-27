import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-secondary via-background to-accent/20 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Belleza Natural, Resultados Excepcionales
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Descubre nuestra coleccion de cosmetica de lujo formulada con ingredientes naturales de la mas alta calidad. Tu piel merece lo mejor.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
                Explorar Productos
              </Link>
              <Link href="/about" className="border border-border px-8 py-3 rounded-lg hover:bg-secondary transition font-medium">
                Nuestra Historia
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1774408130074-ae6c3d1cae39?w=600&h=600&fit=crop"
                alt="Belleza natural"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold">10,000+</p>
                <p className="text-sm text-muted-foreground">Clientas Felices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
