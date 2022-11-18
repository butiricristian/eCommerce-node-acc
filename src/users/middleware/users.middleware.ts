import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import debug from 'debug';

const log = debug('app:users:middleware');

export const handleValidationError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err && err.errors) {
    log('HANDLE VALIDATION ERROR');
    const errorMessages = Object.values(err.errors).map((value) => value['message']).join('. ')
    console.log(errorMessages)
    res.status(400).send({ err: errorMessages });
  }
  next(err);
};
