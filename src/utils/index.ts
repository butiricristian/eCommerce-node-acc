import { NextFunction, Request, Response } from 'express';

interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export const catchAsync = (handler: AsyncRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
};
