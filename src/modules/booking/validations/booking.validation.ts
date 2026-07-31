import { z } from "zod";
import { BookingStatus } from "@prisma/client";

export const createBookingSchema = z.object({
  body: z
    .object({
      serviceId: z.string().cuid("Invalid service ID"),
      addressId: z.string().cuid("Invalid address ID"),
      packageId: z.string().cuid("Invalid package ID").optional(),
      couponId: z.string().cuid("Invalid coupon ID").optional(),

      bookingType: z.enum(["INSTANT", "SCHEDULED"]),

      bookingDate: z.string().optional(),
      bookingTime: z.string().optional(),
      notes: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.bookingType === "SCHEDULED") {
        if (!data.bookingDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["bookingDate"],
            message: "Booking date is required for scheduled booking.",
          });
        }

        if (!data.bookingTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["bookingTime"],
            message: "Booking time is required for scheduled booking.",
          });
        }
      }
    }),
});

export const createBookingFromCartSchema = z.object({
  body: z
    .object({
      addressId: z.string().cuid("Invalid address ID"),

      bookingType: z.enum(["INSTANT", "SCHEDULED"]),

      bookingDate: z.string().optional(),

      bookingTime: z.string().optional(),

      notes: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.bookingType === "SCHEDULED") {
        if (!data.bookingDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["bookingDate"],
            message:
              "Booking date is required for scheduled booking.",
          });
        }

        if (!data.bookingTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["bookingTime"],
            message:
              "Booking time is required for scheduled booking.",
          });
        }
      }
    }),
});

export const bookingIdSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid booking ID"),
  }),
});

export const updateBookingStatusSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid booking ID"),
  }),

  body: z.object({
    bookingStatus: z.nativeEnum(BookingStatus),
  }),
});