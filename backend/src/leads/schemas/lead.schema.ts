import { z } from "zod";

export const LeadSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  score: z.number().nullable(),
  statusId: z.number(),
  createdBy: z.number(),
  createdAt: z.number(),
  closedAt: z.number().nullable(),
  isDeleted: z.boolean(),
});

export type Lead = z.infer<typeof LeadSchema>;
