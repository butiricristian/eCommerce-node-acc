import { ManagementClient } from 'auth0';
import debug from 'debug';
import CreateUserDTO from 'src/users/dto/create_user.dto';
import { IUser } from 'src/users/models/user.model';
import axios from 'axios';

const log = debug('app:auth:service');

class AuthService {
  private _managementClient: ManagementClient;

  constructor() {
    this._managementClient = new ManagementClient({
      domain: process.env.AUTH_DOMAIN,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      scope:
        'create:users read:users update:users delete:users ' +
        'create:users_app_metadata update:users_app_metadata delete:users_app_metadata read:users_app_metadata',
    });
  }

  async createUser(user: CreateUserDTO) {
    log('Creating Auth0 User...');
    const authUser = await this._managementClient.createUser({
      connection: 'Username-Password-Authentication',
      email: user.email,
      password: user.password,
      email_verified: false,
      verify_email: false,
    });
    log('Auth0 User created successfuly');

    return authUser.user_id;
  }

  async deleteUser(auth0Id: string) {
    this._managementClient.deleteUser({
      id: auth0Id,
    });
  }

  async changePassword(auth0Id: string, password: string) {
    this._managementClient.updateUser({ id: auth0Id }, { password });
  }

  async changeEmail(auth0Id: string, email: string) {
    this._managementClient.updateUser({ id: auth0Id }, { email });
  }

  async resetPassword(user: IUser) {
    const url = `https://${process.env.AUTH_DOMAIN}/dbconnections/change_password`;
    const headers = { 'content-type': 'application/json' };
    const data = {
      client_id: process.env.AUTH_CLIENT_ID,
      email: user.email,
      connection: 'Username-Password-Authentication',
    };

    try {
      const res = await axios.post(url, data, { headers });
      log(`Password reset: ${res.data}`);
      return res.data;
    } catch (e) {
      console.error(e.response.data);
      throw e.stack;
    }
  }
}

export default new AuthService();
