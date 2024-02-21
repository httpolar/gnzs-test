import { z } from "zod";

export const CompanySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdBy: z.number(),
  updatedBy: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
  isDeleted: z.boolean(),
});

export type Company = z.infer<typeof CompanySchema>;
