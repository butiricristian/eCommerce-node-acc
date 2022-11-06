import * as express from 'express';
import usersController from './users.controller';

const usersRouter = express.Router();

usersRouter.route('/users').get(usersController.getUsers).post(usersController.createUser);

usersRouter
  .route('/users/:userId')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

  usersRouter.route('/users/:userId/password').post(usersController.changePassword);
  usersRouter.route('/users/:userId/email').post(usersController.changeEmail);
  usersRouter.route('/users/:userId/reset-password').post(usersController.resetPassword);

export default usersRouter;
