import { z } from "zod";

export const createOrderSchema = z.object({
  bookingId: z
    .string()
    .min(1, "Booking ID is required"),

  paymentMethod: z.enum([
    "ONLINE",
    "CASH",
    "WALLET",
  ]),
});

export const verifyPaymentSchema = z.object({
  bookingId: z
    .string()
    .min(1, "Booking ID is required"),

  razorpayOrderId: z
    .string()
    .min(1),

  razorpayPaymentId: z
    .string()
    .min(1),

  razorpaySignature: z
    .string()
    .min(1),
});

export const refundPaymentSchema = z.object({
  bookingId: z
    .string()
    .min(1),

  reason: z
    .string()
    .min(3)
    .max(200),
});

export const paymentHistorySchema = z.object({
  page: z.coerce
    .number()
    .default(1),

  limit: z.coerce
    .number()
    .default(10),
});

export type CreateOrderDto = z.infer<
  typeof createOrderSchema
>;

export type VerifyPaymentDto = z.infer<
  typeof verifyPaymentSchema
>;

export type RefundPaymentDto = z.infer<
  typeof refundPaymentSchema
>;

export type PaymentHistoryDto = z.infer<
  typeof paymentHistorySchema
>;