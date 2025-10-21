import { Router } from "express";
import { authController } from "./auth.module";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
// authRoutes.post("/login", login);
// authRoutes.get("/me", isAuthenticated, getUser);
// authRoutes.get("/logout", isAuthenticated, logout);
// authRoutes.post("/password/forgot", forgotPassword);
// authRoutes.put("/password/reset/:token", resetPassword);
// authRoutes.put("/password/update", isAuthenticated, updatePassword);
// authRoutes.put("/profile/update", isAuthenticated, updateProfile);

export default authRoutes;
