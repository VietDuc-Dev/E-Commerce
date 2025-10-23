import database from "../../database/db";
import { CreateProductDto } from "./product.types";

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
        data.price / 283,
        data.price,
        data.category,
        data.stock,
        JSON.stringify(uploadedImages),
        created_by,
      ]
    );
    return result.rows[0];
  }
}
