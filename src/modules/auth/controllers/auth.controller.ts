import { Request, Response } from "express";

import AuthService from "../services/auth.service";

import {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
  sendOtpSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/auth.validation";

class AuthController {
  /**
   * Register User
   */
  async signup(req: Request, res: Response) {
  console.log("SIGNUP STEP 1");

  const body = signupSchema.parse(req.body);

  console.log("SIGNUP STEP 2");

  const user = await AuthService.signup(body);

  console.log("SIGNUP STEP 3");

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: user,
  });
}

  /**
   * Login User
   */
async login(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);

  const result = await AuthService.login(body);

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    data: result,
  });
}

  /**
   * Logged-in User
   */
  async me(req: Request, res: Response) {
    const user = await AuthService.me(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: user,
    });
  }

  /**
   * Refresh Token
   */
  async refreshToken(req: Request, res: Response) {
    const body = refreshTokenSchema.parse(req.body);

    const token = await AuthService.refreshToken(body);

    return res.status(200).json({
      success: true,
      message: "Access token generated successfully.",
      data: token,
    });
  }

  /**
   * Logout
   */
  async logout(req: Request, res: Response) {
    await AuthService.logout(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  }

  /**
   * Send OTP
   */
 async sendOtp(req: Request, res: Response) {
  const body = sendOtpSchema.parse(req.body);

  const result = await AuthService.sendOtp(body);

  return res.status(200).json({
    success: true,
    message: result.message,
    data: {
      otp: result.otp,
    },
  });
}

  /**
   * Verify OTP
   */
  async verifyOtp(req: Request, res: Response) {
  const body = verifyOtpSchema.parse(req.body);

  const result = await AuthService.verifyOtp(body);

  return res.status(200).json({
    success: true,
    message: "OTP verified successfully.",
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    },
  });
}

  /**
   * Forgot Password
   */
  async forgotPassword(req: Request, res: Response) {
    const body = forgotPasswordSchema.parse(req.body);

    const result = await AuthService.forgotPassword(body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  }

  /**
   * Reset Password
   */
  async resetPassword(req: Request, res: Response) {
    const body = resetPasswordSchema.parse(req.body);

    const result = await AuthService.resetPassword(body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  }

  /**
   * Health Check
   */
  async health(_: Request, res: Response) {
    return res.status(200).json({
      success: true,
      module: "Authentication",
      status: "Working",
    });
  }
}

export default new AuthController();