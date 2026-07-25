import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../../config/env";

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId },
    env.JWT_SECRET as Secret,
    {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    }
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    env.JWT_REFRESH_SECRET as Secret,
    {
      expiresIn: env.REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
    }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET as Secret) as {
    userId: string;
  };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret) as {
    userId: string;
  };
};