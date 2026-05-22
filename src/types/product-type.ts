export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  tags: string[];
  availability: string;
  images: string[];
  thumbnail: string;
  quantity: number;
};

export type ApiResponse = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};
