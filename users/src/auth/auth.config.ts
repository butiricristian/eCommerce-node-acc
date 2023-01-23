import { ConfigParams } from "express-openid-connect";

export const authConfig: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  authorizationParams: {
    response_type: 'code',
    scope: process.env.AUTH_SCOPE,
    audience: process.env.AUTH_AUDIENCE
  }
};