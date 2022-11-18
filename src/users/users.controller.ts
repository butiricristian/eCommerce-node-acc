import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils';
import usersService from './users.service';

class UsersController {
  getUsers = catchAsync(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit?.toString());
    const offset = parseInt(req.query.offset?.toString());
    const users = await usersService.getAllUsers({ limit, offset });
    res.send({ users });
  })

  getUser = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.getUserById(req.params.userId);
    res.send({ user });
  })

  createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);
    res.status(201).send(user);
  })

  updateUser = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    res.status(200).send(user);
  })

  deleteUser = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.deleteUser(req.params.userId);
    res.status(200).send(user);
  })

  register = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.register(req.body);
    res.status(201).send(user);
  })

  changePassword = catchAsync(async (req: Request, res: Response) => {
    const { password } = req.body;
    await usersService.changePassword(req.params.userId, password);
    res.sendStatus(204);
  })

  changeEmail = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    await usersService.changeEmail(req.params.userId, email);
    res.sendStatus(204);
  })

  closeAccount = catchAsync(async (req: Request, res: Response) => {
    await usersService.closeAccount(req.params.userId);
    res.sendStatus(204);
  })

  async resetPassword(req: Request<unknown, unknown, unknown, { email: string }>, res: Response, next: NextFunction) {
    try {
      const user = await usersService.resetPassword(req.query.email);
      res.status(200).send(user);
    } catch (e) {
      next(e)
    }
  }
}

export default new UsersController();
