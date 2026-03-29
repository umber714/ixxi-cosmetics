import Link from 'next/link';
import Image from 'next/image';

export default function BrandStory() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden">
          {/* Image */}
          <div className="relative h-80 lg:h-auto min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&h=700&fit=crop"
              alt="Nuestra Historia IXXI"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Copy */}
          <div className="bg-foreground text-background p-12 lg:p-16 flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-background/50 mb-4">Nuestra Historia</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight mb-6">
              Creada con<br />
              <em className="not-italic text-primary">proposito</em>
            </h2>
            <p className="text-background/70 leading-relaxed mb-4">
              IXXI nacio de la conviccion de que la belleza real no deberia comprometer la salud de tu piel ni del planeta. Cada formula es el resultado de anos de investigacion con los mejores ingredientes naturales.
            </p>
            <p className="text-background/70 leading-relaxed mb-8">
              Desde nuestra fundacion, hemos mantenido un compromiso inquebrantable con la calidad, la transparencia y la sostenibilidad — porque creemos que el lujo y la responsabilidad pueden coexistir.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-background/30 text-background px-6 py-3 rounded-lg hover:bg-background/10 transition font-medium text-sm w-fit"
            >
              Conoce mas sobre IXXI
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
