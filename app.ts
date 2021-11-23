import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ShortenerRoute from './src/routes/shortener.route';
import { init } from './db/instance';

const app: express.Express = express();
init();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', ShortenerRoute);
app.set('port', process.env.PORT || 3000);

app.get('*', (req, res) =>
  res.status(200).send({
    message: `Welcome to ${process.env.APP_NAME}`,
  })
);

export default app;
