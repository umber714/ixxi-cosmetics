import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1600&h=900&fit=crop"
          alt="IXXI Cosmetics"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay — left side for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <p className="text-white/70 tracking-[0.3em] text-xs uppercase mb-6 font-light">
            Cosmetica de Lujo Natural
          </p>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-[1.05] mb-8 text-white">
            Belleza que<br />
            <em className="not-italic text-primary/90">transforma</em>
          </h1>

          {/* Body */}
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-md font-light">
            Formulada con ingredientes naturales de la mas alta calidad. Descubre la coleccion que miles de mujeres ya aman.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-white text-foreground px-8 py-4 rounded-lg hover:bg-white/90 transition font-medium text-sm tracking-wide"
            >
              Explorar Coleccion
            </Link>
            <Link
              href="/about"
              className="border border-white/60 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition font-medium text-sm tracking-wide"
            >
              Nuestra Historia
            </Link>
          </div>
        </div>

        {/* Social proof — bottom right */}
        <div className="absolute bottom-12 right-8 hidden lg:flex items-center gap-6">
          <div className="text-right text-white">
            <p className="text-3xl font-serif font-bold">10K+</p>
            <p className="text-white/60 text-xs tracking-widest uppercase">Clientas Felices</p>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-right text-white">
            <p className="text-3xl font-serif font-bold">100%</p>
            <p className="text-white/60 text-xs tracking-widest uppercase">Natural</p>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-right text-white">
            <p className="text-3xl font-serif font-bold">5★</p>
            <p className="text-white/60 text-xs tracking-widest uppercase">Valoracion</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Descubrir</span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
