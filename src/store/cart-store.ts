import { MAX_QUANTITY, MIN_QUANTITY } from "@/constants/cart";
import { Order } from "@/types/order-type";
import { ProductType } from "@/types/product-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const clampQuantity = (quantity: number) =>
  Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, quantity));

interface CartStoreProps {
  cart: ProductType[];
  lastOrder: Order | null;
  addToCart: (product: ProductType, quantity: number) => void;
  remove: (id: number) => void;
  updateQuantity: (product: ProductType, number: number) => void;
  completeOrder: (order: Order) => void;
}

export const useCartStore = create<CartStoreProps>()(
  persist(
    (set) => ({
      cart: [],
      lastOrder: null,

      addToCart: (product, quantity) =>
        set((state) => {
          const isFoundId = state.cart.find((item) => item.id === product.id);

          return {
            cart: isFoundId
              ? state.cart.map((item) =>
                  item.id === product.id
                    ? {
                        ...item,
                        quantity: clampQuantity(item.quantity + quantity),
                      }
                    : item,
                )
              : [
                  ...state.cart,
                  { ...product, quantity: clampQuantity(quantity) },
                ],
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
              ? { ...item, quantity: clampQuantity(item.quantity + number) }
              : item,
          ),
        })),
      // keeps the order for the confirmation page and empties the cart
      completeOrder: (order) => set({ cart: [], lastOrder: order }),
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
