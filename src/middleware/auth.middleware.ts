import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { verifyAccessToken } from "../common/jwt/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        phone: string;
      };
    }
  }
}

class AuthMiddleware {
  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Authorization token is required.",
        });
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Invalid authorization header.",
        });
      }

      const payload = verifyAccessToken(token);

      const user = await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found.",
        });
      }

      req.user = {
        id: user.id,
        phone: user.phone,
      };

      next();
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
  }
}

export default new AuthMiddleware();