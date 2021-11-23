import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const init = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('DB Connection successful');
    })
    .catch((err) => {
      console.log('DB not connected');
      process.exit(0);
    });
};

export { sequelize, init };
