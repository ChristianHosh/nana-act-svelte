import { z } from "zod";

export interface User {
  id: number;
  username: string;
  role: string;
}

export const loginSchema = z.object({
  username: z
      .string({required_error: "username is required"})
      .max(20, "username must be less than 20 characters long"),
  password: z
    .string({required_error: "password is required"})
    .max(20, "password must be between 8 and 20 characters long")
    .min(8, "password must be between 8 and 20 characters long"),
});

export type LoginSchema = typeof loginSchema;
