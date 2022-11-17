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

// Root url
app.get('/', (req, res) => {
  res.send('Hello World!');
});

new SwaggerConfig(app, 'localhost', PORT);

// Start server
app.listen(PORT, () => {
  return log(`Express is listening at http://localhost:${PORT}`);
});
