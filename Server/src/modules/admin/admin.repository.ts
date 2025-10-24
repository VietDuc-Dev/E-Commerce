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

  static async findUserById(id: string) {
    const result = await database.query(
      "SELECT * FROM users WHERE id = $1 LIMIT 1",
      [id]
    );
    return result.rows[0] || null;
  }

  static async deleteUserById(id: string) {
    const result = await database.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0] || null;
  }
}
