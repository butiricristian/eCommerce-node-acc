import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import { auth } from 'express-openid-connect';
import { authConfig } from './auth/auth.config';
import authRouter from './auth/auth.routes';
import * as debug from 'debug'
import { connectDatabase } from './common/mongoose.service';
import usersRouter from './users/users.routes';
import { SwaggerConfig } from './swagger.config';
import { handleAuth0Error, handleUnauthorizedError } from './auth/middleware/auth.errors.middleware';
import { handleValidationError } from './users/middleware/users.middleware';
import analyticsRouter from './analytics/analytics.routes';
const PORT = 3001;

// Initialize express app
const app: express.Application = express();
const log = debug('app:main')

// Initialize db connection
connectDatabase()
// JSON parsing
app.use(express.json());
// Auth0 Config
app.use(auth(authConfig));

// Auth routes (will be redirected to auth0 routes)
app.use('/api/v1', authRouter);
// User routes (CRUD)
app.use('/api/v1', usersRouter);
// Analytics routes
app.use('/api/v1', analyticsRouter);

// Root url
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(handleUnauthorizedError, handleAuth0Error, handleValidationError)

new SwaggerConfig(app, 'localhost', PORT);

// Start server
app.listen(PORT, () => {
  return log(`Express is listening at http://localhost:${PORT}`);
});
