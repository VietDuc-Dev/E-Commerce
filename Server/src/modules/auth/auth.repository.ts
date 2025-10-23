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

  // --------------- CHECK USER WITH RESET PASSWORD TOKEN ---------------
  static async checkUserWithResetPasswordToken(resetPasswordToken: string) {
    const result = await database.query(
      "SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expire > NOW()",
      [resetPasswordToken]
    );
    return result.rows[0];
  }

  // --------------- UPDATE USER RESET PASSWORD ---------------
  static async updateUserResetPassword(hashedPassword: string, user: any) {
    const result = await database.query(
      `UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expire = NULL WHERE id = $2 RETURNING *`,
      [hashedPassword, user.id]
    );
    return result.rows[0];
  }

  // --------------- UPDATE USER RESET PASSWORD ---------------
  static async updateProfile(
    name: string,
    email: string,
    avatarData: {
      public_id: string;
      url: string;
    } | null,
    userId: string
  ) {
    const query = avatarData
      ? `UPDATE users 
           SET name = $1, email = $2, avatar = $3 
           WHERE id = $4 
           RETURNING id, name, email, role, avatar, created_at`
      : `UPDATE users 
           SET name = $1, email = $2 
           WHERE id = $3 
           RETURNING id, name, email, role, avatar, created_at`;

    const values = avatarData
      ? [name, email, avatarData, userId]
      : [name, email, userId];

    const result = await database.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Cập nhật thất bại");
    }

    return result.rows[0];
  }
}
