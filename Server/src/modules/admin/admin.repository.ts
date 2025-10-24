import database from "../../database/db";

export class AdminRepository {
  static async countAllUsers() {
    const result = await database.query(
      "SELECT COUNT(*) FROM users WHERE role = $1",
      ["User"]
    );
    return parseInt(result.rows[0].count);
  }

  static async fetchUsers(page: number, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await database.query(
      "SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
      ["User", limit, offset]
    );
    return result.rows;
  }
}
