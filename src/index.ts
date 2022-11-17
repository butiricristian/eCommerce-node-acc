import * as express from 'express';
import * as debug from 'debug'
import { connectDatabase } from './common/mongoose.service';
import { SwaggerConfig } from './swagger.config';
const PORT = 3001;

const app: express.Application = express();
const log = debug('app:main')


app.use(express.json())
connectDatabase()

/**
 * Default home path
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});


new SwaggerConfig(app, 'localhost', PORT);

app.listen(PORT, () => {
  return log(`Express is listening at http://localhost:${PORT}`);
});