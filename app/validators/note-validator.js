import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title is required").max(50, "Title is to long"),
    content: z
      .string()
      .min(3, "Content is required")
      .max(200, "Content is to long"),
    id: z.number().optional(),
    tag: z.string().optional(),
    status: z.boolean("Status is required"),
    date: z.string("Date is required"),
    user: z.string().optional(),
  }),
});

export const noteIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid note id"),
  }),
});

export const updateNoteSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid note id"),
  }),
  body: z.object({
    title: z.string().min(3, "Title is required").max(50, "Title is to long"),
    content: z
      .string()
      .min(3, "Content is required")
      .max(200, "Content is to long"),
    id: z.number().optional(),
    tag: z.string().optional(),
    status: z.boolean("Status is required"),
    date: z.string("Date is required"),
    user: z.string().optional(),
  }),
});

export const getNotesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(1),
  }),
});
