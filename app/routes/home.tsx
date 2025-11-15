import { Link, data, useLoaderData } from 'react-router';
import { userCookie } from '~/cookies.server';

import { ProductsSection } from '@components/page/shared/ProductsSection';

import { publicAPI } from '@api/public-api';

import type { Route } from '.react-router/types/app/routes/+types/home';

export function meta() {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  const menProductsResp = await publicAPI.get('/user/products?MainCategoryId=11&CategoryId=&SubCategoryId=', cookie);
  const womenProductsResp = await publicAPI.get('/user/products?MainCategoryId=12&CategoryId=&SubCategoryId=', cookie);
  const kidsProductsResp = await publicAPI.get('/user/products?MainCategoryId=13&CategoryId=&SubCategoryId=', cookie);

  const menProducts = await menProductsResp.json();
  const womenProducts = await womenProductsResp.json();
  const kidsProducts = await kidsProductsResp.json();

  return data({ menProducts, womenProducts, kidsProducts });
}

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();

  // if (typeof document !== 'undefined') console.log(loaderData.menProducts.data.items);
  // if (typeof document !== 'undefined') console.log(loaderData.womenProducts.data.items);
  // if (typeof document !== 'undefined') console.log(loaderData.kidsProducts.data.items);

  return (
    <div>
      <div className="mb-4">
        <div className="relative h-screen">
          <video
            autoPlay={true}
            muted
            loop
            className="h-full w-full object-cover"
          >
            <source
              src="/videoplayback.webm"
              type="video/webm"
            />
          </video>
          <div className="absolute top-0 left-0 h-full w-full bg-black/20"></div>
          <div className="absolute bottom-30 left-1/2 w-full -translate-x-1/2 text-center">
            <div className="text-white">Vomero Premium</div>
            <div className="text-2xl leading-tight font-black text-white md:text-[80px]">ZERO-GRAVITY RUN</div>
            <div className="mb-4 font-medium text-white">Run Beyond in our most advanced cushioning</div>
            <Link
              to="/"
              className="mx-auto w-fit rounded-full bg-white px-5 py-1.5 font-semibold text-black"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>
      <ProductsSection products={loaderData} />
    </div>
  );
}
