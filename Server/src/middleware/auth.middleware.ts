import database from "../database/db";
import { asyncHandler } from "./asyncHandler";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../common/utils/catchError";
import { ErrorCode } from "../common/enums/error-code.enum";
import { verifyJwtToken } from "../common/utils/jwt";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new UnauthorizedException(
        "Vui lòng đăng nhập để truy cập",
        ErrorCode.AUTH_TOKEN_NOT_FOUND
      );
    }

    const decoded = verifyJwtToken(accessToken);

    const user = await database.query(
      "SELECT * FROM users WHERE id = $1 LIMIT 1",
      [decoded.payload?.userId]
    );

    if (user.rows.length === 0) {
      throw new UnauthorizedException(
        "Người dùng không tồn tại.",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    req.user = user.rows[0];
    next();
  }
);

export const authorizedRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedException(
        "Chưa xác thực người dùng.",
        ErrorCode.AUTH_INVALID_TOKEN
      );
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedException(
        `Role: ${req.user.role} không có quyền truy cập`,
        ErrorCode.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    next();
  };
};
