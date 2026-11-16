export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;

export const QUANTITY_OPTIONS = Array.from(
  { length: MAX_QUANTITY - MIN_QUANTITY + 1 },
  (_, index) => MIN_QUANTITY + index,
);
