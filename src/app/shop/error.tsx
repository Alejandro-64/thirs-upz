"use client";

import { Container } from "@/components";
import { Error as ErrorMessage } from "@/features/products/components";

// Next oculta el mensaje real de errores del servidor en producción, por eso va texto fijo.
const ShopError = () => {
  return (
    <Container>
      <ErrorMessage message="No pudimos cargar los productos. Intenta de nuevo más tarde." />
    </Container>
  );
};

export default ShopError;
