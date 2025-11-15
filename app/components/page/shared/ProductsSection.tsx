import { ProductSlider } from '@components/page/shared/ProductSlider';

interface IProductsSectionProperties {
  products: {
    menProducts: unknown;
    womenProducts: unknown;
    kidsProducts: unknown;
  };
}

export function ProductsSection({ products }: IProductsSectionProperties) {
  return (
    <div className="container py-10">
      <div className="mb-14">
        <div className="mb-5 text-2xl font-bold">For Men</div>
        <ProductSlider products={products.menProducts.data.items} />
      </div>
      <div className="mb-14">
        <div className="mb-5 text-2xl font-bold">For Women</div>
        <ProductSlider products={products.womenProducts.data.items} />
      </div>
      <div>
        <div className="mb-5 text-2xl font-bold">For Kids</div>
        <ProductSlider products={products.kidsProducts.data.items} />
      </div>
    </div>
  );
}
