import { Request, Response } from "express";
import { AnyZodObject } from "zod";
import { sendError } from "./sendResponse";

const validateRequestWithZod = (
  req: Request,
  res: Response,
  zodSchema: AnyZodObject
) => {
  const parsed = zodSchema.safeParse(req.body);

  if (!parsed.success) {
    sendError(res, {
      statusCode: 400,
      success: false,
      message: "Validation failed",
      error: {
        name: parsed.error.name,
        errors: parsed.error.issues,
      },
    });
    return;
  }

  return parsed.data;
};

export default validateRequestWithZod;
