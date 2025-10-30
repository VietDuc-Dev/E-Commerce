type ProductImageType = {
  url: string;
  public_id: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  ratings: number;
  images: ProductImageType[];
  stock: number;
  created_by: string;
  created_at: string;
  review_count: number;
};
