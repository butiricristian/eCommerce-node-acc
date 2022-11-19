import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import debug from 'debug';

const log = debug('app:users:middleware');
const MONGO_ERRORS = ['MongoServerError', 'MongoError'];

export const handleValidationError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err && MONGO_ERRORS.indexOf(err.name) > -1) {
    if (err.errors) {
      log('HANDLE VALIDATION ERROR');
      const errorMessages = Object.values(err.errors)
        .map((value) => value['message'])
        .join('. ');
      res.status(400).send({ err: errorMessages });
    } else if (err.code === 11000) {
      log('HANDLE DUPLICATE ERROR');
      res.status(409).send({ err: `This value already exists ${JSON.stringify(err.keyValue)}` });
    }
  }
  next(err);
};

export const handleCustomValidationError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err && err.name === 'ValidationError') {
    log('HANDLE CUSTOM VALIDATION ERROR');
    res.status(400).send({ err: err.message });
  }
  next(err);
};
