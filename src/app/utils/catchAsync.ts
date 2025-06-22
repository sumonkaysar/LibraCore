import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendError } from "./sendResponse";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      return sendError(res, {
        statusCode: 400,
        success: false,
        message: error.message,
        error,
      });
    });
  };
};

export default catchAsync;
