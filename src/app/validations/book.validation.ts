import { z } from "zod";

export const bookZodSchema = z.object({
  title: z.string({
    required_error: "Book title is required",
  }),
  author: z.string({
    required_error: "Author name is required",
  }),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Genre is required and must be valid",
    }
  ),
  isbn: z.string({
    required_error: "ISBN is required",
  }),
  description: z.string().optional(),
  copies: z
    .number({
      required_error: "Copies are required",
    })
    .min(0, "Copies must be a non-negative number"),
  available: z.boolean().optional(),
});

export const updateBookZodSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z
    .enum([
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ])
    .optional(),
  isbn: z.string().optional(),
  description: z.string().optional(),
  copies: z
    .number({
      invalid_type_error: "Copies must be a number",
    })
    .min(0, { message: "Copies must be a non-negative number" })
    .optional(),
  available: z.boolean().optional(),
});

export const BookValidation = {
  bookZodSchema,
  updateBookZodSchema,
};
