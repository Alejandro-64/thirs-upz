'use client';

import { Card } from './components';
import { ProductType } from '@/types/product-type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use, useCallback, useEffect } from 'react';

interface ProductsProps {
  productsPromise: Promise<ProductType[]>;
  onProductsCount: (count: number) => void;
}

const Products = ({ productsPromise, onProductsCount }: ProductsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const products = use(productsPromise);

  const pageParam = Number(searchParams.get('page')) || 1;
  const availabilityParam = searchParams.get('availability') || '';
  const sortParam = searchParams.get('sort') || '';

  const ITEMS_PER_PAGE = 8;

  const filteredProducts = products.filter((item) => {
    if (availabilityParam === 'inStock') return item.stock > 0;
    if (availabilityParam === 'outStock') return item.stock === 0;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortParam === 'mayor') return a.price - b.price;
    if (sortParam === 'minus') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (pageParam - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (newPage: number, replace = false) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      const url = `${pathname}?${params.toString()}`;

      if (replace) router.replace(url);
      else router.push(url);
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    onProductsCount(sortedProducts.length);
  }, [sortedProducts.length, onProductsCount]);

  useEffect(() => {
    if (pageParam > totalPages && totalPages > 0) {
      handlePageChange(1, true);
    }
  }, [totalPages, pageParam, handlePageChange]);

  return (
    <section className="py-8">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {paginatedProducts.map((item) => (
          <li key={item.id}>
            <Card product={item} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => handlePageChange(pageParam - 1)}
            disabled={pageParam === 1}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm font-medium">
            Página {pageParam} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(pageParam + 1)}
            disabled={pageParam === totalPages}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
};

export default Products;
