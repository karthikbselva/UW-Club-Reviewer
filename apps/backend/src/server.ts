import express from "express";
import { sequelize } from "./models";
const app = express();

sequelize.authenticate();

// app.use(express.json());

app.listen({ port: process.env.PORT || 8080 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});