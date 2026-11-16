export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;

// a product can never be bought above the global limit or above its stock
export const maxQuantityFor = (stock: number) => Math.min(MAX_QUANTITY, stock);
