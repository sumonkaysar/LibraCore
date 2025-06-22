import { Request, Response } from "express";
import { Schema, model } from "mongoose";
import { AnyZodObject } from "zod";
import { IBookModel } from "../interfaces/book.interface";
import { IBorrow } from "../interfaces/borrow.interface";
import validateRequestWithZod from "../utils/validateWithZod";

const borrowSchema = new Schema<IBorrow, IBookModel>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.statics.validateInputs = (
  req: Request,
  res: Response,
  zodSchema: AnyZodObject
) => validateRequestWithZod(req, res, zodSchema);

export const Borrow = model<IBorrow, IBookModel>("Borrow", borrowSchema);
