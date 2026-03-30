export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  images?: string[];
  ingredients?: string[];
  usage?: string;
  benefits?: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Crema Hidratante Luminosa',
    description: 'Crema hidratante de textura ligera que ilumina y nutre la piel en profundidad. Formulada con acido hialuronico y extracto de rosa mosqueta para una hidratacion duradera.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1739979054787-719a848cd684?w=600&h=600&fit=crop',
    category: 'Cuidado Facial',
    rating: 4.8,
    reviews: 234,
    isBestSeller: true,
    isFeatured: true,
    ingredients: ['Acido Hialuronico', 'Rosa Mosqueta', 'Vitamina E', 'Aloe Vera', 'Manteca de Karite'],
    usage: 'Aplicar manana y noche sobre el rostro limpio. Masajear suavemente con movimientos circulares ascendentes hasta su completa absorcion.',
    benefits: ['Hidratacion profunda de 24 horas', 'Ilumina el tono de la piel', 'Reduce lineas finas'],
  },
  {
    id: '2',
    name: 'Serum Facial Regenerador',
    description: 'Serum concentrado con retinol y vitamina C que regenera y rejuvenece la piel. Potente formula anti-edad para resultados visibles desde la primera semana.',
    price: 124.99,
    image: 'https://images.unsplash.com/photo-1764694187721-a5035d777fdf?w=600&h=600&fit=crop',
    category: 'Cuidado Facial',
    rating: 4.9,
    reviews: 456,
    isBestSeller: true,
    isFeatured: true,
    ingredients: ['Retinol', 'Vitamina C', 'Niacinamida', 'Peptidos', 'Acido Ferulico'],
    usage: 'Aplicar 3-4 gotas por la noche sobre la piel limpia antes de la crema hidratante. Evitar la exposicion solar directa.',
    benefits: ['Reduce arrugas visiblemente', 'Unifica el tono', 'Estimula la produccion de colageno'],
  },
  {
    id: '3',
    name: 'Labial Mate Terciopelo',
    description: 'Labial de larga duracion con acabado mate aterciopelado. Enriquecido con aceites naturales que mantienen los labios hidratados todo el dia.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1770981773328-63c2ad10013d?w=600&h=600&fit=crop',
    category: 'Maquillaje',
    rating: 4.7,
    reviews: 189,
    isFeatured: true,
    ingredients: ['Aceite de Jojoba', 'Cera de Abeja', 'Vitamina E', 'Pigmentos Minerales'],
    usage: 'Aplicar directamente sobre los labios. Para mayor precision, delinear primero con un perfilador.',
    benefits: ['Duracion de hasta 12 horas', 'No reseca los labios', 'Color intenso y uniforme'],
  },
  {
    id: '4',
    name: 'Crema Contorno de Ojos',
    description: 'Crema especifica para el contorno de ojos que reduce ojeras, bolsas y lineas de expresion. Con cafeina y peptidos de ultima generacion.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1772191530787-b9546da02fbc?w=600&h=600&fit=crop',
    category: 'Cuidado Facial',
    rating: 4.6,
    reviews: 312,
    isBestSeller: true,
    ingredients: ['Cafeina', 'Peptidos', 'Vitamina K', 'Extracto de Pepino', 'Acido Hialuronico'],
    usage: 'Aplicar pequenas cantidades con el dedo anular alrededor del contorno de ojos, dando suaves toques sin estirar la piel.',
    benefits: ['Reduce ojeras y bolsas', 'Minimiza lineas de expresion', 'Efecto descongestionante'],
  },
  {
    id: '9',
    name: 'Rubor en Polvo Natural',
    description: 'Rubor en polvo con pigmentos minerales que aporta un color natural y luminoso. Textura sedosa que se difumina facilmente.',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1602532386405-9f3cce79a00b?w=600&h=600&fit=crop',
    category: 'Maquillaje',
    rating: 4.7,
    reviews: 198,
    ingredients: ['Pigmentos Minerales', 'Silice', 'Vitamina E', 'Extracto de Rosa'],
    usage: 'Aplicar con brocha en las manzanas de las mejillas y difuminar hacia las sienes.',
    benefits: ['Color natural y luminoso', 'Facil de difuminar', 'Larga duracion'],
  },
  {
    id: '10',
    name: 'Aceite Facial Nutritivo',
    description: 'Aceite facial premium con blend de aceites botanicos que nutre, repara y protege la piel. Absorcion rapida sin dejar residuo graso.',
    price: 94.99,
    image: 'https://images.unsplash.com/photo-1739981248829-ac9d4a6fecfa?w=600&h=600&fit=crop',
    category: 'Cuidado Facial',
    rating: 4.9,
    reviews: 289,
    ingredients: ['Aceite de Argan', 'Aceite de Rosa Mosqueta', 'Vitamina E', 'Escualano', 'Aceite de Jojoba'],
    usage: 'Aplicar 4-5 gotas por la noche como ultimo paso de la rutina. Puede mezclarse con la crema hidratante.',
    benefits: ['Nutricion intensiva', 'Repara la barrera cutanea', 'Efecto anti-edad natural'],
  },
  {
    id: '11',
    name: 'Shampoo IXXI',
    description: 'Shampoo profesional IXXI que limpia profundamente mientras nutre y fortalece el cabello. Formula suave para uso diario con ingredientes naturales.',
    price: 54.99,
    image: '/images/shampoo_ixxi.webp',
    images: ['/images/shampoo_ixxi.webp', '/images/shampoo-ixxi-v2.webp'],
    category: 'Cuidado Capilar',
    rating: 4.8,
    reviews: 312,
    isBestSeller: true,
    isFeatured: true,
    ingredients: ['Keratina', 'Aceite de Argan', 'Pantenol', 'Extractos Botanicos'],
    usage: 'Aplicar sobre el cabello mojado, masajear suavemente y enjuagar. Repetir si es necesario.',
    benefits: ['Limpieza profunda sin resecar', 'Fortalece el cabello', 'Brillo y suavidad'],
  },
  {
    id: '13',
    name: 'Proteina de Seda IXXI',
    description: 'Tratamiento premium con proteina de seda que aporta suavidad extrema y brillo espectacular. Ideal para cabello seco o tratado quimicamente.',
    price: 84.99,
    image: '/images/proteina-de-seda.webp',
    images: ['/images/proteina-de-seda.webp', '/images/proteina-de-seda-v2.webp'],
    category: 'Cuidado Capilar',
    rating: 4.8,
    reviews: 156,
    isFeatured: true,
    ingredients: ['Proteina de Seda', 'Aceite de Argan', 'Pantenol', 'Ceramidas'],
    usage: 'Aplicar generosamente sobre el cabello humedo. Dejar actuar 20 minutos con calor o 30 minutos sin calor. Enjuagar.',
    benefits: ['Suavidad como la seda', 'Brillo espectacular', 'Hidratacion profunda'],
  },
  {
    id: '14',
    name: 'Mascarilla Hidratante IXXI',
    description: 'Mascarilla capilar de hidratacion intensa que devuelve la vitalidad al cabello seco y sin vida. Nutricion profunda en cada aplicacion.',
    price: 64.99,
    image: '/images/mascarilla-hidratante.webp',
    images: ['/images/mascarilla-hidratante.webp', '/images/mascarilla-hidratante-v2.webp'],
    category: 'Cuidado Capilar',
    rating: 4.7,
    reviews: 245,
    isBestSeller: true,
    ingredients: ['Aceite de Coco', 'Manteca de Karite', 'Aloe Vera', 'Vitamina B5'],
    usage: 'Despues del shampoo, aplicar sobre el cabello humedo de medios a puntas. Dejar actuar 10-15 minutos y enjuagar.',
    benefits: ['Hidratacion intensa', 'Reduce el frizz', 'Cabello manejable y suave'],
  },
  {
    id: '15',
    name: 'Mascarilla Restructurante con Pigmento IXXI',
    description: 'Mascarilla capilar restructurante con pigmentos de color que repara el cabello mientras deposita un tono vibrante y duradero.',
    price: 69.99,
    image: '/images/mascarilla-restructurante-con-pigmento.webp',
    images: ['/images/mascarilla-restructurante-con-pigmento.webp', '/images/mascarilla-restructurante-v2.webp'],
    category: 'Cuidado Capilar',
    rating: 4.6,
    reviews: 134,
    ingredients: ['Pigmentos de Color', 'Keratina', 'Aceite de Macadamia', 'Proteina de Trigo'],
    usage: 'Aplicar sobre el cabello limpio y humedo. Distribuir uniformemente y dejar actuar 15-20 minutos. Enjuagar hasta que el agua salga clara.',
    benefits: ['Repara y da color', 'Brillo y vitalidad', 'Color vibrante sin dano'],
  },
  {
    id: '16',
    name: 'Protector Termico IXXI',
    description: 'Protector termico profesional que protege el cabello del calor de planchas y secadores hasta 230°C. Sella las cuticulas y previene el dano.',
    price: 49.99,
    image: '/images/protector-termico.webp',
    images: ['/images/protector-termico.webp', '/images/protector-termico-v2.webp'],
    category: 'Cuidado Capilar',
    rating: 4.8,
    reviews: 278,
    isFeatured: true,
    ingredients: ['Silicona Volatil', 'Vitamina E', 'Aceite de Argan', 'Filtros Termicos'],
    usage: 'Agitar bien. Pulverizar sobre el cabello humedo o seco antes de usar herramientas de calor. No enjuagar.',
    benefits: ['Proteccion hasta 230°C', 'Sella las cuticulas', 'Reduce el frizz por calor'],
  },
  {
    id: '17',
    name: 'Kit Tratamiento Capilar IXXI',
    description: 'Set completo de tratamiento capilar IXXI para mujeres que buscan un cabello saludable, brillante y lleno de vida. Incluye los productos esenciales.',
    price: 159.99,
    image: '/images/mujeres.webp',
    category: 'Sets',
    rating: 4.9,
    reviews: 89,
    isFeatured: true,
    ingredients: ['Keratina', 'Proteina de Seda', 'Aceite de Argan', 'Pantenol', 'Vitaminas'],
    usage: 'Usar los productos en orden: shampoo, tratamiento de proteina, mascarilla, y protector termico antes del peinado.',
    benefits: ['Tratamiento completo', 'Resultados profesionales en casa', 'Ahorro vs compra individual'],
  },
];

export const categories = ['Todos', 'Cuidado Facial', 'Cuidado Capilar', 'Maquillaje', 'Sets'];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'Todos') return products;
  return products.filter(p => p.category === category);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}
