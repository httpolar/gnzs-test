import { z } from "zod";

export const ContactSchema = z.object({
  id: z.number(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  groupId: z.number(),
  createdBy: z.number(),
  createdAt: z.number(),
  isDeleted: z.boolean(),
});

export type Contact = z.infer<typeof ContactSchema>;
