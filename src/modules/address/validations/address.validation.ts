import { z } from "zod";

export const createAddressSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .trim()
      .min(3, "Full name must be at least 3 characters"),

    phone: z
      .string()
      .trim()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits"),

    houseNo: z
      .string()
      .trim()
      .min(1, "House/Flat number is required"),

    area: z
      .string()
      .trim()
      .min(2, "Area is required"),

    landmark: z
      .string()
      .trim()
      .optional(),

    city: z
      .string()
      .trim()
      .min(2, "City is required"),

    state: z
      .string()
      .trim()
      .min(2, "State is required"),

    pincode: z
      .string()
      .trim()
      .regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),

    latitude: z
      .number()
      .optional(),

    longitude: z
      .number()
      .optional(),

    addressType: z.enum([
      "HOME",
      "WORK",
      "OTHER",
    ]),

    isDefault: z
      .boolean()
      .optional()
      .default(false),
  }),
});

export const updateAddressSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid Address ID"),
  }),

  body: z.object({
    fullName: z.string().trim().min(3).optional(),

    phone: z
      .string()
      .trim()
      .min(10)
      .max(15)
      .optional(),

    houseNo: z.string().trim().optional(),

    area: z.string().trim().optional(),

    landmark: z.string().trim().optional(),

    city: z.string().trim().optional(),

    state: z.string().trim().optional(),

    pincode: z
      .string()
      .trim()
      .regex(/^[0-9]{6}$/)
      .optional(),

    latitude: z.number().optional(),

    longitude: z.number().optional(),

    addressType: z
      .enum([
        "HOME",
        "WORK",
        "OTHER",
      ])
      .optional(),

    isDefault: z.boolean().optional(),
  }),
});

export const getAddressSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid Address ID"),
  }),
});

export const deleteAddressSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid Address ID"),
  }),
});

export const setDefaultAddressSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid Address ID"),
  }),
});