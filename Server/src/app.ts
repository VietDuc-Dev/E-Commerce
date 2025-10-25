import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import fileUpload from "express-fileupload";

import { errorHandler } from "./middleware/errorHandler";
import { BadRequestException } from "./common/utils/catchError";
import { ErrorCode } from "./common/enums/error-code.enum";
import { asyncHandler } from "./middleware/asyncHandler";
import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/product/product.routes";
import adminRoutes from "./modules/admin/admin.routes";
import { paymentWebhookRouter } from "./modules/payment/payment.webhook";
import orderRoutes from "./modules/order/order.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(
  cors({
    origin: [config.FRONTEND_URL, config.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post(`${BASE_PATH}/payment`, paymentWebhookRouter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException(
      "Bad request",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/product`, productRoutes);
app.use(`${BASE_PATH}/admin`, adminRoutes);
app.use(`${BASE_PATH}/order`, orderRoutes);

app.use(errorHandler);

export default app;
