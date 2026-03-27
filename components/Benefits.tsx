import { Leaf, Heart, Award, Sparkles } from 'lucide-react';

const benefits = [
  { icon: Leaf, title: '100% Natural', desc: 'Ingredientes puros y organicos' },
  { icon: Heart, title: 'Cruelty Free', desc: 'Nunca testeado en animales' },
  { icon: Award, title: 'Calidad Premium', desc: 'Formulaciones exclusivas' },
  { icon: Sparkles, title: 'Resultados Visibles', desc: 'Eficacia comprobada' },
];

export default function Benefits() {
  return (
    <section className="border-t border-b border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
