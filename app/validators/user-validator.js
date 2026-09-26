import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email",
      ),
    password: z.string(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email",
      ),
    password: z.string(),
  }),
});
