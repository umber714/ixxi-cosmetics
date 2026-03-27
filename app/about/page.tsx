import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Award, Users } from 'lucide-react';

const values = [
  { icon: Leaf, title: 'Naturales', desc: 'Ingredientes organicos y sostenibles en cada formula' },
  { icon: Heart, title: 'Eticos', desc: 'Cruelty-free y respetuosos con el medio ambiente' },
  { icon: Award, title: 'Efectivos', desc: 'Resultados respaldados por la ciencia' },
  { icon: Users, title: 'Inclusivos', desc: 'Belleza para todas, sin excepcion' },
];

const stats = [
  { value: '10K+', label: 'Clientas Satisfechas' },
  { value: '100%', label: 'Ingredientes Naturales' },
  { value: '4.9', label: 'Valoracion Promedio' },
  { value: '50+', label: 'Productos Unicos' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-background to-accent/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">Nuestra Historia</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conoce la historia detras de IXXI y nuestra mision de revolucionar la belleza con ingredientes naturales
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1772989665252-7cb41ae759cc?w=600&h=600&fit=crop"
                alt="Fundadora de IXXI"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-6">El Inicio de IXXI</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  IXXI nacio en 2020 con una vision clara: crear cosmeticos de lujo que fueran tan buenos para tu piel como para el planeta. Nuestra fundadora, tras anos en la industria de la belleza, decidio que era hora de un cambio.
                </p>
                <p>
                  Cansada de ver formulas llenas de quimicos innecesarios, comenzo a investigar alternativas naturales que ofrecieran los mismos resultados excepcionales sin comprometer la salud de la piel ni del medio ambiente.
                </p>
                <p>
                  Hoy, IXXI es mas que una marca de cosmeticos. Es una comunidad de mujeres que creen en el poder de la naturaleza y que eligen cuidarse de manera consciente y responsable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-6">Nuestra Mision</h2>
              <p className="text-muted-foreground mb-4">
                Nuestra mision es democratizar la belleza natural de lujo. Creemos que cada mujer merece acceso a productos de la mas alta calidad, formulados con ingredientes puros y efectivos.
              </p>
              <p className="text-muted-foreground">
                Trabajamos incansablemente para investigar, desarrollar y perfeccionar formulas que combinen lo mejor de la naturaleza con la innovacion cientifica, ofreciendo resultados excepcionales sin compromisos.
              </p>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1755344339841-d34979cbfd10?w=600&h=600&fit=crop"
                alt="Nuestra mision"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-4xl font-bold font-serif mb-2">{s.value}</p>
                <p className="text-sm opacity-90">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Unete a la Revolucion de la Belleza Natural</h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">
              Descubre por que miles de mujeres confian en IXXI para su rutina de belleza diaria
            </p>
            <Link href="/shop" className="bg-white text-foreground px-8 py-3 rounded-lg hover:bg-white/90 transition font-medium inline-block">
              Comprar Ahora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
