import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

interface JwtPayload {
  userId: string;
  phone?: string;
}

export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    } as SignOptions
  );
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(
    payload,
    JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRES_IN,
    } as SignOptions
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
};