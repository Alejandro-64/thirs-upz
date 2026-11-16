import ShopContent from '@/features/shop/ShopContent';
import { getClothingProducts } from '@/services/http';

const Shop = () => {
  const productsPromise = getClothingProducts();

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
