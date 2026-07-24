import jwt from "jsonwebtoken";

import { env } from "../../../config/env";

export const generateAccessToken = (
  userId: string
) => {

  return jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );

};

export const generateRefreshToken = (
  userId: string
) => {

  return jwt.sign(
    {
      userId,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.REFRESH_EXPIRES_IN,
    }
  );

};