import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ProductService } from "./product.service";
import { HTTPSTATUS } from "../../config/http.config";

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  // --------------- CREATE PRODUCT ---------------
  public createProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.CREATED).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- FETCH ALL PRODUCTS ---------------
  public fetchAllProducts = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- UPDATE PRODUCT ---------------
  public updateProduct = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
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
