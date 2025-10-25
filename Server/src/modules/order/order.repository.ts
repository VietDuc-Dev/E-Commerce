import database from "../../database/db";
import { PlaceNewOrderDto } from "./order.type";

export class OrderRepository {
  static async findProductsByIds(productIds: string[]) {
    const { rows } = await database.query(
      `SELECT id, price, stock, name FROM products WHERE id = ANY($1::uuid[])`,
      [productIds]
    );
    return rows;
  }

  static async createOrder(
    buyerId: string,
    total: number,
    tax: number,
    shipping: number
  ) {
    const { rows } = await database.query(
      `INSERT INTO orders (buyer_id, total_price, tax_price, shipping_price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [buyerId, total, tax, shipping]
    );
    return rows[0];
  }

  static async createOrderItems(
    orderId: string,
    values: any[],
    placeholders: string[]
  ) {
    await database.query(
      `
      INSERT INTO order_items (order_id, product_id, quantity, price, image, title)
      VALUES ${placeholders.join(", ")}
      `,
      values
    );
  }

  static async createShippingInfo(orderId: string, data: PlaceNewOrderDto) {
    const { full_name, city, district, ward, addressDetail, phone } = data;
    await database.query(
      `
      INSERT INTO shipping_info (order_id, full_name, city, district, ward, addressDetail, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [orderId, full_name, city, district, ward, addressDetail, phone]
    );
  }
}
