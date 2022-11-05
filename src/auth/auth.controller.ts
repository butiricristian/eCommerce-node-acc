import { Request, Response } from 'express';

class AuthController {
  profile(req: Request, res: Response) {
    res.send(req.oidc.accessToken);
  }

  login(req: Request, res: Response) {
    res.oidc.login({ returnTo: `${process.env.BASE_URL}/api/v1/profile` });
  }

  logout(req: Request, res: Response) {
    res.oidc.logout();
  }
}

export default new AuthController()
