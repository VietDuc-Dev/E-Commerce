import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ProductService } from "./product.service";
import { HTTPSTATUS } from "../../config/http.config";
import {
  createProductSchema,
  fetchAllProductsSchema,
  pageSchema,
  postProductReviewSchema,
  productIdSchema,
  updateProductSchema,
  userPromptSchema,
} from "./product.validation";

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  // --------------- CREATE PRODUCT ---------------
  public createProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const filesArray = Array.isArray(req.files?.images)
        ? req.files.images
        : [req.files?.images];

      const body = createProductSchema.parse({
        ...req.body,
        images: filesArray,
      });

      const product = await this.productService.createProduct(
        body,
        req.user.id
      );

      return res.status(HTTPSTATUS.CREATED).json({
        success: true,
        message: "Thêm mới sản phẩm thành công",
        product,
      });
    }
  );

  // --------------- FETCH ALL PRODUCTS ---------------
  public fetchAllProducts = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = fetchAllProductsSchema.parse(req.query);

      const product = await this.productService.fetchAllProducts(body);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Lấy danh sách sản phẩm thành công",
        ...product,
      });
    }
  );

  // --------------- UPDATE PRODUCT ---------------
  public updateProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = updateProductSchema.parse(req.body);
      const productId = productIdSchema.parse(req.params.productId);

      const product = await this.productService.updateProduct(body, productId);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Cập nhật sản phẩm thành công",
        product,
      });
    }
  );

  // --------------- DELETE PRODUCT ---------------
  public deleteProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const productId = productIdSchema.parse(req.params.productId);

      await this.productService.deleteProduct(productId);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Xóa sản phẩm thành công",
      });
    }
  );

  // --------------- FETCH SINGLE PRODUCT ---------------
  public fetchSingleProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const productId = productIdSchema.parse(req.params.productId);

      const product = await this.productService.fetchSingleProduct(productId);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Lấy sản phẩm thành công",
        product,
      });
    }
  );

  // --------------- POST PRODUCT REVIEW ---------------
  public postProductReview = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const productId = productIdSchema.parse(req.params.productId);
      const body = postProductReviewSchema.parse(req.body);

      const { review, product } = await this.productService.postProductReview(
        body,
        productId,
        req.user.id
      );

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Cảm ơn bạn đã đánh giá sản phẩm",
        review,
        product,
      });
    }
  );

  // --------------- DELETE REVIEW ---------------
  public deleteReview = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const productId = productIdSchema.parse(req.params.productId);

      const { deletedReview, updatedProduct } =
        await this.productService.deleteReview(productId, req.user.id);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Bài đánh giá của bạn đã được xóa",
        review: deletedReview,
        product: updatedProduct,
      });
    }
  );

  // --------------- FETCH AI FILTERED PRODUCTS ---------------
  public fetchAiFilteredProducts = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userPrompt = userPromptSchema.parse(req.body.userPrompt);

      const result = await this.productService.fetchAiFilteredProducts(
        userPrompt,
        req,
        res
      );

      return res.status(HTTPSTATUS.OK).json(result);
    }
  );
}
