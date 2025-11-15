import { Link } from 'react-router';

import { PrimaryButton } from '@ui/button/PrimaryButton';

import type { IProduct } from '@models/product';

export function ProductCard(properties: IProduct) {
  const { id, name, image, variations, pricing } = properties;

  return (
    <div className="bg-surface-container-low group flex h-full flex-col justify-between rounded-md p-2 md:px-3 md:py-4">
      <div>
        <Link
          to={`/product/${variations[0].code}`}
          className="bg-surface-container-low mb-2 block aspect-square overflow-hidden rounded-md"
        >
          <img
            src={image}
            className="h-full w-full object-cover"
            alt=""
          />
        </Link>
        <div className="mb-2 block w-fit ps-1 text-base font-bold md:text-lg">{name}</div>
      </div>
      <div className="mb-2 grid grid-cols-4 gap-3 md:mb-4">
        {variations &&
          variations.length !== 1 &&
          variations.map((variation) => {
            return (
              <Link
                to={`/product/${variation.code}`}
                key={variation.code}
                className="aspect-square w-full overflow-hidden"
              >
                <img
                  src={variation.image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </Link>
            );
          })}
      </div>
      <div className="ps-1">
        <div className="mb-2 flex items-start text-base font-bold md:mb-4 md:text-xl md:font-black">
          <span className="text-sm font-normal">$</span>
          {pricing.price}
        </div>
        <PrimaryButton className="hover:bg-primary/90 w-full rounded-md p-2 text-sm font-medium transition md:p-3 md:text-base">
          Səbətə at
        </PrimaryButton>
      </div>
    </div>
  );
}
