import { NextFunction, Request, Response } from 'express';
import { ACTIONS } from '../analytics/models/analytics.model';
import { eventEmitter } from '../analytics/middleware/analytics.middleware';
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
    eventEmitter.emit('track', {
      action: ACTIONS.CREATE,
      requestUserId: req.auth.payload.sub,
      payload: req.body,
    })
    res.status(201).send(user);
  })

  updateUser = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    eventEmitter.emit('track', {
      action: ACTIONS.UPDATE,
      requestUserId: req.auth.payload.sub,
      payload: req.body,
    })
    res.status(200).send(user);
  })

  deleteUser = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.deleteUser(req.params.userId);
    eventEmitter.emit('track', {
      action: ACTIONS.DELETE,
      requestUserId: req.auth.payload.sub,
      payload: req.body,
    })
    res.status(200).send(user);
  })

  register = catchAsync(async (req: Request, res: Response) => {
    const user = await usersService.register(req.body);
    eventEmitter.emit('track', {
      action: ACTIONS.REGISTER,
      requestUserId: user.auth0Id,
      payload: req.body,
    })
    res.status(201).send(user);
  })

  changePassword = catchAsync(async (req: Request, res: Response) => {
    const { password } = req.body;
    await usersService.changePassword(req.params.userId, password);
    eventEmitter.emit('track', {
      action: ACTIONS.CHANGE_PASSWORD,
      requestUserId: req.auth.payload.sub,
      payload: req.body,
    })
    res.sendStatus(204);
  })

  changeEmail = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    await usersService.changeEmail(req.params.userId, email);
    eventEmitter.emit('track', {
      action: ACTIONS.CHANGE_EMAIL,
      requestUserId: req.auth.payload.sub,
      payload: req.body,
    })
    res.sendStatus(204);
  })

  closeAccount = catchAsync(async (req: Request, res: Response) => {
    await usersService.closeAccount(req.params.userId);
    res.sendStatus(204);
  })

  async resetPassword(req: Request<unknown, unknown, unknown, { email: string }>, res: Response, next: NextFunction) {
    try {
      const user = await usersService.resetPassword(req.query.email);
      eventEmitter.emit('track', {
        action: ACTIONS.RESET_PASSWORD,
        requestUserId: req.auth.payload.sub,
        payload: req.body,
      })
      res.status(200).send(user);
    } catch (e) {
      next(e)
    }
  }
}

export default new UsersController();
