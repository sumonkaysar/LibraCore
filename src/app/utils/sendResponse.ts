import { Response } from 'express';

type TResponseCom = {
  statusCode: number;
  success: boolean;
  message?: string;
};

type TResponse<T> = TResponseCom & {
  data?: T;
};

type TError<T> = TResponseCom & {
  error: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export const sendError = <T>(res: Response, error: TError<T>) => {
  res.status(error?.statusCode).json({
    success: error.success,
    message: error.message,
    error: error.error,
  });
};
