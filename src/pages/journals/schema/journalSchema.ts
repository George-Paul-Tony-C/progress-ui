import { z } from "zod";

export const journalSchema = z.object({
  entryDate: z.string().min(1, "Date is required"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  summary: z
    .string()
    .min(3, "Summary is required"),

  notes: z
    .string()
    .min(3, "Notes are required"),

  mood: z.enum([
    "HAPPY",
    "SAD",
    "EXCITED",
    "MOTIVATED",
    "TIRED",
    "NEUTRAL",
  ]),

  hoursSpent: z
    .number()
    .min(0, "Hours must be greater than or equal to 0"),
});

// Values BEFORE parsing (used by React Hook Form)
export type JournalFormInput = z.input<typeof journalSchema>;

// Values AFTER parsing (used after validation)
export type JournalFormData = z.output<typeof journalSchema>;