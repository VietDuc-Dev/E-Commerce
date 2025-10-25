import { BadRequestException } from "../../common/utils/catchError";
import { generatePaymentIntent } from "../../common/utils/generatePaymentIntent";
import { OrderRepository } from "./order.repository";
import { PlaceNewOrderDto } from "./order.type";

export class OrderService {
  // --------------- PLACE NEW ORDER ---------------
  public async placeNewOrder(data: PlaceNewOrderDto, userId: string) {
    const { orderedItems } = data;

    const products = await OrderRepository.findProductsByIds(
      orderedItems.map((i) => i.product.id)
    );
    if (!products) throw new BadRequestException("Không tìm thấy sản phẩm");

    let total_price = 0;
    const items: any[] = [];
    const placeholders: string[] = [];

    orderedItems.forEach((item, index) => {
      const product = products.find((p) => p.id === item.product.id);
      if (!product)
        throw new BadRequestException(
          `Không tìm thấy sản phẩm: ${item.product.id}`
        );
      if (item.quantity > product.stock)
        throw new BadRequestException(
          `${product.name} chỉ còn lại cho ${product.stock} sản phẩm`
        );

      const subtotal = product.price * item.quantity;
      total_price += subtotal;

      const offset = index * 6;
      placeholders.push(
        `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${
          offset + 5
        }, $${offset + 6})`
      );

      items.push(
        null,
        product.id,
        item.quantity,
        product.price,
        item.product.images[0].url || "",
        product.name
      );
    });

    const tax = 0.1;
    // if total > 1tr => free ship
    const shipping = total_price >= 1_000_000 ? 0 : 30_000;
    total_price = Math.round(total_price + total_price * tax + shipping);

    const order = await OrderRepository.createOrder(
      userId,
      total_price,
      tax,
      shipping
    );
    const orderId = order.id;

    for (let i = 0; i < items.length; i += 6) items[i] = orderId;

    await OrderRepository.createOrderItems(orderId, items, placeholders);
    await OrderRepository.createShippingInfo(orderId, data);

    const payment = await generatePaymentIntent(orderId, total_price);

    if (!payment.success)
      throw new BadRequestException("Thanh toán lỗi, vui lòng thử lại");

    return { paymentIntent: payment.clientSecret, total_price };
  }

  // --------------- FETCH SINGLE ORDER ---------------
  public async fetchSingleOrder(orderId: string) {
    const order = await OrderRepository.fetchSingleOrder(orderId);

    return order;
  }

  // --------------- FETCH MY ORDERS ---------------
  public async fetchMyOrders(userId: string) {
    const myOrders = await OrderRepository.fetchMyOrders(userId);

    return myOrders;
  }

  // --------------- FETCH ALL ORDERS ---------------
  public async fetchAllOrders() {
    const orders = await OrderRepository.fetchAllOrders();

    return orders;
  }

  // --------------- UPDATE ORDER STATUS ---------------
  public async updateOrderStatus() {}

  // --------------- DELETE ORDER ---------------
  public async deleteOrder() {}
}
