import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate =
  (
    schema: AnyZodObject,
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