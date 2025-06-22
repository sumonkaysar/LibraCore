import { z } from "zod";

export const borrowZodSchema = z.object({
  book: z
    .string({
      required_error: "Book ID is required",
    })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  quantity: z
    .number({
      required_error: "Quantity is required",
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  dueDate: z
    .string({
      required_error: "Due date is required",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
});
