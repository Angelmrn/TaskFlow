import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 30 characters long"),
  description: z.string().optional(),
  color: z.string().min(7).max(7).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
