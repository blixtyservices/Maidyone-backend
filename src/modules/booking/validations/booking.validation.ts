import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    serviceId: z.string().cuid(),

    addressId: z.string().cuid(),

    bookingDate: z.string(),

    notes: z.string().optional(),
  }),
});

export const bookingIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const updateBookingStatusSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),

  body: z.object({
    bookingStatus: z.enum([
      "PENDING",
      "ACCEPTED",
      "ARRIVING",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED",
    ]),
  }),
});