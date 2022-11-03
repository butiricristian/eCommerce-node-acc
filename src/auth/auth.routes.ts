import * as express from 'express'
import * as AuthController from './auth.controller'

const authRouter: express.Router = express.Router()

authRouter.route('/profile').get(AuthController.profile)
authRouter.route('/login').get(AuthController.login)
authRouter.route('/logout').get(AuthController.logout)

export default authRouter