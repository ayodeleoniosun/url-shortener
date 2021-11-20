import express from "express";
import cors from "cors";
import "dotenv/config";
import sequelize from './db/instance';

export const server = async () => {
  await sequelize.sync();
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("port", process.env.PORT || 5000);

  app.get("*", (req, res) =>
    res.status(200).send({
      message: `Welcome to ${process.env.APP_NAME}`,
    })
  );

  return app;
};