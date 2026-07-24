import { Response } from "express";

interface SuccessResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
}

export function successResponse<T>(
  res: Response,
  {
    success = true,
    message = "Success",
    data,
    statusCode = 200,
  }: SuccessResponse<T>
) {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
}