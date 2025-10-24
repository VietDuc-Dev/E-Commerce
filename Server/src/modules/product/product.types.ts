import { AvailabilityEnumType } from "../../common/enums/product.enum";

interface UploadedFileType {
  tempFilePath: string;
  mimetype: string;
  size: number;
  name?: string;
  data?: any;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: any;
}

export interface FetchAllProductsDto {
  availability?: AvailabilityEnumType;
  price?: number;
  category?: string;
  ratings?: number;
  search?: string;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}
