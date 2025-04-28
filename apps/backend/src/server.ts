import express from "express";
//import { sequelize } from "./models";
import {Umzug, SequelizeStorage} from "umzug";
import {Sequelize} from "sequelize-typescript";
import * as path from "path";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// app.use(express.json());

app.listen({ port: process.env.PORT || 8080 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port ${process.env.PORT || 8080}!`);
});

const DATABASE_URI = 
    process.env.NODE_ENV === "production"
    ? /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      process.env.DATABASE_URI!
    : `mysql://${process.env.DB_USER}:${process.env.DB_ROOT_PASSWORD}@${process.env.DB_HOST}:3306/uw_club_reviewer_backend`;

const sequelize = new Sequelize(DATABASE_URI, {
  models: [path.join(__dirname, "/*.model.ts")],
});

sequelize.authenticate();

export const umzug = new Umzug({
    migrations: {
      glob: 'migrations/*.ts',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  const runMigrations = async () => {
    await umzug.up();
  };
  
  const revertMigration = async () => {
    await umzug.down();
  };

  runMigrations();