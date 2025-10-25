import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { asyncHandler } from "../../middleware/asyncHandler";
import { HTTPSTATUS } from "../../config/http.config";

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  // --------------- PLACE NEW ORDER ---------------
  public placeNewOrder = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- FETCH SINGLE ORDER ---------------
  public fetchSingleOrder = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- FETCH MY ORDERS ---------------
  public fetchMyOrders = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- FETCH ALL ORDERS ---------------
  public fetchAllOrders = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- UPDATE ORDER STATUS ---------------
  public updateOrderStatus = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- DELETE ORDER ---------------
  public deleteOrder = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );
}
