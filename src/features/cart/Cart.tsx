"use client";

import { Button, Link } from "@/components";
import { Card, Message } from "./components";
import { TOTAL_PRICE, useCartStore } from "@/store/cart-store";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const price = useCartStore(TOTAL_PRICE);

  return (
    <section className="flex flex-col gap-4">
      {cart.length === 0 ? (
        <Message />
      ) : (
        <>
          <div className="pb-8">
            <Link href={"/shop"}>← Return to Shop</Link>
          </div>

          <ul className="flex flex-col gap-4">
            {cart.map((item) => (
              <li key={item.id}>
                <Card product={item} />
              </li>
            ))}
          </ul>

          <div className="py-8 border-t border-accent flex flex-col gap-4 md:items-end">
            <div className="flex items-center justify-between gap-4 md:justify-start">
              <p className="text-xs">Estimated total</p>
              <p>$ {price.toFixed(2)}</p>
            </div>

            <Button className="bg-accent w-full h-8 md:w-32">Pay</Button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
