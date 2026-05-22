"use client";

import { Button, Paragraph } from "@/components";
import { useFetch } from "@/hooks";
import { useCartStore } from "@/store/cart-store";
import { ProductType } from "@/types/product-type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const Selected = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const { data } = useFetch<ProductType>(
    `https://dummyjson.com/products/${id}`,
  );

  return (
    <>
      <title>
        {data ? `${data.title} | Thirs Upz` : "Product Details | Thirs Upz"}
      </title>
      <meta
        name="description"
        content={
          data?.description ||
          "View details, pricing, and availability for this classic fashion piece. Born in Lima."
        }
      />

      <section className="py-8 grid grid-cols-1 gap-4 items-start lg:grid-cols-2 lg:gap-0">
        <div
          className="flex lg:grid lg:grid-cols-1 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {data?.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={data?.title}
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-full mb-4"
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 px-4 lg:sticky lg:top-8">
          <Link href="/shop" className="text-xs">
            ← Return to the shop
          </Link>

          <div className="pt-4 pb-16 border-t border-accent flex flex-col gap-4">
            <h1 className="text-2xl">{data?.title}</h1>
            <Paragraph>$ {data?.price}</Paragraph>
          </div>

          <div className="pt-4 pb-16 border-t border-accent grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex items-center gap-4 text-xs">
              <label htmlFor="quantity">Quantity</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <Button
              className="bg-accent w-full h-8"
              onClick={() => data && addToCart(data, quantity)}
            >
              Add to cart
            </Button>
          </div>

          <div className="pt-4 pb-16 border-t border-accent flex flex-col gap-4">
            <Paragraph>Details</Paragraph>
            <Paragraph>{data?.description}</Paragraph>
          </div>
        </div>
      </section>
    </>
  );
};

export default Selected;
