import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { Prisma } from '@prisma/client';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
};

export default errorMiddleware;
