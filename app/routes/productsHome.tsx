import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ui/Pagination';

import { ProductCard } from '@components/page/shared/ProductCard';

export default function ProductsPage() {
  return (
    <div className="container py-10">
      <h2 className="mb-6 text-2xl font-semibold">New Shoes (109)</h2>
      <div className="mb-6 grid grid-cols-2 gap-3 gap-y-4 md:grid-cols-4 md:gap-y-10">
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
        <ProductCard title={'New Shoe'} />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious to="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              to="#"
              isActive
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="/products/2">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext to="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
