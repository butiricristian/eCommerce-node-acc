import { Request, Response } from 'express';
import { ACTIONS } from '../analytics/models/analytics.model';
import { eventEmitter } from '../analytics/middleware/analytics.middleware';

class AuthController {
  profile(req: Request, res: Response) {
    res.send(req.oidc.accessToken);
  }

  login(req: Request, res: Response) {
    eventEmitter.emit('track', {
      action: ACTIONS.LOGIN,
      requestUserId: 'anonymous',
      payload: req.body,
    })
    res.oidc.login({ returnTo: `${process.env.BASE_URL}/api/v1/profile` });
  }

  logout(req: Request, res: Response) {
    eventEmitter.emit('track', {
      action: ACTIONS.LOGOUT,
      requestUserId: req.auth?.payload?.sub || 'anonymous',
      payload: req.body,
    })
    res.oidc.logout();
  }
}

export default new AuthController()
