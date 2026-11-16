"use client";

import { Container } from "@/components";
import { ErrorMessage } from "@/features/products/components";

// Next oculta el mensaje real de errores del servidor en producción, por eso va texto fijo.
const ShopError = () => {
  return (
    <Container>
      <ErrorMessage message="We couldn't load the products. Please try again later." />
    </Container>
  );
};

export default ShopError;
