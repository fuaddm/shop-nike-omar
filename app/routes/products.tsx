import { ProductCard } from '@components/page/shared/ProductCard';

export default function ProductsPage() {
  return (
    <div className="container py-10">
      <h2 className="mb-10 text-2xl font-semibold">New Shoes (109)</h2>
      <div className="grid grid-cols-2 gap-3 gap-y-4 md:grid-cols-4 md:gap-y-10">
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
      </div>
    </div>
  );
}
