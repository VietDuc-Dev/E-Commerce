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
}
