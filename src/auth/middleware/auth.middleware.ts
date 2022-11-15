/* eslint-disable @typescript-eslint/no-namespace */
import userModel, { IUser, ROLES } from '../../users/models/user.model';
import { Token } from 'auth0';
import debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { auth as authJwt } from 'express-oauth2-jwt-bearer';
import jwt_decode from 'jwt-decode';

declare global {
  namespace Express {
    interface Request {
      currentUser: IUser;
      token: Token;
    }

    interface Response {
      currentUser: IUser;
      token: Token;
    }
  }
}

/**
 * This middleware checks and validate the access token
 */
export const checkJwt = authJwt({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

const log = debug('app:auth:middleware');

const AUTHORIZATION_HEADER = 'authorization';
const BEARER = 'Bearer';
export const ROLES_KEY = `${process.env.AUTH_AUDIENCE}claims/roles`;
export const ID_KEY = 'sub';

export function requireMinimumPermission(PERMISSION: string) {
  log('Minimum permission required: ', PERMISSION);

  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.token)
    console.log(ROLES_KEY)
    if (!req.token) {
      log('User cannot perform action because token is missing');
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return
    }
    if (!req.token[ROLES_KEY]) {
      log('User cannot perform action because token is missing ROLES_KEY');
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return
    }

    const roles = req.token[ROLES_KEY]
    if (!hasRole(roles, PERMISSION)) {
      log('User cannot perform action because it doesn\'t have the right Role');
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return
    }

    if (req.params.user_id !== req.currentUser.id && !hasRole(roles, ROLES.ADMIN)) {
      log('User cannot perform action');
      res.status(403).send({ err: 'User does not have permissions to access this resource' });
      return
    }

    log('User can perform action to', req.originalUrl);
    next();
  };
}

export async function extractCurrentUser(req: Request, res: Response, next: NextFunction) {
  const auth0Id = req.token[ID_KEY];
  if (!auth0Id) {
    res.status(400).send({ err: 'Token does not contain auth0 ID' });
  }

  const user = await userModel.findOne({ auth0Id });

  req.currentUser = user;
  next();
}

export function extractUserMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.headers[AUTHORIZATION_HEADER] || req.headers[AUTHORIZATION_HEADER].indexOf(BEARER) < 0) {
    res.status(400).send({ err: 'Authorization Header missing with Bearer + JWT' });
  }

  try {
    log('Decoding token');
    req.token = jwt_decode(req.headers[AUTHORIZATION_HEADER].split(BEARER)[1]);
    log('Token decoded');

    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

function hasRole(roles: Array<string>, role: string) {
  return roles.find((value: string) => value.toLowerCase() === role)
}
