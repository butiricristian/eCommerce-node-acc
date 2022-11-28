import debug from "debug";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const log = debug('app:auth:errors:middleware')

export const handleAuth0Error: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err && err.statusCode === 400 && err.originalError) {
    log('HANDLE AUTH0 ERROR');
    const errMessage = JSON.parse(err.originalError.response.text).message;
    res.status(400).send({ err: errMessage });
  }
  next(err);
};

export const handleUnauthorizedError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err && err.status === 401) {
    log('HANDLE UNAUTHORIZED ERROR')
    res.status(401).send({ err: 'JWT token is invalid' });
  }
  next(err);
};