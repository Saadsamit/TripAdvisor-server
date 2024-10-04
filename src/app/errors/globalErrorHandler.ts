/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from './handleZodError';
import handleValidationError from './handleValidationError';
import handleDuplicateError from './handleDuplicateError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err?.status || 500;
  let message = err?.message || 'Something went wrong!';
  let errorMessages: TErrorSources = [
    {
      path: err?.path ? err?.path : '',
      message,
    },
  ];
  console.log(err);
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  if (err) {
    res.json({
      success: false,
      statusCode,
      errorMessages,
      message,
    });
  }
};

export default globalErrorHandler;
