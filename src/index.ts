import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import { auth } from 'express-openid-connect';
import { authConfig } from './auth/auth.config';
import authRouter from './auth/auth.routes';
const PORT = 3001;

// Initialize express app
const app: express.Application = express();

// JSON parsing
app.use(express.json());
// Auth0 Config
app.use(auth(authConfig));
// Auth routes (will be redirected to auth0 routes)
app.use('/api/v1', authRouter);

// Root url
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
