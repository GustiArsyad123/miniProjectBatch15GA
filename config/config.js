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
    username: "txvifcdkvprkqr",
    password:
      "7d506edec6f2f2c56af970630f93426ab80586101120fae1a97f21d844df38fb",
    database: "d3etoa404k6mm0",
    host: "ec2-100-24-227-178.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: "pglranbneidtaj",
    password:
      "859d93132a1cdba1b59f803031235313f324e7c448a8e3d5105df2ba42995e4f",
    database: "d3e64ki6lhtad8",
    host: "ec2-34-198-189-252.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
