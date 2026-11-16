import { describe, expect, it } from "vitest";
import type { ProductType } from "@/types/product-type";
import { getProductList, parseListOptions } from "./product-list";

const createProduct = (id: number, price = 10, stock = 5): ProductType => ({
  id,
  title: `Product ${id}`,
  description: "",
  category: "tops",
  price,
  stock,
  tags: [],
  availability: "In Stock",
  images: [],
  thumbnail: "",
});

const createProducts = (count: number) =>
  Array.from({ length: count }, (_, index) => createProduct(index + 1));

const ids = (items: ProductType[]) => items.map((item) => item.id);

const defaults = { page: 1 };

describe("getProductList", () => {
  describe("availability", () => {
    const products = [
      createProduct(1, 10, 3),
      createProduct(2, 10, 0),
      createProduct(3, 10, 7),
    ];

    it("inStock keeps only products with stock", () => {
      const { items } = getProductList(products, {
        ...defaults,
        availability: "inStock",
      });

      expect(ids(items)).toEqual([1, 3]);
    });

    it("outStock keeps only products without stock", () => {
      const { items } = getProductList(products, {
        ...defaults,
        availability: "outStock",
      });

      expect(ids(items)).toEqual([2]);
    });

    it("keeps everything without a filter", () => {
      const { items } = getProductList(products, defaults);

      expect(ids(items)).toEqual([1, 2, 3]);
    });
  });

  describe("sort", () => {
    const products = [
      createProduct(1, 30),
      createProduct(2, 10),
      createProduct(3, 20),
    ];

    it("price-asc sorts by price ascending", () => {
      const { items } = getProductList(products, {
        ...defaults,
        sort: "price-asc",
      });

      expect(ids(items)).toEqual([2, 3, 1]);
    });

    it("price-desc sorts by price descending", () => {
      const { items } = getProductList(products, {
        ...defaults,
        sort: "price-desc",
      });

      expect(ids(items)).toEqual([1, 3, 2]);
    });

    it("keeps the API order without a sort", () => {
      const { items } = getProductList(products, defaults);

      expect(ids(items)).toEqual([1, 2, 3]);
    });

    it("does not modify the original array", () => {
      getProductList(products, { ...defaults, sort: "price-asc" });

      expect(ids(products)).toEqual([1, 2, 3]);
    });
  });

  describe("pagination", () => {
    const products = createProducts(20);

    it("returns 8 items per page and the page count", () => {
      const result = getProductList(products, defaults);

      expect(result.items).toHaveLength(8);
      expect(result.totalPages).toBe(3);
    });

    it("the last page has the remaining items", () => {
      const { items } = getProductList(products, { ...defaults, page: 3 });

      expect(ids(items)).toEqual([17, 18, 19, 20]);
    });

    it("total counts the filtered products, not the page", () => {
      const result = getProductList(products, defaults);

      expect(result.total).toBe(20);
    });

    it("an empty list has no pages and no items", () => {
      const result = getProductList([], defaults);

      expect(result).toEqual({ total: 0, totalPages: 0, items: [] });
    });

    it("a page past the end has no items", () => {
      const { items } = getProductList(products, { ...defaults, page: 99 });

      expect(items).toEqual([]);
    });

    it.each([-1, 0, 1.5, NaN])("page %s falls back to the first page", (page) => {
      const { items } = getProductList(products, { ...defaults, page });

      expect(ids(items)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });
  });
});

describe("parseListOptions", () => {
  const fromQuery = (query: string) => parseListOptions(new URLSearchParams(query));

  it("reads the availability, sort and page from the URL", () => {
    expect(fromQuery("availability=inStock&sort=price-desc&page=3")).toEqual({
      availability: "inStock",
      sort: "price-desc",
      page: 3,
    });
  });

  it("ignores values it does not know", () => {
    const options = fromQuery("availability=other&sort=mayor");

    expect(options.availability).toBeUndefined();
    expect(options.sort).toBeUndefined();
  });

  it("defaults to the first page when the page is missing or not a number", () => {
    expect(fromQuery("").page).toBe(1);
    expect(fromQuery("page=abc").page).toBe(1);
  });
});
