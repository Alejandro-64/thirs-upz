import ProductDetail from '@/features/products/ProductDetail';
import { getProductById, HttpError } from '@/services/http';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

// cached per request so the page and generateMetadata share a single fetch
const getProduct = cache((id: string) =>
  getProductById(id).catch((error) => {
    // a missing product is a 404 page; any other failure goes to error.tsx
    if (error instanceof HttpError && error.status === 404) notFound();
    throw error;
  }),
);

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: `${product.title} | Thirs Upz`,
    description: product.description,
  };
};

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProduct(id);

  return <ProductDetail product={product} />;
};

export default ProductPage;
