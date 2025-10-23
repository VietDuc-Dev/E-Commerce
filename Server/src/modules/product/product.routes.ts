import { Router } from "express";
import { productController } from "./product.module";
import {
  authorizedRoles,
  isAuthenticated,
} from "../../middleware/auth.middleware";

const productRoutes = Router();

productRoutes.post(
  "/admin/create",
  isAuthenticated,
  authorizedRoles("Admin"),
  productController.createProduct
);
productRoutes.get("/", productController.fetchAllProducts);
productRoutes.get(
  "/singleProduct/:productId",
  productController.fetchSingleProduct
);
productRoutes.put(
  "/post-new/review/:productId",
  isAuthenticated,
  productController.postProductReview
);
productRoutes.delete(
  "/delete/review/:productId",
  isAuthenticated,
  productController.deleteReview
);
productRoutes.put(
  "/admin/update/:productId",
  isAuthenticated,
  authorizedRoles("Admin"),
  productController.updateProduct
);
productRoutes.delete(
  "/admin/delete/:productId",
  isAuthenticated,
  authorizedRoles("Admin"),
  productController.deleteProduct
);
productRoutes.post(
  "/ai-search",
  isAuthenticated,
  productController.fetchAiFilteredProducts
);

export default productRoutes;
