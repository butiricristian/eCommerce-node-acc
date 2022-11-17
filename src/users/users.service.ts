import CreateUserDTO from './dto/create_user.dto';
import UserModel from './models/user.model';
import * as bcrypt from 'bcrypt';
import authService from '../auth/auth.service';
import UpdateUserDTO from './dto/update_user.dto';

const SALT_OR_ROUNDS = 10000;

class UsersService {
  async getAllUsers({ limit, offset }: { limit: number; offset: number }) {
    return UserModel.find().skip(offset).limit(limit);
  }

  async getUserById(userId: string) {
    return UserModel.findById(userId);
  }

  async createUser(userData: CreateUserDTO) {
    const auth0Id = await this._createAuthUser(userData);
    userData.auth0Id = auth0Id;

    return await this._createMongoUser(userData);
  }

  async register(userData: CreateUserDTO) {
    return await this._createMongoUser(userData);
  }

  async updateUser(userId: string, userData: UpdateUserDTO) {
    const user = await UserModel.findById(userId);
    await authService.updateUser(user.auth0Id, userData);
    return await this._updateMongoUser(userId, userData);
  }

  async deleteUser(userId: string) {
    const user = await UserModel.findById(userId);
    authService.deleteUser(user.auth0Id);
    return UserModel.findByIdAndDelete(userId);
  }

  async closeAccount(userId: string) {
    return await UserModel.findByIdAndUpdate(userId, {
      status: 'closed',
    });
    // authService.deleteUser(user.auth0Id);
  }

  async changePassword(userId: string, password: string) {
    const user = await UserModel.findById(userId);
    // const passwordHash = await bcrypt.hash(password, SALT_OR_ROUNDS);
    // await UserModel.findByIdAndUpdate(userId, { password: passwordHash }, { new: true });
    authService.changePassword(user.auth0Id, password);
  }

  async changeEmail(userId: string, email: string) {
    const user = await UserModel.findById(userId);
    await UserModel.findByIdAndUpdate(userId, { email }, { new: true });
    authService.changeEmail(user.auth0Id, email);
  }

  async resetPassword(email: string) {
    const user = await UserModel.findOne({ email });
    authService.resetPassword(user);
  }

  private async _createAuthUser(userData: CreateUserDTO) {
    return authService.createUser(userData);
  }

  private async _createMongoUser(userData: CreateUserDTO) {
    // const passwordHash = await bcrypt.hash(userData.password, SALT_OR_ROUNDS);
    // userData.password = passwordHash;
    userData.firstName ||= 'First Name';
    userData.lastName ||= 'Last Name';
    userData.username ||= userData.email;
    return UserModel.create(userData);
  }

  private async _updateMongoUser(userId: string, userData: UpdateUserDTO) {
    if (userData.password) {
      const passwordHash = await bcrypt.hash(userData.password, SALT_OR_ROUNDS);
      userData.password = passwordHash;
    }
    return UserModel.findByIdAndUpdate(userId, userData, { new: true });
  }
}

export default new UsersService();
