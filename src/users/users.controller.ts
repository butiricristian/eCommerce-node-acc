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
    res.send('One User' + req.params.userId).status(204);
  }

  async deleteUser(req: Request, res: Response) {
    res.send('One User' + req.params.userId).status(204);
  }
}

export default new UsersController()
