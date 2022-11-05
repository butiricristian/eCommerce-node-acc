import CreateUserDTO from './dto/create_user.dto';
import UserModel from './models/user.model';
import * as bcrypt from 'bcrypt';
import authService from '../auth/auth.service';
import UpdateUserDTO from './dto/update_user.dto';

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

  async updateUser(userId: string, userData: UpdateUserDTO) {
    const user = await this._updateMongoUser(userId, userData)
    return user
  }

  async deleteUser(userId: string) {
    return UserModel.findByIdAndDelete(userId)
  }

  private async _createAuthUser(userData: CreateUserDTO) {
    return authService.createUser(userData)
  }

  private async _createMongoUser(userData: CreateUserDTO) {
    const passwordHash = await bcrypt.hash(userData.password, SALT_OR_ROUNDS);
    userData.password = passwordHash
    return UserModel.create(userData)
  }

  private async _updateMongoUser(userId: string, userData: UpdateUserDTO) {
    if(userData.password) {
      const passwordHash = await bcrypt.hash(userData.password, SALT_OR_ROUNDS)
      userData.password = passwordHash
    }
    return UserModel.findByIdAndUpdate(userId, userData)
  }
}

export default new UsersService()
