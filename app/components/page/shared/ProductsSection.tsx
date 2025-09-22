import { ProductSlider } from '@components/page/shared/ProductSlider';

export function ProductsSection() {
  return (
    <div className="container py-10">
      <div className="mb-14">
        <div className="mb-5 text-2xl font-bold">Ən çox satılan</div>
        <ProductSlider />
      </div>
      <div className="mb-14">
        <div className="mb-5 text-2xl font-bold">Brand məhsullar</div>
        <ProductSlider />
      </div>
      <div>
        <div className="mb-5 text-2xl font-bold">Lo real</div>
        <ProductSlider />
      </div>
    </div>
  );
}
