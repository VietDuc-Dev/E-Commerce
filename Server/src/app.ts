import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import fileUpload from "express-fileupload";
import { createTables } from "./common/utils/createTables";
import { connectDatabase } from "./database/db";

import { errorHandler } from "./middleware/errorHandler";
import { BadRequestException } from "./common/utils/catchError";
import { ErrorCode } from "./common/enums/error-code.enum";
import { asyncHandler } from "./middleware/asyncHandler";

const app = express();

app.use(
  cors({
    origin: [config.FRONTEND_URL, config.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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

connectDatabase();
createTables();

app.use(errorHandler);

export default app;
