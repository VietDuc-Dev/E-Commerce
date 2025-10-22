import { ErrorCode } from "../../common/enums/error-code.enum";
import { BadRequestException } from "../../common/utils/catchError";
import { signJwtToken } from "../../common/utils/jwt";
import { AuthRepository } from "./auth.repository";
import { RegisterDto } from "./auth.types";
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
  public async login() {}

  // --------------- GET USER ---------------
  public async getUser() {}

  // --------------- LOGOUT ---------------
  public async logout() {}

  // --------------- FORGOT PASSWORD ---------------
  public async forgotPassword() {}

  // --------------- RESET PASSWORD ---------------
  public async resetPassword() {}

  // --------------- UPDATE PASSWORD ---------------
  public async updatePassword() {}

  // --------------- UPDATE PROFILE ---------------
  public async updateProfile() {}
}
