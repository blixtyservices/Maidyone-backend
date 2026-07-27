import { z } from "zod";

export const categoryIdSchema = z.object({
  id: z.string().uuid("Invalid category ID."),
});