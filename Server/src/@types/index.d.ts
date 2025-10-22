import { Request } from "express";
import { userType } from "../common/interface/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: userType;
    }
  }
}
