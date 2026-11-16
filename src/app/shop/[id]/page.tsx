import ProductDetail from '@/features/products/ProductDetail';
import { getProductById, HttpError } from '@/services/http';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

const Selected = async ({ params }: Props) => {
  const { id } = await params;

  const product = await getProductById(id).catch((error) => {
    // a missing product is a 404 page; any other failure goes to error.tsx
    if (error instanceof HttpError && error.status === 404) notFound();
    throw error;
  });

  return (
    <>
      <title>{`${product.title} | Thirs Upz`}</title>
      <meta name="description" content={product.description} />

      <ProductDetail product={product} />
    </>
  );
};

export default Selected;
