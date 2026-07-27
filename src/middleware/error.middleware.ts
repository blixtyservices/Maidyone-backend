import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

import { ApiError } from "../common/errors";

export default function errorMiddleware(
  error: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten(),
    });
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  console.error("========== ERROR ==========");
console.error(error);
console.error("===========================");

return res.status(500).json({
  success: false,
  message: "Internal Server Error",
  error:
    error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : error,
});
}