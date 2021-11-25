require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      // useUTC: true, // for reading from database
    },
    timezone: "+07:00", // for writing to database
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      // useUTC: true, // for reading from database
    },
    timezone: "+07:00", // for writing to database
  },
  gusti: {
    username: "sekwfwwf ",
    password: "3ega02l1jwS68gkobERhQmgvwvU2RLCC",
    database: "sekwfwwf",
    host: "john.db.elephantsql.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
