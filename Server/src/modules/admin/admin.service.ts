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
  public async dashboardStats() {}
}
