import { z } from "zod";

export const createMemberSchema = z.object({
  userId: z.number({ message: "User ID is required" }),
  role: z.enum(["member", "admin"]).default("member"),
});

export const updateMemberSchema = createMemberSchema.partial();
