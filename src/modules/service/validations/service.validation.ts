import { z } from "zod";

export const getServiceByIdSchema = z.object({
  id: z.string().cuid("Invalid Service ID"),
});

export const getServicesByCategorySchema = z.object({
  categoryId: z.string().cuid("Invalid Category ID"),
});

export const searchServiceSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Search keyword is required")
    .max(100, "Search keyword is too long"),
});