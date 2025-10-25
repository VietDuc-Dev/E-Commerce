import { OrderStatusEnumType } from "../../common/enums/admin.enum";
import { BadRequestException } from "../../common/utils/catchError";
import { AdminRepository } from "./admin.repository";
import { v2 as cloudinary } from "cloudinary";

export class AdminService {
  // --------------- GET ALL USERS ---------------
  public async getAllUsers(page: number) {
    const totalUsers = await AdminRepository.countAllUsers();

    const users = await AdminRepository.fetchUsers(page);

    return {
      totalUsers,
      currentPage: page,
      users,
    };
  }

  // --------------- DELETE USER ---------------
  public async deleteUser(userId: string) {
    const user = await AdminRepository.findUserById(userId);
    if (!user) throw new BadRequestException("Không tìm thấy người dùng này");

    try {
      if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      await AdminRepository.deleteUserById(userId);
    } catch (error) {
      throw new Error("Xóa người dùng không thành công");
    }

    return;
  }

  // --------------- DASHBOARD STATS ---------------
  public async dashboardStats() {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const currentMonthEnd = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    const previousMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const previousMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    // --- Data Fetch ---
    const [
      totalRevenueAllTime,
      totalUsersCount,
      orderStatusCountsRaw,
      todayRevenue,
      yesterdayRevenue,
      monthlySalesRaw,
      topSellingProducts,
      currentMonthSales,
      lastMonthRevenue,
      lowStockProducts,
      newUsersThisMonth,
    ] = await Promise.all([
      AdminRepository.getTotalRevenueAllTime(),
      AdminRepository.getTotalUsers(),
      AdminRepository.getOrderStatusCounts(),
      AdminRepository.getRevenueByDate(todayDate),
      AdminRepository.getRevenueByDate(yesterdayDate),
      AdminRepository.getMonthlySales(),
      AdminRepository.getTopSellingProducts(5),
      AdminRepository.getSalesBetween(currentMonthStart, currentMonthEnd),
      AdminRepository.getSalesBetween(previousMonthStart, previousMonthEnd),
      AdminRepository.getLowStockProducts(5),
      AdminRepository.getNewUsersThisMonth(currentMonthStart),
    ]);

    // --- Transform ---
    type OrderStatusCounts = Record<OrderStatusEnumType, number>;
    const orderStatusCounts: OrderStatusCounts = {
      PROCESSING: 0,
      SHIPPED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };

    orderStatusCountsRaw.forEach((row) => {
      const status = row.order_status as OrderStatusEnumType;
      if (status in orderStatusCounts) {
        orderStatusCounts[status] = parseInt(row.count);
      }
    });

    const monthlySales = monthlySalesRaw.map((row) => ({
      month: row.month,
      totalSales: parseFloat(row.total_sales),
    }));

    let revenueGrowth = "0%";
    if (lastMonthRevenue > 0) {
      const growthRate =
        ((currentMonthSales - lastMonthRevenue) / lastMonthRevenue) * 100;
      revenueGrowth = `${growthRate >= 0 ? "+" : ""}${growthRate.toFixed(2)}%`;
    }

    // --- Response ---
    return {
      totalRevenueAllTime,
      todayRevenue,
      yesterdayRevenue,
      totalUsersCount,
      orderStatusCounts,
      monthlySales,
      currentMonthSales,
      topSellingProducts,
      lowStockProducts,
      revenueGrowth,
      newUsersThisMonth,
    };
  }
}
