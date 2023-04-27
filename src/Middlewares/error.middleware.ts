import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export enum ErrorTypes {
  NoCarsFound = 'NoCarsFound',
  CarNotFound = 'CarNotFound',
  InvalidId = 'InvalidId',
}

export enum HttpCodesCatalog {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  UNPROCESSABLE_CONTENT = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

export type ErroCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErroCatalog = {
  NoCarsFound: {
    message: 'No cars found',
    httpStatus: HttpCodesCatalog.NOT_FOUND,
  },
  CarNotFound: {
    message: 'Car not found',
    httpStatus: HttpCodesCatalog.NOT_FOUND,
  },
  InvalidId: {
    message: 'Invalid mongo id',
    httpStatus: HttpCodesCatalog.UNPROCESSABLE_CONTENT,
  },
};

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;

    return res.status(httpStatus).json({ message });
  }

  return res.status(HttpCodesCatalog.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal Server Error' });
};

export default errorMiddleware;