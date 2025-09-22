import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('product', 'routes/product.tsx'),
  route('products', 'routes/products.tsx'),
] satisfies RouteConfig;
