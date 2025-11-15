import type { LoaderFunctionArgs } from 'react-router';
import { userContext } from '~/context/user-context';
import { userCookie } from '~/cookies.server';

import { authAPI } from '@api/auth-api';
import { publicAPI } from '@api/public-api';

export const PAGE_SIZE = 12;

export async function loader({ request, context }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};
  const url = new URL(request.url);
  url.searchParams.append('PageNumber', '1');
  url.searchParams.append('PageSize', String(PAGE_SIZE));

  const user = context.get(userContext);
  let products;
  if (user?.isAuth) {
    const resp = await authAPI.get(`/user/products${url.search}`, cookie);
    const data = await resp.json();
    products = data.data;
  } else {
    const resp = await publicAPI.get(`/user/products${url.search}`, cookie);
    const data = await resp.json();
    products = data.data;
  }

  return products;
}
