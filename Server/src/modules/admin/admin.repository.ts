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

  // --------------- DASHBOARD STATS ---------------
  static async getTotalRevenueAllTime() {
    const result = await database.query(`
      SELECT COALESCE(SUM(total_price), 0) AS total
      FROM orders
      WHERE paid_at IS NOT NULL
    `);
    return parseFloat(result.rows[0].total);
  }

  static async getTotalUsers() {
    const result = await database.query(`
      SELECT COUNT(*) FROM users WHERE role = 'User'
    `);
    return parseInt(result.rows[0].count);
  }

  static async getOrderStatusCounts() {
    const result = await database.query(`
      SELECT order_status, COUNT(*) AS count
      FROM orders
      WHERE paid_at IS NOT NULL
      GROUP BY order_status
    `);
    return result.rows;
  }

  static async getRevenueByDate(date: string) {
    const result = await database.query(
      `
      SELECT COALESCE(SUM(total_price), 0) AS total
      FROM orders
      WHERE paid_at IS NOT NULL
        AND created_at::date = $1
    `,
      [date]
    );
    return parseFloat(result.rows[0].total);
  }

  static async getMonthlySales() {
    const result = await database.query(`
      SELECT
        TO_CHAR(created_at, 'Mon YYYY') AS month,
        DATE_TRUNC('month', created_at) as date,
        SUM(total_price) as total_sales
      FROM orders
      WHERE paid_at IS NOT NULL
      GROUP BY month, date
      ORDER BY date ASC
    `);
    return result.rows;
  }

  static async getTopSellingProducts(limit = 5) {
    const result = await database.query(
      `
      SELECT p.name,
             p.images->0->>'url' AS image,
             p.category,
             p.ratings,
             SUM(oi.quantity) AS total_sold
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.paid_at IS NOT NULL
      GROUP BY p.name, p.images, p.category, p.ratings
      ORDER BY total_sold DESC
      LIMIT $1
    `,
      [limit]
    );
    return result.rows;
  }

  static async getSalesBetween(start: Date, end: Date) {
    const result = await database.query(
      `
      SELECT COALESCE(SUM(total_price), 0) AS total
      FROM orders
      WHERE paid_at IS NOT NULL
        AND created_at BETWEEN $1 AND $2
    `,
      [start, end]
    );
    return parseFloat(result.rows[0].total);
  }

  static async getLowStockProducts(threshold = 5) {
    const result = await database.query(
      `SELECT name, stock FROM products WHERE stock <= $1`,
      [threshold]
    );
    return result.rows;
  }

  static async getNewUsersThisMonth(startDate: Date) {
    const result = await database.query(
      `
      SELECT COUNT(*) FROM users
      WHERE created_at >= $1
        AND role = 'User'
    `,
      [startDate]
    );
    return parseInt(result.rows[0].count);
  }
}
