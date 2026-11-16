"use client";

import { Container } from "@/components";
import { ErrorMessage } from "@/features/products/components";

const ProductError = () => {
  return (
    <Container>
      <ErrorMessage message="No pudimos cargar el producto. Intenta de nuevo más tarde." />
    </Container>
  );
};

export default ProductError;
