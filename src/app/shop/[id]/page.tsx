import ProductDetail from '@/features/products/ProductDetail';
import { getProductById } from '@/services/http';

interface Props {
  params: Promise<{ id: string }>;
}

const Selected = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <>
      <title>{`${product.title} | Thirs Upz`}</title>
      <meta name="description" content={product.description} />

      <ProductDetail product={product} />
    </>
  );
};

export default Selected;
