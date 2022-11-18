import * as express from 'express'
import analyticsController from './analytics.controller'

const analyticsRouter: express.Router = express.Router()

analyticsRouter.route('/analytics').get(analyticsController.getAnalytics)

export default analyticsRouter
