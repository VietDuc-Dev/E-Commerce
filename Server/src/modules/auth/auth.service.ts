import { ErrorCode } from "../../common/enums/error-code.enum";
import { userType } from "../../common/interface/user.interface";
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
import {
  forgotPasswordDto,
  LoginDto,
  RegisterDto,
  updateProfileDto,
} from "./auth.types";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

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

    return { user: sanitizeUser(user), accessToken };
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

    return { user: sanitizeUser(user), accessToken };
  }

  // --------------- GET USER ---------------
  public async getUser(data: userType) {
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
      email
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
  public async resetPassword(token: string, password: string) {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await AuthRepository.checkUserWithResetPasswordToken(
      resetPasswordToken
    );

    if (!user)
      throw new BadRequestException(
        "Token không có hiệu lực hoặc đã hết hạn",
        ErrorCode.VERIFICATION_ERROR
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUser = await AuthRepository.updateUserResetPassword(
      hashedPassword,
      user
    );

    const accessToken = signJwtToken({
      userId: updateUser.id,
    });

    return { user: sanitizeUser(updateUser), accessToken };
  }

  // --------------- UPDATE PASSWORD ---------------
  public async updatePassword(
    currentPassword: string,
    newPassword: string,
    user: userType
  ) {
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch)
      throw new BadRequestException("Mật khẩu hiện tại không đúng");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await AuthRepository.updateUserResetPassword(hashedPassword, user);

    return;
  }

  // --------------- UPDATE PROFILE ---------------
  public async updateProfile(data: updateProfileDto, userId: string) {
    const { name, email, avatar } = data;

    let avatarData: { public_id: string; url: string } | null = null;
    if (avatar) {
      try {
        // Xóa avatar cũ nếu có
        if (avatar.public_id) {
          await cloudinary.uploader.destroy(avatar.public_id);
        }

        // Upload ảnh mới
        const uploaded = await cloudinary.uploader.upload(avatar.tempFilePath, {
          folder: "Ecommerce_Avatars",
          width: 150,
          crop: "scale",
        });

        avatarData = {
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
        };
      } catch (error) {
        throw new Error("Không thể tải ảnh lên Cloudinary.");
      }
    }

    const user = await AuthRepository.updateProfile(
      name,
      email,
      avatarData,
      userId
    );

    return user;
  }
}
