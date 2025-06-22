import { Request, Response } from "express";
import { Model, Types } from "mongoose";
import { AnyZodObject } from "zod";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface IBorrowModel extends Model<IBorrow> {
  validateInputs<T>(req: Request, res: Response, zodSchema: AnyZodObject): T;
}
