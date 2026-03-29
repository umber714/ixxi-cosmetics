import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Gonzalez',
    location: 'Ciudad de Mexico',
    text: 'Los productos de IXXI han transformado mi piel completamente. La crema hidratante es increible — en dos semanas vi resultados reales.',
    image: 'https://images.unsplash.com/photo-1774408130074-ae6c3d1cae39?w=100&h=100&fit=crop',
    product: 'Crema Hidratante Luminosa',
  },
  {
    name: 'Laura Martinez',
    location: 'Guadalajara',
    text: 'Calidad excepcional y resultados visibles. El serum regenerador es mi favorito absoluto. Mi piel se ve mas joven y luminosa.',
    image: 'https://images.unsplash.com/photo-1755344339841-d34979cbfd10?w=100&h=100&fit=crop',
    product: 'Serum Facial Regenerador',
  },
  {
    name: 'Carmen Rodriguez',
    location: 'Monterrey',
    text: 'Me encanta la filosofia natural de la marca. Productos de lujo que realmente funcionan. No volvere a usar nada mas.',
    image: 'https://images.unsplash.com/photo-1772989665252-7cb41ae759cc?w=100&h=100&fit=crop',
    product: 'Kit Facial IXXI',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Testimonios</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">Lo Que Dicen Nuestras Clientas</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Miles de mujeres confian en IXXI para su cuidado diario</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`relative bg-white rounded-2xl p-8 ${i === 1 ? 'md:scale-105 shadow-xl' : 'shadow-sm'}`}>
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>

              <p className="text-xs text-primary font-medium mb-4 tracking-wide">{t.product}</p>

              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · Cliente Verificada</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
