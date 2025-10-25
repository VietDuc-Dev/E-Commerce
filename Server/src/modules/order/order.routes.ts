import { Router } from "express";
import {
  authorizedRoles,
  isAuthenticated,
} from "../../middleware/auth.middleware";
import { orderController } from "./order.module";

const orderRoutes = Router();

orderRoutes.post("/new", isAuthenticated, orderController.placeNewOrder);
orderRoutes.get("/:orderId", isAuthenticated, orderController.fetchSingleOrder);
orderRoutes.get("/orders/me", isAuthenticated, orderController.fetchMyOrders);
orderRoutes.get(
  "/admin/getall",
  isAuthenticated,
  authorizedRoles("Admin"),
  orderController.fetchAllOrders
);
orderRoutes.put(
  "/admin/update/:orderId",
  isAuthenticated,
  authorizedRoles("Admin"),
  orderController.updateOrderStatus
);
orderRoutes.delete(
  "/admin/delete/:orderId",
  isAuthenticated,
  authorizedRoles("Admin"),
  orderController.deleteOrder
);

export default orderRoutes;
