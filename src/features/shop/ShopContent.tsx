import { Container } from "@/components";
import { Suspense } from "react";
import Filter from "../filter/Filter";
import Products from "../products/Products";
import { Loading } from "../products/components";
import { ProductType } from "@/types/product-type";

interface ShopContentProps {
  productsPromise: Promise<ProductType[]>;
}

const ShopContent = ({ productsPromise }: ShopContentProps) => {
  return (
    <Container>
      <Suspense fallback={null}>
        <Filter productsPromise={productsPromise} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Products productsPromise={productsPromise} />
      </Suspense>
    </Container>
  );
};

export default ShopContent;
