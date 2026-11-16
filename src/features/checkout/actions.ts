"use server";

import { MAX_QUANTITY, MIN_QUANTITY } from "@/constants/cart";
import { getProductById } from "@/services/http";
import { Order } from "@/types/order-type";
import { z } from "zod";
import { checkoutSchema } from "./schema";

const orderSchema = z.object({
  customer: checkoutSchema,
  items: z
    .array(
      z.object({
        id: z.number().int(),
        quantity: z.number().int().min(MIN_QUANTITY).max(MAX_QUANTITY),
      }),
    )
    .min(1),
});

type PlaceOrderResult =
  | { ok: true; order: Order }
  | { ok: false; error: string };

// Demo: validates the order and recalculates it, but nothing is charged or saved.
export const placeOrder = async (input: unknown): Promise<PlaceOrderResult> => {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check your details and your cart." };
  }

  try {
    // The browser only sends ids and quantities: prices and stock come from the API.
    const products = await Promise.all(
      parsed.data.items.map(({ id }) => getProductById(String(id))),
    );
    const lines = parsed.data.items.map(({ quantity }, index) => ({
      product: products[index],
      quantity,
    }));

    const soldOut = lines.find(({ product, quantity }) => product.stock < quantity);
    if (soldOut) {
      return {
        ok: false,
        error: `Only ${soldOut.product.stock} left of ${soldOut.product.title}.`,
      };
    }

    const total = lines.reduce(
      (sum, { product, quantity }) => sum + product.price * quantity,
      0,
    );

    return {
      ok: true,
      order: {
        id: crypto.randomUUID().slice(0, 8).toUpperCase(),
        total: Math.round(total * 100) / 100,
        items: lines.map(({ product, quantity }) => ({
          title: product.title,
          quantity,
        })),
      },
    };
  } catch {
    return {
      ok: false,
      error: "Some products are no longer available. Please review your cart.",
    };
  }
};
