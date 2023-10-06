import { NextFunction, Request, Response } from 'express';
import { AppError, HttpCode } from '../types/AppError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  return res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .send({ errors: [{ message: err.message }] });
};
