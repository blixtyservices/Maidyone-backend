import { Response } from "express";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PaginationResponse<T> {
  message?: string;
  data: T;
  meta: PaginationMeta;
  statusCode?: number;
}

export function paginationResponse<T>(
  res: Response,
  {
    message = "Success",
    data,
    meta,
    statusCode = 200,
  }: PaginationResponse<T>
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
}