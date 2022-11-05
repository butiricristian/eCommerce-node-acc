import CreateUserDTO from './dto/create_user.dto';
import UserModel from './models/user.model';
import * as bcrypt from 'bcrypt';
import authService from '../auth/auth.service';

const SALT_OR_ROUNDS = 10000

class UsersService {
  async getAllUsers({ limit, offset }: { limit: number; offset: number }) {
    return UserModel.find().skip(offset).limit(limit);
  }

  async getUserById(userId: string) {
    return UserModel.findById(userId);
  }

  async createUser(userData: CreateUserDTO) {
    const auth0Id = await this._createAuthUser(userData)
    userData.auth0Id = auth0Id

    const user = await this._createMongoUser(userData)
    return user
  }

  private async _createAuthUser(userData: CreateUserDTO) {
    return authService.createUser(userData)
  }

  private async _createMongoUser(userData: CreateUserDTO) {
    const passwordHash = await bcrypt.hash(userData.password, SALT_OR_ROUNDS);
    const user = new UserModel({
      username: userData.username,
      auth0Id: userData.auth0Id,
      email: userData.email,
      password: passwordHash
    })
    return user.save()
  }
}

export default new UsersService()
