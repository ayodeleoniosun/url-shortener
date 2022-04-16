import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ShortenerRoute from './routes/index.route';
import databaseConnection from './database.connection';

const app: express.Express = express();
databaseConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/', ShortenerRoute);
app.set('port', process.env.APP_PORT || 3000);

app.get('*', (req, res) =>
  res.status(200).send({
    message: `Welcome to ${process.env.APP_NAME}`,
  })
);

export default app;
