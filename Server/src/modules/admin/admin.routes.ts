import { Router } from "express";
import {
  authorizedRoles,
  isAuthenticated,
} from "../../middleware/auth.middleware";
import { adminController } from "./admin.module";

const adminRoutes = Router();

adminRoutes.get(
  "/getallusers",
  isAuthenticated,
  authorizedRoles("Admin"),
  adminController.getAllUsers
);
adminRoutes.delete(
  "/delete/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  adminController.deleteUser
);
adminRoutes.get(
  "/fetch/dashboard-stats",
  isAuthenticated,
  authorizedRoles("Admin"),
  adminController.dashboardStats
);

export default adminRoutes;
