import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('product/:variationCode', 'routes/product.tsx'),
  route('login', 'routes/login.tsx'),
  route('logout', 'routes/logout.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('payment', 'routes/payment.tsx'),
  route('addresses', 'routes/addresses.tsx'),
  route('favourites', 'routes/favourites.tsx'),
  route('basket', 'routes/basket.tsx'),
  route('products-data', 'routes/products-data.tsx'),
  route('products', 'routes/products-home.tsx'),
] satisfies RouteConfig;
