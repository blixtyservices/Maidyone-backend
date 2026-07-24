import { Request, Response } from "express";

import ProfileService from "../services/profile.service";

import {
  updateProfileSchema,
  changePasswordSchema,
  updateProfileImageSchema,
} from "../validations/profile.validation";

class ProfileController {
  /**
   * Get Profile
   */
  async getProfile(req: Request, res: Response) {
    const profile = await ProfileService.getProfile(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: profile,
    });
  }

  /**
   * Update Profile
   */
  async updateProfile(req: Request, res: Response) {
    const body = updateProfileSchema.parse(req.body);

    const profile = await ProfileService.updateProfile(
      req.user!.id,
      body
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: profile,
    });
  }

  /**
   * Change Password
   */
  async changePassword(req: Request, res: Response) {
    const body = changePasswordSchema.parse(req.body);

    const result = await ProfileService.changePassword(
      req.user!.id,
      body
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }

  /**
   * Update Profile Image
   */
  async updateProfileImage(req: Request, res: Response) {
    const body = updateProfileImageSchema.parse(req.body);

    const result =
      await ProfileService.updateProfileImage(
        req.user!.id,
        body
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  }

  /**
   * Delete Account
   */
  async deleteAccount(req: Request, res: Response) {
    const result = await ProfileService.deleteAccount(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }
}

export default new ProfileController();