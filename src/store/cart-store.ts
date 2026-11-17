import { MIN_QUANTITY, maxQuantityFor } from "@/constants/cart";
import { CartItem } from "@/types/cart-item-type";
import { Order } from "@/types/order-type";
import { ProductType } from "@/types/product-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const clampQuantity = (quantity: number, stock: number) =>
  Math.min(maxQuantityFor(stock), Math.max(MIN_QUANTITY, quantity));

interface CartStoreProps {
  cart: CartItem[];
  lastOrder: Order | null;
  addToCart: (product: ProductType, quantity: number) => void;
  remove: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  completeOrder: (order: Order) => void;
}

export const useCartStore = create<CartStoreProps>()(
  persist(
    (set) => ({
      cart: [],
      lastOrder: null,

      addToCart: (product, quantity) =>
        set((state) => {
          // nothing can be added when there is no stock
          if (product.stock < MIN_QUANTITY) return state;

          const isFoundId = state.cart.find((item) => item.id === product.id);

          return {
            cart: isFoundId
              ? state.cart.map((item) =>
                  item.id === product.id
                    ? {
                        ...item,
                        stock: product.stock,
                        quantity: clampQuantity(
                          item.quantity + quantity,
                          product.stock,
                        ),
                      }
                    : item,
                )
              : [
                  ...state.cart,
                  {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    stock: product.stock,
                    quantity: clampQuantity(quantity, product.stock),
                  },
                ],
          };
        }),
      remove: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: clampQuantity(item.quantity + delta, item.stock),
                }
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
