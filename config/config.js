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
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },

  gusti: {
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
