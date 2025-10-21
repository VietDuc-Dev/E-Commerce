import { createUserTable } from "../../database/models/userTable";
import { createOrderItemTable } from "../../database/models/orderItemsTable";
import { createOrdersTable } from "../../database/models/ordersTable";
import { createPaymentsTable } from "../../database/models/paymentsTable";
import { createProductReviewsTable } from "../../database/models/productReviewsTable";
import { createProductsTable } from "../../database/models/productTable";
import { createShippingInfoTable } from "../../database/models/shippinginfoTable";

export const createTables = async (): Promise<void> => {
  try {
    await createUserTable();
    await createProductsTable();
    await createProductReviewsTable();
    await createOrdersTable();
    await createOrderItemTable();
    await createShippingInfoTable();
    await createPaymentsTable();
    console.log("All Tables Created Successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
