import { createSerializer, parseAsNativeArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';

import { Filter } from '@components/page/products/Filter';
import { HideAndShowFilter } from '@components/page/products/HideAndShowFilter';
import { PaginationProducts } from '@components/page/products/PaginationProducts';
import { Sort } from '@components/page/products/Sort';
import { ProductCard } from '@components/page/shared/ProductCard';
import { SkeletonProductCard } from '@components/page/shared/SkeletonProductCard';

const searchParameters = {
  SortId: parseAsString,
  MainCategoryId: parseAsString,
  CategoryId: parseAsString,
  SubCategoryId: parseAsString,
  PriceRangeId: parseAsString,
  ClothingGenderId: parseAsNativeArrayOf(parseAsString),
  ColorId: parseAsNativeArrayOf(parseAsString),
  PageNumber: parseAsString,
};
const serialize = createSerializer(searchParameters);

export default function ProductsPage() {
  const fetcher = useFetcher();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [sortId, setSortId] = useQueryState('SortId');
  const [mainCategoryId, setMainCategoryId] = useQueryState('MainCategoryId');
  const [categoryId, setCategoryId] = useQueryState('CategoryId');
  const [subCategoryId, setSubCategoryId] = useQueryState('SubCategoryId');
  const [priceRangeId, setPriceRangeId] = useQueryState('PriceRangeId');
  const [clothingGenderId, setClothingGenderId] = useQueryState(
    'ClothingGenderId',
    parseAsNativeArrayOf(parseAsString)
  );
  const [colorId, setColorId] = useQueryState('ColorId', parseAsNativeArrayOf(parseAsString));
  const [pageNumber, setPageNumber] = useQueryState('PageNumber', {
    defaultValue: '1',
  });

  const searchParametersSerialized = serialize({
    SortId: sortId,
    MainCategoryId: mainCategoryId,
    CategoryId: categoryId,
    SubCategoryId: subCategoryId,
    PriceRangeId: priceRangeId,
    ClothingGenderId: clothingGenderId,
    ColorId: colorId,
    PageNumber: pageNumber,
  });

  const searchParametersSerializedWithoutPageNumber = serialize({
    SortId: sortId,
    MainCategoryId: mainCategoryId,
    CategoryId: categoryId,
    SubCategoryId: subCategoryId,
    PriceRangeId: priceRangeId,
    ClothingGenderId: clothingGenderId,
    ColorId: colorId,
  });

  useEffect(() => {
    fetcher.load(`/products-data${searchParametersSerialized}`);
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber('1');
    fetcher.load(`/products-data${searchParametersSerializedWithoutPageNumber}`);
  }, [searchParametersSerializedWithoutPageNumber]);

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      setProducts(fetcher.data.items);
      setTotal(fetcher.data.totalCount);
    }
  }, [fetcher]);

  return (
    <div className="container py-10">
      <h2 className="mb-6 text-center text-2xl font-semibold">Products</h2>
      <div className="flex justify-end gap-3">
        <HideAndShowFilter />
        <Sort />
      </div>
      <div className="mb-10 flex gap-6">
        <Filter />
        <div className="grid h-fit w-full grid-cols-2 gap-3 gap-y-4 md:gap-y-10 lg:grid-cols-3">
          {fetcher.state === 'loading' && (
            <>
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
            </>
          )}
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                pricing={product.pricing}
                variations={product.variations}
              />
            );
          })}
        </div>
      </div>
      <PaginationProducts total={total} />
    </div>
  );
}
