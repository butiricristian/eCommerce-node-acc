import * as express from 'express'
import authController from './auth.controller'

const authRouter: express.Router = express.Router()

authRouter.route('/profile').get(authController.profile)
authRouter.route('/login').get(authController.login)
authRouter.route('/logout').get(authController.logout)

export default authRouter
