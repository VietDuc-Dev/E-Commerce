export interface FetchAllProducts {
  availability: string;
  price: string;
  category: string;
  ratings: string;
  search: string;
  page: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  ratings: number;
  images: { url: string }[];
  stock: number;
  category: string;
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
  totalProducts: number;
  topRatedProducts: Product[];
  newProducts: Product[];
  aiSearching: boolean;
  isReviewDeleting: boolean;
  isPostingReview: boolean;
  productReviews: Review[];
}
