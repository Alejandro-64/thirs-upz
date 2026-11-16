export const CLOTHING_CATEGORIES = [
  "mens-shirts",
  "mens-shoes",
  "tops",
  "sunglasses",
  "womens-bags",
  "womens-dresses",
  "womens-shoes",
];

export const AVAILABILITY = {
  IN_STOCK: "inStock",
  OUT_OF_STOCK: "outStock",
} as const;

export const SORT = {
  PRICE_ASC: "price-asc",
  PRICE_DESC: "price-desc",
} as const;

export type Availability = (typeof AVAILABILITY)[keyof typeof AVAILABILITY];
export type Sort = (typeof SORT)[keyof typeof SORT];
