import database from "../../database/db";

export class AuthRepository {
  // --------------- FIND USER BY EMAIL ---------------
  static async findUserByEmail(email: string) {
    const result = await database.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  }

  // --------------- CREATE USER---------------
  static async createUser(name: string, email: string, password: string) {
    const result = await database.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role, avatar, created_at`,
      [name, email, password]
    );
    return result.rows[0];
  }

  // --------------- UPDATE USER RESET PASSWORD TOKEN ---------------
  static async updateUserResetPasswordToken(
    hashedToken: string,
    resetPasswordExpireTime: Date,
    email: string
  ) {
    await database.query(
      `UPDATE users SET reset_password_token = $1, reset_password_expire = to_timestamp($2 / 1000.0) WHERE email = $3`,
      [hashedToken, resetPasswordExpireTime.getTime(), email]
    );
  }

  // --------------- UPDATE USER RESET PASSWORD TOKEN FAILE ---------------
  static async updateUserResetPasswordTokenFaile(email: string) {
    await database.query(
      `UPDATE users SET reset_password_token = NULL, reset_password_expire = NULL WHERE email = $1`,
      [email]
    );
  }
}
