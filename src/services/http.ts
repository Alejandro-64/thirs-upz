import { CLOTHING_CATEGORIES } from '@/constants/products';
import { ApiResponse, ProductType } from '@/types/product-type';

const BASE_URL = process.env.NEXT_PUBLIC_URL_API;
if (!BASE_URL) throw new Error('Falta la variable NEXT_PUBLIC_URL_API');

async function http<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}

export const getClothingProducts = async () => {
  const { products } = await http<ApiResponse>(`${BASE_URL}?limit=0`);
  return products.filter((product) =>
    CLOTHING_CATEGORIES.includes(product.category),
  );
};

export const getProductById = (id: string) => {
  return http<ProductType>(`${BASE_URL}/${id}`);
};
