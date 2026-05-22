import { ProductType } from "@/types/product-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStoreProps {
  cart: ProductType[];
  addToCart: (product: ProductType, quantity: number) => void;
  remove: (id: number) => void;
  updateQuantity: (product: ProductType, number: number) => void;
}

export const useCartStore = create<CartStoreProps>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product, quantity) =>
        set((state) => {
          const isFoundId = state.cart.find((item) => item.id === product.id);

          return {
            cart: isFoundId
              ? state.cart.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item,
                )
              : [...state.cart, { ...product, quantity: quantity }],
          };
        }),
      remove: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (product, number) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + number }
              : item,
          ),
        })),
    }),

    {
      name: "shopping-cart-storage",
    },
  ),
);

export const TOTAL_QUANTITY = (state: CartStoreProps) =>
  state.cart.reduce((acc, curr) => acc + curr.quantity, 0);

export const TOTAL_PRICE = (state: CartStoreProps) =>
  state.cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
