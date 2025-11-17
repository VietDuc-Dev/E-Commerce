export interface FetchAllProducts {
  availability: string;
  price: string;
  category: string;
  ratings: string;
  search: string;
  page: number;
}

export interface ProductImageType {
  url: string;
  public_id: string;
}

export interface Product {
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
}

export interface Review {
  review_id: string;
  rating: string;
  comment: string;
  reviewer: {
    id: string;
    name: string;
    avatar?: { url: string };
  };
}

export interface Paginnation {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FetchAllProductsResponse {
  products: Product[];
  totalProducts: number;
  newProducts?: Product[];
  topRatedProducts?: Product[];
}

export interface ProductState {
  loading: boolean;
  products: Product[];
  productDetails: Product | null;
  paginnation: Paginnation | null;
  topRatedProducts: Product[];
  newProducts: Product[];
  aiSearching: boolean;
  isReviewDeleting: boolean;
  isPostingReview: boolean;
  productReviews: Review[];
}
