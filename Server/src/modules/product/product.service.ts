import { Request, Response } from "express";
import { AvailabilityEnum } from "../../common/enums/product.enum";
import { BadRequestException } from "../../common/utils/catchError";
import { filterKeywords } from "../../common/utils/filterKeywords";
import { ProductRepository } from "./product.repository";
import {
  CreateProductDto,
  FetchAllProductsDto,
  PostProductReviewDto,
  UpdateProductDto,
} from "./product.types";
import { v2 as cloudinary } from "cloudinary";
import { getAIRecommendation } from "../../common/utils/getAiRecommendation";

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
  public async fetchAllProducts(data: FetchAllProductsDto) {
    const { availability, price, category, ratings, search, page } = data;

    const limit = 10;
    const offset = (page - 1) * limit;

    const conditions: string[] = [];
    const values: (string | number)[] = [];
    let index = 1;

    // Availability
    if (availability === AvailabilityEnum.IN_STOCK) {
      conditions.push(`p.stock > 5`);
    } else if (availability === AvailabilityEnum.LIMITED) {
      conditions.push(`p.stock > 0 AND p.stock <= 5`);
    } else if (availability === AvailabilityEnum.OUT_OF_STOCK) {
      conditions.push(`p.stock = 0`);
    }

    // Price
    if (price) {
      const [minPrice, maxPrice] = price.toString().split("-").map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        conditions.push(`p.price BETWEEN $${index} AND $${index + 1}`);
        values.push(minPrice, maxPrice);
        index += 2;
      }
    }

    // Category
    if (category) {
      conditions.push(`p.category ILIKE $${index}`);
      values.push(`%${category}%`);
      index++;
    }

    // Ratings
    if (ratings) {
      conditions.push(`p.ratings >= $${index}`);
      values.push(ratings);
      index++;
    }

    // Search
    if (search) {
      conditions.push(
        `(p.name ILIKE $${index} OR p.description ILIKE $${index})`
      );
      values.push(`%${search}%`);
      index++;
    }

    const { totalProducts, products } =
      await ProductRepository.fetchFilteredProducts(
        conditions,
        values,
        limit,
        offset
      );

    const newProducts = await ProductRepository.fetchNewProducts();
    const topRated = await ProductRepository.fetchTopRatedProducts();

    return {
      products,
      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
      },
      filters: { availability, price, category, ratings, search },
      newProducts,
      topRated,
    };
  }

  // --------------- UPDATE PRODUCT ---------------
  public async updateProduct(data: UpdateProductDto, productId: string) {
    const existing = await ProductRepository.findProductById(productId);
    if (!existing) throw new BadRequestException("Không tìm thấy sản phẩm");

    const product = await ProductRepository.updateProductById(data, productId);

    return product;
  }

  // --------------- DELETE PRODUCT ---------------
  public async deleteProduct(productId: string) {
    const product = await ProductRepository.findProductById(productId);
    if (!product) throw new BadRequestException("Không tìm thấy sản phẩm");

    const deleteResult = await ProductRepository.deleteProductById(productId);
    if (!deleteResult)
      throw new BadRequestException("Xóa sản phẩm không thành công");

    try {
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    } catch (error) {
      throw new Error("Không thể xóa ảnh trên Cloudinary.");
    }

    return;
  }

  // --------------- FETCH SINGLE PRODUCT ---------------
  public async fetchSingleProduct(productId: string) {
    const product = await ProductRepository.fetchSingleProduct(productId);
    if (!product) throw new BadRequestException("Không tìm thấy sản phẩm");

    return product;
  }

  // --------------- POST PRODUCT REVIEW ---------------
  public async postProductReview(
    data: PostProductReviewDto,
    productId: string,
    userId: string
  ) {
    const hasPurchased = await ProductRepository.hasUserPurchasedProduct(
      userId,
      productId
    );
    if (!hasPurchased) {
      throw new BadRequestException(
        "Bạn chỉ xem được các sản phẩm mình đã mua"
      );
    }

    const product = await ProductRepository.findProductById(productId);
    if (!product) throw new BadRequestException("Không tìm thấy sản phẩm");

    const review = await ProductRepository.upsertReview(
      productId,
      userId,
      data.rating,
      data.comment
    );
    const updatedProduct = await ProductRepository.updateProductRating(
      productId
    );

    return { review, product: updatedProduct };
  }

  // --------------- DELETE REVIEW ---------------
  public async deleteReview(userId: string, productId: string) {
    const deletedReview = await ProductRepository.deleteReview(
      productId,
      userId
    );

    if (!deletedReview) {
      throw new BadRequestException("Không tìm thấy bài đánh giá");
    }

    const updatedProduct = await ProductRepository.updateProductRating(
      productId
    );

    return { deletedReview, updatedProduct };
  }

  // --------------- FETCH AI FILTERED PRODUCTS ---------------
  public async fetchAiFilteredProducts(
    userPrompt: string,
    req: Request,
    res: Response
  ) {
    const keywords = filterKeywords(userPrompt);

    const filteredProducts = await ProductRepository.searchByKeywords(keywords);
    if (filteredProducts.length === 0) {
      return {
        success: true,
        message: "Không có sản phẩm nào được tìm thấy",
        products: [],
      };
    }

    const { success, products } = await getAIRecommendation(
      req,
      res,
      userPrompt,
      filteredProducts
    );
    return { success, message: "Sản phẩm lọc từ AI.", products };
  }
}
