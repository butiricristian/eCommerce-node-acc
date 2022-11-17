import { Request, Response } from 'express';
import usersService from './users.service';

class UsersController {
  async getUsers(req: Request, res: Response) {
    const limit = parseInt(req.query.limit?.toString());
    const offset = parseInt(req.query.offset?.toString());
    const users = await usersService.getAllUsers({ limit, offset });
    res.send({ users });
  }

  async getUser(req: Request, res: Response) {
    const user = await usersService.getUserById(req.params.userId);
    res.send({ user });
  }

  async createUser(req: Request, res: Response) {
    const user = await usersService.createUser(req.body);
    res.status(201).send(user);
  }

  async updateUser(req: Request, res: Response) {
    const user = await usersService.updateUser(req.params.userId, req.body);
    res.status(200).send(user);
  }

  async deleteUser(req: Request, res: Response) {
    const user = await usersService.deleteUser(req.params.userId);
    res.status(200).send(user);
  }

  async register(req: Request, res: Response) {
    const user = await usersService.register(req.body);
    res.status(201).send(user);
  }

  async changePassword(req: Request, res: Response) {
    const { password } = req.body
    await usersService.changePassword(req.params.userId, password);
    res.sendStatus(204)
  }

  async changeEmail(req: Request, res: Response) {
    const { email } = req.body
    await usersService.changeEmail(req.params.userId, email);
    res.sendStatus(204)
  }

  async closeAccount(req: Request, res: Response) {
    await usersService.closeAccount(req.params.userId);
    res.sendStatus(204)
  }

  async resetPassword(req: Request<unknown, unknown, unknown, {email: string}>, res: Response) {
    const user = await usersService.resetPassword(req.query.email);
    res.status(200).send(user);
  }
}

export default new UsersController()
