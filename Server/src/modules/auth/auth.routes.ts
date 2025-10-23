import { Router } from "express";
import { authController } from "./auth.module";
import { isAuthenticated } from "../../middleware/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/me", isAuthenticated, authController.getUser);
authRoutes.get("/logout", isAuthenticated, authController.logout);
authRoutes.post("/password/forgot", authController.forgotPassword);
authRoutes.put("/password/reset/:token", authController.resetPassword);
authRoutes.put(
  "/password/update",
  isAuthenticated,
  authController.updatePassword
);
authRoutes.put(
  "/profile/update",
  isAuthenticated,
  authController.updateProfile
);

export default authRoutes;
