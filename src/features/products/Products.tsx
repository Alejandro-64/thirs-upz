"use client";

import { useFetch } from "@/hooks";
import { Card, Error, Loading } from "./components";
import { ApiResponse } from "@/types/product-type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ProductsProps {
  onProductsCount: (count: number) => void;
}

const Products = ({ onProductsCount }: ProductsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, error, loading } = useFetch<ApiResponse>(
    "https://dummyjson.com/products?limit=0",
  );

  const pageParam = Number(searchParams.get("page")) || 1;
  const availabilityParam = searchParams.get("availability") || "";
  const sortParam = searchParams.get("sort") || "";

  const ITEMS_PER_PAGE = 8;

  const clothingCategories = [
    "mens-shirts",
    "mens-shoes",
    "tops",
    "sunglasses",
    "womens-bags",
    "womens-dresses",
    "womens-shoes",
  ];

  const baseClothing =
    data?.products.filter((item) =>
      clothingCategories.includes(item.category),
    ) || [];

  const filteredProducts = baseClothing.filter((item) => {
    if (availabilityParam === "inStock") return item.stock > 0;
    if (availabilityParam === "outStock") return item.stock === 0;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortParam === "mayor") return a.price - b.price;
    if (sortParam === "minus") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (pageParam - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (!loading && sortedProducts) {
      onProductsCount(sortedProducts.length);
    }
  }, [sortedProducts.length, loading]);

  useEffect(() => {
    if (pageParam > totalPages && totalPages > 0) {
      handlePageChange(1);
    }
  }, [totalPages]);

  return (
    <section className="py-8">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {paginatedProducts?.map((item) => (
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
        </>
      )}
      {!loading && error && <Error message={error} />}
    </section>
  );
};

export default Products;
