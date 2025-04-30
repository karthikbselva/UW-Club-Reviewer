import express from "express";
import { sequelize } from "./models";
import clubRouter from "./rest/clubRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/clubs", clubRouter);

sequelize.authenticate();

app.listen({ port: process.env.PORT || 8080 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});