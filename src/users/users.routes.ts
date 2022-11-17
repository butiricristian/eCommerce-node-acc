import { ROLES } from './models/user.model';
import * as express from 'express';
import {
  checkJwt,
  extractCurrentUser,
  handleUnauthorizedError,
  requireOneOfRoles,
} from '../auth/middleware/auth.middleware';
import usersController from './users.controller';

const usersRouter = express.Router();

usersRouter
  .route('/users')
  .all(checkJwt, handleUnauthorizedError, extractCurrentUser)
  .get(requireOneOfRoles([ROLES.ADMIN]), usersController.getUsers)
  .post(requireOneOfRoles([ROLES.ADMIN]), usersController.createUser);

usersRouter
  .route('/users/:userId/password')
  .post(
    checkJwt,
    handleUnauthorizedError,
    extractCurrentUser,
    requireOneOfRoles([ROLES.CUSTOMER]),
    usersController.changePassword,
  );
usersRouter
  .route('/users/:userId/email')
  .post(
    checkJwt,
    handleUnauthorizedError,
    extractCurrentUser,
    requireOneOfRoles([ROLES.CUSTOMER]),
    usersController.changeEmail,
  );
usersRouter
  .route('/users/:userId/close-account')
  .post(
    checkJwt,
    handleUnauthorizedError,
    extractCurrentUser,
    requireOneOfRoles([ROLES.CUSTOMER]),
    usersController.closeAccount,
  );
usersRouter.route('/users/reset-password').post(usersController.resetPassword);
usersRouter.route('/users/register').post(usersController.register);

usersRouter
  .route('/users/:userId')
  .all(checkJwt, handleUnauthorizedError, extractCurrentUser)
  .get(usersController.getUser)
  .patch(requireOneOfRoles([ROLES.ADMIN, ROLES.CUSTOMER]), usersController.updateUser)
  .delete(requireOneOfRoles([ROLES.ADMIN, ROLES.CUSTOMER]), usersController.deleteUser);

export default usersRouter;
