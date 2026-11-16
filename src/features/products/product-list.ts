import { ProductType } from "@/types/product-type";

export const ITEMS_PER_PAGE = 8;

interface ProductListOptions {
  availability: string;
  sort: string;
  page: number;
}

export const getProductList = (
  products: ProductType[],
  { availability, sort, page }: ProductListOptions,
) => {
  const sorted = products
    .filter((item) => {
      if (availability === "inStock") return item.stock > 0;
      if (availability === "outStock") return item.stock === 0;
      return true;
    })
    .sort((a, b) => {
      if (sort === "mayor") return a.price - b.price;
      if (sort === "minus") return b.price - a.price;
      return 0;
    });

  // la página viene de la URL: negativos, decimales y NaN caen en la página 1
  const currentPage = Math.max(1, Math.floor(page) || 1);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  return {
    total: sorted.length,
    totalPages: Math.ceil(sorted.length / ITEMS_PER_PAGE),
    items: sorted.slice(start, start + ITEMS_PER_PAGE),
  };
};
