import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { AuthService } from "./auth.service";
import { registerSchema } from "./auth.validation";
import { HTTPSTATUS } from "../../config/http.config";
import { success } from "zod";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // --------------- REGISTER ---------------
  public register = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = registerSchema.parse(req.body);

      const user = await this.authService.register(body);

      return res.status(HTTPSTATUS.CREATED).json({
        success: true,
        message: "Đăng ký tài khoản thành công",
        user,
      });
    }
  );

  // --------------- LOGIN ---------------
  public login = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
  );
  // --------------- GET USER ---------------
  public getUser = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
  );

  // --------------- LOGOUT ---------------
  public logout = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
  );

  // --------------- FORGOT PASSWORD ---------------
  public forgotPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
  );

  // --------------- RESET PASSWORD ---------------
  public resetPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
  );

  // --------------- UPDATE PASSWORD ---------------
  public updatePassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
  );

  // --------------- UPDATE PROFILE ---------------
  public updateProfile = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {}
  );
}
