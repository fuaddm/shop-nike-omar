import type { StoreProduct } from '@medusajs/types';
import { Link } from 'react-router';

import { PrimaryButton } from '@ui/button/PrimaryButton';

export function ProductCard(properties: StoreProduct) {
  const { id, title, images, thumbnail } = properties;

  return (
    <div className="bg-surface-container-low flex h-full flex-col justify-between p-2 md:px-3 md:py-4">
      <div>
        <Link
          to="/product"
          className="bg-surface-container-low mb-2 block aspect-square overflow-hidden"
        >
          <img
            src="/temp/product.png"
            className="h-full w-full object-cover"
            alt=""
          />
        </Link>
        <div className="mb-2 block w-fit ps-1 text-base font-bold md:mb-4 md:text-lg">{title}</div>
      </div>
      <div className="ps-1">
        <div className="mb-2 text-base font-bold md:mb-4 md:text-xl md:font-black">₼49.99</div>
        <PrimaryButton className="w-full rounded-none p-2 text-sm font-medium md:p-3 md:text-base">
          Səbətə at
        </PrimaryButton>
      </div>
    </div>
  );
}
