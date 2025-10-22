import { ErrorCode } from "../../common/enums/error-code.enum";
import { sendEmail } from "../../common/mailers/sendEmail";
import { passwordResetTemplate } from "../../common/mailers/templates/template";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../common/utils/catchError";
import { generateResetPasswordToken } from "../../common/utils/generateResetPasswordToken";
import { signJwtToken } from "../../common/utils/jwt";
import { sanitizeUser } from "../../common/utils/sanitizeUser";
import { AuthRepository } from "./auth.repository";
import { forgotPasswordDto, LoginDto, RegisterDto } from "./auth.types";
import bcrypt from "bcrypt";

export class AuthService {
  // --------------- REGISTER ---------------
  public async register(data: RegisterDto) {
    const { name, email, password } = data;

    const existing = await AuthRepository.findUserByEmail(email);
    if (existing)
      throw new BadRequestException(
        "Email đã được sử dụng",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthRepository.createUser(name, email, hashedPassword);

    const accessToken = signJwtToken({
      userId: user.id,
    });

    return { user, accessToken };
  }

  // --------------- LOGIN ---------------
  public async login(data: LoginDto) {
    const { email, password } = data;

    const user = await AuthRepository.findUserByEmail(email);
    if (!user)
      throw new BadRequestException(
        "Email hoặc mật khẩu không đúng",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new BadRequestException(
        "Email hoặc mật khẩu không đúng",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );

    const accessToken = signJwtToken({
      userId: user.id,
    });

    return { user, accessToken };
  }

  // --------------- GET USER ---------------
  public async getUser(data: any) {
    const user = sanitizeUser(data);

    return user;
  }

  // --------------- LOGOUT ---------------
  public async logout() {}

  // --------------- FORGOT PASSWORD ---------------
  public async forgotPassword(data: forgotPasswordDto) {
    const { email, frontendUrl } = data;

    const user = await AuthRepository.findUserByEmail(email);
    if (!user)
      throw new UnauthorizedException(
        "Người dùng không tồn tại.",
        ErrorCode.AUTH_USER_NOT_FOUND
      );

    const { hashedToken, resetPasswordExpireTime, resetToken } =
      generateResetPasswordToken();

    await AuthRepository.updateUserResetPasswordToken(
      hashedToken,
      resetPasswordExpireTime,
      resetToken
    );

    const resetPasswordUrl = `${frontendUrl}/password/reset/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Thay đổi mật khẩu của bạn",
        message: passwordResetTemplate(resetPasswordUrl),
      });

      return;
    } catch (error) {
      await AuthRepository.updateUserResetPasswordTokenFaile(email);

      throw new BadRequestException(
        "Gửi mail thất bại",
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  // --------------- RESET PASSWORD ---------------
  public async resetPassword() {}

  // --------------- UPDATE PASSWORD ---------------
  public async updatePassword() {}

  // --------------- UPDATE PROFILE ---------------
  public async updateProfile() {}
}
