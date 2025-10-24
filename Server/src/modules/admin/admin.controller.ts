import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { asyncHandler } from "../../middleware/asyncHandler";
import { HTTPSTATUS } from "../../config/http.config";

export class AdminController {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  // --------------- GET ALL USER ---------------
  public getAllUsers = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- DELETE USER ---------------
  public deleteUser = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );

  // --------------- DASHBOARD STATS ---------------
  public dashboardStats = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "",
      });
    }
  );
}
