"use client";

import { Container } from "@/components";
import { ErrorMessage } from "@/features/products/components";

const ProductError = () => {
  return (
    <Container>
      <ErrorMessage message="We couldn't load the product. Please try again later." />
    </Container>
  );
};

export default ProductError;
