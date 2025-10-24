import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ProductService } from "./product.service";
import { HTTPSTATUS } from "../../config/http.config";
import {
  createProductSchema,
  fetchAllProductsSchema,
  pageSchema,
  productIdSchema,
  updateProductSchema,
} from "./product.validation";

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  // --------------- CREATE PRODUCT ---------------
  public createProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = createProductSchema.parse({
        ...req.body,
        images: req.files?.images,
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
      const page = pageSchema.parse(req.query.page) || 1;

      const product = await this.productService.fetchAllProducts(body, page);

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
      const productId = productIdSchema.parse(req.params);

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
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- FETCH SINGLE PRODUCT ---------------
  public fetchSingleProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- POST PRODUCT REVIEW ---------------
  public postProductReview = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- DELETE REVIEW ---------------
  public deleteReview = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- FETCH AI FILTERED PRODUCTS ---------------
  public fetchAiFilteredProducts = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );
}
