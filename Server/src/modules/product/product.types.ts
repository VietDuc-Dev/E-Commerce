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
