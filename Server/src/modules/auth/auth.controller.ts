import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.validation";
import { HTTPSTATUS } from "../../config/http.config";
import { setAuthenticationCookies } from "../../common/utils/cookie";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // --------------- REGISTER ---------------
  public register = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = registerSchema.parse(req.body);

      const { user, accessToken } = await this.authService.register(body);

      return setAuthenticationCookies({ res, accessToken })
        .status(HTTPSTATUS.CREATED)
        .json({
          success: true,
          message: "Đăng ký tài khoản thành công",
          user,
          accessToken,
        });
    }
  );

  // --------------- LOGIN ---------------
  public login = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = loginSchema.parse(req.body);

      const { user, accessToken } = await this.authService.login(body);

      return setAuthenticationCookies({ res, accessToken })
        .status(HTTPSTATUS.CREATED)
        .json({
          success: true,
          message: "Đăng nhập tài khoản thành công",
          user,
          accessToken,
        });
    }
  );
  // --------------- GET USER ---------------
  public getUser = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const user = await this.authService.getUser(req.user);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Dữ liệu người dùng",
        user,
      });
    }
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
