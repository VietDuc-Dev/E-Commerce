import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { asyncHandler } from "../../middleware/asyncHandler";
import { HTTPSTATUS } from "../../config/http.config";
import { pageSchema, userIdSchema } from "./admin.validation";

export class AdminController {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  // --------------- GET ALL USER ---------------
  public getAllUsers = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const page = pageSchema.parse(req.query.page);

      const result = await this.adminService.getAllUsers(page);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Tất cả người dùng",
        ...result,
      });
    }
  );

  // --------------- DELETE USER ---------------
  public deleteUser = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userId = userIdSchema.parse(req.params.id);

      await this.adminService.deleteUser(userId);

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Xóa người dùng thành công",
      });
    }
  );

  // --------------- DASHBOARD STATS ---------------
  public dashboardStats = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const result = await this.adminService.dashboardStats();

      return res.status(HTTPSTATUS.OK).json({
        success: true,
        message: "Dữ liệu dashboard stats",
        ...result
      });
    }
  );
}
