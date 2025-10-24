import database from "../../database/db";
import { CreateProductDto, UpdateProductDto } from "./product.types";

export class ProductRepository {
  // --------------- CREATE PRODUCT ---------------
  static async createProduct(
    data: CreateProductDto,
    uploadedImages: any,
    created_by: string
  ) {
    const result = await database.query(
      `INSERT INTO products (name, description, price, category, stock, images, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        data.name,
        data.description,
        data.price,
        data.price,
        data.category,
        data.stock,
        JSON.stringify(uploadedImages),
        created_by,
      ]
    );
    return result.rows[0];
  }

  // ---------------- FETCH FILTERED PRODUCTS ----------------
  static async fetchFilteredProducts(
    conditions: string[],
    values: any[],
    limit: number,
    offset: number
  ) {
    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const countQuery = `SELECT COUNT(*) FROM products p ${whereClause}`;
    const totalResult = await database.query(countQuery, values);
    const totalProducts = parseInt(totalResult.rows[0].count);

    // Thêm limit & offset vào values
    const queryValues = [...values, limit, offset];
    const query = `
      SELECT p.*, COUNT(r.id) AS review_count
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      ${whereClause}
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2};
    `;

    const result = await database.query(query, queryValues);

    return { totalProducts, products: result.rows };
  }

  // ---------------- FETCH NEW PRODUCTS ----------------
  static async fetchNewProducts() {
    const query = `
      SELECT p.*, COUNT(r.id) AS review_count
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE p.created_at >= NOW() - INTERVAL '30 days'
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 8;
    `;
    const result = await database.query(query);
    return result.rows;
  }

  // ---------------- FETCH TOP-RATED PRODUCTS ----------------
  static async fetchTopRatedProducts() {
    const query = `
      SELECT p.*, COUNT(r.id) AS review_count
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE p.ratings >= 4.5
      GROUP BY p.id
      ORDER BY p.ratings DESC, p.created_at DESC
      LIMIT 8;
    `;
    const result = await database.query(query);
    return result.rows;
  }

  // --------------- FIND PRODUCT BY ID ---------------
  static async findProductById(productId: string) {
    const result = await database.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );
    return result.rows[0];
  }

  // --------------- UPDATE PRODUCT BY ID ---------------
  static async updateProductById(data: UpdateProductDto, productId: string) {
    const result = await database.query(
      `UPDATE products SET name = $1, description = $2, price = $3, category = $4, stock = $5 WHERE id = $6 RETURNING *`,
      [
        data.name,
        data.description,
        data.price,
        data.category,
        data.stock,
        productId,
      ]
    );
    return result.rows[0];
  }

  // --------------- UPDATE PRODUCT BY ID ---------------
  static async deleteProductById(productId: string) {
    const result = await database.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    );
    return result.rows[0];
  }

  // --------------- UPDATE PRODUCT BY ID ---------------
  static async fetchSingleProduct(productId: string) {
    const result = await database.query(
      `
        SELECT p.*,
        COALESCE(
        json_agg(
        json_build_object(
            'review_id', r.id,
            'rating', r.rating,
            'comment', r.comment,
            'reviewer', json_build_object(
            'id', u.id,
            'name', u.name,
            'avatar', u.avatar
            )) 
        ) FILTER (WHERE r.id IS NOT NULL), '[]') AS reviews
         FROM products p
         LEFT JOIN reviews r ON p.id = r.product_id
         LEFT JOIN users u ON r.user_id = u.id
         WHERE p.id  = $1
         GROUP BY p.id`,
      [productId]
    );
    return result.rows[0];
  }
}
