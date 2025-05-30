import express from "express";
import { sequelize } from "./models";
import clubRouter from "./rest/clubRoutes";
import reviewRouter from "./rest/reviewRoutes";
import voteRouter from "./rest/voteRoutes";
import { createAllClubs, scrapeForClubLinks } from "./clubScraper";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/clubs", clubRouter);
app.use("/reviews", reviewRouter);
app.use("/votes", voteRouter);

sequelize.authenticate();

app.listen({ port: process.env.PORT || 8080 }, () => {
  console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});

sequelize.sync({ alter: true });