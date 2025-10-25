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

  // --------------- FETCH SINGLE ORDER ---------------
  static async fetchSingleOrder(orderId: string) {
    const result = await database.query(
      `
      SELECT 
        o.*, 

        COALESCE(
          json_agg(
            json_build_object(
              'order_item_id', oi.id,
              'order_id', oi.order_id,
              'product_id', oi.product_id,
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'
        ) AS order_items,

        json_build_object(
          'full_name', s.full_name,
          'city', s.city,
          'district', s.district,
          'ward', s.ward,
          'addressDetail', s.addressDetail,
          'phone', s.phone
        ) AS shipping_info

      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN shipping_info s ON o.id = s.order_id
      WHERE o.id = $1
      GROUP BY o.id, s.id;
      `,
      [orderId]
    );

    return result.rows[0];
  }

  // --------------- FETCH MY ORDERS ---------------
  static async fetchMyOrders(userId: string) {
    const result = await database.query(
      `
        SELECT 
          o.*, 

          COALESCE(
            json_agg(
              json_build_object(
                'order_item_id', oi.id,
                'order_id', oi.order_id,
                'product_id', oi.product_id,
                'quantity', oi.quantity,
                'price', oi.price,
                'image', oi.image,
                'title', oi.title
              )
            ) FILTER (WHERE oi.id IS NOT NULL),
            '[]'
          ) AS order_items,

          json_build_object(
            'full_name', s.full_name,
            'city', s.city,
            'district', s.district,
            'ward', s.ward,
            'addressDetail', s.addressDetail,
            'phone', s.phone
          ) AS shipping_info

        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN shipping_info s ON o.id = s.order_id
        WHERE o.buyer_id = $1
          AND o.paid_at IS NOT NULL
        GROUP BY o.id, s.id;
        `,
      [userId]
    );

    return result.rows;
  }
}
