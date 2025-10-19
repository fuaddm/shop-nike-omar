import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('product', 'routes/product.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  ...prefix('products', [index('routes/productsHome.tsx'), route(':pageNumber', 'routes/productsPageNumber.tsx')]),
] satisfies RouteConfig;
