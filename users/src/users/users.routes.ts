import { ROLES } from './models/user.model';
import * as express from 'express';
import {
  checkJwt,
  extractCurrentUser,
  forbidCustomerRoleChange,
  requireOneOfRoles,
} from '../auth/middleware/auth.middleware';
import usersController from './users.controller';
import { validateCreateUserData } from './middleware/users.validators.middleware';

const usersRouter = express.Router();

usersRouter
  .route('/users')
  .all(checkJwt, extractCurrentUser)
  .get(requireOneOfRoles([ROLES.ADMIN]), usersController.getUsers)
  .post(requireOneOfRoles([ROLES.ADMIN]), validateCreateUserData, usersController.createUser);

usersRouter
  .route('/users/:userId/password')
  .post(checkJwt, extractCurrentUser, requireOneOfRoles([ROLES.ADMIN, ROLES.CUSTOMER]), usersController.changePassword);
usersRouter
  .route('/users/:userId/email')
  .post(checkJwt, extractCurrentUser, requireOneOfRoles([ROLES.ADMIN, ROLES.CUSTOMER]), usersController.changeEmail);
usersRouter
  .route('/users/:userId/close-account')
  .post(checkJwt, extractCurrentUser, requireOneOfRoles([ROLES.ADMIN, ROLES.CUSTOMER]), usersController.closeAccount);
usersRouter.route('/users/reset-password').post(usersController.resetPassword);
usersRouter.route('/users/register').post(usersController.register);

usersRouter
  .route('/users/:userId')
  .all(checkJwt, extractCurrentUser)
  .get(usersController.getUser)
  .patch(requireOneOfRoles([ROLES.ADMIN, ROLES.CUSTOMER]), forbidCustomerRoleChange, usersController.updateUser)
  .delete(requireOneOfRoles([ROLES.ADMIN, ROLES.CUSTOMER]), usersController.deleteUser);

export default usersRouter;
