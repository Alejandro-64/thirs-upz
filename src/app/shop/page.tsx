"use client";

import { Container } from "@/components";
import { Filter, Products } from "@/features";
import { Suspense, useState } from "react";

const Shop = () => {
  const [total, setTotal] = useState(0);

  return (
    <>
      <title>Thirs Upz | Shop Classic Fashion</title>
      <meta
        name="description"
        content="Browse our full catalog of classic apparel and shoes."
      />

      <Container>
        <Suspense fallback={null}>
          <Filter totalProducts={total} />
        </Suspense>

        <Suspense fallback={null}>
          <Products onProductsCount={setTotal} />
        </Suspense>
      </Container>
    </>
  );
};

export default Shop;
