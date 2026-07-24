import bcrypt from "bcrypt";

import prisma from "../../../lib/prisma";

import {
  SignupDto,
  LoginDto,
  RefreshTokenDto,
  SendOtpDto,
  VerifyOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../validations/auth.validation";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../common/jwt/jwt";

class AuthService {
  /**
   * Register User
   */
  async signup(data: SignupDto) {
    const existingPhone = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (existingPhone) {
      throw new Error("Phone number is already registered.");
    }

    if (data.email) {
      const existingEmail = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingEmail) {
        throw new Error("Email is already registered.");
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  /**
   * Login User
   */
  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone.trim(),
      },
    });

    if (!user) {
      throw new Error("Invalid phone number or password.");
    }

    const passwordMatched = await bcrypt.compare(
      data.password,
      user.password ?? ""
    );

    if (!passwordMatched) {
      throw new Error("Invalid phone number or password.");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      phone: user.phone,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      phone: user.phone,
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
        lastLoginAt: new Date(),
      },
    });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Get Logged-in User
   */
  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        status: true,
        loginType: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  /**
   * Refresh Access Token
   */
  async refreshToken(data: RefreshTokenDto) {
    const payload = verifyRefreshToken(data.refreshToken);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    if (user.refreshToken !== data.refreshToken) {
      throw new Error("Invalid refresh token.");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      phone: user.phone,
    });

    return {
      accessToken,
    };
  }

  /**
   * Logout User
   */
  async logout(userId: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });

    return {
      success: true,
      message: "Logout successful.",
    };
  }

  /**
   * Send OTP
   */
  async sendOtp(data: SendOtpDto) {
    // Remove previous OTP for same phone & purpose
    await prisma.otp.deleteMany({
      where: {
        phone: data.phone,
        purpose: data.purpose,
      },
    });

    // Generate 6-digit OTP
    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // OTP expires in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otp.create({
      data: {
        phone: data.phone,
        code,
        purpose: data.purpose,
        expiresAt,
      },
    });

    // TODO:
    // Integrate SMS Provider
    // Twilio / MSG91 / Fast2SMS

    return {
      success: true,
      message: "OTP sent successfully.",
      otp: code, // Remove this in production
    };
  }

  /**
   * Verify OTP
   */
  async verifyOtp(data: VerifyOtpDto) {
    const otp = await prisma.otp.findFirst({
      where: {
        phone: data.phone,
        code: data.code,
        purpose: data.purpose,
        verified: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otp) {
      throw new Error("Invalid OTP.");
    }

    if (otp.expiresAt < new Date()) {
      throw new Error("OTP has expired.");
    }

    await prisma.otp.update({
      where: {
        id: otp.id,
      },
      data: {
        verified: true,
      },
    });

    return {
      success: true,
      message: "OTP verified successfully.",
    };
  }

  /**
   * Forgot Password
   */
  async forgotPassword(data: ForgotPasswordDto) {
    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return this.sendOtp({
      phone: data.phone,
      purpose: "FORGOT_PASSWORD",
    });
  }

  /**
   * Reset Password
   */
  async resetPassword(data: ResetPasswordDto) {
    const otp = await prisma.otp.findFirst({
      where: {
        phone: data.phone,
        code: data.code,
        purpose: "FORGOT_PASSWORD",
        verified: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otp) {
      throw new Error("OTP verification required.");
    }

    if (otp.expiresAt < new Date()) {
      throw new Error("OTP has expired.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.update({
      where: {
        phone: data.phone,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.otp.deleteMany({
      where: {
        phone: data.phone,
      },
    });

    return {
      success: true,
      message: "Password reset successfully.",
    };
  }
}

export default new AuthService();