import { ManagementClient } from 'auth0';
import debug from 'debug';
import CreateUserDTO from 'src/users/dto/create_user.dto';

const log = debug('app:auth:service')

class AuthService {
  private _managementClient: ManagementClient

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
    log('Creating Auth0 User...')
    const authUser = await this._managementClient.createUser({
      connection: 'Username-Password-Authentication',
      email: user.email,
      password: user.password,
      email_verified: false,
      verify_email: false,
    })
    log('Auth0 User created successfuly')

    return authUser.user_id
  }
}

export default new AuthService()
