'use client';

import { Link } from '@/components';
import { Card } from './components';
import { getProductList, parseListOptions } from './product-list';
import { ProductType } from '@/types/product-type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use, useCallback, useEffect } from 'react';

interface ProductsProps {
  productsPromise: Promise<ProductType[]>;
}

const Products = ({ productsPromise }: ProductsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const products = use(productsPromise);

  const options = parseListOptions(searchParams);
  const pageParam = options.page;

  const { total, totalPages, items } = getProductList(products, options);

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
    if (pageParam > totalPages && totalPages > 0) {
      handlePageChange(1, true);
    }
  }, [totalPages, pageParam, handlePageChange]);

  if (total === 0) {
    return (
      <section
        role="status"
        className="py-16 flex flex-col items-center gap-4"
      >
        <p className="text-sm">No products match your filters.</p>
        <Link href={pathname}>Clear filters</Link>
      </section>
    );
  }

  return (
    <section className="py-8">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <Card product={item} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-8 flex items-center justify-center gap-4"
        >
          <button
            onClick={() => handlePageChange(pageParam - 1)}
            disabled={pageParam === 1}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {pageParam} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(pageParam + 1)}
            disabled={pageParam === totalPages}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
};

export default Products;
