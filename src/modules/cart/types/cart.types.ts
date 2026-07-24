import { z } from "zod";

export const createCartSchema = z.object({
  body: z.object({
    serviceId: z.string().cuid({
      message: "Invalid Service Id",
    }),

    packageId: z.string().cuid({
      message: "Invalid Package Id",
    }),

    quantity: z
      .number()
      .int()
      .positive()
      .default(1),
  }),
});

export const updateCartSchema = z.object({
  params: z.object({
    itemId: z.string().cuid(),
  }),

  body: z.object({
    quantity: z.number().int().positive(),
  }),
});

export const cartItemSchema = z.object({
  params: z.object({
    itemId: z.string().cuid(),
  }),
});

export const applyCouponSchema = z.object({
  body: z.object({
    code: z.string().min(3),
  }),
});

export type CreateCartBody =
  z.infer<typeof createCartSchema>["body"];

export type UpdateCartBody =
  z.infer<typeof updateCartSchema>["body"];

export type ApplyCouponBody =
  z.infer<typeof applyCouponSchema>["body"];