import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import FeaturedProducts from '@/components/FeaturedProducts';
import BestSellers from '@/components/BestSellers';
import Testimonials from '@/components/Testimonials';
import Ingredients from '@/components/Ingredients';

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <BestSellers />
      <Testimonials />
      <Ingredients />
    </>
  );
}
