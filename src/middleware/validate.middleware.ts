import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

const validate =
  (
    schema: ZodType,
    source: "body" | "query" | "params" = "body"
  ) =>
  (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(error);
      }

      next(error);
    }
  };

export default validate;