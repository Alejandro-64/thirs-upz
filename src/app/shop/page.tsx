import ShopContent from '@/features/shop/ShopContent';
import { getProducts } from '@/services/http';

const Shop = () => {
  const productsPromise = getProducts();

  return (
    <>
      <title>Thirs Upz | Shop Classic Fashion</title>
      <meta
        name="description"
        content="Browse our full catalog of classic apparel and shoes."
      />

      <ShopContent productsPromise={productsPromise} />
    </>
  );
};

export default Shop;
