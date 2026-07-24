import { z } from "zod";

export const applyCouponSchema = z.object({
  bookingId: z
    .string()
    .min(1, "Booking ID is required"),

  code: z
    .string()
    .trim()
    .min(3, "Coupon code is required")
    .max(50),
});

export const removeCouponSchema = z.object({
  bookingId: z
    .string()
    .min(1, "Booking ID is required"),
});

export const validateCouponSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, "Coupon code is required"),
});

export type ApplyCouponDto = z.infer<
  typeof applyCouponSchema
>;

export type RemoveCouponDto = z.infer<
  typeof removeCouponSchema
>;

export type ValidateCouponDto = z.infer<
  typeof validateCouponSchema
>;