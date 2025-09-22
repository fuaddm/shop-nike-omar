import { Button } from 'react-aria-components';

import { ProductDisclosure } from '@ui/disclosure/ProductDisclosure';

import { ProductImagesSlider } from '@components/page/product/ProductImagesSlider';
import { ProductMiniReviewSummary } from '@components/page/product/ProductMiniReviewSummary';
import { SimilarProducts } from '@components/page/product/SimilarProducts';

import { HeartIcon } from '@icons/HeartIcon';
import { CreamIcon } from '@icons/product/CreamIcon';

const images = [
  {
    id: 1,
    src: 'https://images.beautybay.com/eoaaqxyywn6o/ALOS0040F_1.jpg_s3.lmb_v653eb/9e6aafb13d3b90d15c955ef4c6bb404d/ALOS0040F_1.jpg?w=1000&fm=webp&q=70',
    alt: 'black retinol',
  },
  {
    id: 2,
    src: 'https://images.beautybay.com/eoaaqxyywn6o/ALOS0040F_2.jpg_s3.lmb_za6og8/2db781f849c7fdcb05b0041a433d58a2/ALOS0040F_2.jpg?w=1000&fm=webp&q=70',
    alt: 'cream chemicals',
  },
  {
    id: 3,
    src: 'https://images.beautybay.com/eoaaqxyywn6o/ALOS0040F_2.jpg_s3.lmb_za6og8/2db781f849c7fdcb05b0041a433d58a2/ALOS0040F_2.jpg?w=1000&fm=webp&q=70',
    alt: 'cream chemicals',
  },
  {
    id: 4,
    src: 'https://images.beautybay.com/eoaaqxyywn6o/ALOS0040F_2.jpg_s3.lmb_za6og8/2db781f849c7fdcb05b0041a433d58a2/ALOS0040F_2.jpg?w=1000&fm=webp&q=70',
    alt: 'cream chemicals',
  },
  {
    id: 5,
    src: 'https://images.beautybay.com/eoaaqxyywn6o/ALOS0040F_2.jpg_s3.lmb_za6og8/2db781f849c7fdcb05b0041a433d58a2/ALOS0040F_2.jpg?w=1000&fm=webp&q=70',
    alt: 'cream chemicals',
  },
];

const totalStars = 4.5;
const totalReviews = 134;

const additionalInformations = [
  { title: 'Description', text: 'A concentrated and reparative night cream for experienced retinal users.' },
  {
    title: 'Ingredients',
    text: 'Aqua (Water), Glycerin, Argania Spinosa Kernel Oil, Caprylic/Capric Triglyceride, Propanediol, Punica Granatum Seed Oil, Methylsilanol Hydroxyproline Aspartate, Sodium',
  },
  {
    title: 'Delivery',
    text: 'Deliveries Mon - Fri',
  },
];

export default function Product() {
  return (
    <div className="container py-10">
      <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <ProductImagesSlider images={images} />
        <div className="py-3">
          <div className="mb-3 text-lg font-black italic">BEAUTY BAY</div>
          <div className="mb-2 text-4xl font-bold italic">Plumping Moisturiser Ectoin + Superberry Complex</div>
          <div className="bg-surface-container mb-3 flex w-fit items-center gap-1 rounded-full px-3 py-1">
            <CreamIcon className="fill-on-surface h-5 w-5" />
            <span className="text-base">50ml</span>
          </div>
          <ProductMiniReviewSummary
            stars={totalStars}
            totalReviewCount={totalReviews}
            className="mb-10"
          />
          <div className="mb-20">
            <span className="text-4xl font-semibold">₼12.00</span>
            <span className="text-on-surface-variant ms-4 text-xl font-light line-through">₼15.00</span>
          </div>
          <div className="mb-10 grid grid-cols-[1fr_min-content] items-center gap-3">
            <Button className="bg-primary text-on-primary w-full rounded-full py-5 text-xl font-semibold">
              Səbətə əlavə et
            </Button>
            <Button className="bg-surface-container aspect-square h-full rounded-full p-4">
              <HeartIcon className="stroke-on-surface h-full w-full" />
            </Button>
          </div>
          <ProductDisclosure additionalInformations={additionalInformations} />
        </div>
      </div>
      <SimilarProducts />
    </div>
  );
}
