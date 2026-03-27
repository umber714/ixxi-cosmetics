import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

const points = [
  { title: 'Sin Parabenos ni Sulfatos', desc: 'Formulas limpias y seguras para tu piel' },
  { title: 'Extractos Botanicos Premium', desc: 'Ingredientes activos de la mas alta calidad' },
  { title: 'Testado Dermatologicamente', desc: 'Seguro para todo tipo de piel, incluso sensible' },
];

export default function Ingredients() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/20 to-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1739981248829-ac9d4a6fecfa?w=600&h=600&fit=crop"
              alt="Ingredientes naturales"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-6">Ingredientes Puros, Cuidado Real</h2>
            <p className="text-muted-foreground mb-8">
              Creemos que la naturaleza tiene todo lo que tu piel necesita. Por eso seleccionamos cuidadosamente cada ingrediente, priorizando extractos botanicos organicos y formulaciones limpias que respetan tu piel y el medio ambiente.
            </p>
            <div className="space-y-5 mb-8">
              {points.map(p => (
                <div key={p.title} className="flex gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{p.title}</h4>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="border border-border px-8 py-3 rounded-lg hover:bg-white transition font-medium inline-block">
              Conoce Mas Sobre Nosotros
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
