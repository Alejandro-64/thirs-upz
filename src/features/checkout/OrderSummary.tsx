"use client";

import { Link } from "@/components";
import { useCartStore } from "@/store/cart-store";

const OrderSummary = () => {
  const order = useCartStore((state) => state.lastOrder);

  if (!order) {
    return (
      <section className="flex flex-col gap-4">
        <p className="text-xs">There is no recent order.</p>
        <Link href="/shop">← Return to Shop</Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <p className="text-xs">Order {order.id}</p>

      <ul className="flex flex-col gap-1 text-sm">
        {order.items.map(({ title, quantity }) => (
          <li key={title}>
            {title} × {quantity}
          </li>
        ))}
      </ul>

      <p>Total $ {order.total.toFixed(2)}</p>

      <p className="text-xs">
        This is a demo: no payment was processed and nothing was saved.
      </p>

      <Link href="/shop">← Return to Shop</Link>
    </section>
  );
};

export default OrderSummary;
