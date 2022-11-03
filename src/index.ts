import * as express from 'express';
import * as debug from 'debug'
import { connectDatabase } from './common/mongoose.service';
const PORT = 3001;

const app: express.Application = express();
const log = debug('app:main')

app.use(express.json())
connectDatabase()

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return log(`Express is listening at http://localhost:${PORT}`);
});