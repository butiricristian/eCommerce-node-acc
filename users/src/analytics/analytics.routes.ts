import { checkJwt, extractCurrentUser } from '../auth/middleware/auth.middleware';
import * as express from 'express';
import { requireOneOfRoles } from '../auth/middleware/auth.middleware';
import { ROLES } from '../users/models/user.model';
import analyticsController from './analytics.controller';

const analyticsRouter: express.Router = express.Router();

analyticsRouter
  .route('/analytics')
  .get(checkJwt, extractCurrentUser, requireOneOfRoles([ROLES.ADMIN]), analyticsController.getAnalytics);

export default analyticsRouter;
