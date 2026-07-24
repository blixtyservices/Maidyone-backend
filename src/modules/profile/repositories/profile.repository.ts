import prisma from "../../../lib/prisma";

class ProfileRepository {
  /**
   * Find user by ID
   */
  async findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        gender: true,
        dateOfBirth: true,
        profileImage: true,
        language: true,
        notificationEnabled: true,
        status: true,
        loginType: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });
  }

  /**
   * Update profile
   */
  async updateProfile(userId: string, data: any) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        gender: true,
        dateOfBirth: true,
        profileImage: true,
        language: true,
        notificationEnabled: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Get password
   */
  async getPassword(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });
  }

  /**
   * Change password
   */
  async changePassword(userId: string, password: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  /**
   * Update profile image
   */
  async updateProfileImage(
    userId: string,
    profileImage: string
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileImage,
      },
      select: {
        id: true,
        profileImage: true,
      },
    });
  }

  /**
   * Delete account
   */
  async deleteAccount(userId: string) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}

export default new ProfileRepository();