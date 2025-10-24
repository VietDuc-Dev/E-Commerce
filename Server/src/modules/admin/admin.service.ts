import { AdminRepository } from "./admin.repository";

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
  public async deleteUser() {}

  // --------------- DASHBOARD STATS ---------------
  public async dashboardStats() {}
}
