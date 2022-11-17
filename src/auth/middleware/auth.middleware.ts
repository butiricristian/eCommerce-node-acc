/* eslint-disable @typescript-eslint/no-namespace */
import userModel, { IUser, ROLES } from '../../users/models/user.model';
import debug from 'debug';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { auth as authJwt } from 'express-oauth2-jwt-bearer';

declare global {
  namespace Express {
    interface Request {
      currentUser: IUser;
    }

    interface Response {
      currentUser: IUser;
    }
  }
}

export const ROLES_KEY = `${process.env.AUTH_AUDIENCE}claims/roles`;
export const ID_KEY = 'sub';
const log = debug('app:auth:middleware');

/**
 * This middleware checks and validate the access token
 */
export const checkJwt = authJwt({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

export const handleUnauthorizedError: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err && err.status === 401) {
    res.status(401).send({ err: 'JWT token is invalid' });
    return;
  }
  next();
};

export function requireOneOfRoles(requiredRoles: Array<string>) {
  log('Roles required: ', requiredRoles);

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth.payload) {
      log('User cannot perform action because token is missing');
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return;
    }
    if (!req.auth.payload[ROLES_KEY]) {
      log('User cannot perform action because token is missing ROLES_KEY');
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return;
    }

    const roles = req.auth.payload[ROLES_KEY] as string[];
    if (!hasRole(roles, requiredRoles)) {
      log("User cannot perform action because it doesn't have the right Role");
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return;
    }
    if (!hasRole(roles, [ROLES.ADMIN]) && req.params.userId !== req.currentUser.id) {
      log('User cannot perform action');
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return;
    }

    log('User can perform action to', req.originalUrl);
    next();
  };
}

export async function extractCurrentUser(req: Request, res: Response, next: NextFunction) {
  const auth0Id = req.auth.payload[ID_KEY];
  if (!auth0Id) {
    res.status(400).send({ err: 'Token does not contain auth0 ID' });
  }

  const user = await userModel.findOne({ auth0Id });

  req.currentUser = user;
  next();
}

function hasRole(roles: Array<string>, requiredRoles: Array<string>) {
  return roles.find((value: string) => requiredRoles.indexOf(value.toLowerCase()) > -1);
}
