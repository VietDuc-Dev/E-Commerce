import { asyncHandler } from "../../middleware/asyncHandler";
import express, { Request, Response } from "express";
import { config } from "../../config/app.config";
import Stripe from "stripe";
import database from "../../database/db";
import { BadRequestException } from "../../common/utils/catchError";
import { HTTPSTATUS } from "../../config/http.config";

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const paymentWebhookRouter = express.Router();

paymentWebhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),

  asyncHandler(async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig!,
        config.STRIPE_WEBHOOK_SECRET
      );
    } catch (error: any) {
      throw new Error(`Webhook Error: ${error.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const clientSecret = paymentIntent.client_secret;

      try {
        // Update payment status
        const result = await database.query(
          `UPDATE payments SET payment_status = 'Paid' WHERE payment_intent_id = $1 RETURNING order_id`,
          [clientSecret]
        );

        const orderId = result.rows[0]?.order_id;
        if (!orderId) throw new BadRequestException("Không tìm thấy đơn hàng");

        await database.query(
          `UPDATE orders SET paid_at = NOW() WHERE id = $1`,
          [orderId]
        );

        // Reduce stock for each item
        const { rows: items } = await database.query(
          `SELECT product_id, quantity FROM order_items WHERE order_id = $1`,
          [orderId]
        );

        for (const item of items) {
          await database.query(
            `UPDATE products SET stock = stock - $1 WHERE id = $2`,
            [item.quantity, item.product_id]
          );
        }
      } catch (error) {
        console.error(error);
        throw new BadRequestException("Lỗi quá trình cập nhật thanh toán");
      }
    }

    return res.status(HTTPSTATUS.OK).send({ received: true });
  })
);
