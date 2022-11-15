import { ROLES } from './models/user.model';
import * as express from 'express';
import { checkJwt, extractCurrentUser, extractUserMiddleware, requireMinimumPermission } from '../auth/middleware/auth.middleware';
import usersController from './users.controller';

const usersRouter = express.Router();

usersRouter
  .route('/users')
  .all(checkJwt, extractUserMiddleware, extractCurrentUser)
  .get(requireMinimumPermission(ROLES.ADMIN), usersController.getUsers)
  .post(requireMinimumPermission(ROLES.ADMIN), usersController.createUser);

usersRouter
  .route('/users/:userId')
  .all(checkJwt, extractUserMiddleware, extractCurrentUser)
  .get(usersController.getUser)
  .patch(requireMinimumPermission(ROLES.CUSTOMER), usersController.updateUser)
  .delete(requireMinimumPermission(ROLES.CUSTOMER), usersController.deleteUser);

usersRouter.route('/users/:userId/password').post(checkJwt, usersController.changePassword);
usersRouter.route('/users/:userId/email').post(checkJwt, usersController.changeEmail);
usersRouter.route('/users/:userId/reset-password').post(usersController.resetPassword);

export default usersRouter;
