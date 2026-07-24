import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(3).max(100).optional(),

  email: z.string().email().optional(),

  gender: z
    .enum(["MALE", "FEMALE", "OTHER"])
    .optional(),

  dateOfBirth: z.string().optional(),

  language: z.string().optional(),

  notificationEnabled: z.boolean().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8),

  newPassword: z
    .string()
    .min(8),
});

export const updateProfileImageSchema = z.object({
  profileImage: z.string().url(),
});

export type UpdateProfileDto = z.infer<
  typeof updateProfileSchema
>;

export type ChangePasswordDto = z.infer<
  typeof changePasswordSchema
>;

export type UpdateProfileImageDto = z.infer<
  typeof updateProfileImageSchema
>;