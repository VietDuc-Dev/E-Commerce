export interface ProductImage {
  url: string;
}

export interface ProductDto {
  id: string;
  images: ProductImage[];
}

export interface OrderedItemDto {
  product: ProductDto;
  quantity: number;
}

export interface PlaceNewOrderDto {
  full_name: string;
  city: string;
  district: string;
  ward: string;
  addressDetail: string;
  phone: string;
  orderedItems: OrderedItemDto[];
}
