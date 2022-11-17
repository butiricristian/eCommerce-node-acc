import { ManagementClient, ObjectWithId, Role } from 'auth0';
import debug from 'debug';
import CreateUserDTO from 'src/users/dto/create_user.dto';
import { IUser, ROLES } from '../users/models/user.model';
import axios from 'axios';
import UpdateUserDTO from 'src/users/dto/update_user.dto';

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
        'read:roles ' +
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

    const idObject = { id: authUser.user_id };
    this._updateRole(idObject, user.role || ROLES.CUSTOMER);

    return authUser.user_id;
  }

  async updateUser(auth0Id: string, user: UpdateUserDTO) {
    log('Updating Auth0 User...');
    const idObject = { id: auth0Id };
    const data = {
      connection: 'Username-Password-Authentication',
      email_verified: false,
      verify_email: false,
    };
    if (user.email) {
      data['email'] = user.email;
    }
    if (user.password) {
      data['password'] = user.password;
    }
    await this._managementClient.updateUser(idObject, data);
    log('Auth0 User updated successfuly');
    this._updateRole(idObject, user.role);
  }

  async deleteUser(auth0Id: string) {
    log('Deleting Auth0 User...');
    this._managementClient.deleteUser({
      id: auth0Id,
    });
    log('Auth0 User deleted successfuly');
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

  private async _updateRole(idObject: ObjectWithId, role: string) {
    if (!role) return;

    log('Updating Auth0 User Roles...');
    const authRoles = (await this._managementClient.getRoles())
      .filter((r: Role) => r.name.toLowerCase === role.toLowerCase)
      .map((r: Role) => r.id);
    await this._managementClient.assignRolestoUser(idObject, { roles: authRoles });
    log('Auth0 User Roles updated successfuly');
  }
}

export default new AuthService();
