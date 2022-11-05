import * as express from 'express';
import usersController from './users.controller';

const usersRouter = express.Router();

usersRouter.route('/users').get(usersController.getUsers).post(usersController.createUser);

usersRouter
  .route('/users/:userId')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default usersRouter;
