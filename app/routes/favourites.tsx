import { X } from 'lucide-react';
import { Button } from 'react-aria-components';
import { Form, redirect, useRouteLoaderData } from 'react-router';
import { userContext } from '~/context/user-context';
import { userCookie } from '~/cookies.server';

import { ProductCard } from '@components/page/shared/ProductCard';

import { authAPI } from '@api/auth-api';

import type { Route } from '.react-router/types/app/routes/+types/favourites';

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (!user?.isAuth) {
    return redirect('/');
  }
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const variationCode = String(formData.get('variationCode'));

  try {
    await authAPI.post(`/user/toggle-favorite?variationCode=${variationCode}`, cookie);

    return { success: true };
  } catch {
    return { success: false };
  }
}

export default function FavouritePage() {
  const loaderData = useRouteLoaderData('root');
  const products = loaderData.favourites.data;

  return (
    <div className="container mt-12">
      <div className="mb-12 text-center text-3xl font-semibold">Favourites</div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((item) => {
          return (
            <Form
              method="POST"
              key={item.product.id}
              className="relative block"
            >
              <input
                type="hidden"
                name="variationCode"
                value={item.variation.code}
              />
              <Button
                type="submit"
                className="bg-surface-container hover:bg-surface-container-highest border-outline-variant absolute -top-2 -right-2 cursor-pointer rounded-md border p-1 transition"
              >
                <X />
              </Button>
              <ProductCard
                id={item.product.id}
                name={item.product.name}
                image={item.image}
                variations={[item.variation]}
                pricing={item.pricing}
              />
            </Form>
          );
        })}
      </div>
    </div>
  );
}
