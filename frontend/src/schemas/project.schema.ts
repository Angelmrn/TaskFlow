import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  description: z.string().optional(),
  color: z.string().min(7).max(7).optional(),
});

export type CreateProjectData = z.infer<typeof createProjectSchema>;
