import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProductType } from "@/types/product-type";

// Node no trae localStorage y el store lo usa al crearse, por eso va antes del import.
const memory = new Map<string, string>();
vi.stubGlobal("localStorage", {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => void memory.set(key, value),
  removeItem: (key: string) => void memory.delete(key),
});

const { useCartStore, TOTAL_PRICE, TOTAL_QUANTITY } = await import(
  "./cart-store"
);

const createProduct = (id: number, price = 10): ProductType => ({
  id,
  title: `Product ${id}`,
  description: "",
  category: "tops",
  price,
  stock: 5,
  tags: [],
  availability: "In Stock",
  images: [],
  thumbnail: "",
  quantity: 1,
});

const quantityOf = (id: number) =>
  useCartStore.getState().cart.find((item) => item.id === id)?.quantity;

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ cart: [] });
  });

  it("adds a new product with the requested quantity", () => {
    useCartStore.getState().addToCart(createProduct(1), 3);

    expect(quantityOf(1)).toBe(3);
  });

  it("sums the quantity when the same product is added again", () => {
    const { addToCart } = useCartStore.getState();
    addToCart(createProduct(1), 2);
    addToCart(createProduct(1), 3);

    expect(useCartStore.getState().cart).toHaveLength(1);
    expect(quantityOf(1)).toBe(5);
  });

  it("never goes over 10 when adding to a product already in the cart", () => {
    const { addToCart } = useCartStore.getState();
    addToCart(createProduct(1), 8);
    addToCart(createProduct(1), 5);

    expect(quantityOf(1)).toBe(10);
  });

  it("caps a new product at 10", () => {
    useCartStore.getState().addToCart(createProduct(1), 15);

    expect(quantityOf(1)).toBe(10);
  });

  it("updateQuantity stays between 1 and 10", () => {
    const product = createProduct(1);
    const { addToCart, updateQuantity } = useCartStore.getState();

    addToCart(product, 1);
    updateQuantity(product, -1);
    expect(quantityOf(1)).toBe(1);

    addToCart(product, 9);
    updateQuantity(product, 1);
    expect(quantityOf(1)).toBe(10);
  });

  it("remove deletes only the given product", () => {
    const { addToCart, remove } = useCartStore.getState();
    addToCart(createProduct(1), 1);
    addToCart(createProduct(2), 1);

    remove(1);

    expect(useCartStore.getState().cart.map((item) => item.id)).toEqual([2]);
  });

  it("totals add up quantity and price", () => {
    const { addToCart } = useCartStore.getState();
    addToCart(createProduct(1, 10), 2);
    addToCart(createProduct(2, 5.5), 3);

    const state = useCartStore.getState();
    expect(TOTAL_QUANTITY(state)).toBe(5);
    expect(TOTAL_PRICE(state)).toBeCloseTo(36.5);
  });
});
