import { afterEach, describe, expect, it, vi } from "vitest";
import { getClothingProducts, getProductById, HttpError } from "./http";

const mockFetch = (response: { ok: boolean; status?: number; body?: unknown }) => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: response.ok,
    status: response.status ?? 200,
    json: async () => response.body,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

describe("http service", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("getClothingProducts keeps only clothing categories", async () => {
    mockFetch({
      ok: true,
      body: {
        products: [
          { id: 1, category: "tops" },
          { id: 2, category: "beauty" },
          { id: 3, category: "womens-shoes" },
          { id: 4, category: "groceries" },
        ],
      },
    });

    const products = await getClothingProducts();

    expect(products.map((product) => product.id)).toEqual([1, 3]);
  });

  it("throws when the API answers with an error status", async () => {
    mockFetch({ ok: false, status: 404 });

    await expect(getProductById("999")).rejects.toThrow("Error: 404");
  });

  it("the error carries the HTTP status", async () => {
    mockFetch({ ok: false, status: 404 });

    await expect(getProductById("999")).rejects.toMatchObject({
      name: "Error",
      status: 404,
    });
    await expect(getProductById("999")).rejects.toBeInstanceOf(HttpError);
  });

  it("getProductById requests the product by id", async () => {
    const fetchMock = mockFetch({ ok: true, body: { id: 5 } });

    await getProductById("5");

    expect(fetchMock.mock.calls[0][0]).toBe("https://api.test/products/5");
  });
});
