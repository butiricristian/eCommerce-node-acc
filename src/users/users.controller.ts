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
}

export default new UsersController()
