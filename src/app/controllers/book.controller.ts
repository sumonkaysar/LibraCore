import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import { IBook } from "../interfaces/book.interface";
import { Book } from "../models/book.model";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import {
  bookZodSchema,
  updateBookZodSchema,
} from "../validations/book.validation";

const createBook = catchAsync(async (req, res) => {
  const data: IBook = Book.validateInputs(req, res, bookZodSchema);

  if (data.copies < 1) {
    data.available = false;
  }

  if (data) {
    const result = await Book.create(data);

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book created successfully",
      data: result,
    });
  }
});

const getAllBooks = catchAsync(async (req, res) => {
  const { filter, sortBy, sort, limit } = req.query;

  const query: any = {};

  if (filter) {
    query.genre = filter;
  }

  let booksQuery = Book.find(query);

  if (sortBy && sort) {
    booksQuery = booksQuery.sort([[sortBy as string, sort as SortOrder]]);
  }

  if (limit) {
    booksQuery = booksQuery.limit(parseInt(limit as string));
  }

  const books = await booksQuery;

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

const getBookById = catchAsync(async (req, res) => {
  const book = await Book.findBook(req.params.bookId, res);

  if (book) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  }
});

const updateBookById = catchAsync(async (req, res) => {
  const book = await Book.findBook(req.params.bookId, res);

  if (book) {
    const data: Partial<IBook> = Book.validateInputs(
      req,
      res,
      updateBookZodSchema
    );

    if (data) {
      if (typeof data.copies === "number") {
        console.log(data.copies > 0, req.body);
        req.body.available = data.copies > 0;
      }

      const updatedBook = await Book.findByIdAndUpdate(
        req.params.bookId,
        req.body,
        { new: true }
      );

      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    }
  }
});

const deleteBookById = catchAsync(async (req, res) => {
  const book = await Book.findBook(req.params.bookId, res);
  if (book) {
    await Book.findByIdAndDelete(req.params.bookId);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  }
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
