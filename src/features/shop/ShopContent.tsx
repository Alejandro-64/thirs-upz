"use client";

import { Container } from "@/components";
import { Suspense, useState } from "react";
import Filter from "../filter/Filter";
import Products from "../products/Products";
import { Loading } from "../products/components";
import { ApiResponse } from "@/types/product-type";

interface ShopContentProps {
  productsPromise: Promise<ApiResponse>;
}

const ShopContent = ({ productsPromise }: ShopContentProps) => {
  const [total, setTotal] = useState(0);

  return (
    <Container>
      <Suspense fallback={null}>
        <Filter totalProducts={total} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Products
          productsPromise={productsPromise}
          onProductsCount={setTotal}
        />
      </Suspense>
    </Container>
  );
};

export default ShopContent;
