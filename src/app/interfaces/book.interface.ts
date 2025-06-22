import { Request, Response } from "express";
import { Model } from "mongoose";
import { AnyZodObject } from "zod";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IBookModel extends Model<IBook> {
  validateInputs<T>(req: Request, res: Response, zodSchema: AnyZodObject): T;
  findBook<T>(bookId: string, res: Response): T;
}
