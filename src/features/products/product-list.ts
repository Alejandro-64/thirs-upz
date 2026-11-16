import { AVAILABILITY, Availability, SORT, Sort } from "@/constants/products";
import { ProductType } from "@/types/product-type";

export const ITEMS_PER_PAGE = 8;

interface ProductListOptions {
  availability?: Availability;
  sort?: Sort;
  page: number;
}

// reads the list options from the URL; unknown values are ignored
export const parseListOptions = (params: {
  get: (name: string) => string | null;
}): ProductListOptions => ({
  availability: Object.values(AVAILABILITY).find(
    (value) => value === params.get("availability"),
  ),
  sort: Object.values(SORT).find((value) => value === params.get("sort")),
  page: Number(params.get("page")) || 1,
});

export const getProductList = (
  products: ProductType[],
  { availability, sort, page }: ProductListOptions,
) => {
  const sorted = products
    .filter((item) => {
      if (availability === AVAILABILITY.IN_STOCK) return item.stock > 0;
      if (availability === AVAILABILITY.OUT_OF_STOCK) return item.stock === 0;
      return true;
    })
    .sort((a, b) => {
      if (sort === SORT.PRICE_ASC) return a.price - b.price;
      if (sort === SORT.PRICE_DESC) return b.price - a.price;
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
