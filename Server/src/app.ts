import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import fileUpload from "express-fileupload";

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

export default app;
