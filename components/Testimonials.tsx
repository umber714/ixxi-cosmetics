import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Gonzalez',
    text: 'Los productos de IXXI han transformado mi piel completamente. La crema hidratante es increible.',
    image: 'https://images.unsplash.com/photo-1774408130074-ae6c3d1cae39?w=100&h=100&fit=crop',
  },
  {
    name: 'Laura Martinez',
    text: 'Calidad excepcional y resultados visibles. El serum regenerador es mi favorito absoluto.',
    image: 'https://images.unsplash.com/photo-1755344339841-d34979cbfd10?w=100&h=100&fit=crop',
  },
  {
    name: 'Carmen Rodriguez',
    text: 'Me encanta la filosofia natural de la marca. Productos de lujo que realmente funcionan.',
    image: 'https://images.unsplash.com/photo-1772989665252-7cb41ae759cc?w=100&h=100&fit=crop',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">Lo Que Dicen Nuestras Clientas</h2>
          <p className="text-muted-foreground">Miles de mujeres confian en IXXI para su cuidado diario</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Cliente Verificada</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
