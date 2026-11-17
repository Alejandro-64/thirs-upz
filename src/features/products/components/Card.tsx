import { Heading } from "@/components";
import { ProductType } from "@/types/product-type";
import Image from "next/image";
import Link from "next/link";

const Card = ({ product }: { product: ProductType }) => {
  return (
    <article>
      <Link href={`/shop/${product.id}`} className="flex flex-col gap-4 group">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={800}
            height={800}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
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
