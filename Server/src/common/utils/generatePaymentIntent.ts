import Stripe from "stripe";
import database from "../../database/db";
import { config } from "../../config/app.config";

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string);

export async function generatePaymentIntent(
  orderId: number,
  totalPrice: number
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "VNĐ",
    });

    await database.query(
      "INSERT INTO payments (order_id, payment_type, payment_status, payment_intent_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [orderId, "Online", "Pending", paymentIntent.client_secret]
    );

    return { success: true, clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.error("Payment Error:", error.message || error);
    return { success: false, message: "Thanh toán thất bại." };
  }
}
