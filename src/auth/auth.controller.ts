import { Request, Response } from "express"

export const profile = (req: Request, res: Response) => {
  res.send(req.oidc.accessToken)
}

export const login = (req: Request, res: Response) => {
  res.oidc.login({ returnTo: `${process.env.BASE_URL}/api/v1/profile` })
}

export const logout = (req: Request, res: Response) => {
  res.oidc.logout()
}
