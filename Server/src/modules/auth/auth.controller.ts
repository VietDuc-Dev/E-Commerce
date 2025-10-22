import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { AuthService } from "./auth.service";
import {
  changePasswordSchema,
  emailSchema,
  loginSchema,
  passwordSchema,
  registerSchema,
} from "./auth.validation";
import { HTTPSTATUS } from "../../config/http.config";
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from "../../common/utils/cookie";

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
    async (req: Request, res: Response): Promise<any> => {
      return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
        success: true,
        message: "Đăng xuất thành công",
      });
    }
  );

  // --------------- FORGOT PASSWORD ---------------
  public forgotPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const email = emailSchema.parse(req.body.email);
      const frontendUrl = req.query.frontendUrl as string;

      await this.authService.forgotPassword({ email, frontendUrl });

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: `Email đã gửi đến ${email} thành công`,
      });
    }
  );

  // --------------- RESET PASSWORD ---------------
  public resetPassword = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { password } = changePasswordSchema.parse({ ...req.body });
      const token = req.params.token;

      const { user, accessToken } = await this.authService.resetPassword(
        token,
        password
      );

      return setAuthenticationCookies({ res, accessToken })
        .status(HTTPSTATUS.OK)
        .json({
          success: true,
          message: "Thay đổi mật khẩu thành công",
          user,
        });
    }
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
