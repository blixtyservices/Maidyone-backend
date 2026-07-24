import { Router } from "express";

import ProfileController from "../controllers/profile.controller";
import AuthMiddleware from "../../../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get User Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */
router.get(
  "/",
  AuthMiddleware.authenticate,
  ProfileController.getProfile
);

/**
 * @openapi
 * /profile:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Update User Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum:
 *                   - MALE
 *                   - FEMALE
 *                   - OTHER
 *               dateOfBirth:
 *                 type: string
 *                 example: "2002-05-10"
 *               language:
 *                 type: string
 *               notificationEnabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put(
  "/",
  AuthMiddleware.authenticate,
  ProfileController.updateProfile
);

/**
 * @openapi
 * /profile/change-password:
 *   patch:
 *     tags:
 *       - Profile
 *     summary: Change Password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.patch(
  "/change-password",
  AuthMiddleware.authenticate,
  ProfileController.changePassword
);

/**
 * @openapi
 * /profile/profile-image:
 *   patch:
 *     tags:
 *       - Profile
 *     summary: Update Profile Image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profileImage
 *             properties:
 *               profileImage:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 */
router.patch(
  "/profile-image",
  AuthMiddleware.authenticate,
  ProfileController.updateProfileImage
);

/**
 * @openapi
 * /profile:
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete User Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 */
router.delete(
  "/",
  AuthMiddleware.authenticate,
  ProfileController.deleteAccount
);

export default router;