import { Heading } from "@/components";
import { ProductType } from "@/types/product-type";
import Link from "next/link";

const Card = ({ product }: { product: ProductType }) => {
  return (
    <article>
      <Link href={`/shop/${product.id}`} className="flex flex-col gap-4 group">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            width={800}
            height={800}
            loading="lazy"
            className="w-full h-full transition-transform group-hover:scale-105"
          />
        </div>

        <div className="min-w-0">
          <Heading tag="h2" className="truncate capitalize">
            {product.title}
          </Heading>
        </div>
      </Link>
    </article>
  );
};

export default Card;
