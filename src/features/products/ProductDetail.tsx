"use client";

import { Button, Paragraph } from "@/components";
import { useCartStore } from "@/store/cart-store";
import { ProductType } from "@/types/product-type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailProps {
  product: ProductType;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <section className="py-8 grid grid-cols-1 gap-4 items-start lg:grid-cols-2 lg:gap-0">
      <div
        className="flex lg:grid lg:grid-cols-1 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {product.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={product.title}
            width={800}
            height={800}
            priority={index === 0}
            className="w-full h-full mb-4"
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 px-4 lg:sticky lg:top-8">
        <Link href="/shop" className="text-xs">
          ← Return to the shop
        </Link>

        <div className="pt-4 pb-16 border-t border-accent flex flex-col gap-4">
          <h1 className="text-2xl">{product.title}</h1>
          <Paragraph>$ {product.price}</Paragraph>
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
            onClick={() => addToCart(product, quantity)}
          >
            Add to cart
          </Button>
        </div>

        <div className="pt-4 pb-16 border-t border-accent flex flex-col gap-4">
          <Paragraph>Details</Paragraph>
          <Paragraph>{product.description}</Paragraph>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
