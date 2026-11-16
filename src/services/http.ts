import { ApiResponse, ProductType } from '@/types/product-type';

const BASE_URL = process.env.NEXT_PUBLIC_URL_API;
if (!BASE_URL) throw new Error('Falta la variable NEXT_PUBLIC_URL_API');

async function http<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}

export const getProducts = () => {
  return http<ApiResponse>(`${BASE_URL}?limit=0`);
};

export const getProductById = (id: string) => {
  return http<ProductType>(`${BASE_URL}/${id}`);
};
