import { Request, Response } from "express";
import httpStatus from "http-status";
import { model, Schema } from "mongoose";
import { AnyZodObject } from "zod";
import { IBook, IBookModel } from "../interfaces/book.interface";
import { sendError } from "../utils/sendResponse";
import validateRequestWithZod from "../utils/validateWithZod";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook, IBookModel>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      //   unique: [true, "ISBN must be unique"],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies are required"],
      min: [0, "Copies must be a non-negative number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.statics.validateInputs = (
  req: Request,
  res: Response,
  zodSchema: AnyZodObject
) => validateRequestWithZod(req, res, zodSchema);

bookSchema.statics.findBook = async (bookId: string, res: Response) => {
  const book = await Book.findById(bookId);
  if (!book) {
    sendError(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Book Not Found!",
      error: null,
    });
    return;
  }
  return book;
};

// bookSchema.pre("findOne", async function (doc) {
//   console.log(this.getQuery()._id);
//   // boo
// });

bookSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
  }
});

export const Book = model<IBook, IBookModel>("Book", bookSchema);
