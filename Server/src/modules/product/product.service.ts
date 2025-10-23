import { ProductRepository } from "./product.repository";
import { CreateProductDto } from "./product.types";
import { v2 as cloudinary } from "cloudinary";

export class ProductService {
  // --------------- CREATE PRODUCT ---------------
  public async createProduct(data: CreateProductDto, userId: string) {
    let uploadedImages = [];
    if (data.images) {
      try {
        for (const image of data.images) {
          const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "Ecommerce_Product_Images",
            width: 1000,
            crop: "scale",
          });

          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      } catch (error) {
        throw new Error("Không thể tải ảnh lên Cloudinary.");
      }
    }

    const product = await ProductRepository.createProduct(
      data,
      uploadedImages,
      userId
    );

    return product;
  }

  // --------------- FETCH ALL PRODUCTS ---------------
  public async fetchAllProducts() {}

  // --------------- UPDATE PRODUCT ---------------
  public async updateProduct() {}

  // --------------- DELETE PRODUCT ---------------
  public async deleteProduct() {}

  // --------------- FETCH SINGLE PRODUCT ---------------
  public async fetchSingleProduct() {}

  // --------------- POST PRODUCT REVIEW ---------------
  public async postProductReview() {}

  // --------------- DELETE REVIEW ---------------
  public async deleteReview() {}

  // --------------- FETCH AI FILTERED PRODUCTS ---------------
  public async fetchAiFilteredProducts() {}
}
