import { Product } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}
      className="[&]:max-[1100px]:grid-cols-3 [&]:max-[800px]:grid-cols-2 [&]:max-[480px]:grid-cols-1">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
