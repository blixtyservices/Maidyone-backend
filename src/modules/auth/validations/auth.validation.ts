import { z } from "zod";

/**
 * Signup Validation
 */
export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters"),
});

/**
 * Login Validation
 */
export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

/**
 * Refresh Token Validation
 */
export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .trim()
    .min(1, "Refresh token is required"),
});

/**
 * Send OTP
 */
export const sendOtpSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),

  purpose: z.enum([
    "LOGIN",
    "SIGNUP",
    "FORGOT_PASSWORD",
    "VERIFY_PHONE",
  ]),
});

/**
 * Verify OTP
 */
export const verifyOtpSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),

  code: z
    .string()
    .length(6, "OTP must be exactly 6 digits"),

  purpose: z.enum([
    "LOGIN",
    "SIGNUP",
    "FORGOT_PASSWORD",
    "VERIFY_PHONE",
  ]),
});

/**
 * Forgot Password
 */
export const forgotPasswordSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
});

/**
 * Reset Password
 */
export const resetPasswordSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),

  code: z
    .string()
    .length(6, "OTP must be exactly 6 digits"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters"),
});

/**
 * DTO Types
 */
export type SignupDto = z.infer<typeof signupSchema>;

export type LoginDto = z.infer<typeof loginSchema>;

export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;

export type SendOtpDto = z.infer<typeof sendOtpSchema>;

export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;