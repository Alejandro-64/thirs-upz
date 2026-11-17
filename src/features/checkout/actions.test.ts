import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/http", () => ({ getProductById: vi.fn() }));

import { getProductById } from "@/services/http";
import { placeOrder } from "./actions";

const mockedGetProductById = vi.mocked(getProductById);

const customer = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  address: "10 Main Street",
  city: "Lima",
};

const apiProduct = (price: number, stock: number) =>
  ({ id: 1, title: "Shirt", price, stock }) as Awaited<
    ReturnType<typeof getProductById>
  >;

describe("placeOrder", () => {
  beforeEach(() => {
    mockedGetProductById.mockReset();
  });

  it("calculates the total from the API prices, not from the browser", async () => {
    mockedGetProductById.mockResolvedValue(apiProduct(10, 5));

    const result = await placeOrder({
      customer,
      items: [{ id: 1, quantity: 2, price: 0.01 }],
    });

    expect(result).toMatchObject({
      ok: true,
      order: { total: 20, items: [{ title: "Shirt", quantity: 2 }] },
    });
  });

  it("rejects an order when there is not enough stock", async () => {
    mockedGetProductById.mockResolvedValue(apiProduct(10, 1));

    const result = await placeOrder({
      customer,
      items: [{ id: 1, quantity: 2 }],
    });

    expect(result).toEqual({ ok: false, error: "Only 1 left of Shirt." });
  });

  it("rejects invalid customer data without calling the API", async () => {
    const result = await placeOrder({
      customer: { ...customer, email: "not-an-email" },
      items: [{ id: 1, quantity: 1 }],
    });

    expect(result.ok).toBe(false);
    expect(mockedGetProductById).not.toHaveBeenCalled();
  });

  it("rejects an empty cart", async () => {
    const result = await placeOrder({ customer, items: [] });

    expect(result.ok).toBe(false);
  });

  it("returns a friendly error when a product cannot be loaded", async () => {
    mockedGetProductById.mockRejectedValue(new Error("Error: 404"));

    const result = await placeOrder({
      customer,
      items: [{ id: 999, quantity: 1 }],
    });

    expect(result).toEqual({
      ok: false,
      error: "Some products are no longer available. Please review your cart.",
    });
  });
});
