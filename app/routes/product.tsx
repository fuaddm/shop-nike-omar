import { Button } from 'react-aria-components';
import { useFetcher, useLoaderData, useParams, useRouteLoaderData } from 'react-router';
import { userContext } from '~/context/user-context';
import { userCookie } from '~/cookies.server';

import { ProductDisclosure } from '@ui/disclosure/ProductDisclosure';

import { ProductImagesSlider } from '@components/page/product/ProductImagesSlider';
import { ProductMiniReviewSummary } from '@components/page/product/ProductMiniReviewSummary';

import { useUserStore } from '@stores/userStore';

import { HeartIcon } from '@icons/HeartIcon';

import { cn } from '@libs/cn';

import { authAPI } from '@api/auth-api';
import { publicAPI } from '@api/public-api';

import type { Route } from '.react-router/types/app/routes/+types/product';

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
    title: 'Delivery',
    text: 'Deliveries Mon - Fri',
  },
];

export async function loader({ params, request, context }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  const user = context.get(userContext);

  if (user?.isAuth) {
    const resp = await authAPI.get(`/user/product-info?variationCode=${params.variationCode}`, cookie);
    const data = await resp.json();

    return data;
  } else {
    const resp = await publicAPI.get(`/user/product-info?variationCode=${params.variationCode}`, cookie);
    const data = await resp.json();

    return data;
  }
}

export async function action({ request }: Route.ActionArgs) {
  // console.log(request.body);
  // const actionType = formData.get('actionType');
  // const productId = formData.get('productId');
  // const userData = formData.get('userData');
}

export default function Product() {
  const variationCode = useParams().variationCode;

  const loaderData = useLoaderData<typeof loader>();
  const favourites = useRouteLoaderData('root').favourites;
  let isFav = false;

  if (favourites && favourites.data) {
    favourites.data.map((favourite) => {
      if (favourite.variation.code === variationCode) {
        isFav = true;
      }
    });
  }

  const userData = useUserStore((state) => state.userData);

  const fetcher = useFetcher();

  const product = loaderData.data;

  const name = product.product.name;
  const price = product.pricing.price;
  let images = product.images ?? [];
  const reviewsCount = product.reviews.count;
  const totalStars = product.reviews.average;
  const colorName = product.color.name;
  const description = product.description;

  images = images.map((image: { url: string }, index: number) => {
    return {
      id: index,
      src: image.url,
    };
  });

  function addToFavourite() {
    const formData = new FormData();
    formData.append('variationCode', String(variationCode));
    fetcher.submit(formData, {
      method: 'POST',
      action: '/favourites',
    });
  }

  return (
    <div className="container py-10">
      <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <ProductImagesSlider images={images} />
        <div className="py-3">
          <div className="mb-2 text-4xl font-bold italic">{name}</div>
          <div className="bg-surface-container mb-3 w-fit rounded-full px-3 py-1">
            <span className="text-base">{colorName}</span>
          </div>
          <ProductMiniReviewSummary
            stars={totalStars}
            totalReviewCount={reviewsCount}
            className="mb-10"
          />
          <div className="mb-20">
            <span className="text-4xl font-semibold">{price}$</span>
          </div>
          <div className="mb-10 grid grid-cols-[1fr_min-content] items-center gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-on-primary w-full rounded-full py-5 text-xl font-semibold transition">
              Səbətə əlavə et
            </Button>
            <Button
              onPress={addToFavourite}
              className="bg-surface-container group aspect-square h-full rounded-full p-4"
            >
              <HeartIcon
                className={cn({
                  'stroke-on-surface h-full w-full fill-transparent transition-all': true,
                  'group-hover:fill-red-500/50 group-hover:stroke-red-500/50': !isFav,
                  'fill-red-500 stroke-red-500': isFav,
                })}
              />
            </Button>
          </div>
          <ProductDisclosure
            additionalInformations={[
              { title: 'Description', text: description },
              {
                title: 'Delivery',
                text: 'We offer a range of shipping methods to best suit your needs, including standard ground shipping, expedited options, and premium express delivery for urgent orders. Available options and associated costs will be calculated at checkout based on your location and the items in your order.',
              },
            ]}
          />
        </div>
      </div>
      {/* <SimilarProducts /> */}
    </div>
  );
}
