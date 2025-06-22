import httpStatus from "http-status";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import catchAsync from "../utils/catchAsync";
import { sendError, sendResponse } from "../utils/sendResponse";
import { borrowZodSchema } from "../validations/borrow.validation";

const borrowBook = catchAsync(async (req, res) => {
  const data = Book.validateInputs<IBorrow>(req, res, borrowZodSchema);

  if (data) {
    const { book, quantity, dueDate } = data;
    const foundBook = await Book.findById(book);

    if (!foundBook) {
      return sendError(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Book not found!",
        error: null,
      });
    }

    if (foundBook.copies < quantity) {
      return sendError(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Not enough copies available to borrow",
        error: null,
      });
    }

    foundBook.copies -= quantity;
    if (foundBook.copies === 0) {
      foundBook.available = false;
    }

    await foundBook.save();

    const borrowBook = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  }
});

const borrowedBooksSummary = catchAsync(async (_req, res) => {
  const borrowedBooks = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: borrowedBooks,
  });
});

export const BorrowControllers = {
  borrowBook,
  borrowedBooksSummary,
};
