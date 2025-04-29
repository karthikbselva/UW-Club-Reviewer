import {Sequelize} from "sequelize-typescript";
import {Umzug, SequelizeStorage} from "umzug";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URI = 
    process.env.NODE_ENV === "production"
    ? /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      process.env.DATABASE_URI!
    : `mysql://${process.env.DB_USER}:${process.env.DB_ROOT_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_DEV}`;

const sequelize = new Sequelize(DATABASE_URI, {
  models: [path.join(__dirname, "/*.model.ts")],
});

sequelize.authenticate();

export const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.ts',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

export type Migration = typeof migrator._types.migration;
