import express from "express";
import cors from "cors"; 
import { sequelize } from "./models";
import clubRouter from "./rest/clubRoutes";
import reviewRouter from "./rest/reviewRoutes";
import voteRouter from "./rest/voteRoutes";
import { createAllClubs, scrapeForClubLinks } from "./clubScraper";
import { seedReviews } from "./seedingScripts";

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // allow your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
  credentials: true,  // if you want to allow cookies/auth
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/clubs", clubRouter);
app.use("/reviews", reviewRouter);
app.use("/votes", voteRouter);

sequelize.authenticate();

app.listen({ port: process.env.PORT || 8080 }, () => {
  console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});

//sequelize.sync({ force: true });

//createAllClubs();
// seedReviews();