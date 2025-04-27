import express from "express";
import { sequelize } from "./models";

const app = express();
// app.use(express.json());

sequelize.authenticate();

app.listen({ port: process.env.PORT || 8080 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});