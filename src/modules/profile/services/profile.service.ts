import bcrypt from "bcrypt";

import ProfileRepository from "../repositories/profile.repository";

import {
  UpdateProfileDto,
  ChangePasswordDto,
  UpdateProfileImageDto,
} from "../validations/profile.validation";

class ProfileService {
  /**
   * Get Profile
   */
  async getProfile(userId: string) {
    const user = await ProfileRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  /**
   * Update Profile
   */
  async updateProfile(
    userId: string,
    data: UpdateProfileDto
  ) {
    const user = await ProfileRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const updatedUser =
      await ProfileRepository.updateProfile(userId, {
        fullName: data.fullName,
        email: data.email,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth)
          : undefined,
        language: data.language,
        notificationEnabled:
          data.notificationEnabled,
      });

    return updatedUser;
  }

  /**
   * Change Password
   */
  async changePassword(
    userId: string,
    data: ChangePasswordDto
  ) {
    const user =
      await ProfileRepository.getPassword(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const passwordMatched = await bcrypt.compare(
      data.currentPassword,
      user.password ?? ""
    );

    if (!passwordMatched) {
      throw new Error("Current password is incorrect.");
    }

    const hashedPassword = await bcrypt.hash(
      data.newPassword,
      10
    );

    await ProfileRepository.changePassword(
      userId,
      hashedPassword
    );

    return {
      success: true,
      message: "Password changed successfully.",
    };
  }

  /**
   * Update Profile Image
   */
  async updateProfileImage(
    userId: string,
    data: UpdateProfileImageDto
  ) {
    const user = await ProfileRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const result =
      await ProfileRepository.updateProfileImage(
        userId,
        data.profileImage
      );

    return {
      success: true,
      message: "Profile image updated successfully.",
      data: result,
    };
  }

  /**
   * Delete Account
   */
  async deleteAccount(userId: string) {
    const user = await ProfileRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    await ProfileRepository.deleteAccount(userId);

    return {
      success: true,
      message: "Account deleted successfully.",
    };
  }
}

export default new ProfileService();