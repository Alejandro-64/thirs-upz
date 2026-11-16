import { Button } from "@/components";
import { MAX_QUANTITY, MIN_QUANTITY } from "@/constants/cart";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "@/types/cart-item-type";
import Image from "next/image";
import { MdAdd, MdOutlineDelete, MdRemove } from "react-icons/md";

const Card = ({ product }: { product: CartItem }) => {
  const remove = useCartStore((state) => state.remove);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <article className="grid grid-cols-[auto_1fr_auto] gap-4 md:grid-cols-[auto_1fr_1fr]">
      <div className="w-20 aspect-square">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          sizes="80px"
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-base line-clamp-2">{product.title}</p>
        <p className="text-xs">$ {product.price}</p>
      </div>

      <div className="flex items-center gap-4 md:justify-end ">
        <div className="w-20 p-2 border border-accent flex items-center justify-between gap-2">
          <Button
            aria-label="Decrement Quantity"
            disabled={product.quantity <= MIN_QUANTITY}
            onClick={() => updateQuantity(product.id, -1)}
          >
            <MdRemove />
          </Button>
          <span className="text-xs">{product.quantity}</span>
          <Button
            aria-label="Increment Quantity"
            disabled={product.quantity >= MAX_QUANTITY}
            onClick={() => updateQuantity(product.id, 1)}
          >
            <MdAdd />
          </Button>
        </div>

        <Button aria-label="Delete Product" onClick={() => remove(product.id)}>
          <MdOutlineDelete />
        </Button>
      </div>
    </article>
  );
};

export default Card;
