import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, "username must be at least 3 characters"),
  password: z.string().min(6, "password must be at least 6 characters"),
  age: z.number().int().min(1, "age must be at least 1"),
  city: z.string().min(2, "city must be at least 2 characters"),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  done: z.boolean(),
  userId: z.number().int().min(1, "Invalid userId"),
});
