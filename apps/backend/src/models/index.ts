import * as path from "path";
import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from 'sequelize-typescript';

const DATABASE_URI = 
    process.env.NODE_ENV === "production"
    ? /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      process.env.DATABASE_URI!
    : `mysql://${process.env.DB_USER}:${process.env.DB_ROOT_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_DEV}`;

const sequelize = new Sequelize(DATABASE_URI, {
  models: [path.join(__dirname, "/*.model.ts")],
});

export { sequelize };